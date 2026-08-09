import React from 'react';
import SearchFilters from './SearchFilters';
import PaperGrid from './PaperGrid';

export default function BrowseResults({
  user,
  papers,
  filteredPapers,
  loading,
  filters,
  actions,
  inputRef,
}) {
  const resetSearch = () => {
    actions.setSearchQuery('');
    actions.setSelectedCategory('All');
    actions.setSelectedInstitution('All');
    actions.setShowResultsAnyway(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4 text-primary">
      <header className="border-b border-border pb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="space-y-1 text-left">
          {!user && (
            <button onClick={resetSearch} className="text-primary hover:underline text-xs font-bold tracking-widest uppercase mr-3 cursor-pointer">
              ← Back to search
            </button>
          )}
          <h1 className="text-2xl font-extralight tracking-tight text-primary uppercase leading-none mt-2">Browse Papers</h1>
          <p className="text-primary text-xs tracking-[0.2em] uppercase flex items-center gap-1.5 font-bold mt-3">{filteredPapers.length} of {papers.length} papers
          </p>
        </div>
      </header>

      <SearchFilters
        inputRef={inputRef}
        {...filters}
        setSearchQuery={actions.setSearchQuery}
        setSelectedCategory={actions.setSelectedCategory}
        setSelectedInstitution={actions.setSelectedInstitution}
      />

      <PaperGrid
        papers={filteredPapers}
        loading={loading}
        onOpen={actions.setSelectedPaper}
        columns={user ? 4 : 3}
      />
    </div>
  );
}
