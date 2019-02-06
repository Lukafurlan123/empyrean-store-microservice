import Discounts from '../entity/discounts';
import { Request, Response} from 'express';
import { selectOneDiscount } from '../models/discounts';

export async function discount(request : Request, response : Response) {
  try {
    const discount : Discounts = await selectOneDiscount(request.params.name);
    response.status(200);
    response.send(discount);
  } catch {
    response.status(400);
    response.send();
  }
}