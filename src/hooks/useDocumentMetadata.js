import { useEffect } from 'react';

const PAGE_METADATA = {
  home: {
    title: 'The Curated Archive — Institutional Academic Repository',
    description: 'Discover, submit, and search un-peer-reviewed preprint publications vetted for consistency by our administration.',
  },
  browse: {
    title: 'Browse Research Manuscripts — The Curated Archive',
    description: 'Explore our collection of un-peer-reviewed scholarly articles, scientific research, and academic preprints.',
  },
  submit: {
    title: 'Submit Your Research — The Curated Archive',
    description: 'Submit your un-peer-reviewed academic manuscript or scientific research paper to our admin board for consistency checks and indexing.',
  },
  about: {
    title: 'About The Archive — Scholarly Publishing Board',
    description: 'Learn about our open science mission, administrative review practices, university affiliates, and direct author feedback channels.',
  },
  profile: {
    title: 'Researcher Profile — The Curated Archive',
    description: 'View published research history, manage submissions, and update your academic affiliation details.',
  },
  board: {
    title: 'Academic Review Board — The Curated Archive',
    description: 'Approve, moderate, reject, or remove submitted academic papers after checking for formatting inconsistencies and errors.',
  },
};

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', content);
};

export function useDocumentMetadata(activeTab, browseMode) {
  useEffect(() => {
    const page = activeTab === 'search' ? (browseMode ? 'browse' : 'home') : activeTab;
    const metadata = PAGE_METADATA[page] || PAGE_METADATA.home;
    document.title = metadata.title;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', metadata.description);

    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="twitter:title"]', metadata.title);
    setMetaContent('meta[property="twitter:description"]', metadata.description);
  }, [activeTab, browseMode]);
}
