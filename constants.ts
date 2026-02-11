
import { Product } from './types';
import productsContent from './content/products.json';
import navigationContent from './content/navigation.json';

export const PRODUCTS: Product[] = productsContent.products as Product[];

export const NAVIGATION_LINKS = navigationContent.navigation;
