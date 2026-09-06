import { useAuth } from '../auth';
import Loader from './ui/Loader';
import AccessNotice from './ui/AccessNotice';

export const ProtectedRoute = ({ children, onRedirectToAuth }) => {
 const { user, loading } = useAuth();

 if (loading) {
  return <Loader />;
 }

 if (!user) {
  return (
     <AccessNotice
        title="Please sign in"
        summary="This page is for signed-in researchers"
        details="Sign in to submit a paper, view your profile, or download the full text of a paper."
        onSignIn={onRedirectToAuth}
     />
  );
 }

 return <>{children}</>;
};
