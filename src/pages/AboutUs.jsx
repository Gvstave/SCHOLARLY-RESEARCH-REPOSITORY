import React from 'react';
import FeatureCard from '../components/ui/FeatureCard';
import features from '../constants/feature';

export default function AboutUs() {
  return (
    <div className="py-12 px-4 sm:px-0 text-primary selection:bg-gray-100 max-w-4xl mx-auto">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-border pb-8 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-gray-50 border border-gray-100 text-gray-500 rounded">
            Preprint Manuscript Repository
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary uppercase tracking-tight my-2">
            The Curated Archive
          </h1>
          <p className="leading-relaxed text-sm sm:text-base text-gray-600 max-w-3xl">
            A quiet, focused repository of academic and scientific literature spanning Zambian universities and independent research groups. All hosted papers are preprint research papers. Administrators curate the repository, checking submissions to identify formatting issues and errors, while enabling readers to engage directly with authors.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3">
          {features.map((item) => (
            <FeatureCard {...item} />
          ))}
        </div>

        {/* Context and Purpose */}
        <div className="space-y-4 pt-8 border-t border-gray-100 text-left">
          <h2 className="font-semibold text-lg sm:text-xl text-primary tracking-tight">Why we built this</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-sm sm:text-base leading-relaxed text-gray-600">
              Scientific publishing is often locked behind costly paywalls or lost in complex university systems. The Curated Archive offers a simple, quiet place to share and view research papers directly without distraction.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-600">
              By providing easy open access, university affiliation search, and simple checks for errors, we support a friendly, non-commercial environment where scholars can focus on discovering, discussing, and improving great research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

