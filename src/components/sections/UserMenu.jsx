import React from 'react';
import { LogOut } from 'lucide-react';
import Button from '../ui/Button';

/**
 * UserMenu component for Desktop Header.jsx.
 */
export default function UserMenu({
  user,
  profile,
  signOut,
  setActiveTab,
  setShowAuthOverlay,
}) {
  if (!user) {
    return (
      <Button
        onClick={() => setShowAuthOverlay(true)}
        variant="primary"
        className="text-[11px] tracking-[0.24em] px-7 py-3 shadow-sm"
      >
        SIGN IN
      </Button>
    );
  }

  return (
    <div className="flex items-stretch gap-2">
      <div
        onClick={() => setActiveTab('profile')}
        className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 transition bg-white/60 border border-border px-3 py-1.5"
      >
        <img
          src={profile?.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'}
          alt="User Portrait"
          className="w-7 h-7 rounded-full object-cover border border-border"
        />
        <div className="text-left">
          <p className="text-[10.5px] font-bold text-primary leading-none truncate max-w-30">
            {profile?.full_name || 'Researcher'}
          </p>
          <p className="text-[8px] text-primary font-bold uppercase tracking-widest mt-0.5">
            {profile?.role === 'admin' ? 'Admin' : 'Researcher'}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          signOut();
          setActiveTab('search');
        }}
        className="flex items-center gap-2 px-3 py-1.5 border border-border hover:border-red-200 hover:bg-red-50 text-gray-600 hover:text-red-600 transition shrink-0 cursor-pointer bg-white text-[10px] font-bold uppercase tracking-[0.15em]"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>SIGN OUT</span>
      </button>
    </div>
  );
}
