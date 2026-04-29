import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(1, "กรุณากรอกชื่อ"),
  customerPhone: z
    .string()
    .min(9, "เบอร์โทรไม่ถูกต้อง")
    .max(10, "เบอร์โทรไม่ถูกต้อง"),
  customerAddress: z.string().min(10, "กรุณากรอกที่อยู่ให้ครบ"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        price: z.number().positive(),
      })
    )
    .min(1, "ตะกร้าสินค้าว่างเปล่า"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
