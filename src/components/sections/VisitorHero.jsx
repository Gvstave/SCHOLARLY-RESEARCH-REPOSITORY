import React from 'react';
import { Search } from 'lucide-react';

/**
 * VisitorHero component for the public/unauthenticated landing search interface.
 */
export default function VisitorHero({
  inputRef,
  searchQuery,
  setSearchQuery,
  categories,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-36 px-4 max-w-4xl mx-auto text-center min-h-[65vh]">
      <div className="space-y-12 w-full flex flex-col items-center">
        <h2 className="text-[34px] sm:text-[46px] md:text-[56px] font-normal tracking-tight text-[#161B26] leading-[1.12] max-w-3xl select-none text-center">
          Search papers, theses, and abstracts.
        </h2>
        <div className="w-full max-w-2xl relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5 stroke-2" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search papers..."
            className="w-full pl-15 pr-6 py-4.5 rounded-full text-sm sm:text-base font-normal hover:shadow-sm focus:shadow-sm focus:outline-none border border-border transition duration-300 text-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400 font-bold tracking-widest">
          <span className="text-primary tracking-[0.25em] font-extrabold text-[10px]">TOPICS:</span>
          {categories.filter(c => c !== 'All').map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className="hover:text-primary cursor-pointer transition uppercase text-xs text-gray-500 font-bold tracking-widest"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
