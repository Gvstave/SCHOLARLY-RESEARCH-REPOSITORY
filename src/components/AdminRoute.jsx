 
import { useAuth } from '../auth';
import Loader from './ui/Loader';

export const AdminRoute = ({ children, onRedirectToAuth }) => {
 const { user, profile, loading } = useAuth();
 const isAuthorized = user && profile?.role === 'admin';

 if (loading) {
  return <Loader />;
 }

 if (!isAuthorized) {
  return (
   <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-gray-100 my-8 max-w-2xl mx-auto">
    <h3 className="  text-rose-800">Admins only</h3>
    <p className="  mt-2">Reserved for review board members</p>
    <p className="mt-4   max-w-md">
     This page lets admins approve, reject or remove submitted papers.
    </p>
    {!user ? (
     <button
      onClick={onRedirectToAuth}
      className="mt-6 bg-primary text-white px-6 py-2.5 hover:bg-gray-800 transition"
     >
      Sign in
     </button>
    ) : (
     <span className="mt-6   block">
      Signed in as {profile?.full_name} — this account does not have administrator privileges.
     </span>
    )}
   </div>
  );
 }

 return <>{children}</>;
};
