"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/shop/CartItem";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-200" />
        <h1 className="text-xl font-bold">ตะกร้าของคุณว่างเปล่า</h1>
        <p className="mt-2 text-gray-400">
          เลือกสินค้าที่ชอบแล้วมาเจอกันตรงนี้
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-black px-5 text-sm font-medium text-white hover:bg-black/80"
        >
          เลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500"
        >
          ล้างตะกร้า
        </button>
      </div>

      {/* รายการสินค้า */}
      <div className="divide-y rounded-2xl border bg-white px-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* สรุปราคา */}
      <div className="mt-6 rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>ยอดรวมทั้งหมด</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <p className="mt-1 text-sm text-gray-400">ยังไม่รวมค่าจัดส่ง</p>

        <Link
          href="/checkout"
          className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-medium text-white hover:bg-black/80"
        >
          ดำเนินการสั่งซื้อ
        </Link>

        <Link
          href="/"
          className="mt-3 flex h-10 w-full items-center justify-center rounded-xl border text-sm font-medium hover:bg-gray-50"
        >
          เลือกซื้อต่อ
        </Link>
      </div>
    </div>
  );
}
