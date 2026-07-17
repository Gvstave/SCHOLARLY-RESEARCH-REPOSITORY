import React from 'react';

// Numbered / titled section header used inside long forms.
export default function SectionHeader({ children }) {
  return (
    <h3 className="text-sm font-medium text-primary uppercase tracking-widest border-b border-gray-100 pb-2">
      {children}
    </h3>
  );
}
