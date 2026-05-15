import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../Components/TopNav';

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
    <div className="light min-h-screen bg-background text-on-surface">
      <TopNav />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="hidden overflow-hidden lg:flex relative">
            <img
              alt="Library archive"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQNrTc7BS3GKpdEbMNNP-kT-iEbxOfK6AY6M_DdEttQNbPUqYtU8Iu4O8VoIvfmeSS2gvQKpIrAlhwDNIYtIrgu3IfT1TR7rvpH7l7J1C9M63o7vv9c0hi-7MFYjIq74648TSVzANiVo-uW4acNNF2jJG-kfXz8VuYWSxgdWOaMTl3GF9RyoJE7q6mY4CM6MTiWyqehYGSx-aG-CkbVB9LorOjEqrEc3lIpRVV4E4SrjHITXiZ2v2zn9dPld8jKNaocJv3L6WLquwn"
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
            <div className="relative z-10 flex h-full flex-col justify-between p-16">
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-semibold font-['Public_Sans']">
                The Curated Archive
              </span>

              <blockquote className="max-w-lg text-3xl font-light italic leading-tight text-on-surface-variant font-['Newsreader']">
                "Knowledge is not just a collection of facts, but a carefully curated legacy for the future mind."
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-primary font-['Public_Sans']">
                  Est. 1924
                </span>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="w-full max-w-xl px-8 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14">
              <div className="mb-10 text-center">
                <p className="text-xs uppercase tracking-[0.36em] text-primary font-semibold font-['Public_Sans']">
                  Researcher Access
                </p>
                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-on-surface font-['Public_Sans']">
                  Begin your archival journey.
                </h1>
                <p className="mt-4 text-base italic text-on-surface-variant font-['Newsreader']">
                  Create a researcher profile to request access to the curated archive and institutional repositories.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.32em] text-outline font-bold font-['Public_Sans'] mb-2">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    placeholder="e.g. Dr. Julian Thorne"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-b border-outline-variant/30 py-4 px-0 text-sm font-['Public_Sans'] focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-outline-variant/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.32em] text-outline font-bold font-['Public_Sans'] mb-2">
                    Academic Email
                  </label>
                  <input
                    name="email"
                    placeholder="researcher@institution.edu"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-b border-outline-variant/30 py-4 px-0 text-sm font-['Public_Sans'] focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-outline-variant/50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.32em] text-outline font-bold font-['Public_Sans'] mb-2">
                    Security Credential
                  </label>
                  <input
                    name="password"
                    placeholder="••••••••••••"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-b border-outline-variant/30 py-4 px-0 text-sm font-['Public_Sans'] focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-outline-variant/50"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-[0.32em] text-outline font-bold font-['Public_Sans'] mb-2">
                    Affiliated Institution
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                      search
                    </span>
                    <input
                      name="institution"
                      placeholder="Search repositories & universities..."
                      type="text"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-b border-outline-variant/30 py-4 pl-10 pr-0 text-sm font-['Public_Sans'] focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-outline-variant/50"
                    />
                  </div>
                  {formData.institution && (
                    <div className="mt-3 overflow-hidden border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
                      <div className="px-4 py-3 text-[10px] uppercase tracking-[0.28em] font-bold text-outline bg-surface-container-low">
                        Select from list
                      </div>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-3 text-xs text-on-surface transition-colors hover:bg-primary-container/20 border-t border-outline-variant/10"
                        onClick={() => {
                          setSelectedInstitution('Oxford Bodleian Libraries');
                          setFormData(prev => ({ ...prev, institution: 'Oxford Bodleian Libraries' }));
                        }}
                      >
                        Oxford Bodleian Libraries
                      </button>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-3 text-xs text-on-surface transition-colors hover:bg-primary-container/20 border-t border-outline-variant/10"
                        onClick={() => {
                          setSelectedInstitution('The Smithsonian Institution');
                          setFormData(prev => ({ ...prev, institution: 'The Smithsonian Institution' }));
                        }}
                      >
                        The Smithsonian Institution
                      </button>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-3 text-xs text-on-surface transition-colors hover:bg-primary-container/20 border-t border-outline-variant/10"
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

                <div className="space-y-4 pt-4">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-none bg-primary py-4 text-sm font-bold uppercase tracking-[0.3em] text-on-primary font-['Public_Sans'] hover:bg-primary-dim transition-colors"
                  >
                    Create Archive Profile
                  </button>
                  <p className="text-center text-[11px] leading-relaxed text-on-surface-variant font-['Public_Sans']">
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

                <div className="pt-8 border-t border-outline-variant/20 text-center">
                  <p className="text-sm text-on-surface-variant font-['Public_Sans']">
                    Already a registered researcher?{' '}
                    <Link className="text-primary font-bold hover:underline" to="/login">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ResearcherRegistration;
