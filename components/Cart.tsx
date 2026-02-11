
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-stone-900 serif">Your Shopping Bag</h2>
                <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Your bag is currently empty.</p>
                    <button 
                      onClick={onClose}
                      className="mt-4 text-stone-900 underline underline-offset-4 hover:text-stone-600 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-8">
                    {items.map((item) => (
                      <li key={item.id} className="flex">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-stone-200 bg-stone-50">
                          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-stone-900">
                              <h3 className="serif">{item.name}</h3>
                              <p className="ml-4">${item.price * item.quantity}</p>
                            </div>
                            <p className="mt-1 text-sm text-stone-500">{item.origin}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border border-stone-200 rounded">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="p-1 text-stone-500 hover:text-stone-900"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-2 font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="p-1 text-stone-500 hover:text-stone-900"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="font-medium text-stone-400 hover:text-stone-600 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="border-t border-stone-200 py-6 px-4 sm:px-6 bg-stone-50">
                <div className="flex justify-between text-base font-medium text-stone-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-stone-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button className="w-full flex justify-center items-center px-6 py-4 border border-transparent bg-stone-900 text-base font-medium text-white shadow-sm hover:bg-stone-800 transition-all uppercase tracking-widest">
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
