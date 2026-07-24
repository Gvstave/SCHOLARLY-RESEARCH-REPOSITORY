import React from 'react';
import { Lock } from 'lucide-react';
import NavButton from '../ui/NavButton';

/**
 * DesktopNav component for Header.jsx.
 */
export default function DesktopNav({
  activeTab,
  setActiveTab,
  browseMode,
  setBrowseMode,
  user,
  profile,
  setShowAuthOverlay,
}) {
  return (
    <div className="hidden lg:flex items-center space-x-10 text-[10px] font-extrabold tracking-[0.22em] text-primary uppercase">
      {!user && (
        <NavButton
          isActive={activeTab === 'search' && !browseMode}
          onClick={() => {
            setActiveTab('search');
            setBrowseMode(false);
          }}
        >
          HOME
        </NavButton>
      )}
      <NavButton
        isActive={activeTab === 'search' && browseMode}
        onClick={() => {
          if (!user) {
            setShowAuthOverlay(true);
            return;
          }
          setActiveTab('search');
          setBrowseMode(true);
        }}
      >
        BROWSE {!user && <Lock className="w-3 h-3 text-gray-400 shrink-0" />}
      </NavButton>
      <NavButton
        isActive={activeTab === 'submit'}
        onClick={() => {
          if (!user) {
            setShowAuthOverlay(true);
            return;
          }
          setActiveTab('submit');
        }}
      >
        SUBMIT {!user && <Lock className="w-3 h-3 text-gray-400 shrink-0" />}
      </NavButton>
      <NavButton
        isActive={activeTab === 'about'}
        onClick={() => setActiveTab('about')}
      >
        ABOUT US
      </NavButton>

      {profile?.role === 'admin' && (
        <NavButton
          isActive={activeTab === 'board'}
          onClick={() => setActiveTab('board')}
        >
          ADMIN
        </NavButton>
      )}
    </div>
  );
}
