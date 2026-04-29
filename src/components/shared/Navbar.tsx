"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Mini Shop
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-gray-600 sm:flex">
          <Link href="/" className="hover:text-black">
            สินค้าทั้งหมด
          </Link>
        </nav>

        <Link href="/cart" className="relative p-2">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
