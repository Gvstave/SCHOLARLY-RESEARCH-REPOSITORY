import React from 'react';
import { Layers } from 'lucide-react';
import InventoryPaperRow from './InventoryPaperRow';

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
        <div className="text-center py-10 text-gray-500 text-sm ">
          No papers yet.
        </div>
      ) : (
        <div className="divide-y divide-border border border-border bg-white shadow-sm overflow-hidden rounded-xs">
          {papers.map((paper) => (
            <InventoryPaperRow
              key={paper.id}
              paper={paper}
              handleDeletePaper={handleDeletePaper}
            />
          ))}
        </div>
      )}
    </div>
  );
}
