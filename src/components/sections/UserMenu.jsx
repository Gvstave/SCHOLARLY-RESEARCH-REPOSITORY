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
        className="text-sm tracking-[0.24em] px-7 py-3 shadow-sm"
      >
        SIGN IN
      </Button>
    );
  }

  return (
    <div className="flex max-w-full min-w-0 items-stretch gap-2 overflow-hidden">
      <div
        onClick={() => setActiveTab('profile')}
        className="cursor-pointer transition border border-border p-1 rounded-full hover:bg-green-200"
      >
        <img
          src={profile?.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'}
          alt="User Portrait"
          className="w-7 h-7 rounded-full object-cover border border-border"
        />
      </div>
      <button
        onClick={() => {
          signOut();
          setActiveTab('search');
        }}
        className="flex max-w-full min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap px-3 py-1.5 border border-border hover:border-red-200 hover:bg-red-50 text-gray-600 hover:text-red-600 transition shrink-0 cursor-pointer bg-white text-sm font-bold tracking-[0.15em]"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span className="min-w-0 truncate">SIGN OUT</span>
      </button>
    </div>
  );
}
