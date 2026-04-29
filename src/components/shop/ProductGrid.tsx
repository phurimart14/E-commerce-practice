import ProductCard from "./ProductCard";
import type { Product } from "@/types";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="col-span-full py-24 text-center text-gray-400">
        ไม่พบสินค้าที่ค้นหา
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
