export interface IStripeLineItems {
  product_data: {
    name: string;
    images: string[];
    unit_amount: number;
  };
  quantity: number;
}
