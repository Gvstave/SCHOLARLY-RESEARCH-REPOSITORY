import React from 'react';
import { Download, Award } from 'lucide-react';

/**
 * Modular subcomponent displaying system moderation stats.
 */
export default function ModerationStats({ papers, pendingPapers, totalDownloads, totalCitations, averageDownloadsPerApproved }) {
 return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
   <div className="bg-white border border-border p-5 shadow-sm space-y-2 text-left">
    <span className="    block">Papers in the archive</span>
    <div className="flex items-baseline gap-1.5">
     <span className=" text-primary">{papers.length}</span>
     <span className="  ">Total</span>
    </div>
    <p className="  ">{pendingPapers.length} waiting for review.</p>
   </div>

   <div className="bg-white border border-border p-5 shadow-sm space-y-2 text-left">
    <span className="    block">Total downloads</span>
    <div className="flex items-baseline gap-1.5">
     <span className=" text-primary flex items-center gap-1">
      <Download className="w-6 h-6 stroke-[1.5]" /> {totalDownloads}
     </span>
    </div>
    <p className="  ">
     Average of {averageDownloadsPerApproved} downloads per approved paper.
    </p>
   </div>

   <div className="bg-white border border-border p-5 shadow-sm space-y-2 text-left">
    <span className="    block">Total citations</span>
    <div className="flex items-baseline gap-1.5">
     <span className=" text-primary flex items-center gap-1">
      <Award className="w-6 h-6 stroke-[1.5]" /> {totalCitations}
     </span>
    </div>
    <p className="  ">Counted across all papers.</p>
   </div>
  </div>
 );
}
