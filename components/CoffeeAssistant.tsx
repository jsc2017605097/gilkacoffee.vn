
import React, { useState } from 'react';
import { Sparkles, Send, Bot } from 'lucide-react';

const CoffeeAssistant: React.FC = () => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Tính năng AI đã được tắt
  };

  return (
    <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800 rounded-full blur-3xl -mr-48 -mt-48 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-800 rounded-full blur-3xl -ml-48 -mb-48 opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 border border-stone-700 rounded-full text-stone-400 text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Trợ lý Cà phê AI
          </div>
          <h2 className="text-4xl md:text-5xl font-light serif mb-4">Tìm vị cà phê hoàn hảo.</h2>
          <p className="text-stone-400 font-light text-lg">
            Hãy mô tả khẩu vị của bạn (ví dụ: "chua thanh và hương trái cây" hoặc "đậm đà vị chocolate") để trợ lý AI của chúng tôi tìm ra lựa chọn tốt nhất.
          </p>
        </div>

        <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 p-6 md:p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bạn đang tìm kiếm hương vị cà phê như thế nào?..."
              className="flex-grow bg-stone-900 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-600 transition-all"
            />
            <button
              type="submit"
              disabled
              className="bg-stone-700 text-stone-400 px-8 py-4 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2 opacity-50"
            >
              <Send className="w-5 h-5" /> Phân tích
            </button>
          </form>

          <div className="bg-stone-900/80 border border-stone-700 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-stone-800 rounded-lg">
                <Bot className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-medium mb-2 text-stone-300 uppercase tracking-widest text-xs">Thông báo</h4>
                <p className="text-stone-100 font-light leading-relaxed">
                  Tính năng trợ lý AI tạm thời không khả dụng. Vui lòng tham khảo bộ sưu tập cà phê của chúng tôi ở trên để tìm sản phẩm phù hợp với khẩu vị của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeAssistant;
