import { Between, ILike, IsNull, Not } from "typeorm";
import DBAdapter from "../adapters/DBAdapter";
import { Lead } from "../db/entities/Lead.entity";
import { Note } from "../db/entities/Note.entity";
import { NoteDocuments } from '../db/entities/NoteDocument.entity';
import { NoteTag } from '../db/entities/NoteTag.entity';
import { INoteDocumentsRequest, INotesCreateRequest } from "../interfaces/requests/notes.request.interface";
import { PaginatedTotal } from "../interfaces/responses/pagination.response.interface";
import moment from "moment";
import { BadRequest } from "../libs/Error.Lib";
import { query } from "express";
import { User } from "../db/entities/User.entity";
import { Customer } from "../db/entities/Customer.entity";

export default class NoteService {
  constructor(protected lead?: Lead) {}

  async createNote (data: INotesCreateRequest, owner_id: number, lead_id: number) {
    const note = await new DBAdapter().insertAndFetch(Note, {
      lead_id,
      title: data.title,
      content: data.content,
      owner_id,
      status: data.status,
    });
    let docs;
    let tags;
    if (data?.documents?.length) {
      docs = await Promise.all(
        data.documents.map(async (doc) => 
        await this.storeNoteDocs(note.id, doc))
      );
    }
    if (data?.tags?.length) {
      tags = await Promise.all(
        data.tags.map(async (tag) => await this.storeNoteTags(note.id, Number(tag)))
      )
    }

    return {
      note,
      documents: docs,
      tags
    };
  }

  async storeNoteDocs (note_id: number, document: INoteDocumentsRequest) {
    const { name, description, url, object_key } = document;
    return await new DBAdapter().insertAndFetch(NoteDocuments, {
      name,
      description,
      object_key,
      url,
      note_id 
    })
  }

  async storeNoteTags (note_id: number, user_id: number) {
    return await new DBAdapter().insertAndFetch(NoteTag, {
      note_id,
      user_id
    })
  }

  async allNotes (
    lead_id: number,
    search: string,
    page: number,
    limit: number,
    status?: Note['status'],
    from?: string, to?: string
  ):  Promise<PaginatedTotal<Note>> {
      const skip = (page - 1) * limit;

      // TODO: use raw query here???
      const query = {
        lead_id,
        status: !status ? Not(IsNull()) : status, 
        meta: {
          deleted_flag: false,
          created_on: from && to ? Between(moment(from).toDate(), moment(to).add(1, 'days').toDate()) : undefined
        }
      }

      const [notes, total] =  await new DBAdapter().findAndCount(Note, {
        where:[
          { 
            title: !search ? Not(IsNull()) : ILike("%" + search + "%"),
            ...query
          },
          {
            content: !search ? Not(IsNull()) : ILike("%" + search + "%"),
            ...query
          }],
        skip,
        take: limit,
        relations: {
          // lead: true,
          owner: true,
          // tags: true,
          // documents: true,
        },

        order: { id: 'DESC' }
    })
    return {items: notes, total};
  }

  async getOne (lead_id: number, note_id: number, user_id: number) {
    const note = await new DBAdapter().findOne(Note, { 
      where: { id: note_id, lead_id, owner_id: user_id, meta: { deleted_flag: false} },
      relations: { owner: true }
    });

    if (!note) throw new BadRequest('Note not found.')
    const query = { 
      where: { note_id, meta: { deleted_flag: false },
    }};
    const tags = await new DBAdapter().find(NoteTag, { ...query, relations: { user: true } })
    const documents = await new DBAdapter().find(NoteDocuments, query)
    return { ...note, tags, documents }
  }

  async updateNote (lead_id: number, note_id: number, user_id: number, updates: any) {
    const db = new DBAdapter();
    const note = await db.findOne(Note, { 
      where: { id: note_id, lead_id, owner_id: user_id }
    });
    if (!note) throw new BadRequest('Note not found.');
    const { title, content, tags, documents, status } = updates;
    let newTags, newDocs;

    if (tags) {
      await db.update(NoteTag, { note_id }, { meta: { deleted_flag: true }});
      const newTag = tags.map((user_id: number) => { 
        return { user_id, note_id } 
      })
      newTags = await db.insertAndFetch(NoteTag, newTag,  { user: true })
    } else {
      newTags = await db.find(NoteTag, {  where: { note_id, meta: { deleted_flag: false } }, relations: { user: true }})
    }
   
    if (documents) {
      await db.update(NoteDocuments, { note_id }, { meta: { deleted_flag: true }});
      const newDoc = documents.map((t: any) => { 
        return {
          name: t.name,
          description: t.description,
          object_key: t.object_key,
          url: t.url,
          note_id
        } 
      })
      newDocs = await db.insertAndFetch(NoteDocuments, newDoc,  { owner: true })
    } else {
      newDocs = await db.find(NoteDocuments, {  where: { note_id, meta: { deleted_flag: false } }})
    }

    const newNote = await db.updateAndFetch(Note, { id: note_id, lead_id, owner_id: user_id }, {
      title,
      content,
      status
    }, {}, { owner: true })
    return {
      ...newNote,
      tags: newTags,
      documents: newDocs
    };
  }

  async tagSearch (query: string) {
    const queryString = {
      where: {
        name: !query ? Not(IsNull()) : ILike("%" + query + "%"),
      }
    }
    const users = await new DBAdapter().find(User, queryString)
    const customers = await new DBAdapter().find(Customer, queryString)

    return [
      ...users,
      ...customers
    ]
  }
}

