import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-7xl font-extrabold tracking-tight text-slate-200 sm:text-8xl">
                404
            </p>
            <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                We couldn&apos;t find that page
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                The page you&apos;re looking for may have moved, or the link
                might be broken.
            </p>

            <div className="mt-8">
                <Link
                    href="/"
                    className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition-colors hover:bg-amber-400"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
}