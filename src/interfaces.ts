import { Payment } from "typescript-g2apay-integration-api/src/interfaces";

export namespace Cart {
  export namespace POST {
    export interface Product {
      product_id: number;
      product_amount: number;
    }
    export interface Options {
      discount_code?: string;
    }
    export interface Cart {
      products: Product[];
      options: Options;
    }
    export interface ProcessedCart {
      items: Payment.Item[],
      total_price : string,
    }
  }
}