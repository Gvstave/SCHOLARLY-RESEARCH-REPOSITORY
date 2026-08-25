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
 const navItemClass = (isActive) => `w-full max-w-full min-w-0 overflow-hidden text-left py-3.5 flex items-center justify-between gap-3  transition ${
  isActive
   ? "text-primary "
   : "  hover:text-primary"
 }`;

 return (
  <div className="lg:hidden w-full max-w-full overflow-hidden border-t border-gray-100 bg-gray-50  divide-y divide-gray-100 px-4">
   {!user && (
    <button
     onClick={() => {
      setActiveTab("search");
      setBrowseMode(false);
      setMobileMenuOpen(false);
     }}
     className={navItemClass(activeTab === "search" && !browseMode)}
     aria-current={activeTab === "search" && !browseMode ? "page" : undefined}
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
    className={navItemClass(activeTab === "search" && browseMode)}
    aria-current={activeTab === "search" && browseMode ? "page" : undefined}
   >
    <span className="min-w-0  ">BROWSE</span>
    {!user && <Lock className="w-3.5 h-3.5   shrink-0" />}
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
    className={navItemClass(activeTab === "submit")}
    aria-current={activeTab === "submit" ? "page" : undefined}
   >
    <span className="min-w-0  ">SUBMIT</span>
    {!user && <Lock className="w-3.5 h-3.5   shrink-0" />}
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
    className={navItemClass(activeTab === "profile")}
    aria-current={activeTab === "profile" ? "page" : undefined}
   >
    <span className="min-w-0  ">PROFILE</span>
    {!user && <Lock className="w-3.5 h-3.5   shrink-0" />}
   </button>
   {profile?.role === "admin" && (
    <button
     onClick={() => {
      setActiveTab("board");
      setMobileMenuOpen(false);
     }}
     className={navItemClass(activeTab === "board")}
     aria-current={activeTab === "board" ? "page" : undefined}
    >
     <span className="min-w-0  ">ADMIN</span>
    </button>
   )}
   <button
    onClick={() => {
     setActiveTab("about");
     setMobileMenuOpen(false);
    }}
    className={navItemClass(activeTab === "about")}
    aria-current={activeTab === "about" ? "page" : undefined}
   >
    <span className="min-w-0  ">ABOUT US</span>
   </button>

   <div className="w-full max-w-full min-w-0 overflow-hidden py-4 space-y-3  ">
    {!user ? (
     <Button
      onClick={() => {
       setShowAuthOverlay(true);
       setMobileMenuOpen(false);
      }}
      fullWidth
      variant="primary"
      className="max-w-full min-w-0 py-2.5"
     >
      SIGN IN
     </Button>
    ) : (
     <div className="w-full max-w-full min-w-0 space-y-2">
      <Button
       onClick={() => {
        signOut();
        setActiveTab("search");
        setMobileMenuOpen(false);
       }}
       fullWidth
       variant="secondary"
       className="max-w-full min-w-0 py-2.5"
       leftIcon={<LogOut className="w-3.5 h-3.5" />}
      >
       Sign out
      </Button>
     </div>
    )}
   </div>
  </div>
 );
}
