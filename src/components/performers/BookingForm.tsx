'use client';

import { useState } from 'react';
import type { BookingFormData, EventType } from '@/types';

interface BookingFormProps {
    performerName: string;
}

const eventTypes: EventType[] = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Club Night',
    'Festival',
    'Private Event',
    'Concert',
    'Other',
];

interface BookingFormProps {
    performerName: string;
}

export function BookingForm({ performerName }: BookingFormProps) {
    const [formData, setFormData] = useState<BookingFormData>({
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        eventType: '' as EventType,
        notes: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking submitted:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="rounded-xl bg-emerald-50 p-6 text-center border border-emerald-200">
                <div className="mb-2 text-4xl">🎉</div>
                <h3 className="text-lg font-bold text-emerald-900">Booking Request Sent!</h3>
                <p className="mt-2 text-sm text-emerald-700">
                    We&apos;ll connect you with {performerName} shortly.
                </p>
                <button
                    onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                            eventDate: '',
                            eventTime: '',
                            eventLocation: '',
                            eventType: '' as EventType,
                            notes: '',
                        });
                    }}
                    className="mt-4 text-sm font-bold text-amber-600 hover:text-amber-700"
                >
                    Submit another request
                </button>
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="eventDate" className="mb-1 block text-sm font-medium text-slate-700">
                    Event Date
                </label>
                <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
            </div>
            <div>
                <label htmlFor="eventTime" className="mb-1 block text-sm font-medium text-slate-700">
                    Event Time
                </label>
                <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
            </div>
            <div>
                <label htmlFor="eventLocation" className="mb-1 block text-sm font-medium text-slate-700">
                    Event Location
                </label>
                <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    placeholder="Venue name or address"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
            </div>
            <div>
                <label htmlFor="eventType" className="mb-1 block text-sm font-medium text-slate-700">
                    Event Type
                </label>
                <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="notes" className="mb-1 block text-sm font-medium text-slate-700">
                    Additional Notes
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requests or details..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition-all hover:bg-amber-600 active:scale-[0.99]"
            >
                Book Now
            </button>
        </form>
    );
}
