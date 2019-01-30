import Categories from '../entity/categories';
import { selectAllCategories, selectOneCategory } from '../models/categories';

export async function getCategories() : Promise<Categories[]> {
  try {
    return await selectAllCategories();
  } catch {
    throw new Error();
  }
}

export async function getCategory(id: number) : Promise<Categories> {
  try {
    return await selectOneCategory(id);
  } catch {
    throw new Error();
  }
}