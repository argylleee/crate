'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const firstName = session?.user?.name?.split(' ')[0];

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-amber-600">
                    <Image src="/logo/crate-logo.png" alt="Crate" width={32} height={32} priority />
                    <span>Crate</span>
                </Link>

                <div className="hidden items-center gap-6 sm:flex">
                    <Link href="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                        Explore
                    </Link>

                    {status === 'loading' ? (
                        <div className="h-9 w-24 animate-pulse rounded-full bg-slate-100" />
                    ) : status === 'authenticated' ? (
                        <>
                            <span className="text-sm text-slate-500">
                                {getGreeting()}, <span className="font-semibold text-slate-900">{firstName}</span>
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="cursor-pointer rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/auth/signin" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black">
                            Sign In
                        </Link>
                    )}
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                    className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100 sm:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <div className="relative h-4 w-5">
                        <span
                            className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
                                }`}
                        />
                        <span
                            className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                                }`}
                        />
                    </div>
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="space-y-1 border-t border-slate-200/80 bg-white px-4 py-4 shadow-sm">
                    {status === 'authenticated' && (
                        <p className="px-3 pb-2 text-sm text-slate-500">
                            {getGreeting()}, <span className="font-semibold text-slate-900">{firstName}</span>
                        </p>
                    )}
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Explore
                    </Link>
                    {status === 'authenticated' ? (
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                signOut({ callbackUrl: '/' });
                            }}
                            className="block w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            href="/auth/signin"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
