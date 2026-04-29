import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "เพิ่มสินค้า — Admin" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">เพิ่มสินค้าใหม่</h1>
      <ProductForm />
    </div>
  );
}
