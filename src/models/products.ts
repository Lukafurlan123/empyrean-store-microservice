import Products from "../entity/products";
import { Connection, getConnection } from "typeorm";

export async function selectAllProducts() : Promise<Products[]> {
  try {
    const connection : Connection = await getConnection();
    const products : Products[] = await connection
      .createQueryBuilder()
      .select('products')
      .from(Products, 'products')
      .getMany();
    return products;
  } catch {
    throw new Error();
  }
}

export async function selectOneProduct(id: number) : Promise<Products> {
  try {
    const connection : Connection = await getConnection();
    const products : Products | undefined = await connection
      .createQueryBuilder()
      .select('products')
      .from(Products, 'products')
      .where('id = :id', { id: id })
      .getOne();

    if(products === undefined) {
      throw new Error();
    } else {
      return products;
    }
  } catch {
    throw new Error();
  }
}
