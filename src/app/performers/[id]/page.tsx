import { notFound } from 'next/navigation';
import Image from 'next/image';
import { performers } from '@/data/performers';
import { BookingForm } from '@/components/performers/BookingForm';
import type { Metadata } from 'next';

interface PerformerPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PerformerPageProps): Promise<Metadata> {
    const { id } = await params;
    const performer = performers.find((p) => p.id === id);

    if (!performer) {
        return { title: 'Performer Not Found' };
    }

    return {
        title: performer.name,
        description: performer.bio.slice(0, 160),

    };
}

export default async function PerformerPage({ params }: PerformerPageProps) {
    const { id } = await params;
    const performer = performers.find((p) => p.id === id);

    if (!performer) {
        notFound();
    }

    return (
        <div className='min-h-screen bg-slate-50/50'>
            <div className='relative h-64 sm:h-80 lg:h-96 bg-slate-900'>
                <Image
                    src={performer.coverImage}
                    alt={`${performer.name} cover`}
                    fill
                    className='object-cover'
                    priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
            </div>

            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='relative -mt-20 mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end'>
                    <div className='relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl'>
                        <Image
                            src={performer.profilePhoto}
                            alt={performer.name}
                            fill
                            className='object-cover'
                        />
                    </div>
                    <div className='space-y-1'>
                        <span className='inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200'>
                            {performer.category}
                        </span>
                        <h1 className='text-3xl font-extrabold text-slate-900 sm:text-4xl'>
                            {performer.name}
                        </h1>
                        <p className='text-sm font-medium text-slate-600'>
                            {performer.location} · <span className='text-amber-500'>★</span>
                            <span className='font-semibold text-slate-900'>
                                {performer.rating}
                            </span>
                            ({performer.reviewCount} reviews)
                        </p>
                    </div>
                </div>

                <div className='grid gap-12 pb-20 lg:grid-cols-3'>
                    <div className='space-y-10 lg:col-span-2'>
                        <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                            <h2 className='mb-4 text-xl font-bold text-slate-900'>About</h2>
                            <p className="leading-relaxed text-slate-600">{performer.bio}</p>
                        </section>
                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-slate-900">Genres</h2>
                            <div className="flex flex-wrap gap-2">
                                {performer.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-800"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-slate-900">Gallery</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {performer.gallery.map((img, index) => (
                                    <div key={index} className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                                        <Image
                                            src={img}
                                            alt={`${performer.name} gallery ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-slate-900">Pricing Packages</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {performer.pricing.map((tier) => (
                                    <div
                                        key={tier.label}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                                    >
                                        <p className="font-semibold text-slate-900">{tier.label}</p>
                                        <p className="text-sm text-slate-500">{tier.hours} hour{tier.hours !== 1 ? 's' : ''}</p>
                                        <p className="mt-2 text-2xl font-extrabold text-amber-600">${tier.price}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                            <div className="mb-6 border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-slate-900">Book {performer.name}</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Starting at <span className="font-bold text-slate-900">${performer.startingPrice}</span> / hr
                                </p>
                            </div>
                            <BookingForm performerName={performer.name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
