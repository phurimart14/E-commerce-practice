"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-bold">เกิดข้อผิดพลาด</h2>
      <p className="text-gray-400">{error.message}</p>
      <button
        onClick={reset}
        className="h-9 rounded-lg bg-black px-4 text-sm font-medium text-white hover:bg-black/80"
      >
        ลองใหม่
      </button>
    </div>
  );
}
