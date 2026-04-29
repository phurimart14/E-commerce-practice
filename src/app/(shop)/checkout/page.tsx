import CheckoutForm from "@/components/shop/CheckoutForm";

export const metadata = { title: "ชำระเงิน — Mini Shop" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">ชำระเงิน</h1>
      <CheckoutForm />
    </div>
  );
}
