import { getConnection, Connection } from 'typeorm';
import Categories from '../entity/categories';

export async function selectAllCategories() : Promise<Categories[]> {
  try {
    const connection : Connection = await getConnection();
    const productCategories : Categories[] = await connection
      .createQueryBuilder()
      .select('categories')
      .from(Categories, 'categories')
      .getMany();

    return productCategories;
  } catch {
    throw new Error();
  }
}

export async function selectOneCategory(id: number) : Promise<Categories> {
  try {
    const connection : Connection = await getConnection();
    const productCategory : Categories | undefined = await connection
      .createQueryBuilder()
      .select('categories')
      .from(Categories, 'categories')
      .where('id = :id', { id: id })
      .getOne();

    if(productCategory === undefined) {
      throw new Error();
    } else {
      return productCategory;
    }
  } catch {
    throw new Error();
  }
}