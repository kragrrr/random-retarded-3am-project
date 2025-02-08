import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DiscoverScreen from '@/components/screens/DiscoverScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import ChatScreen from '@/components/screens/ChatScreen';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

export default function Home() {
    const { user, loading, signInWithGoogle } = useAuth();
    const [activeTab, setActiveTab] = useState('discover');
    const [isNewUser, setIsNewUser] = useState(true); // TODO: Get this from database

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Welcome</h1>
                        <p className="text-black">Find your perfect match today</p>
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                            <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z" />
                            <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.6-1.27 3.41-1.27 5.38s.46 3.78 1.27 5.38l3.98-3.09z" />
                            <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>
            </div>
        );
    }

    if (isNewUser) {
        return <OnboardingScreen onComplete={() => setIsNewUser(false)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
                    {activeTab === 'discover' ? (
                        <>
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold">Discover</h1>
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold">{activeTab === 'near' ? 'Near You' : 'My Profile'}</h1>
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-xl mx-auto px-4 py-6 mb-20">
                {activeTab === 'discover' && <DiscoverScreen />}
                {activeTab === 'chat' && <ChatScreen />}
                {activeTab === 'profile' && <ProfileScreen />}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
                <div className="max-w-xl mx-auto px-4 py-3 flex justify-around">
                    <button
                        onClick={() => setActiveTab('discover')}
                        className={`p-2 ${activeTab === 'discover' ? 'text-rose-500' : 'text-gray-500'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`p-2 ${activeTab === 'chat' ? 'text-rose-500' : 'text-gray-500'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`p-2 ${activeTab === 'profile' ? 'text-rose-500' : 'text-gray-500'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
}