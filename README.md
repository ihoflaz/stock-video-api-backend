# Stock Video API Backend

Bu proje, çeşitli stok video API'lerini (Pixabay, Pexels vb.) tek bir backend üzerinden yöneten bir Express.js uygulamasıdır.

## 🚀 Özellikler

- Pixabay API entegrasyonu
- Pexels API entegrasyonu
- CORS desteği
- Hata yönetimi
- Environment variables yönetimi
- API durum kontrolü
- Vercel deployment

## 🛠️ Teknolojiler

- Express.js 4.x
- Node.js 18+
- Axios
- CORS
- Dotenv
- Vercel Serverless Functions

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/stock-video-api.git
cd stock-video-api/backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```bash
PIXABAY_API_KEY=your_pixabay_api_key
PEXELS_API_KEY=your_pexels_api_key
PORT=3001
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 📁 Proje Yapısı

```
backend/
├── routes/
│   └── api/
│       ├── pixabay.js    # Pixabay route handlers
│       └── pexels.js     # Pexels route handlers
├── app.js               # Ana uygulama dosyası
├── vercel.json         # Vercel yapılandırması
└── package.json
```

## 🛣️ API Endpoints

### Health Check
```bash
GET /api/health
```

### Pixabay Videos
```bash
GET /api/pixabay/search
Query Parameters:
- q: Arama terimi
- page: Sayfa numarası (default: 1)
```

### Pexels Videos
```bash
GET /api/pexels/search
Query Parameters:
- q: Arama terimi
- page: Sayfa numarası (default: 1)
```

## 🚀 Deployment

Proje Vercel'e deploy edilmiştir:

1. Vercel CLI'ı yükleyin:
```bash
npm i -g vercel
```

2. Deploy edin:
```bash
vercel
```

3. Environment variables'ları Vercel'de ayarlayın:
- PIXABAY_API_KEY
- PEXELS_API_KEY

## 🔒 Güvenlik

- API anahtarları `.env` dosyasında saklanır
- CORS politikası tüm originlere izin verir (production'da kısıtlanabilir)
- Rate limiting uygulanmamıştır (gerekirse eklenebilir)

## 📝 Notlar

- Node.js 18 veya üzeri gereklidir
- API anahtarları Vercel dashboard'dan ayarlanmalıdır
- Development ortamında nodemon kullanılmaktadır
- Production ortamında Vercel Serverless Functions kullanılmaktadır 