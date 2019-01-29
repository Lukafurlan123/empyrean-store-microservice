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
  }
}