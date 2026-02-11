
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CoffeeAssistant from './components/CoffeeAssistant';
import Cart from './components/Cart';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { MapPin, Instagram, Twitter, Mail, Facebook } from 'lucide-react';
import siteContent from './content/site.json';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');

  const categories = ['Tất cả', 'Cà phê', 'Dụng cụ', 'Phụ kiện'];
  
  const categoryMap: Record<string, string> = {
    'Tất cả': 'All',
    'Cà phê': 'Coffee',
    'Dụng cụ': 'Equipment',
    'Phụ kiện': 'Merch'
  };

  const filteredProducts = activeCategory === 'Tất cả' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === categoryMap[activeCategory]);

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

  const { site, sections } = siteContent;

  // Đồng bộ <title> của tab với cấu hình trong content/site.json
  useEffect(() => {
    if (site?.site?.title) {
      document.title = site.site.title;
    }
  }, []);

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
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 serif mb-4">
                {sections.featured.title}
              </h2>
              <p className="text-stone-500 max-w-xl font-light italic">
                {sections.featured.subtitle}
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
                src={sections.story.image}
                alt="Nông dân cà phê" 
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-stone-100 -z-10"></div>
            </div>
            <div className="space-y-8">
              <span className="text-stone-400 uppercase tracking-[0.3em] text-sm">
                {sections.story.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 serif leading-tight">
                {sections.story.title}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                {sections.story.body}
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                {sections.story.highlights.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-stone-900 mb-2">{item.title}</h4>
                    <p className="text-stone-500 text-sm font-light">{item.body}</p>
                  </div>
                ))}
              </div>
              <button className="inline-block border-b border-stone-900 pb-1 font-medium hover:text-stone-500 transition-colors uppercase tracking-widest text-sm">
                {sections.story.cta.label}
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 bg-stone-50 border-t border-stone-100 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-10 h-10 text-stone-400 mx-auto mb-6" />
            <h2 className="text-3xl font-light serif text-stone-900 mb-4">
              {sections.newsletter.title}
            </h2>
            <p className="text-stone-500 mb-8 font-light">
              {sections.newsletter.body}
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder={sections.newsletter.placeholder}
                className="flex-grow bg-white border border-stone-200 px-6 py-4 focus:outline-none focus:ring-1 focus:ring-stone-400 transition-all"
              />
              <button className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-all">
                {sections.newsletter.ctaLabel}
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
              {sections.footer.brandTagline}
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-stone-900 mb-6 uppercase tracking-widest text-xs">
              {sections.footer.shopColumn.title}
            </h5>
            <ul className="space-y-4 text-sm text-stone-500 font-light">
              {sections.footer.shopColumn.links.map((label, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-stone-900">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-6 uppercase tracking-widest text-xs">
              {sections.footer.supportColumn.title}
            </h5>
            <ul className="space-y-4 text-sm text-stone-500 font-light">
              {sections.footer.supportColumn.links.map((label, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-stone-900">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-stone-900 mb-6 uppercase tracking-widest text-xs">
              {sections.footer.visitUs.title}
            </h5>
            <div className="flex items-start gap-2 text-sm text-stone-500 font-light">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                {sections.footer.visitUs.addressLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs">
            {sections.footer.legal.copyright}
          </p>
          <div className="flex gap-6 text-xs text-stone-400">
            {sections.footer.legal.links.map((label, index) => (
              <a key={index} href="#" className="hover:text-stone-900">
                {label}
              </a>
            ))}
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
