# Hướng dẫn Deploy Website Lên Hosting Miễn Phí

## 📦 Build Production

Build đã hoàn tất! File production nằm trong thư mục `dist/`.

Để build lại:
```bash
npm run build
```

## 🚀 Các Dịch Vụ Hosting Static Files Miễn Phí

### 1. **Vercel** (Khuyến nghị - Dễ nhất) ⭐

**Ưu điểm:**
- Deploy tự động từ GitHub
- Hỗ trợ Vite/React tốt nhất
- CDN toàn cầu, tốc độ nhanh
- Free tier: Unlimited bandwidth
- Custom domain miễn phí
- SSL tự động

**Cách deploy:**
1. Đăng ký tại: https://vercel.com
2. Kết nối GitHub account
3. Import repository này
4. Vercel tự động detect Vite và build
5. Deploy xong trong 2 phút!

**Hoặc deploy thủ công:**
```bash
npm install -g vercel
vercel
```

---

### 2. **Netlify** ⭐

**Ưu điểm:**
- Drag & drop deploy (dễ nhất)
- Free tier: 300GB bandwidth/tháng
- Continuous deployment từ GitHub
- Form handling miễn phí
- Custom domain + SSL

**Cách deploy:**
1. Đăng ký tại: https://netlify.com
2. Kéo thả folder `dist/` vào Netlify Drop
3. Hoặc kết nối GitHub để auto-deploy

**Hoặc dùng CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

### 3. **Cloudflare Pages** ⭐

**Ưu điểm:**
- Free tier: Unlimited requests
- CDN mạnh nhất thế giới
- Build từ GitHub tự động
- Custom domain miễn phí

**Cách deploy:**
1. Đăng ký tại: https://pages.cloudflare.com
2. Kết nối GitHub
3. Chọn repository
4. Build command: `npm run build`
5. Publish directory: `dist`

---

### 4. **GitHub Pages**

**Ưu điểm:**
- Hoàn toàn miễn phí
- Không giới hạn bandwidth
- Tích hợp với GitHub

**Cách deploy:**
1. Push code lên GitHub
2. Vào Settings > Pages
3. Source: Deploy from a branch
4. Branch: `main` hoặc `gh-pages`
5. Folder: `/dist` (cần cấu hình thêm)

**Hoặc dùng GitHub Actions:**
Tạo file `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### 5. **Surge.sh** (Nhanh nhất)

**Ưu điểm:**
- Deploy trong 30 giây
- CLI đơn giản
- Free subdomain: `yourname.surge.sh`

**Cách deploy:**
```bash
npm install -g surge
cd dist
surge
# Nhập email và password
# Domain: yourname.surge.sh
```

---

### 6. **Firebase Hosting**

**Ưu điểm:**
- Free tier: 10GB storage, 360MB/ngày
- Tích hợp với Google services
- Custom domain

**Cách deploy:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Chọn dist folder
firebase deploy
```

---

## 🎯 Khuyến Nghị

**Cho người mới:** Vercel hoặc Netlify (dễ nhất, không cần config)

**Cho người muốn tốc độ:** Cloudflare Pages (CDN mạnh nhất)

**Cho người muốn đơn giản:** Surge.sh (deploy nhanh nhất)

**Cho dự án open source:** GitHub Pages (hoàn toàn miễn phí)

---

## 📝 Lưu Ý

- Tất cả các dịch vụ trên đều hỗ trợ custom domain miễn phí
- SSL/HTTPS được cấu hình tự động
- File trong folder `dist/` là file production đã được tối ưu
- Không cần server backend, chỉ cần upload static files

---

## ✅ Checklist Trước Khi Deploy

- [x] Build thành công (`npm run build`)
- [ ] Kiểm tra file trong `dist/` folder
- [ ] Test local với `npm run preview`
- [ ] Chọn dịch vụ hosting
- [ ] Deploy và kiểm tra website

