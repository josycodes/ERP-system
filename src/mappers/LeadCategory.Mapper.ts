import { Category } from '../db/entities/Category.entity';

export default class LeadCategoryMapper {
  public static toDTO(category: Category) {
    return {
      id: category.id,
      name: category.name,
    }
  }
}
