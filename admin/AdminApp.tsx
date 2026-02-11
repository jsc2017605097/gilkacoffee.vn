import React, { useEffect, useState } from 'react';
import siteContentInitial from '../content/site.json';
import navigationInitial from '../content/navigation.json';
import productsInitial from '../content/products.json';
import { Product } from '../types';

type SiteContent = typeof siteContentInitial;
type NavigationContent = typeof navigationInitial;
type ProductsContent = typeof productsInitial;

interface ContentState {
  site: SiteContent;
  navigation: NavigationContent;
  products: ProductsContent;
}

const AdminApp: React.FC = () => {
  const [content, setContent] = useState<ContentState | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Trong môi trường dev (npm run dev với Vite), /api/content không phải là API thật,
    // nên ta dùng luôn dữ liệu local từ file JSON.
    if (import.meta.env.DEV) {
      setContent({
        site: siteContentInitial,
        navigation: navigationInitial,
        products: productsInitial,
      });
      setMessage('Đang dùng dữ liệu local (DEV mode). API GitHub chỉ hoạt động trên Vercel.');
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/content');
        if (!res.ok) throw new Error('Không thể tải dữ liệu');
        const data = await res.json();
        setContent(data);
      } catch (error) {
        console.error(error);
        // Fallback: dùng dữ liệu hiện tại trong repo nếu API chưa cấu hình
        setContent({
          site: siteContentInitial,
          navigation: navigationInitial,
          products: productsInitial,
        });
        setMessage('Đang dùng dữ liệu local (API chưa cấu hình hoặc lỗi).');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleFieldChange = (path: string[], value: any) => {
    if (!content) return;
    setContent((prev) => {
      if (!prev) return prev;
      const draft: any = structuredClone(prev);
      let cursor: any = draft;
      for (let i = 0; i < path.length - 1; i++) {
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = value;
      return draft;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Lưu thất bại');
      }
      setMessage('Lưu thành công! Hãy kiểm tra GitHub và đợi Vercel build lại.');
    } catch (error: any) {
      console.error(error);
      setMessage(`Lỗi khi lưu: ${error.message || 'Không xác định'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 text-stone-100">
        <p>Đang tải dữ liệu cấu hình...</p>
      </div>
    );
  }

  const { site, navigation, products } = content;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin – Cấu hình Gilka Coffee</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : 'Lưu & Commit lên GitHub'}
        </button>
      </header>

      {message && (
        <div className="px-6 py-3 text-sm bg-stone-900 border-b border-stone-800">
          {message}
        </div>
      )}

      <main className="px-6 py-6 space-y-8 max-w-5xl mx-auto">
        {/* Site */}
        <section className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Thông tin site</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Title</label>
              <input
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-sm"
                value={site.site.title}
                onChange={(e) => handleFieldChange(['site', 'site', 'title'], e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Favicon path</label>
              <input
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-sm"
                value={site.site.faviconPath}
                onChange={(e) => handleFieldChange(['site', 'site', 'faviconPath'], e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">Mô tả</label>
            <textarea
              className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-sm"
              rows={3}
              value={site.site.description}
              onChange={(e) => handleFieldChange(['site', 'site', 'description'], e.target.value)}
            />
          </div>
        </section>

        {/* Hero */}
        <section className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-xs uppercase text-stone-400 mb-1">Background image URL</label>
              <input
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-sm"
                value={site.hero.backgroundImage}
                onChange={(e) => handleFieldChange(['site', 'hero', 'backgroundImage'], e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Tiêu đề (dùng \\n để xuống dòng)</label>
              <textarea
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-sm"
                rows={3}
                value={site.hero.title}
                onChange={(e) => handleFieldChange(['site', 'hero', 'title'], e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Mô tả</label>
              <textarea
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-sm"
                rows={3}
                value={site.hero.subtitle}
                onChange={(e) => handleFieldChange(['site', 'hero', 'subtitle'], e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Products (only basic fields) */}
        <section className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Sản phẩm</h2>
          <p className="text-xs text-stone-400">
            (Phiên bản đơn giản – chỉnh sửa nhanh tên, giá, ảnh. Khi cần nâng cấp, có thể mở rộng sau.)
          </p>
          <div className="space-y-4">
            {products.products.map((p: Product, idx: number) => (
              <div key={p.id} className="border border-stone-800 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-stone-500">ID: {p.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-stone-800">
                    {p.category}
                  </span>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">Tên</label>
                    <input
                      className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs"
                      value={p.name}
                      onChange={(e) =>
                        handleFieldChange(['products', 'products', idx.toString(), 'name'], e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">Giá (VNĐ)</label>
                    <input
                      type="number"
                      className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs"
                      value={p.price}
                      onChange={(e) =>
                        handleFieldChange(
                          ['products', 'products', idx.toString(), 'price'],
                          Number(e.target.value || 0)
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">Ảnh</label>
                  <input
                    className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs"
                    value={p.imageUrl}
                    onChange={(e) =>
                      handleFieldChange(['products', 'products', idx.toString(), 'imageUrl'], e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminApp;


