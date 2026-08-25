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
 setShowAuthOverlay
}) {
 return (
  <div className="hidden lg:flex flex-1 min-w-0 max-w-full items-center justify-center gap-5 xl:gap-10 overflow-hidden  text-primary">
   {!user && (
    <NavButton
     isActive={activeTab === 'search' && !browseMode}
     onClick={() => {
      setActiveTab('search');
      setBrowseMode(false);
     }}
    >
     Home
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
    Browse {!user && <Lock className="w-3 h-3   shrink-0" />}
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
    Submit {!user && <Lock className="w-3 h-3   shrink-0" />}
   </NavButton>
   <NavButton
    isActive={activeTab === 'about'}
    onClick={() => setActiveTab('about')}
   >
    About us
   </NavButton>

   {profile?.role === 'admin' && (
    <NavButton
     isActive={activeTab === 'board'}
     onClick={() => setActiveTab('board')}
    >
     Admin
    </NavButton>
   )}
  </div>
 );
}