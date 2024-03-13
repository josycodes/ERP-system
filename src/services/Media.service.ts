import {MediaFile} from "../db/entities/MediaFile.entity";
import {ClientDataSource} from "../db/datasource.config";
import {MediaCreateData} from "../interfaces/media.interface";
import LoggerLib from "../libs/Logger.Lib";

export default class MediaService {
    constructor() { };

    /**
     * Create a new media file
     * @param data
     */
    async createMedia(data: MediaCreateData): Promise<MediaFile> {
        const media = new MediaFile();
        media.user_id = data.user_id;
        media.lead_id = data.lead_id;
        media.name = data.name;
        media.url = data.url;

        LoggerLib.log('insert', { MediaFile, data });
        return await ClientDataSource.getRepository(MediaFile).save(media);
    }

    async getAllMediaByLeadId(lead_id: number): Promise<MediaFile[]> {
        return await ClientDataSource.getRepository(MediaFile).find({
            where: {lead_id: lead_id},
            relations: ["user", "lead"] // Assuming "user" and "lead" are the relations defined in your MediaFile entity
        });
    }

}
