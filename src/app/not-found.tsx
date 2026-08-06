import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-white">404</h1>
            <p className="mt-4 text-gray-400">This page doesn&apos;t exist.</p>
            <Link
                href="/"
                className="mt-6 rounded-full bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-500"
            >
                Go Home
            </Link>
        </div>
    );
}