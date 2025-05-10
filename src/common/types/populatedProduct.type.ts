import { BrandDocument } from './../../DB/models/brand.model';
import { CartDocument } from './../../DB/models/cart.model';
import { CategoryDocument } from './../../DB/models/category.model';
import { ProductDocument } from './../../DB/models/product.model';
import { SubCategoryDocument } from './../../DB/models/subCategory.model';

export type ProductWithPopulatedRefs = Omit<
  ProductDocument,
  'brand' | 'category'
> & {
  brand: BrandDocument;
  category: CategoryDocument;
  sub_category?: SubCategoryDocument;
};

export type CartWithPopulatedProducts = Omit<CartDocument, 'products'> & {
  products: {
    product: ProductWithPopulatedRefs; // Populated Product object
    quantity: number;
  }[];
};
