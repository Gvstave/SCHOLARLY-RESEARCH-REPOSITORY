 
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
     <span className=" text-primary bg-gray-50 border border-border px-1.5 py-0.5">
      {paper.category}
     </span>
     <span className="   ">
      {paper.year} &bull; Status: <PaperStatusBadge status={paper.status} variant="inline" />
     </span>
    </div>
    <h3 className=" text-primary    ">{paper.title}</h3>
    <p className="  ">
     Author: <span className=" text-[#00509b]">{paper.profiles?.full_name || 'Unknown'}</span> &bull; <span>{paper.profiles?.institution || 'Independent'}</span>
    </p>
    <SubmitterEmailBadge email={paper.submitter_email} size="sm" />
   </div>

   <div className="flex items-center gap-3 shrink-0 self-stretch justify-end md:self-auto">
    <button
     onClick={() => handleDeletePaper(paper.id)}
     className="border border-rose-200 hover:border-rose-600 bg-rose-50/30 text-rose-700 hover:bg-rose-700 hover:text-white px-3 py-1.5  transition cursor-pointer flex items-center gap-1.5 rounded-xs"
    >
     <Trash2 className="w-3.5 h-3.5 shrink-0" /> Delete
    </button>
   </div>
  </div>
 );
}
