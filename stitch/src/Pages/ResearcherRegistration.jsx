import React, { useState } from 'react';

const ResearcherRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    institution: ''
  });

  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration:', formData);
  };

  return (
    <div className="light min-h-screen flex flex-col md:flex-row bg-surface text-on-surface overflow-x-hidden">
      {/* Visual Section */}
      <section className="hidden md:flex md:w-5/12 bg-surface-container-low relative overflow-hidden flex-col justify-between p-12">
        <div className="z-10">
          <h1 className="font-['Public_Sans'] text-xl font-bold tracking-tight text-primary mb-8">
            The Curated Archive
          </h1>
          <blockquote className="text-3xl lg:text-4xl leading-snug text-on-surface-variant font-light italic">
            "Knowledge is not just a collection of facts, but a carefully curated legacy for the future mind."
          </blockquote>
        </div>
        <div className="z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-['Public_Sans'] text-xs uppercase tracking-widest font-semibold text-primary">Est. 1924</span>
          </div>
          <p className="text-sm text-on-surface-variant opacity-70 max-w-xs">
            Access over four million peer-reviewed journals, historical manuscripts, and digital artifacts.
          </p>
        </div>
        <div className="absolute inset-0 z-0">
          <img
            alt="Library archive"
            className="w-full h-full object-cover opacity-15 grayscale mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQNrTc7BS3GKpdEbMNNP-kT-iEbxOfK6AY6M_DdEttQNbPUqYtU8Iu4O8VoIvfmeSS2gvQKpIrAlhwDNIYtIrgu3IfT1TR7rvpH7l7J1C9M63o7vv9c0hi-7MFYjIq74648TSVzANiVo-uW4acNNF2jJG-kfXz8VuYWSxgdWOaMTl3GF9RyoJE7q6mY4CM6MTiWyqehYGSx-aG-CkbVB9LorOjEqrEc3lIpRVV4E4SrjHITXiZ2v2zn9dPld8jKNaocJv3L6WLquwn"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low via-transparent to-transparent opacity-60"></div>
        </div>
      </section>

      {/* Form Section */}
      <section className="flex-1 bg-surface-container-lowest flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="font-['Public_Sans'] text-3xl font-extrabold tracking-tight text-on-surface mb-2">
              Researcher Access
            </h2>
            <p className="text-on-surface-variant italic text-lg">Begin your archival journey.</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative">
              <label className="font-['Public_Sans'] block text-[10px] uppercase tracking-widest font-bold text-outline mb-1">
                Full Name
              </label>
              <input
                className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-primary border-t-0 border-l-0 border-r-0 py-3 font-['Public_Sans'] text-sm focus:ring-0 transition-all placeholder:text-outline-variant/50"
                name="fullName"
                placeholder="e.g. Dr. Julian Thorne"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="font-['Public_Sans'] block text-[10px] uppercase tracking-widest font-bold text-outline mb-1">
                Academic Email
              </label>
              <input
                className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-primary border-t-0 border-l-0 border-r-0 py-3 font-['Public_Sans'] text-sm focus:ring-0 transition-all placeholder:text-outline-variant/50"
                name="email"
                placeholder="researcher@institution.edu"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="font-['Public_Sans'] block text-[10px] uppercase tracking-widest font-bold text-outline mb-1">
                Security Credential
              </label>
              <input
                className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-primary border-t-0 border-l-0 border-r-0 py-3 font-['Public_Sans'] text-sm focus:ring-0 transition-all placeholder:text-outline-variant/50"
                name="password"
                placeholder="••••••••••••"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Institution Dropdown */}
            <div className="relative">
              <label className="font-['Public_Sans'] block text-[10px] uppercase tracking-widest font-bold text-outline mb-1">
                Affiliated Institution
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low border-b border-outline-variant/30 focus:border-primary border-t-0 border-l-0 border-r-0 py-3 pl-10 font-['Public_Sans'] text-sm focus:ring-0 transition-all placeholder:text-outline-variant/50"
                  name="institution"
                  placeholder="Search repositories & universities..."
                  type="text"
                  value={formData.institution}
                  onChange={handleInputChange}
                />
              </div>
              {/* Suggestion Results */}
              {formData.institution && (
                <div className="mt-2 bg-surface-container-lowest border border-outline-variant/10 shadow-sm font-['Public_Sans'] overflow-hidden">
                  <div className="px-4 py-2 text-[10px] text-outline bg-surface-container-low font-bold tracking-widest uppercase">
                    Select from list
                  </div>
                  <button
                    className="w-full text-left px-4 py-3 text-xs text-on-surface hover:bg-primary-container/20 transition-colors border-b border-outline-variant/5"
                    type="button"
                    onClick={() => {
                      setSelectedInstitution('Oxford Bodleian Libraries');
                      setFormData(prev => ({ ...prev, institution: 'Oxford Bodleian Libraries' }));
                    }}
                  >
                    Oxford Bodleian Libraries
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-xs text-on-surface hover:bg-primary-container/20 transition-colors border-b border-outline-variant/5"
                    type="button"
                    onClick={() => {
                      setSelectedInstitution('The Smithsonian Institution');
                      setFormData(prev => ({ ...prev, institution: 'The Smithsonian Institution' }));
                    }}
                  >
                    The Smithsonian Institution
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-xs text-on-surface hover:bg-primary-container/20 transition-colors"
                    type="button"
                    onClick={() => {
                      setSelectedInstitution('Stanford University Research');
                      setFormData(prev => ({ ...prev, institution: 'Stanford University Research' }));
                    }}
                  >
                    Stanford University Research
                  </button>
                </div>
              )}
            </div>

            {/* Action Area */}
            <div className="pt-6 space-y-4">
              <button
                className="w-full bg-primary text-on-primary font-['Public_Sans'] py-4 font-bold tracking-widest uppercase text-xs hover:bg-primary-dim transition-colors flex justify-between items-center px-6"
                type="submit"
              >
                <span>Create Archive Profile</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="font-['Public_Sans'] text-[11px] text-center text-on-surface-variant leading-relaxed">
                By creating an account, you agree to our{' '}
                <a className="text-primary hover:underline" href="#">
                  Institutional Terms
                </a>{' '}
                and{' '}
                <a className="text-primary hover:underline" href="#">
                  Researcher Privacy Policy
                </a>
                .
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
              <p className="font-['Public_Sans'] text-sm text-on-surface-variant">
                Already a registered researcher?{' '}
                <a className="text-primary font-bold hover:underline ml-1" href="#">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
        <div className="text-sm font-bold text-slate-500 font-['Public_Sans']">The Curated Archive</div>
        <nav className="flex flex-wrap justify-center gap-6">
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 transition-colors" href="#">
            Institutional Access
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 transition-colors" href="#">
            API Documentation
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 hover:text-blue-600 transition-colors" href="#">
            Contact Librarian
          </a>
        </nav>
        <div className="text-xs font-medium font-['Public_Sans'] text-slate-500">
          © 2024 The Curated Archive. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ResearcherRegistration;
