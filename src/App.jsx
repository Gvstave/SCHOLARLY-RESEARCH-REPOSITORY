import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import { AuthProvider, useAuth } from './auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import Footer from './components/ui/Footer';
import Loader from './components/ui/Loader';
import Header from './components/sections/Header';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';

const UploadPaperForm = lazy(() => import('./components/UploadPaperForm'));
const SearchAndBrowse = lazy(() => import('./pages/SearchAndBrowse'));
const AdminModeration = lazy(() => import('./pages/AdminModeration'));
const ResearcherProfile = lazy(() => import('./pages/ResearcherProfile'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const AuthPortal = lazy(() => import('./components/AuthPortal'));

function ArchiveApp() {
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const browseMode = location.pathname === '/browse' || location.state?.fromBrowse === true;
    const activeTab = {
        '/submit': 'submit',
        '/profile': 'profile',
        '/admin': 'board',
        '/about': 'about',
    }[location.pathname] || 'search';
    const [showAuthOverlay, setShowAuthOverlay] = useState(false);
    useDocumentMetadata(activeTab, browseMode);

    useEffect(() => {
        if (user) setShowAuthOverlay(false);
    }, [user]);

    const handleRedirectToAuth = () => setShowAuthOverlay(true);
    const goHome = () => navigate('/');

    if (loading) {
        return <Loader fullScreen />;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-gray-100">

            {/* Editorial Header bar */}
            <Header
                activeTab={activeTab}
                browseMode={browseMode}
                onNavigate={navigate}
                setShowAuthOverlay={setShowAuthOverlay}
            />

            {/* Main Container Workspace */}
            <main className="grow mx-auto w-full">
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<SearchAndBrowse onRequireAuth={() => setShowAuthOverlay(true)} />} />
                        <Route path="/browse" element={<SearchAndBrowse onRequireAuth={() => setShowAuthOverlay(true)} />} />
                        <Route path="/paper/:paperId" element={<SearchAndBrowse onRequireAuth={() => setShowAuthOverlay(true)} />} />
                        <Route path="/submit" element={<ProtectedRoute onRedirectToAuth={handleRedirectToAuth}><UploadPaperForm /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute onRedirectToAuth={handleRedirectToAuth}><ResearcherProfile /></ProtectedRoute>} />
                        <Route path="/admin" element={<AdminRoute onRedirectToAuth={handleRedirectToAuth}><AdminModeration /></AdminRoute>} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
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
                            goHome();
                        }
                    }} />
                </Suspense>
            )}

        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ArchiveApp />
            </AuthProvider>
        </BrowserRouter>
    )
}
