 
import { ShieldAlert, FileSearch } from 'lucide-react';
import PendingPaperCard from './PendingPaperCard';

/**
 * Subcomponent presenting manuscripts waiting for administrative approval.
 */
export default function PendingPapersList({ pendingPapers, loading, actioningId, handleUpdateStatus }) {
 return (
  <div className="space-y-6">
   <h2 className="  text-primary border-b border-border pb-3 flex items-center gap-1.5">
    <ShieldAlert className="w-5 h-5 text-amber-700 stroke-[1.5]" /> Waiting for review ({pendingPapers.length})
   </h2>

   {loading ? (
    <div className="  text-center py-10">Loading...</div>
   ) : pendingPapers.length === 0 ? (
    <div className="text-center py-16 border border-dashed border-border bg-gray-50/50">
     <FileSearch className="w-8 h-8   mx-auto stroke-[1.2] mb-3" />
     <h3 className=" text-primary">All caught up</h3>
     <p className="   mt-1 ">Nothing to review right now</p>
    </div>
   ) : (
    <div className="space-y-6">
     {pendingPapers.map((paper) => (
      <PendingPaperCard
       key={paper.id}
       paper={paper}
       actioningId={actioningId}
       handleUpdateStatus={handleUpdateStatus}
      />
     ))}
    </div>
   )}
  </div>
 );
}
