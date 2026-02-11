import React, { useEffect, useState, CSSProperties } from 'react';
import siteContentInitial from '../content/site.json';
import navigationInitial from '../content/navigation.json';
import productsInitial from '../content/products.json';
import { Product } from '../types';
import { Settings, Home, Package, Save, Coffee, CheckCircle, XCircle, Loader2, ChevronRight } from 'lucide-react';

type SiteContent = typeof siteContentInitial;
type NavigationContent = typeof navigationInitial;
type ProductsContent = typeof productsInitial;

interface ContentState {
  site: SiteContent;
  navigation: NavigationContent;
  products: ProductsContent;
}

type Section = 'site' | 'hero' | 'products' | 'footer';

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const C = {
  bg:           '#F5F0EB',
  surface:      '#FFFFFF',
  border:       '#E8E0D8',
  borderFocus:  '#C8860A',
  text:         '#1C1917',
  textMuted:    '#78716C',
  textLight:    '#A8A29E',
  accent:       '#C8860A',
  accentLight:  '#FEF3C7',
  accentText:   '#92400E',
  green:        '#059669',
  greenBg:      '#ECFDF5',
  red:          '#DC2626',
  redBg:        '#FEF2F2',
  infoBg:       '#FFFBEB',
  infoText:     '#92400E',
};

/* ─── Shared Styles ──────────────────────────────────────────────────── */
const baseInput: CSSProperties = {
  width: '100%',
  padding: '9px 14px',
  border: `1.5px solid ${C.border}`,
  borderRadius: 8,
  background: '#FAFAF9',
  color: C.text,
  fontSize: 13,
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

const focusedInput: CSSProperties = {
  ...baseInput,
  borderColor: C.borderFocus,
  background: '#fff',
  boxShadow: `0 0 0 3px ${C.accentLight}`,
};

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: C.textMuted,
  marginBottom: 6,
};

const cardStyle: CSSProperties = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

const cardHeaderStyle: CSSProperties = {
  padding: '14px 22px',
  borderBottom: `1px solid ${C.border}`,
  background: '#FAFAF9',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

/* ─── Field ──────────────────────────────────────────────────────────── */
const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={labelStyle}>
      {label}
      {hint && <span style={{ fontSize: 11, color: C.textLight, fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginLeft: 6 }}>{hint}</span>}
    </label>
    {children}
  </div>
);

/* ─── Section Heading ────────────────────────────────────────────────── */
const SectionHeading: React.FC<{ icon: React.ElementType; title: string; desc: string }> = ({ icon: Icon, title, desc }) => (
  <div style={cardHeaderStyle}>
    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={15} color={C.accent} />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.text }}>{title}</p>
      <p style={{ margin: 0, fontSize: 12, color: C.textMuted, marginTop: 1 }}>{desc}</p>
    </div>
  </div>
);

