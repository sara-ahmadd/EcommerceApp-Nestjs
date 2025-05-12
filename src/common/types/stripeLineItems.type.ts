export interface IStripeLineItems {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      images: string[];
    };
  };
  quantity: number;
}
