import DBAdapter from "../adapters/DBAdapter";
import { Category } from "../db/entities/Category.entity";
import { IRequestQuery } from "../interfaces/requests/request.interface";

export default class UtilsService {
  static paginate(query: IRequestQuery, result: { items: any[], total: number }) {
    return {
      limit: query.limit, total: result.total, page: query.page,
      pages: Math.ceil(Number(result.total) / Number(query.limit))
    }
  }

  static async getCategories() {
    return await new DBAdapter().find(Category, { where: { meta: { deleted_flag: false }}});
  }
}