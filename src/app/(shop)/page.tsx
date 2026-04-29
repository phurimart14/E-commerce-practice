import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/shop/ProductGrid";
import CategoryFilter from "@/components/shop/CategoryFilter";
import SearchBar from "@/components/shop/SearchBar";

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Books & Stationery",
];

export default async function HomePage({ searchParams }: Props) {
  const { q, category } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      ...(q && { name: { contains: q, mode: "insensitive" } }),
      ...(category && { category }),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">สินค้าทั้งหมด</h1>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchBar defaultValue={q} />
          <CategoryFilter categories={CATEGORIES} selected={category} />
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
