import React from 'react';
import { Download, Lock, Quote } from 'lucide-react';
import Button from '../ui/Button';

/**
 * PaperDetailsActions sub-component for managing citation logging and manuscript downloads.
 */
export default function PaperDetailsActions({
  user,
  alreadyCited,
  selectedPaper,
  handleCite,
  handleDownload,
  onRequireAuth,
}) {
  return (
    <>
      {user && (
        <div className="bg-gray-50 border border-border p-5 space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1">
              <Quote className="w-3.5 h-3.5 text-gray-500" /> Cite this paper
            </span>
            {alreadyCited ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-sm">
                Cited &bull; Logged
              </span>
            ) : (
              <Button onClick={() => handleCite(selectedPaper)} variant="subtle" size="sm" className="text-[10px] px-2.5 py-1">
                Log Citation
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            {alreadyCited
              ? 'You have already logged a citation for this paper.'
              : 'Click the button to officially log your academic citation.'}
          </p>
        </div>
      )}

      <div className="border border-border p-5 space-y-4 bg-gray-50 text-left">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Full paper</h4>
        {user ? (
          <div className="space-y-3 bg-white border border-border p-3 text-left">
            <p className="text-xs text-gray-600 leading-relaxed">You can download the full manuscript.</p>
            <Button
              onClick={() => handleDownload(selectedPaper)}
              fullWidth
              variant="primary"
              className="text-xs py-3 shadow-sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Download Manuscript
            </Button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="p-3 bg-white border border-[#E9E9F0] rounded-sm flex items-start gap-1.5 text-left">
              <Lock className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-primary-text uppercase tracking-wider">Sign in to download</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">Sign in to download the full manuscript of this paper.</p>
              </div>
            </div>
            <Button
              onClick={() => onRequireAuth?.()}
              fullWidth
              variant="primary"
              className="text-xs tracking-[0.16em] py-3 shadow-sm"
              leftIcon={<Lock className="w-3.5 h-3.5 shrink-0" />}
            >
              Sign in to download
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
