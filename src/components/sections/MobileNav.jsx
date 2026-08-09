import React from "react";
import { Lock, LogOut } from "lucide-react";
import Button from "../ui/Button";

/**
 * MobileNav drawer component for Header.jsx.
 */
export default function MobileNav({
  user,
  profile,
  activeTab,
  setActiveTab,
  browseMode,
  setBrowseMode,
  setShowAuthOverlay,
  setMobileMenuOpen,
  signOut,
}) {
  return (
    <div className="lg:hidden border-t border-gray-100 bg-gray-50 text-xs uppercase tracking-wider font-bold divide-y divide-gray-100 px-4">
      {!user && (
        <button
          onClick={() => {
            setActiveTab("search");
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
          setActiveTab("search");
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
          setActiveTab("submit");
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
          setActiveTab("profile");
          setMobileMenuOpen(false);
        }}
        className="w-full text-left py-3.5 text-primary-text hover:text-primary flex items-center justify-between font-bold"
      >
        <span>YOUR PROFILE</span>
        {!user && <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
      </button>
      {profile?.role === "admin" && (
        <button
          onClick={() => {
            setActiveTab("board");
            setMobileMenuOpen(false);
          }}
          className="w-full text-left py-3.5 text-primary-text hover:text-primary flex items-center justify-between font-bold"
        >
          <span>ADMIN</span>
        </button>
      )}
      <button
        onClick={() => {
          setActiveTab("about");
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
            <Button
              onClick={() => {
                signOut();
                setActiveTab("search");
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
  );
}
