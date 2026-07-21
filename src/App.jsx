import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import UploadPaperForm from './components/UploadPaperForm';
import SearchAndBrowse from './pages/SearchAndBrowse';
import AdminModeration from './pages/AdminModeration';
import ResearcherProfile from './pages/ResearcherProfile';
import AboutUs from './pages/AboutUs';
import AuthPortal from './components/AuthPortal';
import Footer from './components/ui/Footer';
import Loader from './components/ui/Loader';
import Header from './components/sections/Header';

function ArchiveApp() {
  const { user, profile, loading } = useAuth();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash === '#submit') return 'submit';
    if (hash === '#about') return 'about';
    if (hash === '#profile') return 'profile';
    if (hash === '#admin') return 'board';
    return 'search';
  });
  const [browseMode, setBrowseMode] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    return hash === '#browse';
  });
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  // Sync state changes to URL hash
  useEffect(() => {
    if (activeTab === 'search' && window.location.hash.startsWith('#paper-')) {
      return;
    }

    let hash = '';
    if (activeTab === 'search') {
      hash = browseMode ? 'browse' : '';
    } else if (activeTab === 'submit') {
      hash = 'submit';
    } else if (activeTab === 'about') {
      hash = 'about';
    } else if (activeTab === 'profile') {
      hash = 'profile';
    } else if (activeTab === 'board') {
      hash = 'admin';
    }

    if (hash) {
      if (window.location.hash !== `#${hash}`) {
        window.location.hash = hash;
      }
    } else {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, [activeTab, browseMode]);

  // Listen for browser navigation changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const protectedHashes = ['#submit', '#profile', '#admin', '#browse'];

      if (protectedHashes.includes(hash) && !user) {
        setActiveTab('search');
        setBrowseMode(false);
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        return;
      }

      if (hash === '#submit') {
        setActiveTab('submit');
      } else if (hash === '#about') {
        setActiveTab('about');
      } else if (hash === '#profile') {
        setActiveTab('profile');
      } else if (hash === '#admin') {
        setActiveTab('board');
      } else if (hash === '#browse') {
        setActiveTab('search');
        setBrowseMode(true);
      } else if (hash.startsWith('#paper-')) {
        setActiveTab('search');
      } else {
        setActiveTab('search');
        setBrowseMode(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  // Handle root URL redirect based on auth status, but do NOT override explicit hashes
  useEffect(() => {
    if (loading) return;
    const hash = window.location.hash;

    if (user) {
      if (!hash || hash === '#' || hash === '#home') {
        setActiveTab('search');
        setBrowseMode(true);
      }
    } else {
      const protectedHashes = ['#submit', '#profile', '#admin', '#browse'];
      if (!hash || hash === '#' || hash === '#home' || protectedHashes.includes(hash)) {
        setActiveTab('search');
        setBrowseMode(false);
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    }
  }, [user, loading]);

  // Dynamic SEO Updates for Search Engine Indexing
  useEffect(() => {
    let title = "The Curated Archive — Scholarly Research Repository";
    let desc = "An open-access academic repository indexing un-peer-reviewed papers and preprint manuscripts from Zambia's top universities.";

    if (activeTab === 'search') {
      if (browseMode) {
        title = "Browse Research Manuscripts — The Curated Archive";
        desc = "Explore our collection of un-peer-reviewed scholarly articles, scientific research, and academic preprints.";
      } else {
        title = "The Curated Archive — Institutional Academic Repository";
        desc = "Discover, submit, and search un-peer-reviewed preprint publications vetted for consistency by our administration.";
      }
    } else if (activeTab === 'submit') {
      title = "Submit Your Research — The Curated Archive";
      desc = "Submit your un-peer-reviewed academic manuscript or scientific research paper to our admin board for consistency checks and indexing.";
    } else if (activeTab === 'about') {
      title = "About The Archive — Scholarly Publishing Board";
      desc = "Learn about our open science mission, administrative review practices, university affiliates, and direct author feedback channels.";
    } else if (activeTab === 'profile') {
      title = "Researcher Profile — The Curated Archive";
      desc = "View published research history, manage submissions, and update your academic affiliation details.";
    } else if (activeTab === 'board') {
      title = "Academic Review Board — The Curated Archive";
      desc = "Approve, moderate, reject, or remove submitted academic papers after checking for formatting inconsistencies and errors.";
    }

    document.title = title;
    
    // Update or create meta description tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Update OpenGraph/Twitter elements
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
  }, [activeTab, browseMode]);

  // Trigger login redirect
  const handleRedirectToAuth = () => {
    setShowAuthOverlay(true);
  };

  if (loading) {
    return <Loader />;
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
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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
      </main>

      {/* Editorial Footer Layout */}
      <Footer />

      {/* Authenticator Overlay Gate */}
      {showAuthOverlay && (
        <AuthPortal onDismiss={() => {
          setShowAuthOverlay(false);
          if (activeTab === 'submit' || activeTab === 'profile' || activeTab === 'board') {
            setActiveTab('search');
            setBrowseMode(false);
          }
        }} />
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
