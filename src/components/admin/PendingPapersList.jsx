import React from 'react';
import { ShieldAlert, FileSearch, Layers, Check, X } from 'lucide-react';
import SubmitterEmailBadge from '../ui/SubmitterEmailBadge';

/**
 * Subcomponent presenting manuscripts waiting for administrative approval.
 */
export default function PendingPapersList({ pendingPapers, loading, actioningId, handleUpdateStatus }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary border-b border-border pb-3 flex items-center gap-1.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 stroke-[1.5]" /> Waiting for review ({pendingPapers.length})
      </h2>

      {loading ? (
        <div className="text-gray-500 text-center py-10">Loading...</div>
      ) : pendingPapers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border bg-gray-50/50">
          <FileSearch className="w-8 h-8 text-gray-500 mx-auto stroke-[1.2] mb-3" />
          <h3 className="text-sm font-semibold text-primary">All caught up</h3>
          <p className="text-xs text-gray-600 mt-1 uppercase tracking-wider">Nothing to review right now</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingPapers.map((paper) => (
            <div key={paper.id} className="bg-white border border-border p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] text-primary-text tracking-wider uppercase font-bold bg-gray-50 px-2.5 py-1 border border-border inline-block w-fit">
                    {paper.category} &bull; Submitted {new Date(paper.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3 className="text-2xl font-bold text-primary leading-tight mt-1">{paper.title}</h3>
                  <p className="text-xs font-semibold text-primary-text flex items-center gap-1">
                    Author: <span className="text-primary">{paper.profiles?.full_name}</span> &bull; <span>{paper.profiles?.institution}</span>
                  </p>
                  <SubmitterEmailBadge email={paper.submitter_email} />
                </div>

                <div className="space-y-2 border-l-2 border-border pl-4">
                  <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-gray-400" /> Abstract
                  </h4>
                  <p className="text-xs text-primary-text leading-relaxed text-justify">{paper.abstract}</p>
                </div>

                {paper.introduction && (
                  <div className="space-y-1.5 text-xs text-primary-text text-left">
                    <span className="font-bold text-[9px] uppercase tracking-widest text-gray-500">Introduction</span>
                    <p className="leading-relaxed">"{paper.introduction}"</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-3 text-xs">
                <a
                  href={paper.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border py-3 text-center text-primary-text font-semibold hover:bg-gray-50 hover:border-gray-500 transition flex items-center justify-center gap-2"
                >
                  Open Manuscript
                </a>

                <button
                  onClick={() => handleUpdateStatus(paper.id, 'approved')}
                  disabled={actioningId === paper.id}
                  className="bg-emerald-700 text-white py-3 font-bold tracking-widest uppercase hover:bg-emerald-800 transition flex items-center justify-center gap-1.5 disabled:bg-border cursor-pointer"
                >
                  <Check className="w-4 h-4 text-white" /> Approve
                </button>

                <button
                  onClick={() => handleUpdateStatus(paper.id, 'rejected')}
                  disabled={actioningId === paper.id}
                  className="bg-gray-950 text-white py-3 font-bold tracking-widest uppercase hover:bg-primary transition flex items-center justify-center gap-1.5 disabled:bg-gray-300 cursor-pointer"
                >
                  <X className="w-4 h-4 text-white" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
