import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-gray-950 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Crate. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                            Privacy
                        </Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-300">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}