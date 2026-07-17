import React from 'react';
import { Download, Layers, Lock, Quote } from 'lucide-react';
import Button from '../ui/Button';

export default function PaperDetails({
  selectedPaper,
  setSelectedPaper,
  user,
  profile,
  onRequireAuth,
  handleCite,
  handleDownload,
}) {
  if (!selectedPaper) return null;

  const authorMetadata = selectedPaper.profiles?.metadata || [];
  const authorEmailItem = Array.isArray(authorMetadata) ? authorMetadata.find(item => item.startsWith('email:')) : null;
  const authorEmail = authorEmailItem ? authorEmailItem.replace('email:', '') : null;
  const isEmailPublic = Array.isArray(authorMetadata) && authorMetadata.includes('show_email_true');
  const alreadyCited = profile?.metadata && Array.isArray(profile.metadata) && profile.metadata.map(String).includes(String(selectedPaper.id));

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 text-primary">
      <div className="flex items-center justify-between border-b border-border pb-4 text-sm">
        <button
          onClick={() => setSelectedPaper(null)}
          className="flex items-center gap-1.5 text-primary hover:underline uppercase font-bold tracking-widest cursor-pointer text-sm"
        >
          ← Back to Papers
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-primary font-bold bg-gray-50 px-2.5 py-1 border border-border">
            {selectedPaper.category}
          </span>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold bg-gray-50 px-2.5 py-1 border border-border">
            Published {selectedPaper.year}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-primary tracking-tight leading-tight uppercase text-left">
          {selectedPaper.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-primary text-sm border-b border-gray-100 pb-4">
          <p className="font-bold text-primary text-base">{selectedPaper.profiles?.full_name}</p>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <p className="text-gray-500 text-sm">{selectedPaper.profiles?.institution || 'Independent'}</p>
          {user && isEmailPublic && authorEmail && (
            <>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <a href={`mailto:${authorEmail}`} className="text-primary hover:underline font-semibold text-sm">
                {authorEmail}
              </a>
            </>
          )}
        </div>
      </div>

      {selectedPaper.cover_image && (
        <div className="w-full max-h-96 overflow-hidden border border-border rounded-sm">
          <img
            src={selectedPaper.cover_image}
            alt="Paper cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="md:col-span-2 space-y-8 text-left">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary shrink-0" /> Summary
            </h3>
            <p className="text-base text-primary-text leading-relaxed">{selectedPaper.abstract}</p>
          </div>

          {selectedPaper.introduction && (
            <div className="space-y-3 pt-4 border-t border-gray-100 text-left">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Introduction</h3>
              <p className="text-base text-primary-text leading-relaxed whitespace-pre-line bg-gray-50 p-5 border border-border font-medium">
                "{selectedPaper.introduction}"
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
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

          <div className="border border-border p-5 space-y-3.5 bg-white/40 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center divide-x divide-gray-100">
              <div>
                <p className="text-xl font-semibold text-primary font-mono">{selectedPaper.downloads}</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-widest mt-0.5 font-bold">Downloads</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-primary font-mono">{selectedPaper.citations}</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-widest mt-0.5 font-bold">Citations</p>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
}
