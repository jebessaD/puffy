
import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();

    // Ensure mainImage is provided
    if (!data.mainImage) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({ data });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);

    // Filters
    const category = searchParams.get("category") ?? undefined;
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "1000000");
    const sortBy = searchParams.get("sortBy") || "createdAt"; // Default sorting by newest
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
      where: {
        category,
        price: { gte: minPrice, lte: maxPrice },
      },
      orderBy: { [sortBy]: order },
      include: { reviews: true },
      skip,
      take: pageSize,
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return NextResponse.json({ products, totalPages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}
