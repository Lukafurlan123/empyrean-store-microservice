import { Request, Response} from 'express';
import { transformProducts, getDiscountPercentage } from '../services/cart';

export default async function index(request : Request, response : Response) {
    response.status(200);
    try {
        const products = await transformProducts([{product_id: 1, product_amount: 2}, {product_id: 2, product_amount: 3}])
        const discountPercentage = await getDiscountPercentage("50OFF");
        response.send(
            { percentage: discountPercentage }
        );
    } catch {
        response.send({message: 'failed'})
    }
}