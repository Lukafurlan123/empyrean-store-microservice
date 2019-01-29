import Products from "../entity/products";
import uuid from 'uuid';
import { Cart } from "../interfaces";
import { selectOneProduct } from "../models/products";
import { Payment } from 'typescript-g2apay-integration-api/src/interfaces'

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

export async function transformProducts(products: Cart.POST.Product[]) : Promise<Payment.Item[]> {
  try {
    products = await filterProducts(products);
    if(products.length === 0) {
      throw new Error();
    }
    return await Promise.all(products.map(async (product) : Promise<Payment.Item> => {
      const selectedProduct : Products = await selectOneProduct(product.product_id);
      return {
        sku: uuid.v4(),
        name: selectedProduct.name,
        amount: product.product_amount * selectedProduct.price,
        qty: product.product_amount,
        extra: selectedProduct.description,
        id: selectedProduct.id + '',
        price: selectedProduct.price,
        url: 'http://localhost.com'
      }
    }));
  } catch {
    throw new Error();
  }
}