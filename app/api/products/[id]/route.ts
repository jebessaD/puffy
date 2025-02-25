import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RouteContext {
    params: { id: string };
}

/**
 * @route   GET /api/products/:id
 * @desc    Fetch a single product by ID
 * @access  Public
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(params.id, 10) },
            include: { reviews: true },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * @route   PATCH /api/products/:id
 * @desc    Update a product
 * @access  Admin
 */
export async function PATCH(req: NextRequest, { params }: RouteContext) {
    try {
        const data = await req.json();

        const product = await prisma.product.update({
            where: { id: parseInt(params.id, 10) },
            data,
        });

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Admin
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
    try {
        await prisma.product.delete({
            where: { id: parseInt(params.id, 10) },
        });

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
