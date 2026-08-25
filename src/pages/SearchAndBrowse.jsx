import React, { useEffect, useState, useCallback } from 'react';
import { getPapers, trackDownload, trackCitation } from '../services/api';
import { useAuth } from '../auth';
import { PAPER_CATEGORIES } from '../constants/categories';
import PaperDetails from '../components/sections/PaperDetails';
import VisitorHero from '../components/sections/VisitorHero';
import BrowseResults from '../components/sections/BrowseResults';
import { openDocumentSafely } from '../utils/safeUrl';

export default function SearchAndBrowse({ initialBrowseAll = false, onRequireAuth }) {
 const { user, profile, fetchProfile } = useAuth();
 const [papers, setPapers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [selectedInstitution, setSelectedInstitution] = useState('All');
 const categories = ['All', ...PAPER_CATEGORIES];
 const [selectedPaper, setSelectedPaper] = useState(null);
 const [showResultsAnyway, setShowResultsAnyway] = useState(false);
 const [isHashInitialized, setIsHashInitialized] = useState(false);
 const [loadError, setLoadError] = useState('');

 const inputRef = useCallback((node) => {
  if (node) {
   const timer = setTimeout(() => {
    node.focus();
    const len = node.value.length;
    node.setSelectionRange(len, len);
   }, 0);
   return () => clearTimeout(timer);
  }
 }, []);

 const fetchApprovedPapers = async () => {
  setLoading(true);
  setLoadError('');
  try {
   const allPapers = await getPapers();
   const approved = allPapers.filter(p => p.status === 'approved');
   setPapers(approved);
  } catch (error) {
   setPapers([]);
   setLoadError(error?.message || 'The paper catalog could not be loaded.');
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => { 
  fetchApprovedPapers(); 
 }, []);

 useEffect(() => {
  setShowResultsAnyway(!!(initialBrowseAll && user));
 }, [initialBrowseAll, user]);

 // Sync hash to selectedPaper state
 useEffect(() => {
  const handleHashCheck = () => {
   const hash = window.location.hash;
   if (hash.startsWith('#paper-') && papers.length > 0) {
    const id = hash.replace('#paper-', '');
    const found = papers.find(p => p.id === id || String(p.id) === id);
    if (found) {
     setSelectedPaper(found);
    } else {
     setSelectedPaper(null);
    }
    setIsHashInitialized(true);
   } else if (!hash.startsWith('#paper-')) {
    setSelectedPaper(null);
    setIsHashInitialized(true);
   } else if (hash.startsWith('#paper-') && papers.length === 0 && !loading) {
    setIsHashInitialized(true);
   }
  };

  handleHashCheck();

  window.addEventListener('hashchange', handleHashCheck);
  return () => window.removeEventListener('hashchange', handleHashCheck);
 }, [papers, loading]);

 // Sync selectedPaper state back to URL hash
 useEffect(() => {
  if (loading || !isHashInitialized) return;

  if (selectedPaper) {
   const targetHash = `#paper-${selectedPaper.id}`;
   if (window.location.hash !== targetHash) {
    window.location.hash = `paper-${selectedPaper.id}`;
   }
  } else {
   if (window.location.hash.startsWith('#paper-')) {
    const fallback = initialBrowseAll ? '#browse' : '';
    if (fallback) {
     window.location.hash = fallback;
    } else {
     window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
   }
  }
 }, [selectedPaper, initialBrowseAll, loading, isHashInitialized]);

 const q = searchQuery.trim().toLowerCase();
 const filteredPapers = papers.filter((p) => {
  const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
  const paperInstitution = p.profiles?.institution || 'Independent / Other';
  const matchesUniv = selectedInstitution === 'All' ||
   paperInstitution === selectedInstitution ||
   (selectedInstitution === 'Independent / Other' && paperInstitution === 'Independent');
  const matchesSearch =
   (p.title || '').toLowerCase().includes(q) ||
   (p.abstract || '').toLowerCase().includes(q) ||
   (p.profiles?.full_name || '').toLowerCase().includes(q) ||
   (p.profiles?.institution || '').toLowerCase().includes(q) ||
   (p.category || '').toLowerCase().includes(q);
  return matchesCategory && matchesUniv && matchesSearch;
 });

 const handleDownload = async (paper) => {
  if (!user) return;
  try {
   const result = await trackDownload(paper.id, user.id);
   openDocumentSafely(paper.file_url);
   if (result && result.alreadyLogged) {
    return;
   }
   setPapers(prev => prev.map(x => x.id === paper.id ? { ...x, downloads: x.downloads + 1 } : x));
   if (selectedPaper?.id === paper.id) setSelectedPaper(s => s ? { ...s, downloads: s.downloads + 1 } : null);
  } catch { }
 };

 const handleCite = async (paper) => {
  if (!user) {
   onRequireAuth?.();
   return;
  }
  try {
   const result = await trackCitation(paper.id, user.id);
   if (fetchProfile) {
    await fetchProfile(user.id);
   }
   if (result && result.alreadyLogged) {
    return;
   }
   setPapers(prev => prev.map(x => x.id === paper.id ? { ...x, citations: x.citations + 1 } : x));
   if (selectedPaper?.id === paper.id) setSelectedPaper(s => s ? { ...s, citations: s.citations + 1 } : null);
  } catch { }
 };

 // ---- PAPER DETAIL VIEW ----
 if (loadError) {
  return (
   <div className="mx-auto my-8 max-w-3xl border border-red-200 bg-red-50 p-5 text-red-800" role="alert">
    <p className="">Could not load the Supabase catalog</p>
    <p className="mt-1">{loadError}</p>
   </div>
  );
 }

 if (selectedPaper) {
  return (
   <PaperDetails
    selectedPaper={selectedPaper}
    setSelectedPaper={setSelectedPaper}
    user={user}
    profile={profile}
    onRequireAuth={onRequireAuth}
    handleCite={handleCite}
    handleDownload={handleDownload}
   />
  );
 }

 // ---- HERO (visitor landing) ----
 if (searchQuery === '' && selectedCategory === 'All' && selectedInstitution === 'All' && !showResultsAnyway && !user) {
  return (
   <VisitorHero
    inputRef={inputRef}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    categories={categories}
    setSelectedCategory={setSelectedCategory}
   />
  );
 }

 // ---- RESULTS (visitors + signed-in) ----
 return <BrowseResults
  user={user}
  papers={papers}
  filteredPapers={filteredPapers}
  loading={loading}
  inputRef={inputRef}
  filters={{ searchQuery, categories, selectedCategory, selectedInstitution }}
  actions={{ setSearchQuery, setSelectedCategory, setSelectedInstitution, setShowResultsAnyway, setSelectedPaper }}
 />;
}
