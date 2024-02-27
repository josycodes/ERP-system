import { Status } from "../db/entities/Status.entity";

export default class StatusMapper {
    public static async toDTO(status: Status) {
        return {
            name: status.name,
            slug: status.slug,
        }
    }
}