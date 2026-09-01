import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../auth';
import DesktopNav from './DesktopNav';
import UserMenu from './UserMenu';
import MobileNav from './MobileNav';
import Logo from '../ui/Logo';

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

    const goBrowse = () => {
        if (!user) { setShowAuthOverlay(true); return; }
        setActiveTab('search');
        setBrowseMode(true);
    };

    const goSubmit = () => {
        if (!user) { setShowAuthOverlay(true); return; }
        setActiveTab('submit');
    };

    const goProfile = () => {
        if (!user) { setShowAuthOverlay(true); return; }
        setActiveTab('profile');
    };

    const goAbout = () => setActiveTab('about');
    const goBoard = () => setActiveTab('board');
    const handleSignOut = () => { signOut(); goHome(); };

    return (
        <nav className="h-auto border-b border-gray-100 bg-white backdrop-blur-md sticky top-0 z-40 transition-shadow">
            <div className="mx-auto px-2 lg:px-8 h-20 flex justify-between gap-4 items-center">
                <Logo onClick={goHome} />
                <DesktopNav
                    activeTab={activeTab}
                    browseMode={browseMode}
                    user={user}
                    profile={profile}
                    onHome={goHome}
                    onBrowse={goBrowse}
                    onSubmit={goSubmit}
                    onAbout={goAbout}
                    onBoard={goBoard}
                />

                <div className="hidden lg:flex items-center gap-3 max-w-full min-w-0 shrink-0 overflow-hidden">
                    <UserMenu
                        user={user}
                        profile={profile}
                        onSignOut={handleSignOut}
                        onProfile={goProfile}
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

            {mobileMenuOpen && (
                <MobileNav
                    user={user}
                    profile={profile}
                    activeTab={activeTab}
                    browseMode={browseMode}
                    setMobileMenuOpen={setMobileMenuOpen}
                    onHome={goHome}
                    onBrowse={goBrowse}
                    onSubmit={goSubmit}
                    onProfile={goProfile}
                    onAbout={goAbout}
                    onBoard={goBoard}
                    onSignIn={() => setShowAuthOverlay(true)}
                    onSignOut={handleSignOut}
                />
            )}
        </nav>
    );
}
