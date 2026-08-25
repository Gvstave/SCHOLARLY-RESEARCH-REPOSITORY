import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../auth';
import DesktopNav from './DesktopNav';
import UserMenu from './UserMenu';
import MobileNav from './MobileNav';
import Logo from '../ui/Logo';
import logoImage from '../../assets/logo-light.png'

export default function Header({
 activeTab,
 setActiveTab,
 browseMode,
 setBrowseMode,
 setShowAuthOverlay,
}) {
 const { user, profile, signOut } = useAuth();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 const goHome = () => {
  setActiveTab('search');
  setBrowseMode(false);
 };

 return (
  <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-shadow">
   <div className="mx-auto px-2 lg:px-8">
    <div className="flex justify-between gap-4 h-20 items-center min-w-0 overflow-hidden">
     <Logo onClick={goHome} />
     <DesktopNav
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      browseMode={browseMode}
      setBrowseMode={setBrowseMode}
      user={user}
      profile={profile}
      setShowAuthOverlay={setShowAuthOverlay}
     />

     <div className="hidden lg:flex items-center gap-3 max-w-full min-w-0 shrink-0 overflow-hidden">
      <UserMenu
       user={user}
       profile={profile}
       signOut={signOut}
       setActiveTab={setActiveTab}
       setShowAuthOverlay={setShowAuthOverlay}
      />
     </div>

     <button
      type="button"
      onClick={() => setMobileMenuOpen((open) => !open)}
      className="lg:hidden p-2   hover:text-primary"
      aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={mobileMenuOpen}
     >
      {mobileMenuOpen ? <X className="w-6 h-6 border" /> : <Menu className="w-6 h-6" />}
     </button>
    </div>
   </div>

   {mobileMenuOpen && (
    <MobileNav
     user={user}
     profile={profile}
     activeTab={activeTab}
     setActiveTab={setActiveTab}
     browseMode={browseMode}
     setBrowseMode={setBrowseMode}
     setShowAuthOverlay={setShowAuthOverlay}
     setMobileMenuOpen={setMobileMenuOpen}
     signOut={signOut}
    />
   )}
  </nav>
 );
}
