import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getPapers, trackCitation, trackDownload } from '../services/api';
import { useAuth } from '../auth';
import { PAPER_CATEGORIES } from '../constants/categories';
import PaperDetails from '../components/sections/PaperDetails';
import VisitorHero from '../components/sections/VisitorHero';
import BrowseResults from '../components/sections/BrowseResults';
import { openDocumentSafely } from '../utils/safeUrl';
import { matchesInstitution, matchesPaperSearch } from '../utils/paperFilters';

export default function SearchAndBrowse({ onRequireAuth }) {
    const { user, profile, fetchProfile } = useAuth();
    const { paperId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedInstitution, setSelectedInstitution] = useState('All');
    const [loadError, setLoadError] = useState('');
    const categories = ['All', ...PAPER_CATEGORIES];
    const selectedPaper = paperId
        ? papers.find((paper) => String(paper.id) === String(decodeURIComponent(paperId)))
        : null;
    const isBrowseRoute = location.pathname === '/browse';
    const returnPath = location.state?.fromBrowse === true ? '/browse' : '/';
    const showResultsAnyway = isBrowseRoute && user;

    const inputRef = useCallback((node) => {
        if (!node) return undefined;
        const timer = setTimeout(() => {
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function fetchApprovedPapers() {
            setLoading(true);
            setLoadError('');
            try {
                const allPapers = await getPapers();
                if (!cancelled) setPapers(allPapers.filter((paper) => paper.status === 'approved'));
            } catch (error) {
                if (!cancelled) {
                    setPapers([]);
                    setLoadError(error?.message || 'There was a problem loading the papers!');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchApprovedPapers();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (!loading && paperId && papers.length > 0 && !selectedPaper) {
            navigate(returnPath, { replace: true });
        }
    }, [paperId, papers, loading, selectedPaper, navigate, returnPath]);

    const query = searchQuery.trim().toLowerCase();
    const filteredPapers = papers.filter((paper) => {
        const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
        return matchesCategory && matchesInstitution(paper, selectedInstitution) && matchesPaperSearch(paper, query);
    });

    const handleDownload = async (paper) => {
        if (!user) return;
        try {
            const result = await trackDownload(paper.id, user.id);
            openDocumentSafely(paper.file_url);
            if (!result?.alreadyLogged) {
                setPapers((previous) => previous.map((item) => item.id === paper.id
                    ? { ...item, downloads: (item.downloads || 0) + 1 }
                    : item));
            }
        } catch { }
    };

    const handleCite = async (paper) => {
        if (!user) {
            onRequireAuth?.();
            return;
        }
        try {
            const result = await trackCitation(paper.id, user.id);
            if (fetchProfile) await fetchProfile(user.id);
            if (!result?.alreadyLogged) {
                setPapers((previous) => previous.map((item) => item.id === paper.id
                    ? { ...item, citations: (item.citations || 0) + 1 }
                    : item));
            }
        } catch { }
    };

    if (loadError) {
        return (
            <div className="mx-auto my-8 max-w-3xl border border-red-200 bg-red-50 p-5 text-black" role="alert">
                <p className='text-inherit'>Could not load the Supabase catalog</p>
                <p className="mt-1 text-inherit">{loadError}</p>
            </div>
        );
    }

    if (selectedPaper) {
        return (
            <PaperDetails
                selectedPaper={selectedPaper}
                onBack={() => navigate(returnPath)}
                user={user}
                profile={profile}
                onRequireAuth={onRequireAuth}
                handleCite={handleCite}
                handleDownload={handleDownload}
            />
        );
    }

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

    return (
        <BrowseResults
            user={user}
            papers={papers}
            filteredPapers={filteredPapers}
            loading={loading}
            inputRef={inputRef}
            filters={{ searchQuery, categories, selectedCategory, selectedInstitution }}
            actions={{
                setSearchQuery,
                setSelectedCategory,
                setSelectedInstitution,
                openPaper: (paper) => navigate(`/paper/${encodeURIComponent(paper.id)}`, {
                    state: { fromBrowse: isBrowseRoute || location.state?.fromBrowse === true },
                }),
            }}
        />
    );
}
