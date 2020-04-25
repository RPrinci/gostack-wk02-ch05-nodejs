import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async all(): Promise<Category[]> {
    const categories = await this.find();
    return categories;
  }

  public async findByTitle(title: string): Promise<Category> {
    let category = await this.findOne({
      where: { title },
    });

    if (!category) {
      const newCategory = this.create({
        title,
      });

      category = await this.save(newCategory);
    }

    return category;
  }
}

export default CategoriesRepository;
