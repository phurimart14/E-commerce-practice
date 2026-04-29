import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <CardContent className="flex-1 p-4">
          <Badge variant="secondary" className="mb-2 text-xs">
            {product.category}
          </Badge>
          <h3 className="font-medium leading-snug line-clamp-2">
            {product.name}
          </h3>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
          <span className="text-lg font-bold">
            {formatPrice(Number(product.price))}
          </span>
          <span className="text-xs text-gray-400">
            {product.stock > 0 ? `เหลือ ${product.stock}` : "หมด"}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
