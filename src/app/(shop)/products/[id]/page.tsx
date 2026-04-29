import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/shop/AddToCartButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return {};
  return { title: `${product.name} — Mini Shop` };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  const outOfStock = product.stock === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        {/* รูปสินค้า */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit">
            {product.category}
          </Badge>

          <h1 className="text-2xl font-bold leading-snug sm:text-3xl">
            {product.name}
          </h1>

          <p className="text-3xl font-bold">
            {formatPrice(Number(product.price))}
          </p>

          <p className="leading-relaxed text-gray-600">{product.description}</p>

          <div className="text-sm text-gray-400">
            {outOfStock ? (
              <span className="text-red-500 font-medium">สินค้าหมด</span>
            ) : (
              <span>มีสินค้า {product.stock} ชิ้น</span>
            )}
          </div>

          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              imageUrl: product.imageUrl,
            }}
            disabled={outOfStock}
          />
        </div>
      </div>
    </div>
  );
}
