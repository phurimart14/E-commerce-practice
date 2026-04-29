"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ShopError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-5xl">😕</p>
      <h2 className="text-xl font-bold">เกิดข้อผิดพลาด</h2>
      <p className="text-gray-400 max-w-sm">
        ไม่สามารถโหลดข้อมูลได้ในขณะนี้ กรุณาลองใหม่
      </p>
      <button
        onClick={reset}
        className="h-10 rounded-lg bg-black px-5 text-sm font-medium text-white hover:bg-black/80"
      >
        ลองใหม่
      </button>
    </div>
  );
}
