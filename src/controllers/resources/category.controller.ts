import express from 'express';
import ResponseLib from '../../libs/Response.Lib';
import LeadCategoryMapper from "../../mappers/LeadCategory.Mapper";
import UtilsService from '../../services/Utils.Service';

/**
 * Get all categories
 * @param req
 * @param res
 * @param next
 */
export const allCategories = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const category = await UtilsService.getCategories();
    return new ResponseLib(req, res)
      .json({
        message: 'Leads Loaded Successfully',
        data: category.map((c: any) => LeadCategoryMapper.toDTO(c))
      });
  } catch (error) {
    next(error)
  }
}
