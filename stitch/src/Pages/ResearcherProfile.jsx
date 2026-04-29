import React, { useState } from 'react';

const ResearcherProfile = () => {
  const [publications] = useState([
    {
      id: 1,
      journal: 'Journal of Information Ethics',
      year: 2023,
      title: 'The Ghost in the Archive: Algorithmic Bias in Historical Retrieval',
      description: 'An investigation into the hidden layers of preference inherent in automated cataloging systems and their long-term impact on scholarly discovery.'
    },
    {
      id: 2,
      journal: 'Monograph Series',
      year: 2021,
      title: 'Paper-to-Pixel: The Ontology of the Digital Copy',
      description: 'A foundational text exploring the metaphysical shift from physical artifacts to digital representations in modern museum settings.'
    },
    {
      id: 3,
      journal: 'Modern Heritage Quarterly',
      year: 2020,
      title: 'Decentralized Metadata: Blockchain in Library Science',
      description: 'Exploring how distributed ledger technology can ensure the permanence and immutability of citation data.'
    }
  ]);

  const collaborators = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      field: 'Computational Linguistics',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6i7dc4eNfqcvyX8MNb6Vl4Eh4sq9i5qo0pFEcC5dhgKzg2L79jCTWiQ_29UxQkYanV7ssrxZwYI7x4PaI5IVym4QS31L1vejaIrxc1gNQsUETAIHCWjgvwfZUgNzhsvdhXR5jGNsVX87We522OZPIijW-zTPZ9eSWlOrCvnks-xyOC5sQT-bJLciClEPgRn5ZJB4XTOz3fu1DMmIB4-SSA27fFnZv2VqE68xbI15b71t988qbLfJnlNo8Sp4uAgh5v1NUzuyupbOS'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      field: 'Ethics of Technology',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9u7AjZMNt7FIx1ehdzI4wUXn6CKBaiWGgolmmYp-WDv5yjzEquveY-xlKeN_UauZwJA4MD59FaL7A1uIwNI6AdpAAi85slaDtksNw5Q1mYB_yh60KSlRQZ8LhFG_YhkRZKvFEc4cHaDMnPRTEToZX3kkMztrOwQe6g5BOwuBcQyElYbgW32m3_jkcqxkxRM8BLsXs3-1K3Z0uS8eP-nh2P3M7ZOcHd14C1NCX0dKxRUkmEW1YBowEUUvEbFNfrp-njaOhRJbElWYt'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      field: 'Archival Preservation',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyY_Nq4sMSJ03AwSZItDTCo-e_3_nnEjE5JlhnkD27jJGkESlZSC-P1gZzc_oJ4rSi7T-cRrTnlYsUcbQAkgVSo5Ff584eqjRpFxaL2N6U1PQISAAcb2qvKDaxEsD4g5qgp0dPL5_KL4hYafLYNiEFha9l6NcybzZxSd-eU2p502SaEBcUxFR63866EqthFx1vmWg9wTKNT-5kPXOBPWOpK3xF47cCKjz0_FacnKzh7RiyU12tlTIuQzASXRfdcHG5mCRqzEQfMOYC'
    }
  ];

  return (
    <div className="light min-h-screen bg-surface text-on-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/15 dark:border-slate-800/15">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
          <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase font-['Public_Sans']">
            The Curated Archive
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 items-center text-sm font-medium">
              <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors" href="#">
                Search
              </a>
              <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors" href="#">
                Journals
              </a>
              <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors" href="#">
                Topics
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-500 cursor-pointer">search</span>
              <button className="bg-primary text-on-primary px-5 py-2 text-xs font-bold uppercase tracking-widest active:opacity-80 transition-opacity duration-200 font-['Public_Sans']">
                Researcher Sign-in
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row gap-12 items-start mb-24">
          <div className="w-48 h-64 flex-shrink-0 bg-surface-container-low overflow-hidden">
            <img
              alt="Researcher Portrait"
              className="w-full h-full object-cover grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSWTMsOozok1Y0foWac9mPE9BzGSzTZcPK3QLP3IwzU_onQI3NwI_y4g-CoXUCb9-0RosGBg-0_xWooGLne_bDTeMUkl5nAK-17zcWpHY-DFGvlDdwu9IjIPJ67EWlx_0FjBW3D8UThuvIsN6wmsMlfFNkbxluvasO_yqXk8JrYDJF9EE2Pi4s2k3z6vqpt_JZl6qJCQwswsH_uaUSaj-TUvcs-OHjvBQLfeSNS1frIBkw5LhXGuzajwUGE0leRTTWkVao1mE_Sk4L"
            />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface mb-2 font-['Public_Sans']">
                Dr. Alistair Thorne
              </h1>
              <p className="text-primary font-medium tracking-wide text-sm uppercase font-['Public_Sans']">
                Senior Fellow, Institute of Digital Epistemology
              </p>
            </div>
            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed text-on-surface-variant font-['Newsreader']">
                Specializing in the intersection of archival science and algorithmic curation. My work explores how digital infrastructures shape our historical memory and the ethical imperatives of data preservation in the 21st century.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold tracking-widest uppercase font-['Public_Sans']">
                Digital Humanities
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold tracking-widest uppercase font-['Public_Sans']">
                Archival Ethics
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold tracking-widest uppercase font-['Public_Sans']">
                Metadata Sovereignty
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:text-right border-l md:border-l-0 border-outline-variant/20 pl-6 md:pl-0">
            <div className="text-[10px] font-bold uppercase text-outline font-['Public_Sans'] tracking-widest">Researcher ID</div>
            <div className="font-mono text-sm">ORCID: 0000-0002-1825-0097</div>
            <div className="mt-4 text-[10px] font-bold uppercase text-outline font-['Public_Sans'] tracking-widest">Contact</div>
            <div className="text-sm">a.thorne@curatedarchive.edu</div>
          </div>
        </header>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Left Column: Publications */}
          <section className="md:col-span-8 space-y-12">
            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
              <h2 className="text-2xl font-bold tracking-tight uppercase font-['Public_Sans']">Published Works</h2>
              <span className="text-xs text-primary font-bold cursor-pointer hover:underline font-['Public_Sans']">
                View All (42)
              </span>
            </div>
            <div className="space-y-12">
              {publications.map((pub) => (
                <article key={pub.id} className="group">
                  <div className="flex gap-6">
                    <div className="w-1 bg-primary transform origin-top transition-transform scale-y-0 group-hover:scale-y-100"></div>
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-outline tracking-widest uppercase font-['Public_Sans']">
                        {pub.journal} • {pub.year}
                      </div>
                      <h3 className="text-2xl font-semibold leading-snug group-hover:text-primary transition-colors cursor-pointer font-['Public_Sans']">
                        {pub.title}
                      </h3>
                      <p className="text-on-surface-variant leading-relaxed max-w-xl font-['Newsreader']">
                        {pub.description}
                      </p>
                      <div className="pt-2 flex gap-4 text-xs font-bold text-primary tracking-widest uppercase font-['Public_Sans']">
                        <span className="cursor-pointer hover:text-primary-dim">Download PDF</span>
                        <span className="cursor-pointer hover:text-primary-dim">Cite</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Right Column: Contextual Data */}
          <aside className="md:col-span-4 space-y-16">
            {/* Current Projects */}
            <section className="bg-surface-container-low p-8 space-y-6">
              <h2 className="text-sm font-bold tracking-widest uppercase text-on-surface border-b border-outline-variant/20 pb-2 font-['Public_Sans']">
                Current Projects
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold mb-1 italic font-['Newsreader']">Project: Aletheia</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-['Newsreader']">
                    Developing an open-source framework for verifiable digital provenance in investigative journalism.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1 italic font-['Newsreader']">The Memory Vault</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-['Newsreader']">
                    A collaborative archive of oral histories from the early internet era (1990-1995).
                  </p>
                </div>
              </div>
            </section>

            {/* Collaboration Network */}
            <section className="space-y-6">
              <h2 className="text-sm font-bold tracking-widest uppercase text-on-surface font-['Public_Sans']">
                Collaboration Network
              </h2>
              <div className="space-y-4">
                {collaborators.map((collab) => (
                  <div key={collab.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 bg-slate-200 grayscale overflow-hidden">
                      <img alt={collab.name} className="w-full h-full object-cover" src={collab.image} />
                    </div>
                    <div>
                      <div className="text-sm font-bold group-hover:text-primary transition-colors font-['Public_Sans']">
                        {collab.name}
                      </div>
                      <div className="text-[10px] text-outline uppercase tracking-tight font-['Public_Sans']">
                        {collab.field}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 py-3 hover:bg-primary/5 transition-colors font-['Public_Sans']">
                Request Collaboration
              </button>
            </section>

            {/* Stats */}
            <section className="pt-8 border-t border-outline-variant/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-4">
                  <div className="text-2xl font-bold text-primary font-['Public_Sans']">1,240</div>
                  <div className="text-[10px] font-bold uppercase text-outline tracking-widest font-['Public_Sans']">Citations</div>
                </div>
                <div className="bg-surface-container-lowest p-4">
                  <div className="text-2xl font-bold text-primary font-['Public_Sans']">18</div>
                  <div className="text-[10px] font-bold uppercase text-outline tracking-widest font-['Public_Sans']">H-Index</div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest font-['Public_Sans']">
            The Curated Archive
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300" href="#">
              Institutional Access
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300" href="#">
              Privacy Policy
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300" href="#">
              Terms of Service
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300" href="#">
              API Documentation
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300" href="#">
              Contact Librarian
            </a>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-tighter font-['Public_Sans']">
            © 2024 The Curated Archive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResearcherProfile;
