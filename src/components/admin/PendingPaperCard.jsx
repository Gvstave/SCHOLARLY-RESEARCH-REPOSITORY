 
import { Layers, Check, X } from 'lucide-react';
import SubmitterEmailBadge from '../ui/SubmitterEmailBadge';
import { getSafeDocumentUrl } from '../../utils/safeUrl';

/**
 * Component for rendering a single pending paper card in the admin moderation view.
 */
export default function PendingPaperCard({ paper, actioningId, handleUpdateStatus }) {
 const manuscriptUrl = getSafeDocumentUrl(paper.file_url);
 return (
  <div className="bg-white border border-border p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-4 gap-8">
   <div className="lg:col-span-3 space-y-5 text-left">
    <div className="space-y-1">
     <span className=" text-primary-text bg-gray-50 px-2.5 py-1 border border-border inline-block w-fit">
      {paper.category} &bull; Submitted {new Date(paper.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
     </span>
     <h3 className="  text-primary   mt-1">{paper.title}</h3>
     <p className=" text-primary-text flex items-center gap-1">
      Author: <span className="text-primary">{paper.profiles?.full_name}</span> &bull; <span>{paper.profiles?.institution}</span>
     </p>
     <SubmitterEmailBadge email={paper.submitter_email} />
    </div>

    <div className="space-y-2 border-l-2 border-border pl-4">
     <h4 className="   flex items-center gap-1">
      <Layers className="w-3.5 h-3.5  " /> Abstract
     </h4>
     <p className=" text-primary-text   text-justify">{paper.abstract}</p>
    </div>

    {paper.introduction && (
     <div className="space-y-1.5 text-primary-text text-left">
      <span className="   ">Introduction</span>
      <p className=" ">"{paper.introduction}"</p>
     </div>
    )}
   </div>

   <div className="flex flex-col justify-center gap-3 ">
    {manuscriptUrl ? (
     <a
      href={manuscriptUrl}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className="border border-border py-3 text-center text-primary-text hover:bg-gray-50 hover:border-gray-500 transition flex items-center justify-center gap-2"
     >
      Open Manuscript
     </a>
    ) : (
     <span className="border border-border py-3 text-center   " aria-disabled="true">
      Manuscript unavailable
     </span>
    )}

    <button
     onClick={() => handleUpdateStatus(paper.id, 'approved')}
     disabled={actioningId === paper.id}
     className="bg-emerald-700 text-white py-3  hover:bg-emerald-800 transition flex items-center justify-center gap-1.5 disabled:bg-border cursor-pointer"
    >
     <Check className="w-4 h-4 text-white" /> Approve
    </button>

    <button
     onClick={() => handleUpdateStatus(paper.id, 'rejected')}
     disabled={actioningId === paper.id}
     className="bg-gray-950 text-white py-3  hover:bg-primary transition flex items-center justify-center gap-1.5 disabled:bg-gray-300 cursor-pointer"
    >
     <X className="w-4 h-4 text-white" /> Reject
    </button>
   </div>
  </div>
 );
}
