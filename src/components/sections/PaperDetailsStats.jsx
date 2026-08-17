import React from 'react';

/**
 * PaperDetailsStats sub-component displaying download and citation counts.
 */
export default function PaperDetailsStats({ downloads, citations }) {
  return (
    <div className="border border-border p-5 space-y-3.5 bg-white/40 text-left">
      <h4 className="text-sm font-bold tracking-widest text-primary">Stats</h4>
      <div className="grid grid-cols-2 gap-4 text-center divide-x divide-gray-100">
        <div>
          <p className="text-xl font-semibold text-primary font-mono">{downloads || 0}</p>
          <p className="text-sm text-gray-500 tracking-widest mt-0.5 font-bold">Downloads</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-primary font-mono">{citations || 0}</p>
          <p className="text-sm text-gray-500 tracking-widest mt-0.5 font-bold">Citations</p>
        </div>
      </div>
    </div>
  );
}
