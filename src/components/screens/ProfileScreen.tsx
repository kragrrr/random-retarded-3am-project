import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile, saveUserProfile } from '@/lib/firebase-utils';
import type { UserProfile } from '@/lib/types';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Omit<UserProfile, 'createdAt'>>({
        displayName: '',
        gender: '',
        birthDate: '',
        location: '',
        bio: '',
        interests: [],
    });

    useEffect(() => {
        async function loadProfile() {
            if (user?.uid) {
                const userProfile = await getUserProfile(user.uid);
                if (userProfile) {
                    const { createdAt, ...profileData } = userProfile;
                    setProfile(profileData);
                }
                setLoading(false);
            }
        }
        loadProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user?.uid) return;

        try {
            const success = await saveUserProfile(user.uid, profile);
            if (success) {
                setIsEditing(false);
            } else {
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (!user || loading) return null;

    if (isEditing) {
        return (
            <div className="p-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Edit Profile</h2>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={profile.displayName}
                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                value={profile.gender}
                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                value={profile.birthDate}
                                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="City, Country"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                            </label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                rows={4}
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-full hover:bg-rose-600"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={signOut}
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-full hover:bg-gray-600"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">{profile.displayName}</h2>
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <p className="text-gray-500 text-sm mb-4">@{user.email?.split('@')[0]}</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto mb-4">{profile.bio}</p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <span>{profile.gender}</span>
                    <span>•</span>
                    <span>{profile.location}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                    <p className="font-semibold text-lg">1,359</p>
                    <p className="text-sm text-gray-500">Likes</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-lg">876</p>
                    <p className="text-sm text-gray-500">Matches</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-lg">28</p>
                    <p className="text-sm text-gray-500">Dates</p>
                </div>
            </div>
        </div>
    );
} 