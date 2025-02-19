// API route to fetch order history for a user.
// It should handle GET requests to retrieve past orders.
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Sample route works!' });
}