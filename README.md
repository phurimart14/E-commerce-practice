# Mini Shop — Fullstack E-Commerce Practice Project

Mini e-commerce สร้างด้วย Next.js 16 + Prisma + Neon สำหรับฝึก fullstack development

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **ORM:** Prisma v7 + PostgreSQL (Neon)
- **Auth:** NextAuth.js v5 (Credentials)
- **State:** Zustand (cart with localStorage persist)
- **Forms:** React Hook Form + Zod
- **Deploy:** Vercel + Neon

## Features

| Feature                        | Route             |
| ------------------------------ | ----------------- |
| Product list (search + filter) | `/`               |
| Product detail                 | `/products/[id]`  |
| Shopping cart                  | `/cart`           |
| Checkout (mock)                | `/checkout`       |
| Admin login                    | `/admin/login`    |
| Admin product CRUD             | `/admin/products` |
| Admin order management         | `/admin/orders`   |

## Getting Started

### 1. Clone และติดตั้ง

```bash
git clone <repo-url>
cd ecommerce
npm install
```

### 2. ตั้งค่า Environment Variables

```bash
cp .env.example .env.local
```

แก้ไข `.env.local`:

```env
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 3. Setup Database

```bash
npm run db:migrate   # สร้าง tables
npm run db:seed      # seed ข้อมูลตัวอย่าง (16 สินค้า + admin)
```

### 4. รัน Dev Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `/admin/login`
- Email: `admin@example.com`
- Password: `admin123`

> ⚠️ เปลี่ยน credentials ก่อน deploy ขึ้น production

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
npm run format       # Format code
npm run lint         # Lint code
```

## Project Structure

```
src/
├── app/
│   ├── (shop)/          # Customer routes
│   ├── admin/           # Admin routes (protected)
│   └── api/             # Route handlers
├── components/
│   ├── shop/            # Customer components
│   ├── admin/           # Admin components
│   └── shared/          # Shared components
├── lib/
│   ├── actions/         # Server Actions
│   ├── validations/     # Zod schemas
│   ├── auth.ts          # NextAuth config
│   └── prisma.ts        # Prisma client
├── store/
│   └── cartStore.ts     # Zustand cart
└── types/
    └── index.ts         # Shared types
```

## Deploy to Vercel

1. Push code ไป GitHub
2. Import project ใน [Vercel](https://vercel.com)
3. เพิ่ม Environment Variables ใน Vercel dashboard
4. Deploy!
