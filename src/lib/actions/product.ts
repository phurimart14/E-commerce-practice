"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";
import { auth } from "@/lib/auth";

type ActionState = { error?: Record<string, string[]> } | undefined;

async function requireAdmin() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

function getRawData(formData: FormData) {
  return {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"),
    category: formData.get("category"),
    stock: formData.get("stock"),
  };
}

export async function createProduct(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const parsed = productSchema.safeParse(getRawData(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.product.create({ data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const parsed = productSchema.safeParse(getRawData(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.product.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}
