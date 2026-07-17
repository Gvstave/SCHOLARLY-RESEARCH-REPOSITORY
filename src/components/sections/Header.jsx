import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, LogOut, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import NavButton from '../ui/NavButton';

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

          {/* Account Info Bar & Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
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
                  title="Sign Out"
                  className="p-2 border border-border hover:bg-gray-100 text-gray-600 hover:text-primary transition shrink-0 cursor-pointer bg-white"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button
                onClick={() => setShowAuthOverlay(true)}
                variant="primary"
                className="text-[11px] tracking-[0.24em] px-7 py-3 shadow-sm"
              >
                JOIN
              </Button>
            )}
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
        <div className="lg:hidden border-t border-gray-100 bg-gray-50 text-xs uppercase tracking-wider font-bold divide-y divide-gray-100 px-4">
          {!user && (
            <button
              onClick={() => {
                setActiveTab('search');
                setBrowseMode(false);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-3.5 text-primary hover:text-emerald-600 block font-extrabold"
            >
              HOME
            </button>
          )}
          <button
            onClick={() => {
              if (!user) {
                setShowAuthOverlay(true);
                setMobileMenuOpen(false);
                return;
              }
              setActiveTab('search');
              setBrowseMode(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-3.5 text-primary hover:text-emerald-600 flex items-center justify-between font-extrabold"
          >
            <span>BROWSE</span>
            {!user && <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
          </button>

          <button
            onClick={() => {
              if (!user) {
                setShowAuthOverlay(true);
                setMobileMenuOpen(false);
                return;
              }
              setActiveTab('submit');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-3.5 text-primary-text hover:text-primary flex items-center justify-between font-bold"
          >
            <span>SUBMIT PAPER</span>
            {!user && <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
          </button>
          <button
            onClick={() => {
              if (!user) {
                setShowAuthOverlay(true);
                setMobileMenuOpen(false);
                return;
              }
              setActiveTab('profile');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-3.5 text-primary-text hover:text-primary flex items-center justify-between font-bold"
          >
            <span>YOUR PROFILE</span>
            {!user && <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
          </button>
          {profile?.role === 'admin' && (
            <button
              onClick={() => {
                setActiveTab('board');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-3.5 text-primary-text hover:text-primary flex items-center justify-between font-bold"
            >
              <span>ADMIN</span>
            </button>
          )}
          <button
            onClick={() => {
              setActiveTab('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-3.5 text-primary hover:text-emerald-600 flex items-center justify-between font-extrabold"
          >
            <span>ABOUT US</span>
          </button>

          <div className="py-4 space-y-3 font-normal capitalize">
            {!user ? (
              <Button
                onClick={() => {
                  setShowAuthOverlay(true);
                  setMobileMenuOpen(false);
                }}
                fullWidth
                variant="primary"
                className="text-[10px] py-2.5"
              >
                Sign In
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2 bg-white border border-border">
                  <img
                    src={profile?.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'}
                    alt="Avatar"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{profile?.full_name}</p>
                    <p className="text-[8.5px] uppercase text-gray-500 font-bold leading-none tracking-wider mt-0.5">{profile?.role}</p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    signOut();
                    setActiveTab('search');
                    setMobileMenuOpen(false);
                  }}
                  fullWidth
                  variant="secondary"
                  className="text-[10px] tracking-[0.2em] py-2.5"
                  leftIcon={<LogOut className="w-3.5 h-3.5" />}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
