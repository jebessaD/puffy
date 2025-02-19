// API route to fetch all product data from the database.
// It should handle GET requests to return a list of products.
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Sample route works!' });
}