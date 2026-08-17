import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function AuthPortal({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm text-primary">
      <div className="relative max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 z-10 text-gray-500 hover:text-gray-950 text-sm tracking-widest font-semibold"
          aria-label="Close authentication dialog"
        >
          ✕ Close
        </button>

        <SignIn
          routing="virtual"
          fallbackRedirectUrl="/"
          appearance={{ elements: { cardBox: 'shadow-xl', card: 'pt-12' } }}
        />
      </div>
    </div>
  );
}
