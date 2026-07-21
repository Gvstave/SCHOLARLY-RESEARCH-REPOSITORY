import React from 'react';
import { Layers } from 'lucide-react';
import PaperDetailsStats from './PaperDetailsStats';
import PaperDetailsActions from './PaperDetailsActions';

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
          <PaperDetailsActions
            user={user}
            alreadyCited={alreadyCited}
            selectedPaper={selectedPaper}
            handleCite={handleCite}
            handleDownload={handleDownload}
            onRequireAuth={onRequireAuth}
          />

          <PaperDetailsStats
            downloads={selectedPaper.downloads}
            citations={selectedPaper.citations}
          />
        </div>
      </div>
    </div>
  );
}
