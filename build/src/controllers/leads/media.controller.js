"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLeadDocuments = exports.documentUpload = void 0;
const Response_Lib_1 = __importDefault(require("../../libs/Response.Lib"));
const Media_service_1 = __importDefault(require("../../services/Media.service"));
const Cloudinary_service_1 = __importDefault(require("../../services/Cloudinary.service"));
const Document_Mapper_1 = __importDefault(require("../../mappers/Document.Mapper"));
const Leads_service_1 = __importDefault(require("../../services/Leads.service"));
const Error_Lib_1 = require("../../libs/Error.Lib");
const documentUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lead_id } = req.params;
    const leadService = new Leads_service_1.default();
    const mediaService = new Media_service_1.default();
    try {
        //get lead
        const lead = yield leadService.findLeadById(parseInt(lead_id));
        if (!lead)
            throw new Error_Lib_1.BadRequest('Lead not found.');
        const file = req.file;
        //upload to cloudinary
        if (file && file.filepath) {
            const uploaded_document_url = yield Cloudinary_service_1.default.uploadFile(file.filepath, {
                upload_preset: process.env.CLOUDINARY_LEAD_DOCUMENT_PRESET,
                public_id: file.originalFilename,
                overwrite: true
            });
            //save to database
            const media = yield mediaService.createMedia({
                user_id: req.user.id,
                lead_id: lead.id,
                name: file.originalFilename,
                url: uploaded_document_url
            });
            return new Response_Lib_1.default(req, res)
                .status(201)
                .json({
                status: true,
                message: 'Document Created Successfully',
                data: Document_Mapper_1.default.toDTO(media)
            });
        }
        else {
            throw new Error_Lib_1.BadRequest('Document not uploaded.');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.documentUpload = documentUpload;
const allLeadDocuments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lead_id } = req.params;
    const leadService = new Leads_service_1.default();
    const mediaService = new Media_service_1.default();
    try {
        //get lead
        const lead = yield leadService.findLeadById(parseInt(lead_id));
        if (!lead)
            throw new Error_Lib_1.BadRequest('Lead not found.');
        //get all documents
        const documents = yield mediaService.getAllMediaByLeadId(lead.id);
        if (documents === null) {
            return new Response_Lib_1.default(req, res)
                .status(200)
                .json({
                status: true,
                message: 'No Documents Found',
                data: []
            });
        }
        else {
            const documentsDTO = yield Promise.all(documents.map((media) => __awaiter(void 0, void 0, void 0, function* () {
                return Document_Mapper_1.default.toDTO(media);
            })));
            return new Response_Lib_1.default(req, res)
                .status(201)
                .json({
                status: true,
                message: 'Documents Loaded Successfully',
                data: documentsDTO
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.allLeadDocuments = allLeadDocuments;
