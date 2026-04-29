import React, { useState } from 'react';

const CollectionsArchive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [sortBy, setSortBy] = useState('Newest Additions');

  const collections = [
    {
      id: 1,
      title: 'The Post-Industrial Urbanism Archive',
      institution: 'Getty Research Institute',
      category: 'History',
      description: 'A comprehensive digital reconstruction of mid-century urban decay and the subsequent revitalisation efforts in northern industrial hubs.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPeSpyNggSZtYFsWQYRVUMdMa6ORyo1T-QCzPRM8O7adB4oaVP30nLFS_Kv9NUJSRAey16tMPMcHgjhoLafuPc-rdPDY9GZQp8a7SfmZx9UfyOgOLxyBlASjfEDMOm80y7sY26jXr5mPQasAoBSvqONI_dD4fZ6Hpx10OkvJVky5-zJr-bhDaFKuPcH4L4oha4ZThnLm0S_TJ3mP1CGUwPwMdd7CMS84zijMXH1Ka5EXR0R1-420EjWS_myMv6R831rlDYgpVDRw4o',
      manuscripts: 1240,
      researchers: 18,
      itemType: 'Manuscripts'
    },
    {
      id: 2,
      title: 'Digital Epistemology 1990-2005',
      institution: 'MIT Media Lab',
      category: 'Digital Studies',
      description: 'Tracing the evolution of knowledge structures during the first two decades of the consumer internet and ubiquitous computing.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmwyDQbbdbpLw20LDs8kpBxTCjFNZfXUqG_kbqJ6hrBA-OwXhy4UbpDylTbo5ycy6mKTUZ-LHlYQX8rquZXXPn0-ztHFpCFFqhcKgn3jFXWaVDxHc8Jq6hMfuCcwRK-Qzuxjd1FC_ns1Ptv42wsljffL6qotc49suVF3OfFEEQ0YGmQfZ8NJQpERMA3K7Xjr2sDHiBw4jDuZZS3ZDU6_fnQGrSsXk3uCU6ReVIqAXjX9Tc3ETbuEFseYQxczk1VwQF7-lkh9HiK-zq',
      manuscripts: 8422,
      researchers: 42,
      itemType: 'Items'
    },
    {
      id: 3,
      title: 'Phenomenology of the Archive',
      institution: 'The British Library',
      category: 'Philosophy',
      description: 'A philosophical inquiry into the nature of preservation, focusing on the sensory experience of the physical document.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGeHQadnY6cmHPMTYAvwHKVj8GcB9IBDM_ZQ6LG4fbnI2pGolZ1ieSXAqxtil412iuOY21FnfA6i6M2gLvYLgcJaQoFcrKvzyXk8NZSWh-RAJ_rmQmfpRlt_Qo9p5gfCYbMzc2h4l74Xb3logrRKa5TWy1v5Cj_1bwLSV5gwLTYsscDoZ5IgfRTHFqNY8Xz1WEdLlcWIGl1C_6ZS2XWcMaFXC0P_8EaJFiXmZPXtqwEq8DQYoFPqesVpD3oj36r98kqTq0ex21b351',
      manuscripts: 450,
      researchers: 12,
      itemType: 'Texts'
    },
    {
      id: 4,
      title: 'The Communal Ledger: 1880-1920',
      institution: 'Bodleian Libraries',
      category: 'Sociology',
      description: 'A digitized collection of municipal ledgers detailing the rise of public health initiatives in Victorian London.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7ajXDhiWgFzdw50Q7uupE2LqKqPvz4t5eCGUhtFGKPYlhNS8RkXtalfTZ7Pb3Yb8t5ZKUdGFF2HCJEuYvDDmDczZHIoP2tttaI9emXRC2mvsmYCQh7-RYektdaaTTqaEUw-EYyXxr35ePwOirYGbK5UO-wk5MQiI6pZwg7CU-ZTSF9aFYmsckIrK5zbeKhGS4PO1j5EMHF8emlTmFkHWqOrfPa9H6ePQQ_aQx2TlrKYeeD9P0HeYF8kM7LM_HePetwUH2dJQcq_Uo',
      manuscripts: 3100,
      researchers: 25,
      itemType: 'Ledgers'
    },
    {
      id: 5,
      title: 'Dialects of the Outer Hebrides',
      institution: 'University of Edinburgh',
      category: 'Linguistics',
      description: 'Audio recordings and phonetic transcriptions documenting the linguistic shifts in isolated island communities.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYv5cTzDWYequ4b4U5NbWZcD8xZyve2TMUnuS36jiaz4S0_QVg65vFxD6QnnVDVo4dpq27XdI9OwL5DPiMlrMDneYVYdiPS8Dhfh8_zreU9_I0lGgSDCjU7zhdMgLl5yKL-VARPovzi-lD3MLrp8xUpiWZhcZXTpSCVDmq0lrrakTSw2En8mHyWnVNtS5vgG8OqBC9Mbj1e3Iz7_2LHZr-2YW8GRMnL2PHOHYjNEZFQ_f4zsFAJ4pIEBPbiV7rMQv1RGkbhyhmiDDN',
      manuscripts: 1890,
      researchers: 7,
      itemType: 'Records'
    },
    {
      id: 6,
      title: 'The Existentialist Correspondences',
      institution: 'Bibliothèque Nationale',
      category: 'Literature',
      description: 'Unpublished letters between pivotal 20th-century philosophers regarding the nature of being and political action.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUu8u-V-GHrqOXqDT9hgDSoQpgAWde26P1xOQxeoKx4iZTOeftZ6NYMNotpox8OikyotUib1zKr8SnNxWvT8Xj_NYC82s4Xg4zo3uQ7fM1ci03hqVEIsKiANyLra58pxD1bFwrTSsPVsCgscye3mi8rDnP0MQ1ioo7CNejMfCKBDC8J7VNnKWc-HDcRsCWXfMvASoJkt_QmbBaSkB4qZXUDZNaO-RtwIfSlpY-tWM8FioT6vr2YA0WmX7nY8gghmWKib6BGyyd5d6n',
      manuscripts: 2150,
      researchers: 31,
      itemType: 'Letters'
    }
  ];

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInstitution = selectedInstitution === 'All Institutions' || collection.institution === selectedInstitution;
    return matchesSearch && matchesInstitution;
  });

  const handleApplyFilters = () => {
    // In a real app, this would trigger a search or API call
    console.log('Applying filters:', { searchQuery, selectedInstitution, sortBy });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 border-b-0 bg-background/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-full">
          <div className="flex items-center gap-8">
            <span className="font-headline text-xl font-bold tracking-tighter text-on-surface">The Curated Archive</span>
            <div className="hidden md:flex gap-6">
              <a className="font-headline uppercase tracking-wider text-xs text-outline hover:text-on-surface" href="#">Archives</a>
              <a className="font-headline uppercase tracking-wider text-xs text-outline hover:text-on-surface" href="#">Institutions</a>
              <a className="font-headline uppercase tracking-wider text-xs text-primary border-b-2 border-primary pb-1" href="#">Curations</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="scale-100 active:scale-[0.98] transition-transform duration-150 p-2 hover:bg-primary/5 rounded-full">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="scale-100 active:scale-[0.98] transition-transform duration-150 p-2 hover:bg-primary/5 rounded-full">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="mb-16 max-w-3xl">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-primary mb-6">Thematic Collections</h1>
          <p className="font-body text-2xl text-on-surface-variant leading-relaxed italic">
            Explore curated archives and institutional repositories organized by discipline, historical period, and research initiative.
          </p>
        </header>

        {/* Filter Bar */}
        <section className="mb-12 flex flex-col md:flex-row gap-6 items-end border-b border-outline-variant/15 pb-8">
          <div className="w-full md:w-1/3">
            <label className="text-label text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block">Search Collections</label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:border-primary placeholder:text-outline-variant/60 font-body text-lg"
                placeholder="Keywords, DOI, or Curator..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <label className="text-label text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block">Filter by Institution</label>
            <select
              className="w-full bg-surface-container-low border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:border-primary font-label text-sm uppercase tracking-wider"
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
            >
              <option>All Institutions</option>
              <option>The British Library</option>
              <option>Getty Research Institute</option>
              <option>MIT Media Lab</option>
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label className="text-label text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block">Sort By</label>
            <select
              className="w-full bg-surface-container-low border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:border-primary font-label text-sm uppercase tracking-wider"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Newest Additions</option>
              <option>Total Manuscripts</option>
              <option>Alphabetical</option>
            </select>
          </div>
          <button
            className="bg-primary text-on-primary px-8 py-3 font-label uppercase text-xs tracking-widest font-bold hover:opacity-90 transition-opacity"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </section>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {filteredCollections.map((collection) => (
            <article key={collection.id} className="group">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden mb-6 relative">
                <img
                  className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700"
                  src={collection.image}
                  alt={collection.title}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-on-primary font-label text-[10px] px-3 py-1 uppercase tracking-widest">{collection.category}</span>
                </div>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h2 className="font-body text-2xl font-bold mb-2 leading-tight">{collection.title}</h2>
                <p className="font-label text-[11px] uppercase tracking-widest text-primary mb-4">{collection.institution}</p>
                <p className="font-body text-on-surface-variant text-base mb-6 line-clamp-2">{collection.description}</p>
                <div className="flex gap-6 border-t border-outline-variant/10 pt-4">
                  <div>
                    <span className="block font-label text-[10px] text-outline uppercase tracking-tighter">{collection.itemType}</span>
                    <span className="font-body font-bold text-lg">{collection.manuscripts.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block font-label text-[10px] text-outline uppercase tracking-tighter">Researchers</span>
                    <span className="font-body font-bold text-lg">{collection.researchers}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex items-center justify-between border-t border-outline-variant/30 pt-12">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">Showing {filteredCollections.length.toString().padStart(2, '0')} of {collections.length.toString().padStart(3, '0')} Collections</span>
          <div className="flex gap-12">
            <button className="font-headline font-bold text-sm tracking-widest uppercase text-outline-variant hover:text-primary transition-colors">Previous</button>
            <button className="font-headline font-bold text-sm tracking-widest uppercase text-primary border-b-2 border-primary pb-1">Next Page</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/15 bg-background">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-headline font-bold text-lg text-on-surface">The Curated Archive</span>
            <p className="font-body italic text-sm text-primary">© 2024 The Curated Archive. Intellectual Clarity in Research.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-body italic text-sm text-outline hover:text-primary underline transition-all" href="#">Privacy Policy</a>
            <a className="font-body italic text-sm text-outline hover:text-primary underline transition-all" href="#">Terms of Service</a>
            <a className="font-body italic text-sm text-outline hover:text-primary underline transition-all" href="#">Institutional Access</a>
            <a className="font-body italic text-sm text-outline hover:text-primary underline transition-all" href="#">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollectionsArchive;