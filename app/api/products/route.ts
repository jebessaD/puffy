import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);

    // Only keep search and sorting parameters
    const sortBy =
    searchParams.get("sortBy") === "price" ? "price" : "createdAt";
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";
    const search = searchParams.get("search") || "";

    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              {
                description: { contains: search, mode: "insensitive" as const },
              },
            ],
          }
        : {}),
    };

    const products = await prisma.product.findMany({
      where: { ...where, isDeleted: false },
      orderBy: { [sortBy]: order },
      include: {
        reviews: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();

    if (!data.mainImage) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product Creation Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
