import React from 'react';
import { Search } from 'lucide-react';
import { INSTITUTION_FILTER_OPTIONS } from '../../constants/institutions';

// Combined search bar + category + university filters.
export default function SearchFilters({
  inputRef,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedInstitution,
  setSelectedInstitution,
}) {
  return (
    <div className="space-y-4 s text-xs">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        <div className="md:col-span-3 relative flex items-center border-b border-primary pb-1.5 bg-transparent">
          <Search className="absolute left-0.5 w-4.5 h-4.5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search papers, authors, topics..."
            className="w-full bg-transparent pl-8 pr-4 text-xl font-normal text-primary placeholder-gray-300 focus:outline-primary focus:outline-none transition text-left"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <FilterSelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={[{ value: 'All', label: 'All Topics' }, ...categories.filter(c => c !== 'All').map(c => ({ value: c, label: c }))]}
        />

        <div className="md:col-span-2">
          <FilterSelect
            value={selectedInstitution}
            onChange={setSelectedInstitution}
            options={INSTITUTION_FILTER_OPTIONS.map(i => ({ value: i, label: i === 'All' ? 'All Universities' : i }))}
          />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative border-b border-border pb-1.5">
      <select
        className="w-full bg-transparent text-primary py-1 pl-1 focus:outline-none transition appearance-none cursor-pointer tracking-wider font-bold uppercase text-[10px] pr-6"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">▼</div>
    </div>
  );
}
