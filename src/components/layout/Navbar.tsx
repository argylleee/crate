import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold text-white">
                    Crate
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm text-gray-400 transition-colors hover:text-white">
                        Explore
                    </Link>
                    <Link href="#" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-950 transition-colors hiver:bg-gray-200">
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}