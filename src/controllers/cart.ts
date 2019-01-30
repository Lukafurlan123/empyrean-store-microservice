import { Cart } from "../interfaces";
import { Request, Response} from 'express';
import { Payment } from 'typescript-g2apay-integration-api/src/interfaces';
import { getDiscountPercentage, transformProducts } from "../services/cart";

export async function submitCart(request : Request, response : Response) {
  try {
    const { products, options } : Cart.POST.Cart = <Cart.POST.Cart> request.body;
    const discountPercentage : number = options.discount_code ? await getDiscountPercentage(options.discount_code) : 0;
    const items : Payment.Item[] = await transformProducts(products, discountPercentage);

  } catch {

  }
}