import { NextRequest, NextResponse } from 'next/server';
import { BookingFormData } from '@/types';

const bookings: (BookingFormData & { id: string; performerId: string; createdAt: string })[] = [];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { performerId, eventDate, eventTime, eventLocation, eventType } = body;

        if (!performerId || !eventDate || !eventTime || !eventLocation || !eventType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const booking = {
            id: crypto.randomUUID(),
            performerId,
            eventDate,
            eventTime,
            eventLocation,
            eventType,
            notes: body.notes || '',
            createdAt: new Date().toISOString(),
        };

        bookings.push(booking);

        return NextResponse.json(booking, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json(bookings);
}
