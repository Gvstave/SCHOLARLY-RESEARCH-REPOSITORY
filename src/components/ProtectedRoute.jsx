import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from './ui/Loader';

export const ProtectedRoute = ({ children, onRedirectToAuth }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-gray-100 my-8 max-w-2xl mx-auto">
        <h3 className="text-xl text-primary font-medium">Please sign in</h3>
        <p className="text-gray-500 text-xs uppercase tracking-wider mt-2">This page is for signed-in researchers</p>
        <p className="mt-4 text-gray-600 text-sm max-w-md">
          Sign in to submit a paper, view your profile, or download the full text of a paper.
        </p>
        <button
          onClick={onRedirectToAuth}
          className="mt-6 bg-primary text-white text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-gray-800 transition"
        >
          Sign in
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
