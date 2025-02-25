import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Admin
 */
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

    const product: Product = await prisma.product.create({ data });
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

/**
 * @route   GET /api/products
 * @desc    Fetch all products with filtering, sorting, and pagination
 * @access  Public
 */
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
