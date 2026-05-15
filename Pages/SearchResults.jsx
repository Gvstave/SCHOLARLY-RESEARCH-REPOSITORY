import React, { useState } from 'react';
import TopNav from '../Components/TopNav';

const SearchResults = () => {
  const [selectedField, setSelectedField] = useState('Digital Humanities');
  const [sortBy, setSortBy] = useState('Most Recent');

  const searchResults = [
    {
      id: 1,
      title: 'The Semantics of Urban Void: A Critical Analysis of Spatial Linguistics in Post-Industrial Zones',
      authors: ['Elena Rostova', 'Julian Thorne'],
      journal: 'Urban Semiotics Quarterly',
      volume: '42, No. 4',
      doi: '10.1038/s41586-024',
      citations: 482,
      excerpt: 'This research investigates the linguistic markers associated with unoccupied urban spaces, proposing a new taxonomy for "spatial silence" that challenges traditional architectural discourse...',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwwbhO8yR45YO-Wzajp86WxLKQ4YbiXU9Fz0ByIW532r3Kvc_2lvudgZsTMZ0WFl83Vq2RhwdqL7jXlGUyj6E7DX86eqDRtnaS4eHH1Ex2Iz0qKk8S6Vlu8nCmCxr2Fx02gNLOC3rd-WLbnJm1EuvYOJNqqPOvmXfGEOmkdjCqUv4xl63gQxO7JD3eFbme3Eo-n8e97lvvwpFLb1mHHNgKfxCnnIAGaApB1hKOdgZkoChGtjB0V7d8_jDzVQoQpukLy2PzHblOTBs'
    },
    {
      id: 2,
      title: 'Syntax of Circulation: Mapping the Grammar of Public Plazas',
      authors: ['Marcus Vanhoutte'],
      journal: 'The Architectural Review',
      volume: 'Special Issue',
      doi: '10.1111/arch.1245',
      citations: 1120,
      excerpt: 'How do human movement patterns reflect a hidden syntactic structure? By analyzing high-density pedestrian zones through the lens of generative grammar, this paper reveals...',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgJU8UiQQNKoU4m4aSZfZFM2BoddVQWht-27zfnJZVXfLzx7HgfVHZM9Z5elhIlEW97cwIY361VlCljzy363mR2i0ZM8tLc_1irMDPvEKejaYYHQfk4cw3S6Ysf0HdMbsnFPCoA4vfaAgv_00-8DZ1ELduXk7qIsyvEZYvo7BPvjy8EaYyCPmHYb9RFOMHqun-7tv4lB5D0yLrRffJnoMMpipFqWLMZw8-SXZv7HIpYBk52Mu_ntYkan7jzzCNS1bJWU5CX9j-1hsI'
    },
    {
      id: 3,
      title: 'Digital Palimpsests: Visualizing Linguistic Erasure in Virtual Environments',
      authors: ['Sarah Chen'],
      journal: 'Digital Culture & Society',
      volume: '',
      doi: '10.2031/dh.archive.88',
      citations: 89,
      excerpt: 'Examining the evolution of spatial metaphor in 3D collaborative spaces, this study tracks how user-generated linguistic shifts mirror the degradation of physical boundaries...',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb9EcULt-hiD1-TfJU-iG8XNLqZOz5IOEI0Lb9Jv9ve7LtqGHcAYa00qKeaLoiegVR70h4hyrzdtLYI82ZsCPgf5unEdjv1G2VYz8U8R86tvrt4vvGA-2jVK2rFWEuChOwsufTHXTm4urenivAXlL98NqK3LVnU2T7rZ0PKumoOoIKURYyLssqEBUtrN-fdqQEXeMgZ4onbRFnNT-PSnBRS-JAF_6c5Cr7Qhr9sp_WvXuIUG-dnW6H3wsExkBYZDlEmkPBeE7Eh0Sr'
    }
  ];

  return (
    <div className="light min-h-screen bg-background">
      <TopNav />

      <main className="pt-24 pb-20 px-8 max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-10">
            {/* Field Filter */}
            <div>
              <h3 className="font-['Public_Sans'] text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                Field of Study
              </h3>
              <div className="space-y-3">
                {['Cognitive Science', 'Digital Humanities', 'Architecture Theory', 'Media Ecology'].map((field) => (
                  <label key={field} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      checked={selectedField === field}
                      className="rounded-none border-outline-variant text-primary focus:ring-primary w-4 h-4"
                      type="checkbox"
                      onChange={() => setSelectedField(field)}
                    />
                    <span className={`font-['Public_Sans'] text-sm ${selectedField === field ? 'text-primary font-medium' : 'text-on-surface-variant group-hover:text-primary transition-colors'}`}>
                      {field}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <h3 className="font-['Public_Sans'] text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                Publication Date
              </h3>
              <div className="space-y-4">
                <input className="w-full accent-primary bg-surface-container-high h-1 appearance-none" type="range" />
                <div className="flex justify-between font-['Public_Sans'] text-[10px] text-on-surface-variant font-medium">
                  <span>1950</span>
                  <span>2024</span>
                </div>
              </div>
            </div>

            {/* Publication Type */}
            <div>
              <h3 className="font-['Public_Sans'] text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                Publication Type
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left font-['Public_Sans'] text-sm px-3 py-2 bg-surface-container-lowest text-primary font-medium flex justify-between items-center">
                  Peer Reviewed
                  <span className="material-symbols-outlined text-xs">check</span>
                </button>
                <button className="w-full text-left font-['Public_Sans'] text-sm px-3 py-2 text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  Conference Papers
                </button>
                <button className="w-full text-left font-['Public_Sans'] text-sm px-3 py-2 text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  Monographs
                </button>
              </div>
            </div>

            {/* Top Authors */}
            <div>
              <h3 className="font-['Public_Sans'] text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                Top Authors
              </h3>
              <div className="flex flex-wrap gap-2">
                {['P. Bourdieu', 'M. Castells', 'D. Haraway', 'J. Butler'].map((author) => (
                  <span key={author} className="font-['Public_Sans'] text-[10px] font-bold uppercase bg-secondary-container text-on-secondary-container px-2 py-1">
                    {author}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 space-y-16">
          <header className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <div>
              <h1 className="font-['Public_Sans'] text-3xl font-bold tracking-tight text-slate-900">Search Results</h1>
              <p className="font-['Public_Sans'] text-sm text-on-surface-variant mt-1">
                Showing 1,248 papers for <span className="italic text-primary">"spatial linguistics"</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-['Public_Sans'] text-xs font-bold uppercase text-on-surface-variant">Sort by:</span>
              <select
                className="font-['Public_Sans'] text-xs font-bold bg-transparent border-none focus:ring-0 cursor-pointer text-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Most Recent</option>
                <option>Highest Citations</option>
                <option>Relevance</option>
              </select>
            </div>
          </header>

          <div className="space-y-12">
            {searchResults.map((result) => (
              <article key={result.id} className="group flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-48 aspect-[3/4] bg-surface-container-low overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500"
                    alt={result.title}
                    src={result.image}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="font-['Public_Sans'] text-[10px] font-bold uppercase bg-secondary-container text-on-secondary-container px-2 py-0.5 tracking-tighter">
                      DOI: {result.doi}
                    </span>
                    <span className="font-['Public_Sans'] text-[10px] font-bold uppercase bg-primary-container text-on-primary-container px-2 py-0.5 tracking-tighter">
                      {result.volume ? `Volume ${result.volume}` : result.volume}
                    </span>
                  </div>
                  <h2 className="text-2xl font-medium leading-tight mb-2 group-hover:text-primary transition-colors cursor-pointer font-['Newsreader']">
                    {result.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-['Public_Sans'] text-sm text-on-surface-variant">by</span>
                    {result.authors.map((author, idx) => (
                      <React.Fragment key={idx}>
                        <a className="font-['Public_Sans'] text-sm font-medium text-primary hover:underline italic" href="#">
                          {author}
                        </a>
                        {idx < result.authors.length - 1 && (
                          <span className="font-['Public_Sans'] text-sm text-on-surface-variant">and</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-base text-on-surface-variant line-clamp-3 leading-relaxed mb-6 max-w-2xl italic font-['Newsreader']">
                    {result.excerpt}
                  </p>
                  <div className="flex items-center justify-between border-l-4 border-primary pl-6 py-2">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="font-['Public_Sans'] text-[10px] font-bold uppercase text-on-surface-variant/60">Journal</span>
                        <span className="font-['Public_Sans'] text-sm font-medium">{result.journal}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-['Public_Sans'] text-[10px] font-bold uppercase text-on-surface-variant/60">Citations</span>
                        <span className="font-['Public_Sans'] text-sm font-medium">{result.citations}</span>
                      </div>
                    </div>
                    <button className="font-['Public_Sans'] text-xs font-bold flex items-center gap-2 text-primary hover:bg-primary-container/30 px-4 py-2 transition-colors">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        bookmark
                      </span>
                      SAVE TO LIBRARY
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="pt-12 flex justify-center items-center gap-8">
            <button className="font-['Public_Sans'] text-xs font-bold text-on-surface-variant hover:text-primary disabled:opacity-30 flex items-center gap-1">
              <span className="material-symbols-outlined text-base">arrow_back</span> PREVIOUS
            </button>
            <div className="flex gap-4">
              <span className="font-['Public_Sans'] text-sm font-bold text-primary border-b-2 border-primary">1</span>
              <span className="font-['Public_Sans'] text-sm font-medium text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                2
              </span>
              <span className="font-['Public_Sans'] text-sm font-medium text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                3
              </span>
              <span className="font-['Public_Sans'] text-sm font-medium text-on-surface-variant">...</span>
              <span className="font-['Public_Sans'] text-sm font-medium text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                12
              </span>
            </div>
            <button className="font-['Public_Sans'] text-xs font-bold text-on-surface-variant hover:text-primary flex items-center gap-1">
              NEXT <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-slate-100 dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
        <span className="text-sm font-bold text-slate-500 font-['Public_Sans']">The Curated Archive</span>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-slate-500 hover:text-blue-600 transition-colors font-['Public_Sans'] text-xs font-medium uppercase tracking-wider" href="#">
            Institutional Access
          </a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors font-['Public_Sans'] text-xs font-medium uppercase tracking-wider" href="#">
            Privacy Policy
          </a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors font-['Public_Sans'] text-xs font-medium uppercase tracking-wider" href="#">
            Terms of Service
          </a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors font-['Public_Sans'] text-xs font-medium uppercase tracking-wider" href="#">
            API Documentation
          </a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors font-['Public_Sans'] text-xs font-medium uppercase tracking-wider" href="#">
            Contact Librarian
          </a>
        </div>
        <span className="text-xs font-medium text-slate-400 font-['Public_Sans']">© 2024 The Curated Archive. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default SearchResults;
