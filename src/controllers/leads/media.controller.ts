import express from 'express';
import ResponseLib from '../../libs/Response.Lib';
import MediaService from '../../services/Media.service';
import CloudinaryService from '../../services/Cloudinary.service';
import MediaMapper from "../../mappers/Document.Mapper";
import LeadService from "../../services/Leads.service";
import {BadRequest} from "../../libs/Error.Lib";
import LeadMapper from "../../mappers/Lead.Mapper";
import UtilsService from "../../services/Utils.Service";


export const documentUpload = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { lead_id } = req.params;
    const leadService = new LeadService();
    const mediaService = new MediaService();
    try {
        //get lead
        const lead = await leadService.findLeadById(parseInt(lead_id));
        if (!lead) throw new BadRequest('Lead not found.');
        const file = req.file as any;
        //upload to cloudinary
        if (file && file.filepath) {
            const uploaded_document_url = await CloudinaryService.uploadFile(file.filepath, {
                upload_preset: process.env.CLOUDINARY_LEAD_DOCUMENT_PRESET,
                public_id: file.originalFilename,
                overwrite: true
            });

            //save to database
            const media = await mediaService.createMedia({
                user_id: req.user.id,
                lead_id: lead.id,
                name: file.originalFilename,
                url: uploaded_document_url
            });

            return new ResponseLib(req, res)
                .status(201)
                .json({
                    status: true,
                    message: 'Document Created Successfully',
                    data: MediaMapper.toDTO(media)
                });

        }else{
            throw new BadRequest('Document not uploaded.');
        }


    } catch (error) {
        next(error)
    }
}

export const allLeadDocuments = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { lead_id } = req.params;
    const leadService = new LeadService();
    const mediaService = new MediaService();
    try {
        //get lead
        const lead = await leadService.findLeadById(parseInt(lead_id));
        if (!lead) throw new BadRequest('Lead not found.')

           //get all documents
        const documents = await mediaService.getAllMediaByLeadId(lead.id);
        if (documents === null){
            return new ResponseLib(req, res)
                .status(200)
                .json({
                    status: true,
                    message: 'No Documents Found',
                    data: []
                });
        }else{
            const documentsDTO = await Promise.all(documents.map(async (media) => {
                return MediaMapper.toDTO(media);
            }));
            return new ResponseLib(req, res)
                .status(201)
                .json({
                    status: true,
                    message: 'Documents Loaded Successfully',
                    data: documentsDTO
                });
        }

    } catch (error) {
        next(error)
    }
}
