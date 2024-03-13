import { MediaFile } from "../db/entities/MediaFile.entity";

export default class MediaMapper {
    public static toDTO(media: MediaFile) {
        return {
            id: media.id,
            name: media.name,
            description: media.description ? null : media.description,
            object_key: media.object_key ? null : media.object_key,
            url: media.url,
            user:  media.user ? {
                id: media.user.id,
                email: media.user.email,
                first_name: media.user.first_name,
                last_name: media.user.last_name,
                status: media.user.status,
                picture: media.user.profile_picture
                    ? {
                        id: media.user.profile_picture.id,
                        name: media.user.profile_picture.name,
                        description: media.user.profile_picture.description,
                        url: media.user.profile_picture.url,
                    }
                    : null,
                created_on: media.user.meta?.created_on
            } : null,
            created_on: media.meta?.created_on
        }
    }
}