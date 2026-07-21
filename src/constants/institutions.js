// Universities available for filtering and profile registration.
// "Independent / Other" is included so papers with no university affiliation
// still have a valid home in the filter list.
export const INSTITUTIONS = [
  'Cavendish University Zambia',
  'University of Zambia',
  'Copperbelt University',
  'Lusaka University',
  'Chalimbana University',
  'Mulungushi University',
  'Independent / Other',
];

export const INDEPENDENT_LABEL = 'Independent / Other';

// All institutions, plus an "All" option first, are available in the filter.
export const INSTITUTION_FILTER_OPTIONS = ['All', ...INSTITUTIONS];
