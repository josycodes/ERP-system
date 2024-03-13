import { LeadCategory } from '../db/entities/LeadCategory';

export default class LeadCategoryMapper {
  public static toDTO(category: LeadCategory) {
    return {
      id: category.id,
      name: category.name,
    }
  }
}
