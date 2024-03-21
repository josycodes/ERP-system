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
const MediaFile_entity_1 = require("../db/entities/MediaFile.entity");
const datasource_config_1 = require("../db/datasource.config");
const Logger_Lib_1 = __importDefault(require("../libs/Logger.Lib"));
class MediaService {
    constructor() { }
    ;
    /**
     * Create a new media file
     * @param data
     */
    createMedia(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = new MediaFile_entity_1.MediaFile();
            media.user_id = data.user_id;
            media.lead_id = data.lead_id;
            media.name = data.name;
            media.url = data.url;
            Logger_Lib_1.default.log('insert', { MediaFile: MediaFile_entity_1.MediaFile, data });
            return yield datasource_config_1.ClientDataSource.getRepository(MediaFile_entity_1.MediaFile).save(media);
        });
    }
    getAllMediaByLeadId(lead_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield datasource_config_1.ClientDataSource.getRepository(MediaFile_entity_1.MediaFile).find({
                where: { lead_id: lead_id },
                relations: ["user", "lead"] // Assuming "user" and "lead" are the relations defined in your MediaFile entity
            });
        });
    }
}
exports.default = MediaService;
