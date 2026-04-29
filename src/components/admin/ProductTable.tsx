"use client";

import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import DeleteProductButton from "./DeleteProductButton";
import type { Product } from "@/types";

type Props = {
  products: Product[];
};

export default function ProductTable({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center text-gray-400">
        ยังไม่มีสินค้า
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
          <tr>
            <th className="px-4 py-3">สินค้า</th>
            <th className="px-4 py-3">หมวดหมู่</th>
            <th className="px-4 py-3 text-right">ราคา</th>
            <th className="px-4 py-3 text-right">สต็อก</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="font-medium line-clamp-1">
                    {product.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-500">{product.category}</td>
              <td className="px-4 py-3 text-right font-medium">
                {formatPrice(Number(product.price))}
              </td>
              <td className="px-4 py-3 text-right">
                <span className={product.stock === 0 ? "text-red-500" : ""}>
                  {product.stock}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded-lg p-1.5 hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
