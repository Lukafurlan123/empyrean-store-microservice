import Products from "../entity/products";
import { Request, Response} from 'express';
import { getProducts, getProduct } from "../services/products";

export async function products(request : Request, response : Response) {
  try {
    const products : Products[] = await getProducts();
    response.status(200);
    response.send(products);
  } catch {
    response.status(400);
    response.send();
  }
}

export async function product(request : Request, response : Response) {
  try {
    const product : Products = await getProduct(request.params.id);
    response.status(200);
    response.send(product);
  } catch {
    response.status(400);
    response.send();
  }
}