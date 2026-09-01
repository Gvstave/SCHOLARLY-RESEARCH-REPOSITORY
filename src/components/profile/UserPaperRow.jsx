 
import { ShieldCheck } from 'lucide-react';
import PaperStatusBadge from '../ui/PaperStatusBadge';

/**
 * Component for a single research paper item in the researcher's works submission list.
 */
export default function UserPaperRow({ paper }) {
 return (
  <div className="bg-white border border-border p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4 hover:border-gray-500 transition text-left">
   <div className="space-y-1">
    <span className="  text-primary-text block">
     {paper.category} &bull; Submitted {new Date(paper.created_at).toLocaleDateString()}
    </span>
    <h3 className="    text-primary  ">{paper.title}</h3>
    <div className=" text-primary-text flex items-center gap-3 mt-1">
     <span>{paper.downloads || 0} downloads</span>
     <span>&bull;</span>
     <span>{paper.citations || 0} citations</span>
     {paper.reviewed_by && (
      <>
       <span>&bull;</span>
       <span className="flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5  " /> Reviewed
       </span>
      </>
     )}
    </div>
   </div>

   <div className="shrink-0 flex items-center">
    <PaperStatusBadge status={paper.status} />
   </div>
  </div>
 );
}
