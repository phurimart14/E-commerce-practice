import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import DeleteOrderButton from "@/components/admin/DeleteOrderButton";
import type { Order, OrderItem, Product } from "@/types";

type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export const metadata = { title: "คำสั่งซื้อ — Admin" };

export default async function AdminOrdersPage() {
  const orders = (await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  })) as OrderWithItems[];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">คำสั่งซื้อ</h1>
        <p className="text-sm text-gray-500">{orders.length} รายการ</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-gray-400">
          ยังไม่มีคำสั่งซื้อ
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-gray-400">#{order.id}</p>
                  <p className="mt-0.5 font-semibold">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.customerPhone}</p>
                  <p className="mt-1 max-w-sm text-sm text-gray-500">
                    {order.customerAddress}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                    <DeleteOrderButton id={order.id} />
                  </div>
                  <p className="text-lg font-bold">
                    {formatPrice(Number(order.totalAmount))}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="mb-2 text-xs font-medium text-gray-400">
                  รายการสินค้า
                </p>
                <div className="space-y-1">
                  {order.items.map((item: OrderWithItems["items"][number]) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
