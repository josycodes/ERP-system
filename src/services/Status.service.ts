import { Status } from "../db/entities/Status.entity";
import { ClientDataSource} from "../db/datasource.config";

import 'dotenv/config';

export default class StatusService {
    constructor() {};

    /**
     * Get all leads
     */
    async allStatuses(): Promise<Status[]>{
        return await ClientDataSource.getRepository(Status).find();
    }
}

