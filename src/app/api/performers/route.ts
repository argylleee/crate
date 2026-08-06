import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const genre = searchParams.get('genre') || '';

    const performers = await prisma.performer.findMany({
        where: {
            AND: [
                search
                    ? { name: { contains: search, mode: 'insensitive' } }
                    : {},
                category ? { category } : {},
                genre ? { genres: { has: genre } } : {},
            ],
        },
        orderBy: { rating: 'desc' },
    });

    return NextResponse.json(performers);
}
