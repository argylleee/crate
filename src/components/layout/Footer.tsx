import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Crate. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-slate-500 hover:text-slate-900">
                            Privacy
                        </Link>
                        <Link href="#" className="text-sm text-slate-500 hover:text-slate-900">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}