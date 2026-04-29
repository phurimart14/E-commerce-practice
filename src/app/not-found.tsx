import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-xl font-medium">ไม่พบหน้าที่ต้องการ</p>
      <p className="text-gray-400">หน้านี้ไม่มีอยู่หรืออาจถูกย้ายไปแล้ว</p>
      <Link
        href="/"
        className="inline-flex h-9 items-center rounded-lg bg-black px-4 text-sm font-medium text-white hover:bg-black/80"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
