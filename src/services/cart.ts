import Products from "../entity/products";
import uuid from 'uuid';
import { Cart } from "../interfaces";
import { selectOneProduct } from "../models/products";
import { Payment } from 'typescript-g2apay-integration-api/src/interfaces';
import Discounts from "../entity/discounts";
import { selectOneDiscount } from "../models/discounts";

export async function getDiscountPercentage(discuntCode: string) : Promise<number> {
  try {
    const discount : Discounts = await selectOneDiscount(discuntCode);
    return discount.percentage;
  } catch {
    return 0;
  }
}

export async function filterProducts(products: Cart.POST.Product[]) : Promise<Cart.POST.Product[]> {
  const results : boolean[] = await Promise.all(products.map(async (product) : Promise<boolean> => {
    try {
      await selectOneProduct(product.product_id);
      return true;
    } catch {
      return false;
    }
  }));
  return products.filter((product, index) => {
    return results[index];
  });
}

export async function transformProducts(products: Cart.POST.Product[], discountPercentage?: number) : Promise<Payment.Item[]> {
  try {
    products = await filterProducts(products);
    if(products.length === 0) {
      throw new Error();
    }
    return await Promise.all(products.map(async (product) : Promise<Payment.Item> => {
      const selectedProduct : Products = await selectOneProduct(product.product_id);

      let discount : number = 0;

      if(discountPercentage) {
        discount = discountPercentage;
      }

      let discountedPrice = selectedProduct.price - ((selectedProduct.price / 100) * discount);

      return {
        sku: uuid.v4(),
        name: selectedProduct.name,
        amount: product.product_amount * discountedPrice,
        qty: product.product_amount,
        extra: selectedProduct.description,
        id: selectedProduct.id + '',
        price: discountedPrice,
        url: 'http://localhost.com'
      }
    }));
  } catch {
    throw new Error();
  }
}