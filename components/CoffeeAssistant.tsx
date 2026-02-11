
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { getCoffeeRecommendation } from '../services/geminiService';

const CoffeeAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');
    const result = await getCoffeeRecommendation(input);
    setResponse(result || '');
    setLoading(false);
  };

  return (
    <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800 rounded-full blur-3xl -mr-48 -mt-48 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-800 rounded-full blur-3xl -ml-48 -mb-48 opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 border border-stone-700 rounded-full text-stone-400 text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-amber-400" />
            AI Coffee Concierge
          </div>
          <h2 className="text-4xl md:text-5xl font-light serif mb-4">Find your perfect brew.</h2>
          <p className="text-stone-400 font-light text-lg">
            Describe how you like your coffee (e.g., "bright and fruity" or "rich and dark") and let our AI assistant suggest the best match for you.
          </p>
        </div>

        <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 p-6 md:p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me about your coffee preferences..."
              className="flex-grow bg-stone-900 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-600 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-stone-900 px-8 py-4 rounded-xl font-semibold hover:bg-stone-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Analyze</>}
            </button>
          </form>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-stone-500 animate-pulse">
              <Bot className="w-12 h-12 mb-4" />
              <p>Consulting our head roaster...</p>
            </div>
          )}

          {response && !loading && (
            <div className="bg-stone-900/80 border border-stone-700 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-800 rounded-lg">
                  <Bot className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-stone-300 uppercase tracking-widest text-xs">Gilka's Recommendation</h4>
                  <div className="text-stone-100 font-light leading-relaxed whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoffeeAssistant;
