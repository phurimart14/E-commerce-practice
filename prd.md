# 🛒 PRD: Mini E-Commerce (Fullstack Practice Project)

> **Goal:** สร้างเว็บ e-commerce แบบง่ายเพื่อฝึก fullstack development ครบวงจรตั้งแต่ frontend → backend → database
>
> **Owner:** Fifa
> **Created:** April 2026
> **Status:** Planning

---

## 📌 1. Project Overview

โปรเจกต์ mini e-commerce ที่ใช้ฝึก fullstack stack จริง โดยเน้น:
- ใช้ **Next.js App Router** เต็มรูปแบบ (frontend + API routes)
- ฝึก **type-safe development** ด้วย TypeScript + Prisma
- ฝึก **state management**, **REST API design**, **DB schema design**
- ฝึก **authentication** สำหรับ admin
- ทำให้ deploy ขึ้นจริงได้ (Vercel + Neon)

### Out of Scope (ยังไม่ทำในเวอร์ชันนี้)
- ❌ ระบบสมาชิก (user account) — ใช้ guest cart พอ
- ❌ ระบบจ่ายเงินจริง — checkout เป็น mock
- ❌ ระบบ review / rating
- ❌ ระบบส่วนลด / coupon
- ❌ Multi-language / i18n

---

## 🛠️ 2. Tech Stack

### Frontend
| Tech | Version | Purpose |
|------|---------|---------|
| **Next.js** | 15+ (App Router) | Framework หลัก |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 4+ | Styling |
| **shadcn/ui** | latest | UI components |
| **Zustand** | 5+ | Cart state management |
| **React Hook Form + Zod** | latest | Form validation |

### Backend
| Tech | Purpose |
|------|---------|
| **Next.js Route Handlers** | REST API |
| **Prisma** | ORM |
| **PostgreSQL** (Neon) | Database |
| **NextAuth.js v5** | Admin authentication |
| **Zod** | API request validation |

### Tooling & Deployment
| Tech | Purpose |
|------|---------|
| **Vercel** | Hosting |
| **Neon** | PostgreSQL hosting (free tier) |
| **Unsplash** | รูปสินค้า (direct URL) |
| **ESLint + Prettier** | Code quality |
| **Husky + lint-staged** | Git hooks |

---

## 🎯 3. Features Breakdown

### 🟢 Customer-facing Features
1. **F1 — แสดงรายการสินค้า** (Product List)
   - หน้าแรกแสดง grid สินค้า
   - Filter ตาม category, search by name
   - Pagination หรือ infinite scroll

2. **F2 — ดูรายละเอียดสินค้า** (Product Detail)
   - หน้า `/products/[id]`
   - แสดงรูป, ชื่อ, ราคา, description, stock

3. **F3 — ตะกร้าสินค้า** (Cart)
   - เพิ่ม / ลบ / แก้จำนวน
   - เก็บใน localStorage (Zustand persist)
   - แสดง total ราคา

4. **F4 — Checkout (Mock)**
   - กรอก ชื่อ, ที่อยู่, เบอร์
   - กด "ยืนยัน" → สร้าง order ใน DB → แสดงหน้า success

### 🔴 Admin Features
5. **F5 — Admin Login**
   - หน้า `/admin/login`
   - ใช้ NextAuth.js (Credentials provider)

6. **F6 — Product Management (CRUD)**
   - List, Create, Edit, Delete สินค้า
   - Form กรอกข้อมูล + URL รูป Unsplash

7. **F7 — Order Management** (Optional bonus)
   - ดู list orders ที่เข้ามา
   - เปลี่ยน status

---

## 🏗️ 4. Architecture

### High-level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ React Server │  │ Client       │  │ Zustand      │  │
│  │ Components   │  │ Components   │  │ (Cart Store) │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘  │
└─────────┼─────────────────┼──────────────────────────────┘
          │                 │
          │ Server Actions  │ fetch()
          │                 │
