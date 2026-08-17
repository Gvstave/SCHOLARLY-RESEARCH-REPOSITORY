import React from 'react';
import { Trash2 } from 'lucide-react';

/**
 * Account deletion panel to help users cleanly remove their stored researcher datasets.
 */
export default function DeleteAccountCard({
  showDeleteConfirm,
  setShowDeleteConfirm,
  handleDeleteAccount,
  deleting,
}) {
  return (
    <div className="bg-white border border-red-200 p-6 shadow-sm space-y-4">
      <div className="border-b border-red-100 pb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold text-red-900 flex items-center gap-1.5">
          <Trash2 className="w-4 h-4 text-red-650" /> Delete account
        </h3>
        <span className="text-sm font-bold tracking-widest text-[#B45309] bg-amber-50 px-2 py-0.5 border border-amber-100">
          Cannot be undone
        </span>
      </div>

      <p className="text-sm leading-relaxed text-primary-text text-left">
        This removes your profile, your papers, and signs you out. There is no way to recover the data afterwards.
      </p>

      {showDeleteConfirm ? (
        <div className="bg-red-50/50 border border-red-200 p-3.5 space-y-3">
          <p className="text-sm font-bold text-red-800 tracking-widest text-left">
            Are you sure? This cannot be undone.
          </p>
          <div className="flex gap-2 text-sm font-bold tracking-widest ">
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="flex-1 bg-red-750 hover:bg-red-850 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 text-center transition border border-red-800 cursor-pointer"
            >
              {deleting ? 'Deleting account...' : 'Yes, delete my account'}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleting}
              className="flex-1 bg-white border border-border py-2 text-center text-primary-text hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 text-sm font-bold tracking-[0.12em] py-2.5 transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete my account
        </button>
      )}
    </div>
  );
}
