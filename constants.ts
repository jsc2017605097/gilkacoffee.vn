
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    price: 24,
    description: 'A classic washed Yirgacheffe with bright acidity and floral jasmine notes.',
    origin: 'Ethiopia',
    notes: ['Jasmine', 'Lemon', 'Peach'],
    roastLevel: 'Light',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '2',
    name: 'Colombia Huila Reserva',
    price: 22,
    description: 'Rich chocolate body with a subtle cherry finish. Perfectly balanced.',
    origin: 'Colombia',
    notes: ['Dark Chocolate', 'Cherry', 'Caramel'],
    roastLevel: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '3',
    name: 'Brazil Santos NY2',
    price: 18,
    description: 'Low acidity, high sweetness. The quintessential espresso base.',
    origin: 'Brazil',
    notes: ['Nutty', 'Cocoa', 'Vanilla'],
    roastLevel: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '4',
    name: 'Sumatra Mandheling',
    price: 26,
    description: 'Earthy, spicy, and heavy-bodied. A complex cup for adventurous drinkers.',
    origin: 'Indonesia',
    notes: ['Earth', 'Tobacco', 'Spice'],
    roastLevel: 'Dark',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '5',
    name: 'V60 Ceramic Dripper',
    price: 35,
    description: 'The iconic Hario V60 ceramic dripper for clean, flavorful pour-overs.',
    origin: 'Japan',
    notes: ['White Ceramic', 'Size 02'],
    roastLevel: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1544787210-2213d24ea602?q=80&w=800&auto=format&fit=crop',
    category: 'Equipment'
  },
  {
    id: '6',
    name: 'Gilka Signature Mug',
    price: 15,
    description: 'Minimalist matte stoneware mug with our subtle embossed logo.',
    origin: 'Local Artisans',
    notes: ['Matte Black', '350ml'],
    roastLevel: 'Light',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?q=80&w=800&auto=format&fit=crop',
    category: 'Merch'
  }
];

export const NAVIGATION_LINKS = [
  { name: 'Shop All', href: '#/shop' },
  { name: 'Subscription', href: '#/subscription' },
  { name: 'Our Story', href: '#/story' },
  { name: 'Brew Guides', href: '#/guides' },
];
