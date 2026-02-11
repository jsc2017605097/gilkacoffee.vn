
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CoffeeAssistant from './components/CoffeeAssistant';
import Cart from './components/Cart';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { MapPin, Instagram, Twitter, Mail, Facebook } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Coffee', 'Equipment', 'Merch'];
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <section id="shop" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 serif mb-4">Our Curated Selection</h2>
              <p className="text-stone-500 max-w-xl font-light italic">
                Sustainably sourced, meticulously roasted, and delivered fresh to your door.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-sm uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>

        {/* AI Assistant Section */}
        <CoffeeAssistant />

        {/* Brand Values / Story */}
        <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1200&auto=format&fit=crop" 
                alt="Coffee farmer" 
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-stone-100 -z-10"></div>
            </div>
            <div className="space-y-8">
              <span className="text-stone-400 uppercase tracking-[0.3em] text-sm">Direct Trade Only</span>
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 serif leading-tight">
                Traceable from farm to cup.
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                At Gilka, we believe coffee is more than just a morning ritual. It's a complex agricultural product that supports millions of livelihoods. We work directly with producers in East Africa and South America, ensuring they receive premiums well above fair trade prices.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="font-semibold text-stone-900 mb-2">Seasonal Selection</h4>
                  <p className="text-stone-500 text-sm font-light">We roast in small batches to highlight the unique terroir of each harvest.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-2">Sustainable Packing</h4>
                  <p className="text-stone-500 text-sm font-light">100% compostable bags and recyclable shipping materials.</p>
                </div>
              </div>
              <button className="inline-block border-b border-stone-900 pb-1 font-medium hover:text-stone-500 transition-colors uppercase tracking-widest text-sm">
                Learn more about our mission
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 bg-stone-50 border-t border-stone-100 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-10 h-10 text-stone-400 mx-auto mb-6" />
            <h2 className="text-3xl font-light serif text-stone-900 mb-4">The Gilka Journal</h2>
            <p className="text-stone-500 mb-8 font-light">Subscribe for exclusive early access to micro-lot drops, brewing tutorials, and stories from the origin.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-white border border-stone-200 px-6 py-4 focus:outline-none focus:ring-1 focus:ring-stone-400 transition-all"
              />
              <button className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-stone-900 rounded-full"></div>
              <span className="text-xl font-bold tracking-tighter text-stone-900 serif">GILKA</span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed font-light mb-6">
              Elevating your coffee ritual through conscious sourcing and meticulous roasting.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-stone-900 mb-6 uppercase tracking-widest text-xs">Shop</h5>
            <ul className="space-y-4 text-sm text-stone-500 font-light">
              <li><a href="#" className="hover:text-stone-900">All Coffee</a></li>
              <li><a href="#" className="hover:text-stone-900">Subscriptions</a></li>
              <li><a href="#" className="hover:text-stone-900">Brewing Gear</a></li>
              <li><a href="#" className="hover:text-stone-900">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-6 uppercase tracking-widest text-xs">Support</h5>
            <ul className="space-y-4 text-sm text-stone-500 font-light">
              <li><a href="#" className="hover:text-stone-900">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-stone-900">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-stone-900">Wholesale</a></li>
              <li><a href="#" className="hover:text-stone-900">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-6 uppercase tracking-widest text-xs">Visit Us</h5>
            <div className="flex items-start gap-2 text-sm text-stone-500 font-light">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                123 Roastery Lane<br />
                Artisan District<br />
                Portland, OR 97201
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs">© 2024 Gilka Coffee Roastery. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-stone-400">
            <a href="#" className="hover:text-stone-900">Privacy Policy</a>
            <a href="#" className="hover:text-stone-900">Terms of Service</a>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
