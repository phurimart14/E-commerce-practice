# Mini Shop — Fullstack E-Commerce Practice Project

Mini e-commerce สร้างด้วย Next.js 16 + Prisma + Neon สำหรับฝึก fullstack development

🔗 **Live Demo:** [https://e-commerce-practice-mu.vercel.app](https://e-commerce-practice-mu.vercel.app)

## ✨ Features
 
- 🛍️ Browse products with **search & category filters**
- 📦 Product detail pages with stock info
- 🛒 **Persistent shopping cart** (Zustand + localStorage)
- 💳 Mock checkout flow with order creation
- 🔐 Admin dashboard with **NextAuth authentication**
- ⚙️ Full **product CRUD** for admin
- 📊 Order management for admin
---
 
## 🛠️ Tech Stack
 
| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **ORM** | Prisma v7 |
| **Database** | PostgreSQL (Neon) |
| **Auth** | NextAuth.js v5 (Credentials) |
| **State** | Zustand (with localStorage persist) |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel + Neon |
 
---
 
## 🗺️ Routes
 
| Feature                        | Route             |
| ------------------------------ | ----------------- |
| Product list (search + filter) | `/`               |
| Product detail                 | `/products/[id]`  |
| Shopping cart                  | `/cart`           |
| Checkout (mock)                | `/checkout`       |
| Admin login                    | `/admin/login`    |
| Admin product CRUD             | `/admin/products` |
| Admin order management         | `/admin/orders`   |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
- Node.js 20+
- PostgreSQL database (recommended: [Neon](https://neon.tech) free tier)
### 1. Clone และติดตั้ง
 
```bash
git clone https://github.com/phurimart14/E-commerce-practice.git
cd E-commerce-practice
npm install
```
 
### 2. ตั้งค่า Environment Variables
 
```bash
cp .env.example .env.local
```
 
แก้ไขไฟล์ `.env.local`:
 
```env
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
```
 
> 💡 สร้าง `NEXTAUTH_SECRET` ได้ด้วย: `openssl rand -base64 32`
 
### 3. Setup Database
 
```bash
npm run db:migrate   # สร้าง tables
npm run db:seed      # seed ข้อมูลตัวอย่าง (16 สินค้า + admin user)
```
 
### 4. รัน Dev Server
 
```bash
npm run dev
```
 
เปิดเบราว์เซอร์ที่ http://localhost:3000
 
---
 
## 🔑 Admin Access
 
| Field    | Value                  |
| -------- | ---------------------- |
| URL      | `/admin/login`         |
| Email    | `admin@example.com`    |
| Password | `admin123`             |
 
> ⚠️ **เปลี่ยน credentials ก่อน deploy ขึ้น production!**
 
---
 
## 📜 Available Scripts
 
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (DB GUI)
npm run format       # Format code with Prettier
npm run lint         # Lint code with ESLint
```
 
---
 
## 📁 Project Structure
 
```
src/
├── app/
│   ├── (shop)/          # Customer-facing routes
│   ├── admin/           # Admin routes (protected by middleware)
│   └── api/             # Route handlers
├── components/
│   ├── shop/            # Customer components
│   ├── admin/           # Admin components
│   ├── shared/          # Shared components (Navbar, Footer)
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── actions/         # Server Actions
│   ├── validations/     # Zod schemas
│   ├── auth.ts          # NextAuth config
│   └── prisma.ts        # Prisma client singleton
├── store/
│   └── cartStore.ts     # Zustand cart store
└── types/
    └── index.ts         # Shared TypeScript types
```
 
---
 
## 🎓 Learning Goals
 
This project was built to practice and demonstrate:
 
- ✅ **Next.js 16 App Router** — Server Components, Server Actions, Route Handlers
- ✅ **Type-safe fullstack** — End-to-end TypeScript with Prisma
- ✅ **Database design** — Relational schema with Prisma migrations
- ✅ **Authentication** — NextAuth.js v5 with middleware-based route protection
- ✅ **State management** — Client-side cart with Zustand persist
- ✅ **Form handling** — React Hook Form + Zod validation
- ✅ **Deployment** — Production deploy on Vercel with managed Postgres
---
 
## 🗺️ Roadmap
 
- [ ] User authentication (customer accounts)
- [ ] Product reviews & ratings
- [ ] Real payment integration (Stripe)
- [ ] Image upload (Cloudinary / Vercel Blob)
- [ ] Order email notifications
- [ ] Internationalization (i18n)
---
 
## 📄 License
 
MIT — feel free to use this project for learning purposes.
 
---
 
## 👤 Author
 
**Phurimart Sudanich (Fifa)**
- GitHub: [@phurimart14](https://github.com/phurimart14)
