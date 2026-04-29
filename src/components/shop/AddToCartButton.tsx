"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  disabled?: boolean;
};

export default function AddToCartButton({ product, disabled }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          เพิ่มแล้ว!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          {disabled ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
        </>
      )}
    </button>
  );
}
