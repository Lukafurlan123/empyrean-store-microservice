import Products from "../entity/products";
import { selectAllProducts, selectOneProduct } from "../models/products";

export async function getProducts() : Promise<Products[]> {
  try {
    return await selectAllProducts();
  } catch {
    throw new Error();
  }
}

export async function getProduct(id: number) : Promise<Products> {
  try {
    return await selectOneProduct(id);
  } catch {
    throw new Error();
  }
} 