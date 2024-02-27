import express from 'express';
import ResponseLib from '../../libs/Response.Lib';
import StatusService from '../../services/Status.service';
import StatusMapper from "../../mappers/Status.Mapper";

/**
 * Get all leads
 * @param req
 * @param res
 * @param next
 */
export const allStatuses = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusService = new StatusService();

    try {
        // Get all Statuses
        const statuses = await statusService.allStatuses();
        const statusDTO = await Promise.all(statuses.map(async (status) => {
            return await StatusMapper.toDTO(status);
        }));

        return new ResponseLib(req, res)
            .json({
                message: 'Leads Loaded Successfully',
                data: statusDTO
            });
    } catch (error) {
        next(error)
    }
}