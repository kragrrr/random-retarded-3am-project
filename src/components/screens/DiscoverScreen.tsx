import { useSession } from 'next-auth/react';

export default function DiscoverScreen() {
    const { data: session } = useSession();

    return (
        <>
            {/* New Matches */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">New Matches</h2>
                    <button className="text-rose-500 text-sm">View more</button>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gray-200 mb-1"></div>
                            <p className="text-xs text-center truncate w-16">User {i}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Your Dates */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Dates</h2>
                    <button className="text-rose-500 text-sm">View more</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative rounded-lg bg-white shadow p-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 mb-2"></div>
                            <p className="font-medium">User {i}</p>
                            <p className="text-sm text-gray-500">Location</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
} 