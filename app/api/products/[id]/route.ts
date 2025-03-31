import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // More specific type for params
): Promise<NextResponse> {
  try {
    const { id } = await context.params; // This is now properly typed

    console.log("here is an id", id);
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const data = await req.json();

    // Update product with timestamps
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Product Update Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
