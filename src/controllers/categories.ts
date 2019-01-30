import Categories from '../entity/categories';
import { Request, Response} from 'express';
import { getCategories, getCategory } from '../services/categories';

export async function categories(request : Request, response : Response) {
  try {
    const categories : Categories[] = await getCategories();
    response.status(200);
    response.send(categories);
  } catch {
    response.status(400);
  }
}

export async function category(request : Request, response : Response) {
  try {
    const category : Categories = await getCategory(request.params.id);
    response.status(200);
    response.send(category);
  } catch {
    response.status(400);
  }
}