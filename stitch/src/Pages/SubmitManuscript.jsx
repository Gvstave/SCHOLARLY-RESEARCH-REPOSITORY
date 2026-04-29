import React, { useState } from 'react';

const SubmitManuscript = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    selectedLicense: 'CC BY 4.0'
  });

  const [authors, setAuthors] = useState(['DR. JULIAN VANCE (YOU)']);
  const [newAuthor, setNewAuthor] = useState('');

  const handleAddAuthor = () => {
    if (newAuthor.trim()) {
      setAuthors([...authors, newAuthor.toUpperCase()]);
      setNewAuthor('');
    }
  };

  const handleRemoveAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Manuscript submission:', { ...formData, authors });
  };

  const licenses = [
    {
      id: 'CC BY 4.0',
      title: 'CC BY 4.0',
      description: 'Allows others to distribute, remix, and build upon your work, even commercially, as long as they credit you.'
    },
    {
      id: 'CC BY-NC',
      title: 'CC BY-NC',
      description: 'Allows others to non-commercially remix and build upon your work, with credit to your original research.'
    },
    {
      id: 'CC BY-ND',
      title: 'CC BY-ND',
      description: 'Allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole.'
    },
    {
      id: 'Public Domain',
      title: 'Public Domain',
      description: 'Relinquish all copyright interests to the public domain, allowing unrestricted global use.'
    }
  ];

  return (
    <div className="light min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/15 dark:border-slate-800/15">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-full">
          <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Public_Sans']">
            The Curated Archive
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors" href="#">
              Search
            </a>
            <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors" href="#">
              Journals
            </a>
            <a className="text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors" href="#">
              Topics
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-blue-700 dark:text-blue-400 font-medium px-4 py-2 hover:bg-blue-50/50 transition-colors font-['Public_Sans']">
              Researcher Sign-in
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
        {/* Hero Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-4 font-['Public_Sans']">
            Upload Manuscript
          </h1>
          <p className="text-on-surface-variant font-['Newsreader'] text-xl max-w-2xl leading-relaxed">
            Contribute to the collective intelligence. Your research will be preserved in our high-fidelity archival system.
          </p>
        </div>

        <form className="space-y-20" onSubmit={handleSubmit}>
          {/* Section 1: File Upload */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 font-['Public_Sans']">
                01. Manuscript File
              </h2>
              <p className="text-on-surface-variant text-sm font-['Newsreader']">
                We accept PDF format only to ensure visual and structural archival integrity.
              </p>
            </div>
            <div className="md:col-span-8">
              <label className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-outline-variant/30 bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="material-symbols-outlined text-4xl mb-4 text-primary">upload_file</span>
                  <p className="mb-2 text-sm text-on-surface font-['Public_Sans']">
                    <span className="font-bold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-on-surface-variant font-['Public_Sans']">PDF (MAX. 50MB)</p>
                </div>
                <input accept=".pdf" className="hidden" type="file" />
              </label>
            </div>
          </section>

          {/* Section 2: Core Metadata */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 font-['Public_Sans']">
                02. Intellectual Identity
              </h2>
              <p className="text-on-surface-variant text-sm font-['Newsreader']">
                Define the core pillars of your research for accurate categorization.
              </p>
            </div>
            <div className="md:col-span-8 space-y-8">
              {/* Title */}
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-['Public_Sans']">
                  Manuscript Title
                </label>
                <input
                  className="w-full bg-surface-container-low border-b border-outline-variant/20 focus:border-primary px-0 py-3 text-2xl font-['Newsreader'] transition-all placeholder:text-outline/40"
                  placeholder="Enter the full title of your research"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Abstract */}
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-['Public_Sans']">
                  Abstract
                </label>
                <textarea
                  className="w-full bg-surface-container-low border-b border-outline-variant/20 focus:border-primary px-0 py-3 text-lg font-['Newsreader'] transition-all placeholder:text-outline/40 resize-none"
                  placeholder="A concise summary of the manuscript's objectives, methods, and findings..."
                  rows={6}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                ></textarea>
              </div>

              {/* Authors */}
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-['Public_Sans']">
                  Contributing Authors
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  {authors.map((author, idx) => (
                    <span key={idx} className="bg-secondary-container text-on-secondary-container px-3 py-1 text-xs font-bold flex items-center gap-2 font-['Public_Sans']">
                      {author}
                      {idx > 0 && (
                        <span
                          className="material-symbols-outlined text-xs cursor-pointer"
                          onClick={() => handleRemoveAuthor(idx)}
                        >
                          close
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-grow bg-surface-container-low border-b border-outline-variant/20 focus:border-primary px-0 py-3 text-lg font-['Newsreader'] transition-all placeholder:text-outline/40"
                    placeholder="Add author name or ORCID iD"
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                  />
                  <button
                    className="bg-primary text-on-primary px-6 font-bold text-sm tracking-wide uppercase font-['Public_Sans']"
                    type="button"
                    onClick={handleAddAuthor}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Licensing */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 font-['Public_Sans']">
                03. Rights & Licensing
              </h2>
              <p className="text-on-surface-variant text-sm font-['Newsreader']">
                Choose how your work is shared and attributed within the global community.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {licenses.map((license) => (
                  <label key={license.id} className="relative block cursor-pointer group">
                    <input
                      checked={formData.selectedLicense === license.id}
                      className="peer sr-only"
                      name="license"
                      type="radio"
                      onChange={() => setFormData({ ...formData, selectedLicense: license.id })}
                    />
                    <div className="p-6 bg-surface-container-low border-2 border-transparent peer-checked:border-primary transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-bold text-lg font-['Public_Sans']">{license.title}</span>
                        <span
                          className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 font-['Public_Sans']"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant font-['Newsreader']">
                        {license.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined">info</span>
              <p className="text-xs font-medium font-['Public_Sans']">
                By submitting, you agree to our Archive Contribution Agreement.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                className="flex-1 md:flex-none border border-outline-variant/40 px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-surface-container-low transition-colors font-['Public_Sans']"
                type="button"
              >
                Save Draft
              </button>
              <button
                className="flex-1 md:flex-none bg-primary text-on-primary px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary-dim transition-colors font-['Public_Sans']"
                type="submit"
              >
                Submit Manuscript
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
          <div className="text-sm font-bold text-slate-500 font-['Public_Sans']">
            © 2024 The Curated Archive. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-['Public_Sans']" href="#">
              Institutional Access
            </a>
            <a className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-['Public_Sans']" href="#">
              Privacy Policy
            </a>
            <a className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-['Public_Sans']" href="#">
              Terms of Service
            </a>
            <a className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-['Public_Sans']" href="#">
              API Documentation
            </a>
            <a className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-['Public_Sans']" href="#">
              Contact Librarian
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SubmitManuscript;
