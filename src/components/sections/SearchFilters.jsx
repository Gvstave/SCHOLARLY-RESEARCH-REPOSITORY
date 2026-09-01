 
import { Search } from 'lucide-react';

// Search bar used in the browse results header.
export default function SearchFilters({
 inputRef,
 searchQuery,
 setSearchQuery,
}) {
 return (
  <div className="w-full md:w-96 min-h-11 flex flex-row items-center gap-3 border border-border bg-white px-4 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition">
   <Search className="w-4.5 h-4.5   shrink-0" />
   <input
    ref={inputRef}
    type="text"
    placeholder="Search papers, authors, topics..."
    className="w-full bg-transparent text-base   text-primary placeholder-gray-400 focus:outline-none text-left"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
   />
  </div>
 );
}
