import { useEffect, useState } from 'react';

const PROTECTED_HASHES = new Set(['#submit', '#profile', '#admin', '#browse']);
const HASH_TO_VIEW = {
 '#submit': { tab: 'submit', browse: false },
 '#about': { tab: 'about', browse: false },
 '#profile': { tab: 'profile', browse: false },
 '#admin': { tab: 'board', browse: false },
 '#browse': { tab: 'search', browse: true },
};
const TAB_TO_HASH = { submit: 'submit', about: 'about', profile: 'profile', board: 'admin' };

const currentView = () => {
 const hash = window.location.hash;
 if (hash.startsWith('#paper-')) return { tab: 'search', browse: false };
 return HASH_TO_VIEW[hash] || { tab: 'search', browse: false };
};

const clearHash = () => {
 window.history.replaceState(null, '', window.location.pathname + window.location.search);
};

export function useHashNavigation(user, loading) {
 const initial = currentView();
 const [activeTab, setActiveTab] = useState(initial.tab);
 const [browseMode, setBrowseMode] = useState(initial.browse);

 useEffect(() => {
  const syncFromHash = () => {
   if (!user && PROTECTED_HASHES.has(window.location.hash)) {
    setActiveTab('search');
    setBrowseMode(false);
    clearHash();
    return;
   }

   const view = currentView();
   setActiveTab(view.tab);
   setBrowseMode(view.browse);
  };

  syncFromHash();
  window.addEventListener('hashchange', syncFromHash);
  return () => window.removeEventListener('hashchange', syncFromHash);
 }, [user]);

 useEffect(() => {
  if (loading) return;
  const hash = window.location.hash;
  const isRoot = !hash || hash === '#' || hash === '#home';

  if (user && isRoot) {
   setActiveTab('search');
   setBrowseMode(true);
  } else if (!user && (isRoot || PROTECTED_HASHES.has(hash))) {
   setActiveTab('search');
   setBrowseMode(false);
   if (hash) clearHash();
  }
 }, [user, loading]);

 useEffect(() => {
  if (activeTab === 'search' && window.location.hash.startsWith('#paper-')) return;
  const hash = activeTab === 'search' ? (browseMode ? 'browse' : '') : TAB_TO_HASH[activeTab];

  if (hash && window.location.hash !== `#${hash}`) window.location.hash = hash;
  if (!hash && window.location.hash) clearHash();
 }, [activeTab, browseMode]);

 return { activeTab, setActiveTab, browseMode, setBrowseMode };
}
