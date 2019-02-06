import uuid from 'uuid';
import { API_SECRET, API_HASH } from '../conf';
import { Cart } from "../interfaces";
import { Request, Response} from 'express';
import { createPaymentHash, generatePaymentRequest } from 'typescript-g2apay-integration-api';
import { Payment } from 'typescript-g2apay-integration-api/src/interfaces';
import { EnvironmentType } from 'typescript-g2apay-integration-api/src/enums'
import { getDiscountPercentage, transformProducts } from "../services/cart";

export async function submitCart(request : Request, response : Response) {
  try {
    const { products, options } : Cart.POST.Cart = <Cart.POST.Cart> request.body;

    const discountPercentage : number = options.discount_code ? await getDiscountPercentage(options.discount_code) : 0;
    const processedCart : Cart.POST.ProcessedCart = await transformProducts(products, discountPercentage);
    const orderId : string = uuid.v4();
    const paymentHash : string = await createPaymentHash(orderId, processedCart.total_price, 'USD', API_SECRET);

    const paymentRequest : Payment.PaymentRequest = {
      api_hash: API_HASH,
      hash: paymentHash,
      items: JSON.stringify(processedCart.items),
      order_id: orderId,
      amount: processedCart.total_price,
      currency: 'USD',
      customer_ip_address: '127.0.0.1',
      url_failure: 'https://empyrean.ps',
      url_ok: 'https://empyrean.ps',
    }

    const paymentToken : string = await generatePaymentRequest(paymentRequest, EnvironmentType.SANDBOX);
  } catch {
    response.status(400);
    response.send();
  }
}