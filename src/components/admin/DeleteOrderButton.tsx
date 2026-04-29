"use client";

import { Trash2 } from "lucide-react";
import { deleteOrder } from "@/lib/actions/order";
import { useTransition } from "react";

type Props = {
  id: string;
};

export default function DeleteOrderButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("ลบคำสั่งซื้อนี้ใช่หรือไม่? ไม่สามารถกู้คืนได้")) return;
    startTransition(() => deleteOrder(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-red-400 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {isPending ? "กำลังลบ..." : "ลบ"}
    </button>
  );
}
