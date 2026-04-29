import React, { useState } from 'react';

const HomepageSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingArticles = [
    {
      id: 1,
      title: 'Spectral Echoes: The Acoustic Archeology of Gothic Cathedrals',
      category: 'Physics',
      author: 'Dr. Helena Vane',
      date: 'June 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd3pRvDWnDTichBgGT1RIWihsGz0Esx_siVS0unaN77a8Glq_9AU-9yfElga7li0Ciyz-ns-PRx9fyxQjVKahmCY9X3JWtUocjYeYy1IbBL5zEH7ev6Xm9RDoW--NoEyEWxM9_Bu2BX19WF97Cp45SbHKCFo1sivxcPCsEcQUx2t7CjkxEuQMRaRGEbq59M4IApFzXSX1TkQ6rpbJef00-XofnK7QRPmSI4eBaRxx5r1TcSuzmTOX01oWkEKxQSUOBZWp3k6oCAorl',
      excerpt: '"Exploring how structural geometry influenced polyphonic compositions in the 12th century, revealing a hidden dialogue between architect and composer..."',
      citationIndex: 42,
      status: 'Open Access'
    },
    {
      id: 2,
      title: 'The Epistemology of Silence in Digital Communication',
      category: 'Philosophy',
      author: 'Marcus Thorne',
      date: 'May 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-Dzp2UeWnQNlLliqWdI2AM2OsacT_JRP3sXXI29F2rEAgiwOkOVyfjD7SnuWWtsTjXXGOGtGhlMX8wjTqZ8r8Z0usQfrpUu7_sWVS8QzX_m7MowrmZOg8zDaDKx3KTV65ORm3u8ievQ7mXJ6oFUEBnJRQesJh7KOhZglRunG18JH8IyE7NZG-bjmH8IPNNArX4RguV9zLGn3kXMTihi49f8PTzNTTQlhPvQ8LtP3FB9ctuhaF2JlECgtsm-zB0GonKWWEXBnAG5S',
      excerpt: '"An inquiry into the disappearance of the pause in instant messaging and its profound impact on contemporary ethical decision-making frameworks..."',
      citationIndex: 18,
      status: 'Peer Reviewed'
    },
    {
      id: 3,
      title: 'Synthesizing Sentience: Mycelial Networks as Living Archives',
      category: 'Bio-Ethics',
      author: 'Aria Belrose',
      date: 'July 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRc_ry6-DvjnVfWDhn1-AXLp-XD6xct1AiC64lET3JXsBSJdpCsu-YYjf6l6Y6aAZzlBRMqrlNK-wzjXKW-mzb1_6t21oIKED88ohChHvqiBrGZ290HIreedAumyQJbgX9BG1uOW1oat1q7zFmW38gsVS4kWnPkiVJoEBAm6c1seg1epfKVBJtAUhHcuxvBo-e9-J5OSnKhwiG5UthvLmKGXp1mOdsKAT_cJTotoj0Dr1B2979-bPQtiG7Z2N52d8hY6c26jAVk56a',
      excerpt: '"Comparing fungal information transfer to decentralized ledger technologies, proposing a new biological model for long-term data preservation..."',
      citationIndex: 56,
      status: 'Open Access'
    }
  ];

  return (
    <div className="light min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/15 dark:border-slate-800/15">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Public_Sans']">
              The Curated Archive
            </span>
            <div className="hidden md:flex gap-6 items-center">
              <a className="text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1 font-['Public_Sans'] text-sm font-medium" href="#">
                Search
              </a>
              <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors font-['Public_Sans'] text-sm font-medium" href="#">
                Journals
              </a>
              <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors font-['Public_Sans'] text-sm font-medium" href="#">
                Topics
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-blue-700 dark:text-blue-400 font-['Public_Sans'] text-sm font-semibold hover:bg-blue-50/50 px-4 py-2 transition-colors">
              Researcher Sign-in
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 min-h-screen">
        {/* Hero Section */}
        <section className="max-w-screen-xl mx-auto px-8 mb-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-['Public_Sans'] text-6xl md:text-7xl font-light tracking-tight text-on-surface mb-8 max-w-4xl">
              Discover the <span className="italic font-['Newsreader']">unspoken</span> legacy of human thought.
            </h1>
            <div className="w-full max-w-3xl mt-8">
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/50">search</span>
                <input
                  className="w-full pl-12 pr-4 py-6 bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 text-xl font-['Newsreader'] outline-none transition-all placeholder:text-on-surface-variant/40"
                  placeholder="Search across 4.2 million curated manuscripts..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-4 px-1">
                <a className="font-['Public_Sans'] text-xs font-medium uppercase tracking-widest text-primary hover:opacity-70 transition-opacity" href="#">
                  Advanced Search
                </a>
                <span className="font-['Public_Sans'] text-xs text-on-surface-variant/60">Search by DOI, Author, or Volume</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Research */}
        <section className="max-w-screen-xl mx-auto px-8">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-['Public_Sans'] text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Trending Research
            </h2>
            <div className="h-px flex-grow mx-8 bg-outline-variant/20"></div>
            <a className="font-['Public_Sans'] text-sm text-primary hover:underline" href="#">
              View All Journals
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {trendingArticles.map((article) => (
              <article key={article.id} className="flex flex-col group">
                <div className="mb-6 relative aspect-[3/4] overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    alt={article.title}
                    src={article.image}
                  />
                  <div className="absolute top-4 left-4 bg-primary px-3 py-1">
                    <span className="font-['Public_Sans'] text-[10px] font-bold text-on-primary uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-1 h-8 bg-primary"></div>
                  <h3 className="text-2xl font-['Newsreader'] leading-tight text-on-surface group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
                <p className="font-['Public_Sans'] text-xs font-medium text-on-secondary-container mb-4">
                  {article.author} • {article.date}
                </p>
                <p className="text-on-surface-variant leading-relaxed text-sm mb-6 italic">
                  {article.excerpt}
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-['Public_Sans'] text-[10px] font-bold uppercase">
                    Citation Index: {article.citationIndex}
                  </span>
                  <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-['Public_Sans'] text-[10px] font-bold uppercase">
                    {article.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 max-w-screen-xl mx-auto px-8">
          <div className="bg-surface-container-low p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="font-['Public_Sans'] text-3xl font-light mb-6">Contribute to the Repository</h2>
              <p className="text-lg text-on-surface-variant mb-8 max-w-xl">
                Join our community of 12,000+ institutional researchers and archive your findings in our permanent digital monolith.
              </p>
              <button className="bg-primary text-on-primary font-['Public_Sans'] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                Submit Manuscript
              </button>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              <div className="p-8 bg-surface-container-lowest border-l-4 border-primary">
                <div className="text-4xl font-['Newsreader'] mb-2">4.2M</div>
                <div className="font-['Public_Sans'] text-xs uppercase tracking-tighter text-on-surface-variant">Archived Papers</div>
              </div>
              <div className="p-8 bg-surface-container-lowest border-l-4 border-primary">
                <div className="text-4xl font-['Newsreader'] mb-2">185</div>
                <div className="font-['Public_Sans'] text-xs uppercase tracking-tighter text-on-surface-variant">Partner Universities</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm font-bold text-slate-500 font-['Public_Sans']">THE CURATED ARCHIVE</span>
            <span className="text-xs font-medium font-['Public_Sans'] text-slate-500 mt-1">© 2024 The Curated Archive. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
              Institutional Access
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
              API Documentation
            </a>
            <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
              Contact Librarian
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomepageSearch;
