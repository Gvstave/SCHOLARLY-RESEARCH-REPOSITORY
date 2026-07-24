import React from 'react';
<<<<<<< HEAD
import { FileText, ShieldCheck } from 'lucide-react';
import PaperStatusBadge from '../ui/PaperStatusBadge';
=======
import { FileText } from 'lucide-react';
import UserPaperRow from './UserPaperRow';
>>>>>>> 8219436cc2aa07fbd686926a9c7603c7778a8a3b

/**
 * Lists research manuscripts authored by the signed-in user with status badges.
 */
export default function UserPapersList({ loadingPapers, userPapers }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="border-b border-border pb-3 text-left">
        <h2 className="text-2xl font-semibold text-primary">Your Papers</h2>
      </div>
      {loadingPapers ? (
        <div className="text-center text-primary-text py-14 font-semibold">Loading your papers...</div>
      ) : userPapers.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border bg-gray-50">
          <FileText className="w-8 h-8 text-gray-500 mx-auto stroke-[1.2] mb-3" />
          <h3 className="text-sm font-semibold text-primary">No papers yet</h3>
          <p className="text-xs text-gray-600 mt-1 uppercase tracking-wider">You haven't submitted any papers</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userPapers.map((paper) => (
<<<<<<< HEAD
            <div key={paper.id} className="bg-white border border-border p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4 hover:border-gray-500 transition text-left">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest font-bold text-primary-text block">
                  {paper.category} &bull; Submitted {new Date(paper.created_at).toLocaleDateString()}
                </span>
                <h3 className="text-lg font-normal text-primary leading-snug">{paper.title}</h3>
                <div className="text-[10.5px] text-primary-text flex items-center gap-3 mt-1">
                  <span>{paper.downloads || 0} downloads</span>
                  <span>&bull;</span>
                  <span>{paper.citations || 0} citations</span>
                  {paper.reviewed_by && (
                    <>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-500" /> Reviewed
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <PaperStatusBadge status={paper.status} />
              </div>
            </div>
=======
            <UserPaperRow key={paper.id} paper={paper} />
>>>>>>> 8219436cc2aa07fbd686926a9c7603c7778a8a3b
          ))}
        </div>
      )}
    </div>
  );
}
