import Link from 'next/link';
import Image from 'next/image';
import { Performer } from '@/types';

interface PerformerCardProps {
    performer: Performer;
}

export function PerformerCard({ performer }: PerformerCardProps) {
    return (
        <Link href={`/performers/${performer.id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                    src={performer.profilePhoto}
                    alt={performer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute left-3 top-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-slate-950 shadow-sm backdrop-blur-sm">
                    {performer.category}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-amber-600">{performer.name}</h3>
                        <p className="text-sm text-slate-500">{performer.genre} · {performer.location}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm font-medium text-slate-900">{performer.rating}</span>
                    </div>
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">
                    From ${performer.startingPrice}
                    <span className="font-normal text-slate-500"> / hr</span>
                </p>
            </div>
        </Link>
    );
}