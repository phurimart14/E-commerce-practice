import type { Product, Order, OrderItem, OrderStatus } from "@prisma/client";

export type { Product, Order, OrderItem, OrderStatus };

export type ProductWithOrderItems = Product & {
  orderItems: OrderItem[];
};

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};
