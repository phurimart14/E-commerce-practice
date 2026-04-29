import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductTable from "@/components/admin/ProductTable";

export const metadata = { title: "จัดการสินค้า — Admin" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">สินค้า</h1>
          <p className="text-sm text-gray-500">{products.length} รายการ</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80"
        >
          <Plus className="h-4 w-4" />
          เพิ่มสินค้า
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
