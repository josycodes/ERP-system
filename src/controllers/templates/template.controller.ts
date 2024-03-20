import express from 'express';
import { ITemplateCreateRequest } from '../../interfaces/requests/templates.request.interface';
import { BadRequest } from '../../libs/Error.Lib';
import ResponseLib from '../../libs/Response.Lib';
import { IRequestQuery } from '../../interfaces/requests/request.interface';
import UtilsService from '../../services/Utils.Service';
import UserMapper from '../../mappers/User.Mapper';
import TagMapper from '../../mappers/Tag.Mapper';
import TemplateService from "../../services/Template.service";
import TemplateMapper from "../../mappers/Template.Mapper";
import TemplateTagMapper from "../../mappers/TemplateTag.Mapper";

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const body: ITemplateCreateRequest = req.body;
        const user = req.user;

        const data = await new TemplateService().createTemplate(body, user.id);

        return new ResponseLib(req, res).status(201).json({
            status: true,
            message: "Template created successfully.",
            data: {
                ...TemplateMapper.toDTO(data.template),
                tags: data?.tags ? data?.tags.map(t => TemplateTagMapper.toDTO(t)) : null
            }
        })

    } catch (error) {
        next(error)
    }
}

export const list = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { page, limit, from, to, search }: IRequestQuery = req.query;

        const templateService = new TemplateService();
        const templates = await templateService.allTemplates(search, Number(page), Number(limit), from, to);
        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Templates Loaded Successfully',
                data: templates.items.map(note => TemplateMapper.toDTO(note)),
                meta: UtilsService.paginate(req.query, templates)
            });
    } catch(error) {
        next(error)
    }
}

export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { template_id } = req.params;
        const user = req.user;

        const templateService = new TemplateService();
        const template = await templateService.getOne(Number(template_id), user.id)
        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Template Loaded Successfully',
                data: TemplateMapper.toDTO(template),
            });

    } catch(error) {
        next(error)
    }
}


export const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { template_id } = req.params;
        const user = req.user;
        const data = req.body;

        const templateService = new TemplateService();
        const note = await templateService.updateTemplate(Number(template_id), user.id, data)
        return new ResponseLib(req, res)
            .json({
                status: true,
                message: 'Template updated Successfully',
                data: TemplateMapper .toDTO(note),
            });

    } catch(error) {
        next(error)
    }
}

export const tagSearch = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { query } = req.query;

        const templateService = new TemplateService();
        const tags = await templateService.tagSearch(String(query))
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