 
import { LogOut } from 'lucide-react';
import Button from '../ui/Button';

/**
 * UserMenu component for Desktop Header.jsx.
 */
export default function UserMenu({
 user,
 profile,
 onSignOut,
 onProfile,
 setShowAuthOverlay,
}) {
 if (!user) {
  return (
   <Button
    onClick={() => setShowAuthOverlay(true)}
    variant="primary"
    className="px-7 py-3 shadow-sm"
   >
    SIGN IN
   </Button>
  );
 }

 return (
  <div className="flex max-w-full min-w-0 items-stretch gap-2 overflow-hidden">
   <div
    onClick={onProfile}
    className="cursor-pointer transition border border-border p-1 rounded-full hover:bg-green-200"
   >
    <img
     src={profile?.avatar_url || 'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg'}
     alt="User Portrait"
     className="w-7 h-7 rounded-full object-cover border border-border"
    />
   </div>
   <button
    onClick={onSignOut}
    className="flex max-w-full min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap px-3 py-1.5 border border-border hover:border-red-200 hover:bg-red-50   hover:text-red-600 transition shrink-0 cursor-pointer bg-white"
   >
    <LogOut className="w-3.5 h-3.5" />
    <span className="min-w-0">Sign out</span>
   </button>
  </div>
 );
}