/* ─── AdminApp ───────────────────────────────────────────────────────── */
const AdminApp: React.FC = () => {
  const [content, setContent]           = useState<ContentState | null>(null);
  const [loading, setLoading]           = useState(false);
  const [saving, setSaving]             = useState(false);
  const [message, setMessage]           = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<Section>('site');
  const [focused, setFocused]           = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore - Vite cung cấp import.meta.env nhưng TypeScript trong file này không biết type
    if ((import.meta as any).env?.DEV) {
      setContent({ site: siteContentInitial, navigation: navigationInitial, products: productsInitial });
      setMessage({ type: 'info', text: 'Đang dùng dữ liệu local — DEV mode.' });
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/content');
        if (!res.ok) throw new Error();
        setContent(await res.json());
      } catch {
        setContent({ site: siteContentInitial, navigation: navigationInitial, products: productsInitial });
        setMessage({ type: 'info', text: 'Dùng dữ liệu local (API chưa cấu hình).' });
      } finally { setLoading(false); }
    })();
  }, []);

  const handleFieldChange = (path: string[], value: any) => {
    setContent(prev => {
      if (!prev) return prev;
      const draft: any = structuredClone(prev);
      let cur: any = draft;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
      cur[path[path.length - 1]] = value;
      return draft;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true); setMessage(null);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error((await res.text()) || 'Lưu thất bại');
      setMessage({ type: 'success', text: 'Lưu thành công! Vercel đang build lại...' });
    } catch (e: any) {
      setMessage({ type: 'error', text: `Lỗi: ${e.message || 'Không xác định'}` });
    } finally { setSaving(false); }
  };

  const inp = (id: string): CSSProperties => focused === id ? focusedInput : baseInput;
  const ta  = (id: string): CSSProperties => ({ ...inp(id), resize: 'vertical' as const, minHeight: 90, lineHeight: '1.6' });

  /* Loading */
  if (loading || !content) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <Coffee size={32} color={C.accent} style={{ display: 'block', margin: '0 auto 10px' }} />
          <p style={{ margin: 0, fontSize: 13, color: C.textMuted }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const { site, products } = content;

  const navItems: { id: Section; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'site',     label: 'Thông tin Site', icon: Settings, desc: 'Title, favicon, mô tả' },
    { id: 'hero',     label: 'Hero Banner',    icon: Home,     desc: 'Ảnh nền, tiêu đề' },
    { id: 'products', label: 'Sản phẩm',       icon: Package,  desc: `${products.products.length} mục` },
    { id: 'footer',   label: 'Footer & Thương hiệu', icon: Settings, desc: 'Brand tagline, cột link, địa chỉ' },
  ];

  const bannerBg    = message?.type === 'success' ? C.greenBg  : message?.type === 'error' ? C.redBg  : C.infoBg;
  const bannerBorder= message?.type === 'success' ? '#A7F3D0'  : message?.type === 'error' ? '#FECACA': '#FDE68A';
  const bannerColor = message?.type === 'success' ? C.green    : message?.type === 'error' ? C.red    : C.infoText;

  /* ════════════════════════════════════════════════════════════════════ */
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* ══ HEADER ══ */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: C.surface, borderBottom: `1px solid ${C.border}`, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

          {/* brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee size={18} color="#fff" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.text, letterSpacing: '-0.02em' }}>Gilka Coffee</p>
              <p style={{ margin: 0, fontSize: 11, color: C.textMuted }}>Admin Panel</p>
            </div>
          </div>

          {/* breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: C.textMuted, flex: 1, justifyContent: 'center' }}>
            <span>Dashboard</span>
            <ChevronRight size={12} />
            <span style={{ color: C.text, fontWeight: 600 }}>{navItems.find(n => n.id === activeSection)?.label}</span>
          </div>

          {/* save */}
          <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 8, background: saving ? '#D4A04A' : C.accent, color: '#fff', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(200,134,10,0.3)', flexShrink: 0 }}>
            {saving ? <Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </header>

      {/* ══ BANNER ══ */}
      {message && (
        <div style={{ padding: '10px 28px', background: bannerBg, borderBottom: `1px solid ${bannerBorder}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: bannerColor }}>
          {message.type === 'success' && <CheckCircle size={14} />}
          {message.type === 'error'   && <XCircle size={14} />}
          {message.type === 'info'    && <Coffee size={14} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* ══ LAYOUT ══ */}
      <div style={{ flex: 1, maxWidth: 1160, margin: '0 auto', width: '100%', padding: '28px 28px 48px', display: 'flex', gap: 22, alignItems: 'flex-start', boxSizing: 'border-box' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: 210, flexShrink: 0, position: 'sticky', top: 88 }}>
          <p style={{ margin: '0 0 8px 6px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textLight }}>Điều hướng</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {navItems.map(({ id, label, icon: Icon, desc }) => {
              const active = activeSection === id;
              return (
                <button key={id} onClick={() => setActiveSection(id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, border: 'none', background: active ? C.accent : 'transparent', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'background 0.12s' }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = C.accentLight; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <Icon size={15} color={active ? '#fff' : C.textMuted} style={{ flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: active ? '#fff' : C.text }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 11, color: active ? 'rgba(255,255,255,0.6)' : C.textLight, marginTop: 1 }}>{desc}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* SITE */}
          {activeSection === 'site' && (
            <div style={cardStyle}>
              <SectionHeading icon={Settings} title="Thông tin Site" desc="Title, favicon, mô tả chung của website" />
              <div style={{ padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Title Website">
                    <input style={inp('title')} value={site.site.title} onFocus={() => setFocused('title')} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['site', 'site', 'title'], e.target.value)} placeholder="Tên website..." />
                  </Field>
                  <Field label="Favicon Path">
                    <input style={inp('fav')} value={site.site.faviconPath} onFocus={() => setFocused('fav')} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['site', 'site', 'faviconPath'], e.target.value)} placeholder="/favicon.ico" />
                  </Field>
                </div>
                <Field label="Mô tả Website" hint="Hiển thị trên Google & tab trình duyệt">
                  <textarea style={ta('desc')} value={site.site.description} onFocus={() => setFocused('desc')} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['site', 'site', 'description'], e.target.value)} placeholder="Mô tả ngắn..." />
                </Field>
              </div>
            </div>
          )}

          {/* HERO */}
          {activeSection === 'hero' && (
            <div style={cardStyle}>
              <SectionHeading icon={Home} title="Hero Banner" desc="Ảnh nền và nội dung phần đầu trang chủ" />
              <div style={{ padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Field label="URL Hình nền">
                  <input style={inp('bg')} value={site.hero.backgroundImage} onFocus={() => setFocused('bg')} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['site', 'hero', 'backgroundImage'], e.target.value)} placeholder="https://..." />
                  {site.hero.backgroundImage && (
                    <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', height: 130, border: `1px solid ${C.border}`, background: '#f0ede8' }}>
                      <img src={site.hero.backgroundImage} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Tiêu đề chính" hint="dùng \n xuống dòng">
                    <textarea style={{ ...ta('htitle'), minHeight: 100 }} value={site.hero.title} onFocus={() => setFocused('htitle')} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['site', 'hero', 'title'], e.target.value)} />
                  </Field>
                  <Field label="Mô tả phụ">
                    <textarea style={{ ...ta('hsub'), minHeight: 100 }} value={site.hero.subtitle} onFocus={() => setFocused('hsub')} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['site', 'hero', 'subtitle'], e.target.value)} />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeSection === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* heading */}
              <div style={cardStyle}>
                <SectionHeading icon={Package} title="Quản lý Sản phẩm" desc={`${products.products.length} sản phẩm · Chỉnh sửa tên, giá, hình ảnh`} />
              </div>

              {products.products.map((p: Product, idx: number) => (
                <div key={p.id} style={cardStyle}>
                  {/* row header */}
                  <div style={{ padding: '9px 18px', borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.textLight }}>#{p.id}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.name}</span>
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: C.accentLight, color: C.accentText }}>{p.category}</span>
                  </div>

                  {/* row body */}
                  <div style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    {/* thumbnail */}
                    <div style={{ width: 72, height: 72, borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}`, background: '#f0ede8', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.imageUrl
                        ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        : <Package size={18} color={C.border} />
                      }
                    </div>

                    {/* fields */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 170px', gap: 12 }}>
                        <Field label="Tên sản phẩm">
                          <input style={inp(`n${idx}`)} value={p.name} onFocus={() => setFocused(`n${idx}`)} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['products', 'products', idx.toString(), 'name'], e.target.value)} />
                        </Field>
                        <Field label="Giá (VNĐ)">
                          <input type="number" style={inp(`p${idx}`)} value={p.price} onFocus={() => setFocused(`p${idx}`)} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['products', 'products', idx.toString(), 'price'], Number(e.target.value || 0))} />
                        </Field>
                      </div>
                      <Field label="URL hình ảnh">
                        <input style={inp(`i${idx}`)} value={p.imageUrl} onFocus={() => setFocused(`i${idx}`)} onBlur={() => setFocused(null)} onChange={e => handleFieldChange(['products', 'products', idx.toString(), 'imageUrl'], e.target.value)} placeholder="https://example.com/product.jpg" />
                      </Field>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FOOTER */}
          {activeSection === 'footer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={cardStyle}>
                <SectionHeading
                  icon={Settings}
                  title="Footer & Thương hiệu"
                  desc="Tagline, cột link, địa chỉ và phần pháp lý ở chân trang"
                />
                <div style={{ padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Brand tagline */}
                  <Field label="Brand tagline">
                    <textarea
                      style={{ ...ta('footerTagline'), minHeight: 70 }}
                      value={site.sections.footer.brandTagline}
                      onFocus={() => setFocused('footerTagline')}
                      onBlur={() => setFocused(null)}
                      onChange={e => handleFieldChange(['site', 'sections', 'footer', 'brandTagline'], e.target.value)}
                    />
                  </Field>
                </div>
              </div>

              {/* Shop column */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text }}>Cột "Cửa hàng"</p>
                    <p style={{ margin: 0, fontSize: 12, color: C.textMuted }}>Tiêu đề và danh sách link bên trái footer</p>
                  </div>
                </div>
                <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Field label="Tiêu đề cột">
                    <input
                      style={inp('footerShopTitle')}
                      value={site.sections.footer.shopColumn.title}
                      onFocus={() => setFocused('footerShopTitle')}
                      onBlur={() => setFocused(null)}
                      onChange={e => handleFieldChange(['site', 'sections', 'footer', 'shopColumn', 'title'], e.target.value)}
                    />
                  </Field>
                  <Field label="Các link (mỗi dòng một mục)">
                    <textarea
                      style={{ ...ta('footerShopLinks'), minHeight: 90 }}
                      value={site.sections.footer.shopColumn.links.join('\n')}
                      onFocus={() => setFocused('footerShopLinks')}
                      onBlur={() => setFocused(null)}
                      onChange={e =>
                        handleFieldChange(
                          ['site', 'sections', 'footer', 'shopColumn', 'links'],
                          e.target.value.split('\n').map(l => l.trim()).filter(Boolean),
                        )
                      }
                    />
                  </Field>
                </div>
              </div>

              {/* Support column */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text }}>Cột "Hỗ trợ"</p>
                    <p style={{ margin: 0, fontSize: 12, color: C.textMuted }}>Các link về chính sách, hỗ trợ khách hàng</p>
                  </div>
                </div>
                <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Field label="Tiêu đề cột">
                    <input
                      style={inp('footerSupportTitle')}
                      value={site.sections.footer.supportColumn.title}
                      onFocus={() => setFocused('footerSupportTitle')}
                      onBlur={() => setFocused(null)}
                      onChange={e => handleFieldChange(['site', 'sections', 'footer', 'supportColumn', 'title'], e.target.value)}
                    />
                  </Field>
                  <Field label="Các link (mỗi dòng một mục)">
                    <textarea
                      style={{ ...ta('footerSupportLinks'), minHeight: 90 }}
                      value={site.sections.footer.supportColumn.links.join('\n')}
                      onFocus={() => setFocused('footerSupportLinks')}
                      onBlur={() => setFocused(null)}
                      onChange={e =>
                        handleFieldChange(
                          ['site', 'sections', 'footer', 'supportColumn', 'links'],
                          e.target.value.split('\n').map(l => l.trim()).filter(Boolean),
                        )
                      }
                    />
                  </Field>
                </div>
              </div>

              {/* Visit us & legal */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text }}>Địa chỉ & Pháp lý</p>
                    <p style={{ margin: 0, fontSize: 12, color: C.textMuted }}>Khối "Ghé thăm chúng tôi" và phần copyright dưới cùng</p>
                  </div>
                </div>
                <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <Field label="Tiêu đề khối địa chỉ">
                    <input
                      style={inp('footerVisitTitle')}
                      value={site.sections.footer.visitUs.title}
                      onFocus={() => setFocused('footerVisitTitle')}
                      onBlur={() => setFocused(null)}
                      onChange={e => handleFieldChange(['site', 'sections', 'footer', 'visitUs', 'title'], e.target.value)}
                    />
                  </Field>
                  <Field label="Địa chỉ (mỗi dòng một dòng địa chỉ)">
                    <textarea
                      style={{ ...ta('footerVisitAddress'), minHeight: 80 }}
                      value={site.sections.footer.visitUs.addressLines.join('\n')}
                      onFocus={() => setFocused('footerVisitAddress')}
                      onBlur={() => setFocused(null)}
                      onChange={e =>
                        handleFieldChange(
                          ['site', 'sections', 'footer', 'visitUs', 'addressLines'],
                          e.target.value.split('\n').map(l => l.trim()).filter(Boolean),
                        )
                      }
                    />
                  </Field>
                  <Field label="Copyright">
                    <input
                      style={inp('footerCopyright')}
                      value={site.sections.footer.legal.copyright}
                      onFocus={() => setFocused('footerCopyright')}
                      onBlur={() => setFocused(null)}
                      onChange={e => handleFieldChange(['site', 'sections', 'footer', 'legal', 'copyright'], e.target.value)}
                    />
                  </Field>
                  <Field label="Các link pháp lý (mỗi dòng một mục)">
                    <textarea
                      style={{ ...ta('footerLegalLinks'), minHeight: 70 }}
                      value={site.sections.footer.legal.links.join('\n')}
                      onFocus={() => setFocused('footerLegalLinks')}
                      onBlur={() => setFocused(null)}
                      onChange={e =>
                        handleFieldChange(
                          ['site', 'sections', 'footer', 'legal', 'links'],
                          e.target.value.split('\n').map(l => l.trim()).filter(Boolean),
                        )
                      }
                    />
                  </Field>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; } body { margin: 0; }`}</style>
    </div>
  );
};

export default AdminApp;