┌─────────▼─────────────────▼──────────────────────────────┐
│              NEXT.JS SERVER (Vercel)                      │
│  ┌────────────────────┐  ┌──────────────────────────┐   │
│  │ App Router Pages   │  │ Route Handlers (/api/*)  │   │
│  │ - /                │  │ - /api/products          │   │
│  │ - /products/[id]   │  │ - /api/orders            │   │
│  │ - /cart            │  │ - /api/admin/*           │   │
│  │ - /admin/*         │  │                          │   │
│  └─────────┬──────────┘  └────────────┬─────────────┘   │
│            │                          │                  │
│            └──────────┬───────────────┘                  │
│                       │                                  │
│            ┌──────────▼──────────┐                       │
│            │  Prisma Client      │                       │
│            │  + NextAuth.js      │                       │
│            └──────────┬──────────┘                       │
└───────────────────────┼──────────────────────────────────┘
                        │
                        │ SQL
                        │
              ┌─────────▼──────────┐
              │   PostgreSQL       │
              │   (Neon)           │
              └────────────────────┘
```

### Data Flow Patterns

**Public pages (Product list/detail):**
- ใช้ **Server Components** ดึงข้อมูลตรงจาก DB ด้วย Prisma
- Cache ด้วย Next.js fetch cache / `revalidate`

**Cart:**
- เก็บ state ฝั่ง client ทั้งหมด (Zustand + localStorage)
- ไม่ต้องยุ่งกับ backend จนกว่าจะ checkout

**Checkout:**
- POST → `/api/orders` พร้อม cart items + customer info
- Backend validate ด้วย Zod → เขียน DB → return order ID

**Admin CRUD:**
- ใช้ **Server Actions** + revalidatePath
- ป้องกันด้วย NextAuth middleware

---

## 🗄️ 5. Database Schema (Prisma)

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  imageUrl    String
  category    String
  stock       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  orderItems  OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  customerName    String
  customerPhone   String
  customerAddress String      @db.Text
  totalAmount     Decimal     @db.Decimal(10, 2)
  status          OrderStatus @default(PENDING)
  createdAt       DateTime    @default(now())
  items           OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal @db.Decimal(10, 2) // snapshot ราคาตอนซื้อ
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  CANCELLED
}

// NextAuth tables
model User {
  id       String @id @default(cuid())
  email    String @unique
  password String // hashed
  role     Role   @default(ADMIN)
}

enum Role {
  ADMIN
}
```

---

## 📁 6. Folder Structure

```
mini-ecommerce/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                    # seed ข้อมูลตัวอย่าง
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (shop)/                # customer-facing routes
│   │   │   ├── layout.tsx         # navbar + footer
│   │   │   ├── page.tsx           # หน้าแรก = product list
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   └── checkout/
│   │   │       ├── page.tsx
│   │   │       └── success/
│   │   │           └── page.tsx
│   │   │
│   │   ├── admin/                 # admin routes (protected)
│   │   │   ├── layout.tsx         # admin sidebar
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       # list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   └── orders/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts       # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts   # GET, PUT, DELETE
│   │   │   └── orders/
│   │   │       └── route.ts       # POST
│   │   │
│   │   ├── layout.tsx             # root layout
│   │   ├── globals.css
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CartIcon.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CheckoutForm.tsx
│   │   ├── admin/
│   │   │   ├── ProductForm.tsx
│   │   │   └── ProductTable.tsx
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts              # singleton client
│   │   ├── auth.ts                # NextAuth config
│   │   ├── utils.ts               # cn(), formatPrice()
│   │   └── validations/
│   │       ├── product.ts         # zod schemas
│   │       └── order.ts
│   │
│   ├── store/
│   │   └── cartStore.ts           # Zustand
│   │
│   ├── types/
│   │   └── index.ts               # shared types
│   │
│   └── middleware.ts              # protect /admin/*
│
├── .env.example
├── .env.local                     # gitignored
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 7. Development Plan (แบ่งทีละ Feature)

> **Git Workflow Rules** (สำคัญมาก!)
> ก่อนเริ่มทุก feature:
> 1. `git checkout main && git pull`
> 2. `git checkout -b feature/<feature-name>`
> 3. ทำงาน → `git add . && git commit -m "..."` บ่อยๆ
> 4. เสร็จแล้ว push + merge กลับ main
>
> **Commit message format:** `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`

### 📅 Phase 0: Project Setup
**Branch:** `setup/initial`

- [ ] `npx create-next-app@latest` (TS + Tailwind + App Router)
- [ ] ติดตั้ง dependencies: prisma, zustand, zod, next-auth, shadcn/ui
- [ ] Setup ESLint, Prettier, Husky
- [ ] Setup Prisma + connect Neon
- [ ] สร้าง `prisma/schema.prisma` + migrate
- [ ] สร้าง seed script + รัน seed
- [ ] Setup folder structure ตาม spec
- [ ] เขียน README.md

**Deliverable:** โปรเจกต์รันได้ DB connect ได้ มี seed data

---

### 📅 Phase 1: Product List (F1)
**Branch:** `feature/product-list`

- [ ] สร้าง `Navbar` + `Footer` ใน `(shop)/layout.tsx`
- [ ] สร้าง `ProductCard` component
- [ ] สร้าง `ProductGrid` component
- [ ] หน้าแรก fetch products จาก DB ผ่าน Server Component
- [ ] เพิ่ม search bar + category filter
- [ ] เพิ่ม loading state (loading.tsx)

**Deliverable:** หน้าแรกแสดงสินค้าได้ filter/search ได้

---

### 📅 Phase 2: Product Detail (F2)
**Branch:** `feature/product-detail`

- [ ] สร้างหน้า `/products/[id]/page.tsx`
- [ ] ดึง product detail จาก DB
- [ ] handle 404 ถ้าไม่เจอ (notFound())
- [ ] ปุ่ม "Add to Cart" (ยังไม่ทำงาน—ใส่ใน Phase 3)

**Deliverable:** ดู detail สินค้าได้

---

### 📅 Phase 3: Cart (F3)
**Branch:** `feature/cart`

- [ ] สร้าง Zustand store พร้อม persist middleware
- [ ] เชื่อมปุ่ม "Add to Cart" ใน product detail
- [ ] สร้างหน้า `/cart`
- [ ] แสดง CartItem + คำนวณ total
- [ ] เพิ่ม/ลด quantity, ลบสินค้า, เคลียร์ตะกร้า
- [ ] CartIcon ใน Navbar แสดงจำนวน

**Deliverable:** ตะกร้าใช้งานได้ครบ persist หลัง refresh

---

### 📅 Phase 4: Checkout (Mock) (F4)
**Branch:** `feature/checkout`

- [ ] สร้าง Zod schema สำหรับ order
- [ ] สร้าง API route `POST /api/orders`
- [ ] สร้างหน้า `/checkout` พร้อม form (React Hook Form + Zod)
- [ ] submit → call API → clear cart → redirect `/checkout/success`
- [ ] หน้า success แสดง order ID

**Deliverable:** สั่งซื้อได้ order เข้า DB

---

### 📅 Phase 5: Admin Auth (F5)
**Branch:** `feature/admin-auth`

- [ ] Setup NextAuth.js v5 (Credentials provider)
- [ ] สร้าง `lib/auth.ts`
- [ ] สร้างหน้า `/admin/login`
- [ ] สร้าง `middleware.ts` ป้องกัน `/admin/*`
- [ ] เพิ่ม admin user ใน seed (hashed password)

**Deliverable:** Login admin ได้ protect route ได้

---

### 📅 Phase 6: Admin Product CRUD (F6)
**Branch:** `feature/admin-products`

- [ ] สร้าง `/admin/products` (list)
- [ ] สร้าง `/admin/products/new` (create form)
- [ ] สร้าง `/admin/products/[id]/edit` (edit form)
- [ ] Server Actions: createProduct, updateProduct, deleteProduct
- [ ] confirm dialog ตอน delete
- [ ] revalidatePath หลัง mutation

**Deliverable:** Admin จัดการสินค้าได้ครบ

---

### 📅 Phase 7 (Optional): Admin Order View (F7)
**Branch:** `feature/admin-orders`

- [ ] สร้าง `/admin/orders` แสดง list
- [ ] เปลี่ยน status ได้
- [ ] ดู detail แต่ละ order

---

### 📅 Phase 8: Polish & Deploy
**Branch:** `chore/polish-deploy`

- [ ] Responsive check ทุกหน้า (mobile/tablet/desktop)
- [ ] Error boundaries (error.tsx)
- [ ] SEO basics (metadata, OG tags)
- [ ] Deploy ไป Vercel
- [ ] เชื่อม production DB (Neon)
- [ ] ทดสอบ production build

---

## 📊 8. Success Criteria

โปรเจกต์ถือว่าสำเร็จเมื่อ:

- ✅ ทุก feature ใช้งานได้จริง
- ✅ Type-safe ทั้งโปรเจกต์ (no `any`)
- ✅ Responsive ทุกหน้า
- ✅ Deploy ขึ้น production สำเร็จ
- ✅ มี README ที่ใครมาอ่านก็ run ต่อได้
- ✅ Code structure สะอาด แยก concern ชัดเจน

---

## 🎓 9. Learning Goals

โปรเจกต์นี้ Fifa จะได้ฝึก:

- 🔥 **Next.js App Router** — RSC vs Client Components, Server Actions, Route Handlers
- 🔥 **Prisma** — schema design, migrations, type-safe queries
- 🔥 **NextAuth.js** — authentication flow, middleware
- 🔥 **Form handling** — React Hook Form + Zod validation
- 🔥 **State management** — Zustand + persist
- 🔥 **REST API design** — endpoint structure, status codes, validation
- 🔥 **Database design** — relations, constraints, transactions
- 🔥 **Deployment** — Vercel + managed Postgres

---

## 📝 10. Notes

- รูปสินค้าใช้ Unsplash direct URL เช่น `https://images.unsplash.com/photo-xxx`
- Seed data ควรมีสินค้าอย่างน้อย 12-20 ชิ้น แบ่งเป็น 3-4 categories
- ใช้สกุลเงิน THB (บาท)
- Admin credentials default: `admin@example.com / admin123` (เปลี่ยนตอน production)
