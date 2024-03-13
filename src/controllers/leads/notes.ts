import express from 'express';
import { INotesCreateRequest } from '../../interfaces/requests/notes.request.interface';
import LeadsService from '../../services/Leads.service';
import { BadRequest } from '../../libs/Error.Lib';
import NoteService from '../../services/Notes.Service';
import ResponseLib from '../../libs/Response.Lib';
import NoteMapper from '../../mappers/Note.Mapper';
import NoteDocumentMapper from '../../mappers/NoteDocumentMapper.Mapper';
import NoteTagMapper from '../../mappers/NoteTagMapper.Mapper';
import { IRequestQuery } from '../../interfaces/requests/request.interface';
import { Note } from '../../db/entities/Note.entity';
import UtilsService from '../../services/Utils.Service';
import UserMapper from '../../mappers/User.Mapper';
import TagMapper from '../../mappers/Tag.Mapper';

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
  try {
    const body: INotesCreateRequest = req.body;
    const { id } = req.params;
    const user = req.user;


    const lead = await new LeadsService().findLeadById(Number(id));
    if (!lead) throw new BadRequest('Lead not found.');

    const data = await new NoteService(lead).createNote(body, user.id, lead.id);
    
    return new ResponseLib(req, res).status(201).json({
      status: true,
      message: "Note created successfully.",
      data: {
        ...NoteMapper.toDTO(data.note),
        documents: data.documents ? data.documents.map(d => NoteDocumentMapper.toDTO(d)) : null,
        tags: data?.tags ? data?.tags.map(t => NoteTagMapper.toDTO(t)) : null
      }
    })
    
  } catch (error) {
    next(error)
  }
}

export const list = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
  try {
    const { id } = req.params;
    const { page, limit, status, from, to, search }: IRequestQuery = req.query;

    const noteService = new NoteService();
    const notes = await noteService.allNotes(Number(id), search, Number(page), Number(limit), status as Note['status'], from, to);
    return new ResponseLib(req, res)
        .json({
            status: true,
            message: 'Notes Loaded Successfully',
            data: notes.items.map(note => NoteMapper.toDTO(note)),
            meta: UtilsService.paginate(req.query, notes)
        });

  } catch(error) {
    next(error)
  }
}

export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
  try {
    const { id: note_id, lead_id } = req.params;
    const user = req.user;

    const noteService = new NoteService();
    const note = await noteService.getOne(Number(lead_id), Number(note_id), user.id)
    return new ResponseLib(req, res)
        .json({
            status: true,
            message: 'Notes Loaded Successfully',
            data: NoteMapper.toDTO(note),
        });

  } catch(error) {
    next(error)
  }
}


export const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
  try {
    const { id: note_id, lead_id } = req.params;
    const user = req.user;
    const data = req.body;

    const noteService = new NoteService();
    const note = await noteService.updateNote(Number(lead_id), Number(note_id), user.id, data)
    return new ResponseLib(req, res)
        .json({
            status: true,
            message: 'Note updated Successfully',
            data: NoteMapper.toDTO(note),
        });

  } catch(error) {
    next(error)
  }
}

export const tagSearch = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
  try {
    const { query } = req.query;

    const noteService = new NoteService();
    const tags = await noteService.tagSearch(String(query))
    // console.log('-----?', tags)
    return new ResponseLib(req, res)
        .json({
            status: true,
            message: 'Tags searched Successfully',
            data: tags?.map((t: any) => TagMapper.toDTO(t)),
        });

  } catch(error) {
    next(error)
  }
}