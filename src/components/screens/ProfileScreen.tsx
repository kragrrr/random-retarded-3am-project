import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    if (!user) return null;

    return (
        <div className="flex flex-col items-center">
            {/* Profile Header */}
            <div className="w-full bg-[#D6FF99] h-32 relative mb-16">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-md">
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'Profile'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={signOut}
                    className="absolute top-4 right-4 px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-full hover:bg-rose-600"
                >
                    Sign Out
                </button>
            </div>

            {/* Rest of profile content remains the same */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <p className="text-gray-500 text-sm mb-4">@{user.email?.split('@')[0]}</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                    Travel enthusiast looking for new adventures.
                </p>
            </div>

            {/* Stats and other sections remain the same */}
            {/* ... */}
        </div>
    );
} 