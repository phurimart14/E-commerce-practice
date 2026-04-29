import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  // Electronics
  {
    name: "หูฟัง Sony WH-1000XM5",
    description:
      "หูฟัง Noise Cancelling ระดับพรีเมียม เสียงคุณภาพสูง ใส่สบาย แบตอยู่ได้ 30 ชั่วโมง",
    price: 11990,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "สมาร์ทวอทช์ Samsung Galaxy Watch 6",
    description:
      "นาฬิกาอัจฉริยะ ติดตามสุขภาพ รับสายโทรศัพท์ แจ้งเตือนอัจฉริยะ กันน้ำ 5ATM",
    price: 8990,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "ลำโพง JBL Charge 5",
    description:
      "ลำโพง Bluetooth กันน้ำ IPX7 เสียงดัง เบสหนัก ชาร์จอุปกรณ์อื่นได้ แบต 20 ชั่วโมง",
    price: 4990,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "แป้นพิมพ์ Mechanical Keychron K2",
    description:
      "คีย์บอร์ด Mechanical Wireless รองรับ Mac/Windows สวิตช์ Gateron Brown",
    price: 3290,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    category: "Electronics",
    stock: 25,
  },
  // Fashion
  {
    name: "เสื้อยืด Oversize Premium",
    description:
      "เสื้อยืดทรง Oversize ผ้า Cotton 100% นุ่ม ระบายอากาศดี มีหลายสี",
    price: 490,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    category: "Fashion",
    stock: 100,
  },
  {
    name: "กางเกงจ็อกเกอร์ Casual",
    description:
      "กางเกงจ็อกเกอร์ทรงสบาย ผ้า Polyester ยืดหยุ่นสูง ใส่ได้ทั้งออกกำลังกายและชิลล์",
    price: 690,
    imageUrl:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600",
    category: "Fashion",
    stock: 80,
  },
  {
    name: "รองเท้าผ้าใบ Nike Air Max",
    description:
      "รองเท้าผ้าใบ Nike Air Max 270 ดีไซน์เรียบหรู พื้นรองรับแรงกระแทก น้ำหนักเบา",
    price: 4500,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "Fashion",
    stock: 40,
  },
  {
    name: "กระเป๋าสะพาย Canvas Tote",
    description:
      "กระเป๋า Tote ผ้า Canvas ทนทาน ความจุเยอะ เหมาะสำหรับพกพาประจำวัน",
    price: 890,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Fashion",
    stock: 60,
  },
  // Home & Living
  {
    name: "โคมไฟตั้งโต๊ะ LED Minimal",
    description:
      "โคมไฟ LED ดีไซน์มินิมอล ปรับความสว่างได้ 3 ระดับ ถนอมสายตา ประหยัดไฟ",
    price: 1290,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    category: "Home & Living",
    stock: 35,
  },
  {
    name: "แก้วกาแฟ Ceramic Hand-made",
    description:
      "แก้วกาแฟเซรามิค งาน Handmade จากช่างฝีมือไทย ทรงสวย ใส่ได้ทั้งร้อนและเย็น",
    price: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    category: "Home & Living",
    stock: 50,
  },
  {
    name: "หมอนอิงตกแต่ง",
    description:
      "หมอนอิงตกแต่งบ้าน ผ้า Velvet นุ่มสบาย ดีไซน์ทันสมัย เพิ่มความสวยงามให้โซฟาและเตียง",
    price: 590,
    imageUrl:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600",
    category: "Home & Living",
    stock: 45,
  },
  {
    name: "กระถางต้นไม้ปูนซีเมนต์",
    description:
      "กระถางต้นไม้ทำจากปูนซีเมนต์ ดีไซน์มินิมอล เหมาะสำหรับต้นไม้ขนาดเล็กและกลาง",
    price: 280,
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
    category: "Home & Living",
    stock: 70,
  },
  // Books & Stationery
  {
    name: "สมุดโน้ต Hobonichi Techo",
    description:
      "สมุดโน้ตคุณภาพสูงจากญี่ปุ่น กระดาษ Tomoe River บางพิเศษ หมึกไม่โปร่ง",
    price: 1490,
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600",
    category: "Books & Stationery",
    stock: 25,
  },
  {
    name: "ปากกา Lamy Safari",
    description:
      "ปากกาหมึกซึมยี่ห้อ Lamy รุ่น Safari คลาสสิค ตัวปากกาเบา จับถนัดมือ",
    price: 1290,
    imageUrl:
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600",
    category: "Books & Stationery",
    stock: 30,
  },
  {
    name: "ชุดสี Watercolor 24 สี",
    description:
      "สีน้ำ 24 สี คุณภาพดี เหมาะสำหรับมือใหม่และศิลปิน สีสด ละลายน้ำได้ดี",
    price: 890,
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
    category: "Books & Stationery",
    stock: 40,
  },
  {
    name: "Planner 2025 Weekly",
    description:
      "แพลนเนอร์รายสัปดาห์ปี 2025 จัดระเบียบชีวิต บันทึกเป้าหมาย ตกแต่งสวยงาม",
    price: 450,
    imageUrl:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600",
    category: "Books & Stationery",
    stock: 55,
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Seed admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created: admin@example.com / admin123");

  // Seed products
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`✅ ${products.length} products created`);

  console.log("🎉 Seed completed!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
