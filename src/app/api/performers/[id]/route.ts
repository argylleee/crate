import { NextRequest, NextResponse } from 'next/server';
import { performers } from '@/data/performers';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const performer = performers.find((p) => p.id === id);

    if (!performer) {
        return NextResponse.json(
            { error: 'Performer not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(performer);
}
