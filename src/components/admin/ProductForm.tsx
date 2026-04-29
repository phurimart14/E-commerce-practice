"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct, updateProduct } from "@/lib/actions/product";
import type { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product?: Product;
};

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Books & Stationery",
];

export default function ProductForm({ product }: Props) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;

  const [state, formAction, isPending] = useActionState(action, undefined);
  const [previewUrl, setPreviewUrl] = useState(product?.imageUrl ?? "");

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div className="space-y-1">
        <Label htmlFor="name">ชื่อสินค้า</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
        {state?.error?.name && (
          <p className="text-xs text-red-500">{state.error.name[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">รายละเอียด</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={product?.description}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          required
        />
        {state?.error?.description && (
          <p className="text-xs text-red-500">{state.error.description[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">ราคา (บาท)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price?.toString()}
            required
          />
          {state?.error?.price && (
            <p className="text-xs text-red-500">{state.error.price[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock">จำนวนสต็อก</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock?.toString()}
            required
          />
          {state?.error?.stock && (
            <p className="text-xs text-red-500">{state.error.stock[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="category">หมวดหมู่</Label>
        <select
          id="category"
          name="category"
          defaultValue={product?.category ?? ""}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          required
        >
          <option value="" disabled>
            เลือกหมวดหมู่
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {state?.error?.category && (
          <p className="text-xs text-red-500">{state.error.category[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">URL รูปภาพ (Unsplash)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="https://images.unsplash.com/photo-xxx?w=600"
          defaultValue={product?.imageUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
          required
        />
        {state?.error?.imageUrl && (
          <p className="text-xs text-red-500">{state.error.imageUrl[0]}</p>
        )}
        {previewUrl && (
          <div className="relative mt-2 h-40 w-40 overflow-hidden rounded-lg border bg-gray-100">
            <Image
              src={previewUrl}
              alt="preview"
              fill
              className="object-cover"
              onError={() => setPreviewUrl("")}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex h-10 items-center rounded-lg bg-black px-5 text-sm font-medium text-white hover:bg-black/80 disabled:bg-gray-300"
        >
          {isPending
            ? "กำลังบันทึก..."
            : product
              ? "บันทึกการแก้ไข"
              : "เพิ่มสินค้า"}
        </button>
        <a
          href="/admin/products"
          className="flex h-10 items-center rounded-lg border px-5 text-sm font-medium hover:bg-gray-50"
        >
          ยกเลิก
        </a>
      </div>
    </form>
  );
}
