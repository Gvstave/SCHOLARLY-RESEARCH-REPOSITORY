import { lazy, Suspense, useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import Footer from './components/ui/Footer';
import Loader from './components/ui/Loader';
import Header from './components/sections/Header';
import { useHashNavigation } from './hooks/useHashNavigation';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';

const UploadPaperForm = lazy(() => import('./components/UploadPaperForm'));
const SearchAndBrowse = lazy(() => import('./pages/SearchAndBrowse'));
const AdminModeration = lazy(() => import('./pages/AdminModeration'));
const ResearcherProfile = lazy(() => import('./pages/ResearcherProfile'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const AuthPortal = lazy(() => import('./components/AuthPortal'));

function ArchiveApp() {
 const { user, loading } = useAuth();

 const { activeTab, setActiveTab, browseMode, setBrowseMode } = useHashNavigation(user, loading);
 const [showAuthOverlay, setShowAuthOverlay] = useState(false);
 useDocumentMetadata(activeTab, browseMode);

 useEffect(() => {
  if (user) setShowAuthOverlay(false);
 }, [user]);

 const handleRedirectToAuth = () => setShowAuthOverlay(true);

 if (loading) {
  return <Loader fullScreen />;
 }

 return (
  <div className="min-h-screen bg-white text-[#242A38] flex flex-col justify-between selection:bg-gray-100">

   {/* Editorial Header bar */}
   <Header
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    browseMode={browseMode}
    setBrowseMode={setBrowseMode}
    setShowAuthOverlay={setShowAuthOverlay}
   />

   {/* Main Container Workspace */}
   <main className="grow mx-auto w-full">
    <Suspense fallback={<Loader />}>
    {activeTab === 'search' && (
     <SearchAndBrowse initialBrowseAll={browseMode} onRequireAuth={() => setShowAuthOverlay(true)} />
    )}

    {activeTab === 'submit' && (
     <ProtectedRoute onRedirectToAuth={handleRedirectToAuth}>
      <UploadPaperForm />
     </ProtectedRoute>
    )}

    {activeTab === 'profile' && (
     <ProtectedRoute onRedirectToAuth={handleRedirectToAuth}>
      <ResearcherProfile />
     </ProtectedRoute>
    )}

    {activeTab === 'board' && (
     <AdminRoute onRedirectToAuth={handleRedirectToAuth}>
      <AdminModeration />
     </AdminRoute>
    )}

    {activeTab === 'about' && (
     <AboutUs />
    )}
    </Suspense>
   </main>

   {/* Editorial Footer Layout */}
   <Footer />

   {/* Authenticator Overlay Gate */}
   {showAuthOverlay && (
    <Suspense fallback={<Loader />}>
     <AuthPortal onDismiss={() => {
      setShowAuthOverlay(false);
      if (activeTab === 'submit' || activeTab === 'profile' || activeTab === 'board') {
       setActiveTab('search');
       setBrowseMode(false);
      }
     }} />
    </Suspense>
   )}

  </div>
 );
}

export default function App() {
 return (
  <AuthProvider>
   <ArchiveApp />
  </AuthProvider>
 );
}
