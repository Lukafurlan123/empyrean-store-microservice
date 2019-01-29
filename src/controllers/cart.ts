import { Cart } from "../interfaces";
import { Request, Response} from 'express';

export async function submitCart(request : Request, response : Response) {
  try {
    const { products, options } : Cart.POST.Cart = <Cart.POST.Cart> request.body;
  } catch {

  }
}