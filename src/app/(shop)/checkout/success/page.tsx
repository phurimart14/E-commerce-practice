import Link from "next/link";
import { CheckCircle } from "lucide-react";

type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export const metadata = { title: "สั่งซื้อสำเร็จ — Mini Shop" };

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h1 className="text-2xl font-bold">สั่งซื้อสำเร็จ!</h1>
      <p className="mt-2 text-gray-500">
        ขอบคุณสำหรับการสั่งซื้อ เราจะจัดส่งสินค้าโดยเร็วที่สุด
      </p>

      {orderId && (
        <div className="mt-6 rounded-xl border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">หมายเลขคำสั่งซื้อ</p>
          <p className="mt-1 font-mono text-sm font-bold break-all">
            {orderId}
          </p>
        </div>
      )}

      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-xl bg-black px-6 text-sm font-medium text-white hover:bg-black/80"
      >
        เลือกซื้อสินค้าต่อ
      </Link>
    </div>
  );
}
