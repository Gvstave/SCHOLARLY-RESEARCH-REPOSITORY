import { User, Landmark, BookOpen } from 'lucide-react';
import FormField from '../ui/FormField';
import StatusBanner from '../ui/StatusBanner';

/**
 * Subcomponent managing profile updates, bios, specialties, and email visibility.
 */

export default function ProfileEditForm({
    profile,
    profileData,
    setProfileData,
    avatarPreview,
    showEmail,
    setShowEmail,
    userEmail,
    saving,
    saveStatus,
    handleSave
}) {
    return (
        <div className="h-fit space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                    <img
                        src={avatarPreview || profileData.avatar_url || "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-border shadow-sm"
                    />
                </div>

                <div className="space-y-1">
                    <h3 className="  text-primary">{profileData.fullName || 'Your name'}</h3>
                    <p className="text-primary-text ">{profileData.institution || 'No institution set'}</p>
                    <p className="text-primary-text  ">{profileData.specialty || 'Research area'}</p>
                    <div className="pt-1.5">
                        <span className={` px-2.5 py-1 ${profile?.role === 'admin' ? 'bg-primary text-white' : 'bg-[#FAF8F3] text-primary-text border border-border'}`}>
                            {profile?.role === 'admin' ? 'Admin' : 'Researcher'}
                        </span>
                    </div>
                </div>
            </div>

            <StatusBanner
                type={saveStatus.type}
                text={saveStatus.text}
                heading={
                    saveStatus.type === 'success' ? 'Profile saved'
                        : saveStatus.type === 'error' ? 'Save failed'
                            : 'Saving'
                }
            />

            <form onSubmit={handleSave} className="space-y-4 ">
                <FormField
                    label="Full name"
                    required
                    placeholder="e.g. Prof. Arthur Dent"
                    icon={User}
                    className="py-2 "
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                />

                <FormField
                    label="Institution"
                    required
                    placeholder="e.g. University of Zambia"
                    icon={Landmark}
                    className="py-2 "
                    value={profileData.institution}
                    onChange={(e) => setProfileData({ ...profileData, institution: e.target.value })}
                />

                <FormField
                    label="Research area"
                    placeholder="e.g. Theoretical particle physics"
                    icon={BookOpen}
                    className="py-2 "
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                />

                <FormField
                    label="About you"
                    type="textarea"
                    rows={4}
                    placeholder="A short bio about your background and research focus..."
                    className="p-2.5 "
                    value={profileData.about_author}
                    onChange={(e) => setProfileData({ ...profileData, about_author: e.target.value })}
                />

                <FormField
                    label="Email address"
                    disabled
                    className="px-3 py-2"
                    value={userEmail || ''}
                />

                <div className="flex items-start gap-2.5 pt-1 pb-2 text-left">
                    <input
                        id="show-email-toggle"
                        type="checkbox"
                        className="w-4 h-4 accent-primary border-border focus:ring-0 cursor-pointer mt-0.5 rounded-xs"
                        checked={showEmail}
                        onChange={(e) => setShowEmail(e.target.checked)}
                    />
                    <label htmlFor="show-email-toggle" className="cursor-pointer select-none">
                        <span className="block text-green-500">Allow visibility on my papers</span>
                        <span className='text-red-500'>
                            Let other signed-in users see my email on my public papers so they can contact me for collaboration.
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-primary border border-primary text-white py-2.5  hover:opacity-90 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save profile'}
                </button>
            </form>
        </div>
    );
}
