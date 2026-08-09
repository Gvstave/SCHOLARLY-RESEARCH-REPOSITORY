import React, { useEffect, useState } from 'react';
import { updateProfile, getPapers } from '../services/api';
import { useAuth } from '../auth';
import { User } from 'lucide-react';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import DeleteAccountCard from '../components/profile/DeleteAccountCard';
import UserPapersList from '../components/profile/UserPapersList';

/**
 * Page displaying the signed-in researcher's profile page and paper list.
 */
export default function ResearcherProfile() {
  const { user, profile, deleteAccount } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: '',
    institution: '',
    specialty: '',
    about_author: '',
    avatar_url: '',
    metadata: [],
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', text: '' });
  const [userPapers, setUserPapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (profile) {
      const isVisible = Array.isArray(profile.metadata) && profile.metadata.includes('show_email_true');
      setShowEmail(isVisible);
      setProfileData({
        fullName: profile.full_name || '',
        institution: profile.institution || '',
        specialty: profile.specialty || '',
        about_author: profile.about_author || '',
        avatar_url: profile.avatar_url || '',
        metadata: profile.metadata || [],
      });
      fetchUserPapers();
    }
  }, [profile]);

  const fetchUserPapers = async () => {
    if (!user) return;
    setLoadingPapers(true);
    try {
      const allPapers = await getPapers();
      const owned = allPapers.filter((p) => p.author_id === user.id);
      setUserPapers(owned);
    } catch {
      setUserPapers([]);
    } finally {
      setLoadingPapers(false);
    }
  };

  useEffect(() => {
    if (!avatarFile) return;
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  useEffect(() => {
    if (saveStatus && saveStatus.text && saveStatus.type !== 'info') {
      const timer = setTimeout(() => {
        setSaveStatus({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleAvatarSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveStatus({ type: 'info', text: 'Saving your profile...' });

    try {
      const emailStr = `email:${user.email}`;
      const cleanMeta = (profileData.metadata || []).filter(
        item => !item.startsWith('email:') && item !== 'show_email_true' && item !== 'show_email_false'
      );
      const updatedMetadata = [
        ...cleanMeta,
        emailStr,
        showEmail ? 'show_email_true' : 'show_email_false'
      ];

      const dataToSave = {
        ...profileData,
        metadata: updatedMetadata
      };

      const updated = await updateProfile(user.id, dataToSave, avatarFile);
      setSaveStatus({ type: 'success', text: 'Profile saved.' });
      setProfileData((prev) => ({
        ...prev,
        fullName: updated.full_name || updated.fullName || prev.fullName,
        institution: updated.institution || prev.institution,
        specialty: updated.specialty || prev.specialty,
        about_author: updated.about_author || prev.about_author,
        avatar_url: updated.avatar_url || prev.avatar_url,
        metadata: updated.metadata || prev.metadata,
      }));
    } catch (err) {
      setSaveStatus({ type: 'error', text: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deletingAccount) return;
    setDeletingAccount(true);
    setSaveStatus({ type: 'info', text: 'Deleting your account...' });
    try {
      await deleteAccount();
    } catch (err) {
      setSaveStatus({ type: 'error', text: `Failed to delete account: ${err.message}` });
      setDeletingAccount(false);
    }
  };

  return (
    <div className="mx-auto py-6 text-primary space-y-10">
      <header className="border-b border-border pb-6">
        <h1 className="text-4xl font-extralight tracking-tight text-primary">Your Profile</h1>
        <p className="mt-1 text-primary-text text-xs uppercase tracking-widest flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-gray-500" /> Your details and your papers
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-6 lg:col-span-1">
          <ProfileEditForm
            profile={profile}
            profileData={profileData}
            setProfileData={setProfileData}
            avatarPreview={avatarPreview}
            handleAvatarSelect={handleAvatarSelect}
            showEmail={showEmail}
            setShowEmail={setShowEmail}
            userEmail={user?.email}
            saving={saving}
            saveStatus={saveStatus}
            handleSave={handleSave}
          />

          <DeleteAccountCard
            showDeleteConfirm={showDeleteConfirm}
            setShowDeleteConfirm={setShowDeleteConfirm}
            handleDeleteAccount={handleDeleteAccount}
            deleting={deletingAccount}
          />
        </div>

        <UserPapersList
          loadingPapers={loadingPapers}
          userPapers={userPapers}
        />
      </div>
    </div>
  );
}
