"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { OrderStatus } from "@/types";

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}
