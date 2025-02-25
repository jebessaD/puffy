import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PatchParams {
  params: { id: string };
}

interface RequestBody {
  stockQuantity: number;
}

/**
 * @route   PATCH /api/products/stock/:id
 * @desc    Update product stock
 * @access  Admin
 */
export async function PATCH(
  req: Request,
  { params }: PatchParams
): Promise<Response> {
  try {
    const { stockQuantity } = (await req.json()) as RequestBody;

    if (stockQuantity < 0) {
      return NextResponse.json(
        { error: "Stock quantity cannot be negative" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id: parseInt(params.id, 10) },
      data: { stockQuantity },
    });

    return NextResponse.json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
