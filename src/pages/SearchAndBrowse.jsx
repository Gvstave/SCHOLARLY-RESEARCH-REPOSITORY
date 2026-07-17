import React, { useEffect, useState, useCallback } from 'react';
import { getPapers, trackDownload, trackCitation } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, BookOpen, Download } from 'lucide-react';
import SearchFilters from '../components/sections/SearchFilters';
import PaperGrid from '../components/sections/PaperGrid';
import { PAPER_CATEGORIES } from '../constants/categories';
import PaperDetails from '../components/sections/PaperDetails';

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
      <div className="flex flex-col items-center justify-center py-20 md:py-36 px-4 max-w-4xl mx-auto text-center min-h-[65vh]">
        <div className="space-y-12 w-full flex flex-col items-center">
          <h2 className="text-[34px] sm:text-[46px] md:text-[56px] font-normal tracking-tight text-[#161B26] leading-[1.12] s max-w-3xl select-none text-center">
            Search papers, theses, and abstracts.
          </h2>
          <div className="w-full max-w-2xl relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5 stroke-2" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search papers..."
              className="w-full pl-15 pr-6 py-4.5 rounded-full text-sm sm:text-base font-normal hover:shadow-sm focus:shadow-sm focus:outline-none border border-border transition duration-300 text-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs s text-gray-400 font-bold tracking-widest">
            <span className="text-primary tracking-[0.25em] font-extrabold text-[10px]">TOPICS:</span>
            {categories.filter(c => c !== 'All').map((c) => (
              <button key={c} onClick={() => setSelectedCategory(c)} className="hover:text-primary cursor-pointer transition uppercase text-xs s text-gray-500 font-bold tracking-widest">
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
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
              className="text-primary hover:underline s text-xs font-bold tracking-widest uppercase mr-3 cursor-pointer"
            >
              ← Back to search
            </button>
          )}
          <h1 className="text-2xl font-extralight tracking-tight text-primary uppercase leading-none mt-2">Browse Papers</h1>
          <p className="text-primary s text-xs tracking-[0.2em] uppercase flex items-center gap-1.5 font-bold mt-1">
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
