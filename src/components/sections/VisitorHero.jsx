 
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
    <h1 className="text-[#161B26] max-w-3xl select-none text-center">
     Search papers, theses, and abstracts.
    </h1>
    <div className="w-full max-w-2xl relative">
     <div className="absolute left-6 top-1/2 -translate-y-1/2  ">
      <Search className="w-5 h-5 stroke-2" />
     </div>
     <input
      ref={inputRef}
      type="text"
      placeholder="Search papers..."
      className="w-full pl-15 pr-6 py-4.5 rounded-full sm:text-base   hover:shadow-sm focus:shadow-sm focus:outline-none border border-border transition duration-300 text-primary"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
     />
    </div>
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2  ">
     <span className="text-primary">Topics:</span>
     {categories.filter(c => c !== 'All').map((c) => (
      <button
       key={c}
       onClick={() => setSelectedCategory(c)}
       className="hover:text-primary cursor-pointer transition  "
      >
       {c}
      </button>
     ))}
    </div>
   </div>
  </div>
 );
}
