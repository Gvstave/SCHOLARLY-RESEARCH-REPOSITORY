import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { INSTITUTIONS } from '../constants/institutions';

// Persistent browse filters shown beside the paper results.
export default function SideNav({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedInstitution,
  setSelectedInstitution,
  filteredPapers,
  papers,
  searchQuery
}) {
  const [openGroup, setOpenGroup] = useState(null);
  const query = searchQuery.trim().toLowerCase();
  const matchesQuery = (paper) => (
    (paper.title || '').toLowerCase().includes(query) ||
    (paper.abstract || '').toLowerCase().includes(query) ||
    (paper.profiles?.full_name || '').toLowerCase().includes(query) ||
    (paper.profiles?.institution || '').toLowerCase().includes(query) ||
    (paper.category || '').toLowerCase().includes(query)
  );
  const matchesInstitution = (paper, institution) => {
    if (institution === 'All') return true;
    const paperInstitution = paper.profiles?.institution || 'Independent / Other';
    if (institution === 'Independent / Other') {
      return paperInstitution === 'Independent / Other' || paperInstitution === 'Independent';
    }
    return paperInstitution === institution;
  };
  const topicOptions = categories
    .filter((category) => category !== 'All')
    .map((category) => ({
      value: category,
      label: category,
      count: papers.filter((paper) => (
        matchesQuery(paper) &&
        matchesInstitution(paper, selectedInstitution) &&
        paper.category === category
      )).length,
    }));
  const institutionOptions = INSTITUTIONS.map((institution) => ({
    value: institution,
    label: institution,
    count: papers.filter((paper) => (
      matchesQuery(paper) &&
      (selectedCategory === 'All' || paper.category === selectedCategory) &&
      matchesInstitution(paper, institution)
    )).length,
  }));
  const topicTotal = papers.filter((paper) => (
    matchesQuery(paper) && matchesInstitution(paper, selectedInstitution)
  )).length;
  const institutionTotal = papers.filter((paper) => (
    matchesQuery(paper) && (selectedCategory === 'All' || paper.category === selectedCategory)
  )).length;

  return (
    <aside
      aria-label="Browse filters"
      className="w-full md:w-64 shrink-0 flex flex-col gap-4 p-0 md:p-5 md:sticky md:top-24"
    >
      <p className="text-primary border-b border-border pb-3 md:pb-4">
        {filteredPapers.length} of {papers.length} papers found
      </p>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        <MobileFilterGroup
          label="Topics"
          value={selectedCategory}
          options={topicOptions}
          allCount={topicTotal}
          isOpen={openGroup === 'topics'}
          onToggle={() => setOpenGroup((group) => group === 'topics' ? null : 'topics')}
          onChange={(value) => {
            setSelectedCategory(value);
            setOpenGroup(null);
          }}
        />
        <MobileFilterGroup
          label="Universities"
          align="right"
          value={selectedInstitution}
          options={institutionOptions}
          allCount={institutionTotal}
          isOpen={openGroup === 'universities'}
          onToggle={() => setOpenGroup((group) => group === 'universities' ? null : 'universities')}
          onChange={(value) => {
            setSelectedInstitution(value);
            setOpenGroup(null);
          }}
        />
      </div>

      <div className="hidden md:block">
        <h2 className=" mb-2 text-red-500">Topics</h2>
        <FilterSelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={topicOptions}
        />
      </div>
      <div className="hidden md:block border-t border-border pt-4">
        <h2 className=" mb-2 text-red-500">Universities</h2>
        <FilterSelect
          value={selectedInstitution}
          onChange={setSelectedInstitution}
          options={institutionOptions}
        />
      </div>
    </aside>
  );
}

function MobileFilterGroup({ label, value, options, allCount, isOpen, onToggle, onChange, align = 'left' }) {
  const selectedOption = options.find((option) => option.value === value);
  const buttonLabel = value === 'All'
    ? `${label} (${allCount})`
    : `${value} (${selectedOption?.count ?? 0})`;

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        className="w-full min-h-11 border border-border px-3 py-2 flex items-center justify-between gap-2 text-left text-primary bg-white"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className=" ">{buttonLabel}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className={`absolute z-30 top-full mt-1 w-[min(20rem,calc(100vw-2rem))] max-h-72 overflow-y-auto border border-border bg-white p-3 shadow-lg ${align === 'right' ? 'right-0' : 'left-0'}`}>
          <FilterSelect value={value} onChange={onChange} options={options} includeAll allCount={allCount} />
        </div>
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, options, includeAll = false, allCount = 0 }) {
  const visibleOptions = includeAll
    ? [{ value: 'All', label: 'All', count: allCount }, ...options]
    : options;

  return (
    <div>
      <ul className="space-y-2 w-full text-primary">
        {visibleOptions.map((o) => (
          <li key={o.value}>
            <button
              type="button"
              className={`w-full cursor-pointer text-left hover:underline flex items-start justify-between gap-3 ${value === o.value ? ' underline' : ''}`}
              aria-pressed={value === o.value}
              onClick={() => onChange(value === o.value ? 'All' : o.value)}
            >
              <span>{o.label}</span>
              <span className="  tabular-nums">({o.count ?? 0})</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
