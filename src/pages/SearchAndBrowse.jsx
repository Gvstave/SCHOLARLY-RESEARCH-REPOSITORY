import React, { useEffect, useState, useCallback } from 'react';
import { getPapers, trackDownload, trackCitation } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';
import SearchFilters from '../components/sections/SearchFilters';
import PaperGrid from '../components/sections/PaperGrid';
import { PAPER_CATEGORIES } from '../constants/categories';
import PaperDetails from '../components/sections/PaperDetails';
import VisitorHero from '../components/sections/VisitorHero';

export default function SearchAndBrowse({ initialBrowseAll = false, onRequireAuth }) {
  const { user, profile, fetchProfile } = useAuth();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedInstitution, setSelectedInstitution] = useState('All');
  const [categories, setCategories] = useState(['All', ...PAPER_CATEGORIES]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showResultsAnyway, setShowResultsAnyway] = useState(false);
  const [isHashInitialized, setIsHashInitialized] = useState(false);

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
    try {
      const allPapers = await getPapers();
      const approved = allPapers.filter(p => p.status === 'approved');
      setPapers(approved);
    } catch (err) {
      console.error('Failed to load papers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApprovedPapers(); }, []);

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

  const q = searchQuery.toLowerCase();
  const filteredPapers = papers.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesUniv = selectedInstitution === 'All' || p.profiles?.institution === selectedInstitution;
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
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
      window.open(paper.file_url, '_blank');
      if (result && result.alreadyLogged) {
        return;
      }
      setPapers(prev => prev.map(x => x.id === paper.id ? { ...x, downloads: x.downloads + 1 } : x));
      if (selectedPaper?.id === paper.id) setSelectedPaper(s => s ? { ...s, downloads: s.downloads + 1 } : null);
    } catch (err) { console.error(err); }
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
    } catch (err) { console.error(err); }
  };

  // ---- PAPER DETAIL VIEW ----
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
  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4 text-primary">
      <header className="border-b border-border pb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="space-y-1 text-left">
          {!user && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedInstitution('All'); setShowResultsAnyway(false); }}
              className="text-primary hover:underline text-xs font-bold tracking-widest uppercase mr-3 cursor-pointer"
            >
              ← Back to search
            </button>
          )}
          <h1 className="text-2xl font-extralight tracking-tight text-primary uppercase leading-none mt-2">Browse Papers</h1>
          <p className="text-primary text-xs tracking-[0.2em] uppercase flex items-center gap-1.5 font-bold mt-1">
            <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" /> {filteredPapers.length} of {papers.length} papers
          </p>
        </div>
      </header>

      <SearchFilters
        inputRef={inputRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedInstitution={selectedInstitution}
        setSelectedInstitution={setSelectedInstitution}
      />

      <PaperGrid
        papers={filteredPapers}
        loading={loading}
        onOpen={setSelectedPaper}
        columns={user ? 4 : 3}
      />
    </div>
  );
}
