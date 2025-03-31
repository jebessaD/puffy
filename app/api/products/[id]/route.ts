import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params; // ✅ Await params (Next.js 15+ change)

    // Ensure ID is valid (if using auto-increment numbers)
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    const data = await req.json();

    const product = await prisma.product.update({
      where: { id: numericId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Product Update Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update product" },
      { status: 500 }
    );
  }
}
