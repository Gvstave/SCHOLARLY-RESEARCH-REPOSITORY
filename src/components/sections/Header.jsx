import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';
import DesktopNav from './DesktopNav';
import UserMenu from './UserMenu';
import MobileNav from './MobileNav';

export default function Header({
  activeTab,
  setActiveTab,
  browseMode,
  setBrowseMode,
  setShowAuthOverlay
}) {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Brand Layout */}
          <div className="flex flex-col text-left cursor-pointer" onClick={() => {
            setActiveTab('search');
            setBrowseMode(false);
          }}>
            <h1 className="text-primary hover:opacity-90 transition duration-205 text-sm md:text-md uppercase font-bold tracking-[0.22em] leading-tight select-none">
              THE CURATED ARCHIVE
            </h1>
            <span className="text-[8px] tracking-[0.28em] uppercase text-gray-500 mt-1 block font-bold select-none text-left">
              RESEARCH REPOSITORY
            </span>
          </div>

          {/* Desktop Navigation Link Toggles */}
          <DesktopNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            browseMode={browseMode}
            setBrowseMode={setBrowseMode}
            user={user}
            profile={profile}
            setShowAuthOverlay={setShowAuthOverlay}
          />

          {/* Account Info Bar & Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <UserMenu
              user={user}
              profile={profile}
              signOut={signOut}
              setActiveTab={setActiveTab}
              setShowAuthOverlay={setShowAuthOverlay}
            />
          </div>

          {/* Mobile menu triggers */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 border" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile slide menu context */}
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

