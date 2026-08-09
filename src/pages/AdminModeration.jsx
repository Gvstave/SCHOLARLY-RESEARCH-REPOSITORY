import React, { useEffect, useState } from 'react';
import { getPapers, updatePaperStatus, deletePaper } from '../services/api';
import { useAuth } from '../auth';
import { Eye } from 'lucide-react';
import ModerationStats from '../components/admin/ModerationStats';
import PendingPapersList from '../components/admin/PendingPapersList';
import AllPapersInventory from '../components/admin/AllPapersInventory';

/**
 * Controller page for administrative curation and manuscript moderation.
 * Leverages modular subcomponents for statistics, pending queue, and archive catalogs.
 */
export default function AdminModeration() {
  const { user, profile } = useAuth();
  const [papers, setPapers] = useState([]);
  const [pendingPapers, setPendingPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null);
  const [approvedCount, setApprovedCount] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalCitations, setTotalCitations] = useState(0);

  const fetchModerationData = async () => {
    setLoading(true);
    try {
      const allPapers = await getPapers();
      setPapers(allPapers);
      setPendingPapers(allPapers.filter((p) => p.status === 'pending'));

      let downloadsSum = 0;
      let citationsSum = 0;
      allPapers.forEach((p) => {
        downloadsSum += p.downloads || 0;
        citationsSum += p.citations || 0;
      });
      setApprovedCount(allPapers.filter((p) => p.status === 'approved').length);
      setTotalDownloads(downloadsSum);
      setTotalCitations(citationsSum);
    } catch {
      setPapers([]);
      setPendingPapers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModerationData();
  }, []);

  const handleUpdateStatus = async (paperId, newStatus) => {
    if (!user) return;
    setActioningId(paperId);
    try {
      await updatePaperStatus(paperId, newStatus, user.id);
      setPendingPapers((prev) => prev.filter((p) => p.id !== paperId));
      fetchModerationData();
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setActioningId(null);
    }
  };

  const handleDeletePaper = async (paperId) => {
    if (!user) return;
    if (!window.confirm('Delete this paper? This cannot be undone.')) return;
    try {
      await deletePaper(paperId);
      fetchModerationData();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const averageDownloadsPerApproved = approvedCount > 0
    ? (papers.filter(p => p.status === 'approved').reduce((sum, p) => sum + (p.downloads || 0), 0) / approvedCount).toFixed(1)
    : '0.0';

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 text-primary">
      <header className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-4xl font-extralight tracking-tight text-primary">Admin — Review Papers</h1>
          <p className="mt-1 text-gray-500 text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gray-500" /> Curate and manage submissions
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs bg-primary text-gray-100 border border-gray-950 px-3.5 py-1.5 font-semibold tracking-wider uppercase">
            Signed in as {profile?.full_name || 'Admin'}
          </span>
        </div>
      </header>

      {/* 1. Moderation stats summary */}
      <ModerationStats
        papers={papers}
        pendingPapers={pendingPapers}
        totalDownloads={totalDownloads}
        totalCitations={totalCitations}
        averageDownloadsPerApproved={averageDownloadsPerApproved}
      />

      {/* 2. Pending queue checks */}
      <PendingPapersList
        pendingPapers={pendingPapers}
        loading={loading}
        actioningId={actioningId}
        handleUpdateStatus={handleUpdateStatus}
      />

      {/* 3. Catalog collection review */}
      <AllPapersInventory
        papers={papers}
        handleDeletePaper={handleDeletePaper}
      />
    </div>
  );
}
