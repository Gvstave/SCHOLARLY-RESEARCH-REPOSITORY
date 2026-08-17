import React from 'react';
import SearchFilters from './SearchFilters';
import PaperGrid from './PaperGrid';
import SideNav from '../SideNav';

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
    <div className="flex flex-col md:flex-row items-start gap-6 w-full">
      <SideNav
        {...filters}
        setSelectedCategory={actions.setSelectedCategory}
        setSelectedInstitution={actions.setSelectedInstitution}
        filteredPapers={filteredPapers}
        papers={papers}
      />
      <main className="w-full min-w-0 flex-1 space-y-8 py-4 text-primary">
        <header className="border-b border-border pb-6 flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="space-y-1 text-left">
            {!user && (
              <button onClick={resetSearch} className="text-primary underline text-sm font-bold tracking-widest mr-3 cursor-pointer">
                ← Back to search
              </button>
            )}
            <h1 className="text-2xl font-extralight tracking-tight text-primary leading-none mt-2">Browse Papers</h1>
          </div>
          <SearchFilters
            inputRef={inputRef}
            {...filters}
            setSearchQuery={actions.setSearchQuery}
            setSelectedCategory={actions.setSelectedCategory}
            setSelectedInstitution={actions.setSelectedInstitution}
          />
        </header>
        <PaperGrid
          papers={filteredPapers}
          loading={loading}
          onOpen={actions.setSelectedPaper}
          columns={user ? 4 : 3}
        />
      </main>
    </div>
  );
}
