
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  origin: string;
  notes: string[];
  roastLevel: 'Light' | 'Medium' | 'Dark';
  imageUrl: string;
  category: 'Coffee' | 'Equipment' | 'Merch';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RecommendationRequest {
  preference: string;
}
