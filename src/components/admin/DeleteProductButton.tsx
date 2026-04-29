"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/product";
import { useTransition } from "react";

type Props = {
  id: string;
  name: string;
};

export default function DeleteProductButton({ id, name }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`ลบสินค้า "${name}" ใช่หรือไม่?`)) return;
    startTransition(() => deleteProduct(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg p-1.5 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4 text-red-400" />
    </button>
  );
}
