
import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Quick Add Overlay */}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 p-3 bg-stone-900 text-white rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-700 shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-medium text-stone-900 mb-1 serif">{product.name}</h3>
            <p className="text-xs text-stone-500 uppercase tracking-widest">{product.origin}</p>
          </div>
          <span className="text-lg font-medium text-stone-900">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
        </div>
        
        <p className="text-sm text-stone-600 mb-4 line-clamp-2 font-light italic">
          "{product.description}"
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {product.notes.map((note) => (
            <span 
              key={note} 
              className="px-2 py-1 bg-stone-50 text-stone-500 text-[10px] uppercase tracking-wider rounded border border-stone-100"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
