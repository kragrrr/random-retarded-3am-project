import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

type UserDetails = {
    displayName: string;
    gender: string;
    birthDate: string;
    location: string;
    bio: string;
    interests: string[];
};

export default function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState<UserDetails>({
        displayName: user?.displayName || '',
        gender: '',
        birthDate: '',
        location: '',
        bio: '',
        interests: [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Save user details to database
        console.log('Saving user details:', userDetails);
        onComplete();
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                </label>
                <input
                    type="text"
                    value={userDetails.displayName}
                    onChange={(e) => setUserDetails({ ...userDetails, displayName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                </label>
                <select
                    value={userDetails.gender}
                    onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
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
                    value={userDetails.birthDate}
                    onChange={(e) => setUserDetails({ ...userDetails, birthDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <button
                onClick={() => setStep(2)}
                className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600"
            >
                Next
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                </label>
                <input
                    type="text"
                    value={userDetails.location}
                    onChange={(e) => setUserDetails({ ...userDetails, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="City, Country"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                </label>
                <textarea
                    value={userDetails.bio}
                    onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    required
                />
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => setStep(1)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600"
                >
                    Complete Profile
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
                        <p className="text-gray-500 mt-2">Tell us more about yourself</p>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-rose-500 text-white' : 'bg-gray-200'
                                }`}>
                                1
                            </div>
                            <div className={`w-16 h-1 ${step >= 2 ? 'bg-rose-500' : 'bg-gray-200'}`} />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-rose-500 text-white' : 'bg-gray-200'
                                }`}>
                                2
                            </div>
                        </div>
                    </div>

                    {step === 1 ? renderStep1() : renderStep2()}
                </div>
            </div>
        </div>
    );
} 