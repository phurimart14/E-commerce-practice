"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { orderSchema, type OrderFormData } from "@/lib/validations/order";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: items.map((i) => ({
        productId: i.id,
        quantity: i.quantity,
        price: i.price,
      })),
    },
  });

  async function onSubmit(data: OrderFormData) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const { orderId } = await res.json();
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ข้อมูลลูกค้า */}
      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-bold text-lg">ข้อมูลการจัดส่ง</h2>

        <div className="space-y-1">
          <Label htmlFor="customerName">ชื่อ-นามสกุล</Label>
          <Input
            id="customerName"
            placeholder="เช่น สมชาย ใจดี"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="text-xs text-red-500">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="customerPhone">เบอร์โทรศัพท์</Label>
          <Input
            id="customerPhone"
            placeholder="เช่น 0812345678"
            {...register("customerPhone")}
          />
          {errors.customerPhone && (
            <p className="text-xs text-red-500">
              {errors.customerPhone.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="customerAddress">ที่อยู่จัดส่ง</Label>
          <textarea
            id="customerAddress"
            placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
            rows={3}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            {...register("customerAddress")}
          />
          {errors.customerAddress && (
            <p className="text-xs text-red-500">
              {errors.customerAddress.message}
            </p>
          )}
        </div>
      </div>

      {/* สรุปคำสั่งซื้อ */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="font-bold text-lg mb-4">สรุปคำสั่งซื้อ</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-4 flex justify-between font-bold">
          <span>ยอดรวม</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-medium text-white hover:bg-black/80 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "กำลังดำเนินการ..." : "ยืนยันคำสั่งซื้อ"}
        </button>
      </div>
    </form>
  );
}
