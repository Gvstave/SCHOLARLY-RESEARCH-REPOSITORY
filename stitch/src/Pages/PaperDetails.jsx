import React from 'react';

const PaperDetails = () => {
  const relatedJournals = [
    {
      id: 1,
      title: 'The Metadata Fallacy in Late-Capitalist Information Systems',
      journal: 'Journal of Digital Ethics',
      author: 'Dr. Julian Thorne',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfMNy6rvBahYxuXvHt0rxtrMwm7SVU2PHwGBZKMkphw29vr9uDNPCtoU0bVoRO16JXFChYz5pdJVMMatBIaDBM7t6gvkDZluCZ0ezJ_Eiu1y53KRgtsgVORyD-6YIZ4voG0AeoGpWM0XhANNfexegs0Xb7kWTeKEj0JlmBiu8wRLmrkcOTRctqqBL7sqgk4LKuFqu0j1D51o04KHeTsI6aQuTH6vHB7GBsgNMBuJ3X9XFP41Jmq9Y0DjmZi3V2A6QVUlXmJ2Pxu9ha'
    },
    {
      id: 2,
      title: 'Taxonomies of Silence: What Archives Forget',
      journal: 'Archives Quarterly',
      author: 'Prof. Elena Rossi',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeCK7DcmAvngPu9RXeRyeEkFgqT2MwfWMik8ak8KVqAEEYQEBVGcZLpshAGJm9jMhwAVV3xztPNsfW_GO3t8_NH678C_HerYeEmM-XJ6mGdlWq1zdK35koe5GrkTftU9-Fc2WctD0UibtTKy9Fx7r1QcGH_Ayj_DiZ57Ta05hKcxvmPTkiNt82SuU_-QWoYmuy2LImWpLO-wdzlN6izSl0rxtaZb73J1V-OsN9iLs6IASZRI-U5DRBP_F6cWcKFv7Xkxjp-x7WzvBO'
    }
  ];

  return (
    <div className="light min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/15 flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold tracking-tight text-slate-900 font-['Public_Sans'] uppercase">
          The Curated Archive
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-slate-600 font-['Public_Sans'] text-sm font-medium hover:bg-blue-50/50 transition-colors px-3 py-1" href="#">
            Search
          </a>
          <a className="text-blue-700 font-['Public_Sans'] text-sm font-medium border-b-2 border-blue-700 pb-1 px-3 py-1" href="#">
            Journals
          </a>
          <a className="text-slate-600 font-['Public_Sans'] text-sm font-medium hover:bg-blue-50/50 transition-colors px-3 py-1" href="#">
            Topics
          </a>
        </div>
        <button className="bg-primary text-on-primary font-['Public_Sans'] text-sm font-bold px-6 py-2 uppercase tracking-widest">
          Researcher Sign-in
        </button>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div>
                <span className="block text-[10px] font-bold font-['Public_Sans'] uppercase tracking-widest text-on-surface-variant mb-1">
                  Metrics
                </span>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="block text-2xl font-['Public_Sans'] font-extrabold text-primary">1,248</span>
                    <span className="text-[11px] font-['Public_Sans'] font-medium uppercase text-on-surface-variant">Citations</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-['Public_Sans'] font-extrabold text-primary">4,890</span>
                    <span className="text-[11px] font-['Public_Sans'] font-medium uppercase text-on-surface-variant">Downloads</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold font-['Public_Sans'] uppercase tracking-widest text-on-surface-variant mb-1">
                Subject Tags
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 text-[9px] font-bold font-['Public_Sans'] uppercase tracking-tighter">
                  Epistemology
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 text-[9px] font-bold font-['Public_Sans'] uppercase tracking-tighter">
                  Archival Science
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 text-[9px] font-bold font-['Public_Sans'] uppercase tracking-tighter">
                  Digital Humanities
                </span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-7 space-y-12">
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold font-['Public_Sans'] uppercase tracking-[0.2em] text-primary">
                  Volume 42 • Issue 3
                </span>
                <span className="w-8 h-[1px] bg-outline-variant opacity-30"></span>
                <span className="text-xs font-medium font-['Public_Sans'] text-on-surface-variant">Published: Oct 2023</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-['Public_Sans'] font-extrabold tracking-tight leading-tight text-on-surface">
                The Architectonics of Digital Memory: Preservation in the Age of Fleeting Data
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">person</span>
                </div>
                <div>
                  <p className="font-['Public_Sans'] font-bold text-base leading-none">Dr. Helena Vance-Sterling</p>
                  <p className="font-['Public_Sans'] text-xs text-on-surface-variant mt-1">
                    University of Oxford, Oxford Internet Institute
                  </p>
                </div>
              </div>
            </header>

            <div className="bg-surface-container-low p-8 md:p-12 border-l-4 border-primary">
              <h2 className="font-['Public_Sans'] font-bold text-sm uppercase tracking-widest text-on-surface mb-6">
                Abstract
              </h2>
              <p className="text-lg leading-relaxed italic text-on-surface-variant">
                As information ecosystems pivot toward ephemeral streaming and dynamic databases, the traditional static archive faces an existential crisis. This paper investigates the philosophical and technical implications of "architectural preservation"—a method of archiving not just data points, but the relational structures that define their meaning. Through a case study of mid-20th century academic repositories, we propose a new framework for intellectual continuity that balances accessibility with long-term structural integrity.
              </p>
            </div>

            <section className="space-y-8 font-['Newsreader'] text-lg leading-relaxed text-on-surface max-w-prose">
              <p>
                The fundamental tension in modern digital archiving lies between the immediacy of the present and the permanence required by history. Unlike physical vellum or stone, digital bits require constant energetic maintenance to remain legible. The shift from physical to digital has not merely changed the medium of memory, but the very nature of what we consider "permanent."
              </p>
              <p>
                In our analysis of contemporary institutional repositories, we identified three primary modes of decay: bit rot, link rot, and format obsolescence. However, more insidious than these technical failures is the loss of context. A data point isolated from its surrounding citations and methodological framework loses 70% of its utility to future researchers within a single decade.
              </p>
              <div className="relative py-12">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant opacity-20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-4">
                    <span className="material-symbols-outlined text-primary opacity-40">menu_book</span>
                  </span>
                </div>
              </div>
              <p>
                The conclusion of our research suggests that archives must move toward a "modular permanence." By treating every research entry as a discrete yet interconnected node in a wider web of knowledge, we can ensure that even if individual platforms fail, the intellectual "blueprint" survives. This requires a radical rethinking of metadata, moving from descriptive tags to functional relationship maps.
              </p>
            </section>
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-12">
            <div className="bg-surface-container-lowest p-6 space-y-4 sticky top-28 border border-outline-variant/10">
              <button className="w-full bg-primary text-on-primary py-4 font-['Public_Sans'] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-base">download</span>
                Download PDF
              </button>
              <button className="w-full bg-transparent border border-primary text-primary py-4 font-['Public_Sans'] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary-container/30 transition-colors">
                <span className="material-symbols-outlined text-base">format_quote</span>
                Cite Research
              </button>
              <div className="pt-4 border-t border-outline-variant/20">
                <button className="w-full text-left font-['Public_Sans'] text-xs font-bold text-on-surface-variant uppercase tracking-tight flex items-center justify-between group">
                  Share Article
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="font-['Public_Sans'] font-bold text-xs uppercase tracking-widest text-on-surface">
                Related Journals
              </h3>
              <div className="space-y-8">
                {relatedJournals.map((journal) => (
                  <div key={journal.id} className="group cursor-pointer">
                    <div className="h-40 bg-surface-container-high mb-4 overflow-hidden">
                      <img
                        alt={journal.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={journal.image}
                      />
                    </div>
                    <span className="text-[10px] font-['Public_Sans'] font-bold text-primary uppercase tracking-widest mb-2 block">
                      {journal.journal}
                    </span>
                    <h4 className="font-['Public_Sans'] font-bold text-sm leading-snug group-hover:text-primary transition-colors">
                      {journal.title}
                    </h4>
                    <p className="font-['Newsreader'] text-xs text-on-surface-variant mt-2 italic">
                      By {journal.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-slate-100 flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
        <div className="text-sm font-bold text-slate-500 font-['Public_Sans'] uppercase tracking-widest">
          © 2024 The Curated Archive. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-slate-500 font-['Public_Sans'] text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-tighter" href="#">
            Institutional Access
          </a>
          <a className="text-slate-500 font-['Public_Sans'] text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-tighter" href="#">
            Privacy Policy
          </a>
          <a className="text-slate-500 font-['Public_Sans'] text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-tighter" href="#">
            Terms of Service
          </a>
          <a className="text-slate-500 font-['Public_Sans'] text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-tighter" href="#">
            API Documentation
          </a>
          <a className="text-slate-500 font-['Public_Sans'] text-xs font-medium hover:text-blue-600 transition-colors uppercase tracking-tighter" href="#">
            Contact Librarian
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PaperDetails;
