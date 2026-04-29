"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium leading-snug line-clamp-2">{item.name}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="shrink-0 p-1 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-0.5 hover:text-black disabled:opacity-30"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-0.5 hover:text-black"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
