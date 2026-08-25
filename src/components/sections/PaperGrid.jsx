import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import PaperCard from '../cards/PaperCard';

// A grid of paper cards with loading + empty states.
export default function PaperGrid({ papers, loading, onOpen }) {
 if (loading) {
  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
    {[1, 2, 3, 4].map((n) => (
     <div key={n} className="w-full animate-pulse border border-border bg-white p-6 space-y-4 rounded-xs">
      <div className="h-4 bg-border w-1/4"></div>
      <div className="h-6 bg-border w-3/4"></div>
      <div className="h-16 bg-border w-full"></div>
     </div>
    ))}
   </div>
  );
 }

 if (!papers.length) {
  return (
   <div className="w-full text-center py-16 border border-dashed border-border bg-white/35">
    <SlidersHorizontal className="w-8 h-8 text-primary mx-auto stroke-[1.2] mb-3" />
    <p className="  max-w-sm mx-auto ">
     No papers match your filters. Try broader keywords or a different university.
    </p>
   </div>
  );
 }

 return (
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
   {papers.map((p) => (
    <PaperCard key={p.id} paper={p} onOpen={onOpen} />
   ))}
  </div>
 );
}
