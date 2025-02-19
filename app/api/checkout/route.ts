// API route to handle the checkout process (e.g., payment initiation).
// It should handle POST requests to initiate a payment process.
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Sample route works!' });
}