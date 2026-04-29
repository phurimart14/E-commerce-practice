import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata = { title: "แก้ไขสินค้า — Admin" };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">แก้ไขสินค้า</h1>
      <ProductForm product={product} />
    </div>
  );
}
