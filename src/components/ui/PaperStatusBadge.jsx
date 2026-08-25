import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

/**
 * Reusable badge for displaying a paper's review or publication status.
 * Supports a boxed style (e.g. for lists, profile views) or simple inline text.
 */
export default function PaperStatusBadge({ status, variant = 'boxed', className = '' }) {
 if (variant === 'inline') {
  const colorClass =
   status === 'approved'
    ? 'text-emerald-700 '
    : status === 'pending'
    ? 'text-amber-700 '
    : 'text-rose-700 ';
  return (
   <span className={`${colorClass} ${className}`}>
    {status}
   </span>
  );
 }

 // Boxed variant (default)
 const styleClass =
  status === 'approved'
   ? 'bg-[#EBF7EE] text-[#1E4D2B] border-[#D1ECD5]'
   : status === 'rejected'
   ? 'bg-[#FFF0F0] text-[#7A1F1D] border-[#FFD6D6]'
   : 'bg-[#FAF8F3] text-[#786121] border-[#EDE7D9]';

 return (
  <span className={` px-3 py-1 border flex items-center gap-1.5 rounded-xs w-fit ${styleClass} ${className}`}>
   {status === 'approved' ? (
    <>
     <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Approved
    </>
   ) : status === 'rejected' ? (
    <>
     <XCircle className="w-3.5 h-3.5 shrink-0" /> Rejected
    </>
   ) : (
    <>
     <Clock className="w-3.5 h-3.5 animate-pulse shrink-0" /> Pending review
    </>
   )}
  </span>
 );
}
