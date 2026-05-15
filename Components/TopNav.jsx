import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const getNavConfig = (pathname) => {
  const mainItems = [
    { label: 'Search', to: '/search' },
    { label: 'Collections', to: '/collections' },
    { label: 'Submit', to: '/submit' }
  ];

  const mainActive = pathname === '/' || pathname.startsWith('/search')
    ? 'Search'
    : pathname.startsWith('/collections')
    ? 'Collections'
    : pathname.startsWith('/submit')
    ? 'Submit'
    : 'Search';

  if (pathname.startsWith('/collections')) {
    const secondaryActive = pathname.includes('/institutions')
      ? 'INSTITUTIONS'
      : pathname.includes('/curations')
      ? 'CURATIONS'
      : 'ARCHIVES';

    return {
      mainItems,
      mainActive,
      secondaryItems: [
        { label: 'ARCHIVES', to: '/collections/archive' },
        { label: 'INSTITUTIONS', to: '/collections/institutions' },
        { label: 'CURATIONS', to: '/collections/curations' }
      ],
      secondaryActive
    };
  }

  return {
    mainItems,
    mainActive
  };
};

const TopNav = () => {
  const { pathname } = useLocation();
  const { mainItems, mainActive, secondaryItems, secondaryActive } = getNavConfig(pathname);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/15">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-slate-900 font-['Public_Sans']"
        >
          The Curated Archive
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {mainItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-[11px] font-medium uppercase tracking-[0.3em] font-['Public_Sans'] transition-colors ${
                item.label === mainActive
                  ? 'text-slate-900 border-b-2 border-slate-900 pb-1'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-[11px] font-semibold uppercase tracking-[0.3em] font-['Public_Sans'] px-4 py-2 border border-slate-900 bg-slate-900 text-white hover:bg-slate-700 transition-colors"
          >
            Researcher Sign-in
          </Link>
        </div>
      </div>
      {secondaryItems && (
        <div className="hidden md:flex justify-center gap-8 border-t border-slate-200/15 px-8 py-3 bg-slate-50">
          {secondaryItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-[11px] font-medium uppercase tracking-[0.25em] font-['Public_Sans'] transition-colors ${
                item.label === secondaryActive
                  ? 'text-slate-900 border-b-2 border-slate-900 pb-1'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default TopNav;
