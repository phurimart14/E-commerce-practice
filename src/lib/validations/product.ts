import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
  description: z.string().min(1, "กรุณากรอกรายละเอียด"),
  price: z.coerce.number().positive("ราคาต้องมากกว่า 0"),
  imageUrl: z.string().url("URL รูปภาพไม่ถูกต้อง"),
  category: z.string().min(1, "กรุณาเลือก category"),
  stock: z.coerce.number().int().min(0, "จำนวนสต็อกต้องไม่ติดลบ"),
});

export type ProductFormData = z.infer<typeof productSchema>;
