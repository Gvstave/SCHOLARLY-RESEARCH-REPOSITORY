import React from 'react';
import { Layers, Trash2 } from 'lucide-react';
import PaperStatusBadge from '../ui/PaperStatusBadge';
import SubmitterEmailBadge from '../ui/SubmitterEmailBadge';

/**
 * Subcomponent presenting the full list of papers with an admin delete override.
 */
export default function AllPapersInventory({ papers, handleDeletePaper }) {
  return (
    <div className="space-y-6 pt-6 border-t border-border/60 text-left">
      <h2 className="text-xl font-semibold text-primary border-b border-border pb-3 flex items-center gap-1.5">
        <Layers className="w-5 h-5 text-primary-text stroke-[1.5]" /> All papers ({papers.length})
      </h2>

      {papers.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-xs uppercase tracking-wider">
          No papers yet.
        </div>
      ) : (
        <div className="divide-y divide-border border border-border bg-white shadow-sm overflow-hidden rounded-xs">
          {papers.map((paper) => (
            <div key={paper.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] tracking-wider uppercase font-bold text-primary bg-gray-50 border border-border px-1.5 py-0.5">
                    {paper.category}
                  </span>
                  <span className="text-[9.5px] uppercase text-gray-500 font-semibold">
                    {paper.year} &bull; Status: <PaperStatusBadge status={paper.status} variant="inline" />
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-primary leading-snug truncate">{paper.title}</h3>
                <p className="text-[10.5px] text-gray-500">
                  Author: <span className="font-bold text-[#00509b]">{paper.profiles?.full_name || 'Unknown'}</span> &bull; <span>{paper.profiles?.institution || 'Independent'}</span>
                </p>
                <SubmitterEmailBadge email={paper.submitter_email} size="sm" />
              </div>

              <div className="flex items-center gap-3 shrink-0 self-stretch justify-end md:self-auto">
                <button
                  onClick={() => handleDeletePaper(paper.id)}
                  className="border border-rose-200 hover:border-rose-600 bg-rose-50/30 text-rose-700 hover:bg-rose-700 hover:text-white px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer flex items-center gap-1.5 rounded-xs"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
