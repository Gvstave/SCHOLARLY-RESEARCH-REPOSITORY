import React from 'react';
import { Trash2 } from 'lucide-react';
import PaperStatusBadge from '../ui/PaperStatusBadge';
import SubmitterEmailBadge from '../ui/SubmitterEmailBadge';

/**
 * Component for a single paper record in the admin inventory overview.
 */
export default function InventoryPaperRow({ paper, handleDeletePaper }) {
  return (
    <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
      <div className="space-y-1 flex-1 min-w-0 text-left">
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
  );
}
