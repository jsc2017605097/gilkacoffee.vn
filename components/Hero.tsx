
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
          alt="Quy trình rang cà phê" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 serif leading-tight">
          Cà phê Đặc sản,<br />Rang bằng Tâm huyết.
        </h1>
        <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Từ những nông trại trên cao nguyên Ethiopia đến xưởng rang nhỏ trong thành phố, chúng tôi mang đến cho bạn những hạt cà phê theo mùa tốt nhất.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#/shop" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-stone-900 font-medium hover:bg-stone-100 transition-all uppercase tracking-widest text-sm"
          >
            Mua ngay bộ sưu tập
          </a>
          <a 
            href="#/subscription" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-all uppercase tracking-widest text-sm"
          >
            Đăng ký & Tiết kiệm
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-white/60 mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;
