"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/order";
import type { OrderStatus } from "@/types";

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "รอดำเนินการ",
  CONFIRMED: "ยืนยันแล้ว",
  CANCELLED: "ยกเลิก",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "text-yellow-600 bg-yellow-50 border-yellow-200",
  CONFIRMED: "text-green-600 bg-green-50 border-green-200",
  CANCELLED: "text-red-600 bg-red-50 border-red-200",
};

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    startTransition(() => updateOrderStatus(orderId, newStatus));
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-lg border px-2 py-1 text-xs font-medium outline-none disabled:opacity-50 ${STATUS_COLORS[currentStatus]}`}
    >
      {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
