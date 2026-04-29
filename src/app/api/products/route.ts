import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const category = searchParams.get("category");

  const products = await prisma.product.findMany({
    where: {
      ...(q && { name: { contains: q, mode: "insensitive" } }),
      ...(category && { category }),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({ data: parsed.data });
  return NextResponse.json(product, { status: 201 });
}
