import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-amber-600">
                    <span>Crate</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                        Explore
                    </Link>
                    <Link href="#" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black">
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}