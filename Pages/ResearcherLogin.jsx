import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../Components/TopNav';

const ResearcherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="light min-h-screen flex flex-col bg-surface text-on-surface">
      <TopNav />
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 max-w-6xl w-full gap-0 bg-surface-container-lowest overflow-hidden">
          {/* Left Image Section */}
          <div className="hidden md:flex md:col-span-7 relative min-h-[600px] flex-col justify-end p-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                alt="Scholarly Archive"
                className="w-full h-full object-cover grayscale opacity-40"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXSVQF052mArT6fLkkC4ie5uloK_GIJavXvKgWoEjqTBZcZ_Aq0Wop-uoXwcNuhfRP1yVlN__HcFy235ol8BUTOnIrYPXlu289Kz8Rv-4yU1oty2lAZklCOQs7ehSP94CRfm8u3IcyX7QXAoWhTwGaN47JBClXKjAD3gudVDwaBIupZFxwk6_uQG7Y9UKgxZ-FD1WyMMAGBCArvB-dI6pU_PiiI4YCqIMXbRagVd9WnyysE_-3VTDRKBNpPMnKHhutjYMidNgr_j6j"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
            <div className="relative z-20">
              <h2 className="font-['Public_Sans'] text-4xl font-extrabold tracking-tight text-on-surface mb-4">
                Intellecta Manuscript
              </h2>
              <p className="font-['Newsreader'] text-xl italic text-on-surface-variant max-w-md leading-relaxed">
                "The archive is not a quiet place of rest, but a living dialogue between the past and our present inquiry."
              </p>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="md:col-span-5 flex flex-col p-8 md:p-16 justify-center bg-surface-container-low">
            <div className="mb-12">
              <div className="font-['Public_Sans'] font-extrabold text-xl tracking-tighter text-primary mb-2">
                The Curated Archive
              </div>
              <h1 className="font-['Public_Sans'] text-3xl font-bold tracking-tight text-on-surface">Sign In</h1>
              <p className="font-['Newsreader'] text-on-surface-variant mt-2">
                Enter your institutional credentials to access the repository.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Email Field */}
                <div className="group">
                  <label className="font-['Public_Sans'] block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 px-0 py-3 font-['Newsreader'] text-lg focus:ring-0 focus:border-primary transition-all duration-300 placeholder:text-outline-variant/50"
                    id="email"
                    name="email"
                    placeholder="researcher@institution.edu"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div className="group">
                  <div className="flex justify-between items-end mb-1">
                    <label className="font-['Public_Sans'] block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Password
                    </label>
                    <a className="font-['Public_Sans'] text-[10px] font-medium text-primary hover:text-on-primary-fixed-variant transition-colors uppercase tracking-widest" href="#">
                      Forgotten?
                    </a>
                  </div>
                  <input
                    className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 px-0 py-3 font-['Newsreader'] text-lg focus:ring-0 focus:border-primary transition-all duration-300 placeholder:text-outline-variant/50"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  className="w-4 h-4 border-outline-variant/50 text-primary focus:ring-0 rounded-none bg-surface-container-low"
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="font-['Public_Sans'] text-xs font-medium text-on-surface-variant" htmlFor="remember">
                  Keep session active for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  className="w-full bg-primary text-on-primary font-['Public_Sans'] font-bold py-5 text-sm tracking-widest uppercase transition-all duration-200 hover:bg-primary-dim active:opacity-80"
                  type="submit"
                >
                  Authenticate Access
                </button>
              </div>
            </form>

            {/* SSO Option */}
            <div className="mt-12 pt-8 border-t border-outline-variant/10">
              <div className="flex flex-col gap-4">
                <button className="flex items-center justify-center gap-3 w-full bg-surface-container-lowest border border-outline-variant/20 py-4 font-['Public_Sans'] text-xs font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined">account_balance</span>
                  Institutional SSO
                </button>
              </div>
              <p className="mt-8 font-['Newsreader'] text-center text-sm text-on-surface-variant">
                New researcher?{' '}
                <Link className="text-primary font-medium hover:underline" to="/register">
                  Request archival access
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 w-full border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
        <div className="text-sm font-bold text-slate-500">The Curated Archive</div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
            Institutional Access
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
            API Documentation
          </a>
          <a className="text-xs font-medium font-['Public_Sans'] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
            Contact Librarian
          </a>
        </div>
        <div className="text-xs font-medium font-['Public_Sans'] text-slate-500 dark:text-slate-500">
          © 2024 The Curated Archive. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ResearcherLogin;
