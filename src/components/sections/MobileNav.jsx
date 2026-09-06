import { Lock } from 'lucide-react';
import Button from '../ui/Button';

function AuthButton({ onClick, variant, children }) {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant={variant}
      className="max-w-full min-w-0 py-2.5"
    >
      {children}
    </Button>
  );
}

/** Mobile navigation drawer for Header.jsx. */
export default function MobileNav({
  user,
  profile,
  activeTab,
  browseMode,
  setMobileMenuOpen,
  onHome,
  onBrowse,
  onSubmit,
  onProfile,
  onAbout,
  onBoard,
  onSignIn,
  onSignOut,
}) {
  const navItemClass = (isActive) => `w-full max-w-full min-w-0 overflow-hidden text-left py-3.5 flex flex-row items-center justify-between gap-3 transition ${isActive
    ? 'text-primary'
    : 'hover:text-gray-500'
    }`;

  const runAndClose = (action) => () => {
    action();
    setMobileMenuOpen(false);
  };

  const items = [
    !user && { label: 'Home', isActive: activeTab === 'search' && !browseMode, onClick: onHome },
    { label: 'Browse', isActive: activeTab === 'search' && browseMode, onClick: onBrowse, locked: !user },
    { label: 'Submit', isActive: activeTab === 'submit', onClick: onSubmit, locked: !user },
    { label: 'Profile', isActive: activeTab === 'profile', onClick: onProfile, locked: !user },
    profile?.role === 'admin' && { label: 'Admin', isActive: activeTab === 'board', onClick: onBoard },
    { label: 'About Us', isActive: activeTab === 'about', onClick: onAbout },
  ].filter(Boolean);

  return (
    <div className="fixed left-0 h-[calc(100dvh-5rem)] overflow-y-auto lg:hidden w-full bg-gray-50 px-4 flex flex-col items-left justify-between">
      <div>
        {items.map(({ label, isActive, onClick, locked }) => (
          <button
            key={label}
            onClick={runAndClose(onClick)}
            className={navItemClass(isActive)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="min-w-0">{label}</span>
            {locked && <Lock className="w-3.5 h-3.5 shrink-0" />}
          </button>
        ))}
      </div>

      <div className="w-full max-w-full min-w-0 overflow-hidden py-4 space-y-3">
        {!user ? (
          <AuthButton onClick={runAndClose(onSignIn)} variant="primary">
            Sign in
          </AuthButton>
        ) : (
          <AuthButton onClick={runAndClose(onSignOut)} variant="secondary">
            Sign out
          </AuthButton>
        )}
      </div>
    </div>
  );
}
