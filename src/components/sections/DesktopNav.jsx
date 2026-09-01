
import { Lock } from 'lucide-react';
import NavButton from '../ui/NavButton';

/**
 * DesktopNav component for Header.jsx.
 */
export default function DesktopNav({
    activeTab,
    browseMode,
    user,
    profile,
    onHome,
    onBrowse,
    onSubmit,
    onAbout,
    onBoard,
}) {
    return (
        <div className="hidden lg:flex flex-1 min-w-0 max-w-full items-center justify-center gap-5 xl:gap-10 overflow-hidden  text-primary">
            {!user && (
                <NavButton
                    isActive={activeTab === 'search' && !browseMode}
                    onClick={onHome}
                >
                    Home
                </NavButton>
            )}
            <NavButton
                isActive={activeTab === 'search' && browseMode}
                onClick={onBrowse}
            >
                Browse {!user && <Lock className="w-3 h-3   shrink-0" />}
            </NavButton>
            <NavButton
                isActive={activeTab === 'submit'}
                onClick={onSubmit}
            >
                Submit {!user && <Lock className="w-3 h-3   shrink-0" />}
            </NavButton>
            <NavButton
                isActive={activeTab === 'about'}
                onClick={onAbout}
            >
                About Us
            </NavButton>

            {profile?.role === 'admin' && (
                <NavButton
                    isActive={activeTab === 'board'}
                    onClick={onBoard}
                >
                    Admin
                </NavButton>
            )}
        </div>
    );
}
