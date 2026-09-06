 
import { useAuth } from '../auth';
import Loader from './ui/Loader';
import AccessNotice from './ui/AccessNotice';

export const AdminRoute = ({ children, onRedirectToAuth }) => {
 const { user, profile, loading } = useAuth();
 const isAuthorized = user && profile?.role === 'admin';

 if (loading) {
  return <Loader />;
 }

 if (!isAuthorized) {
  return (
   <AccessNotice
    title="Admins only"
    summary="Reserved for review board members"
    details="This page lets admins approve, reject or remove submitted papers."
        titleClassName="text-rose-800"
    onSignIn={!user ? onRedirectToAuth : undefined}
        footer={user ? `Signed in as ${profile?.full_name} — this account does not have administrator privileges.` : undefined}
   />
  );
 }

 return <>{children}</>;
};
