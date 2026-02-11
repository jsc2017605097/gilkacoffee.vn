
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cà phê Ethiopia Yirgacheffe',
    price: 450000,
    description: 'Một dòng Yirgacheffe sơ chế ướt cổ điển với độ chua sáng và hương hoa nhài thanh khiết.',
    origin: 'Ethiopia',
    notes: ['Hoa nhài', 'Chanh', 'Quả đào'],
    roastLevel: 'Light',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '2',
    name: 'Cà phê Colombia Huila Reserva',
    price: 420000,
    description: 'Hương chocolate đậm đà với hậu vị anh đào nhẹ nhàng. Cân bằng hoàn hảo.',
    origin: 'Colombia',
    notes: ['Chocolate đen', 'Anh đào', 'Caramel'],
    roastLevel: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '3',
    name: 'Cà phê Brazil Santos NY2',
    price: 350000,
    description: 'Độ chua thấp, độ ngọt cao. Sự lựa chọn tinh túy để làm nền cho Espresso.',
    origin: 'Brazil',
    notes: ['Hạt dẻ', 'Ca cao', 'Vanilla'],
    roastLevel: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '4',
    name: 'Cà phê Sumatra Mandheling',
    price: 480000,
    description: 'Hương vị đất, cay nồng và đậm đà. Một trải nghiệm phức hợp cho những người sành sỏi.',
    origin: 'Indonesia',
    notes: ['Vị đất', 'Thuốc lá', 'Gia vị'],
    roastLevel: 'Dark',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    category: 'Coffee'
  },
  {
    id: '5',
    name: 'Phễu lọc sứ V60 Ceramic',
    price: 850000,
    description: 'Phễu lọc gốm Hario V60 biểu tượng cho phương pháp pour-over sạch và đậm vị.',
    origin: 'Nhật Bản',
    notes: ['Gốm trắng', 'Size 02'],
    roastLevel: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1544787210-2213d24ea602?q=80&w=800&auto=format&fit=crop',
    category: 'Equipment'
  },
  {
    id: '6',
    name: 'Ly sứ Gilka Signature',
    price: 320000,
    description: 'Ly sứ nhám tối giản với logo dập chìm tinh tế của chúng tôi.',
    origin: 'Nghệ nhân địa phương',
    notes: ['Đen nhám', '350ml'],
    roastLevel: 'Light',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?q=80&w=800&auto=format&fit=crop',
    category: 'Merch'
  }
];

export const NAVIGATION_LINKS = [
  { name: 'Cửa hàng', href: '#/shop' },
  { name: 'Đăng ký định kỳ', href: '#/subscription' },
  { name: 'Câu chuyện', href: '#/story' },
  { name: 'Hướng dẫn pha', href: '#/guides' },
];
