import Link from 'next/link';
import Image from 'next/image';
import { Performer } from '@/types';

interface PerformerCardProps {
    performer: Performer;
}

export function PerformerCard({ performer }: PerformerCardProps) {
    return (
        <Link href={`/performers/${performer.id}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-900 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/5">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={performer.profilePhoto}
                    alt={performer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {performer.category}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-white">{performer.name}</h3>
                        <p className="text-sm text-gray-400">{performer.genre} · {performer.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-white">{performer.rating}</span>
                    </div>
                </div>
                <p className="mt-3 text-sm font-medium text-white">
                    From ${performer.startingPrice}
                    <span className="font-normal text-gray-500">/hr</span>
                </p>
            </div>
        </Link>
    );
}