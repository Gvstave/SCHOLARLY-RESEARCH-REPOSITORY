import React from 'react';
import { Quote, ArrowUpRight } from 'lucide-react';

// A single paper card used in search results.
export default function PaperCard({ paper, onOpen }) {
  return (
    <article
      onClick={() => onOpen?.(paper)}
      className="group bg-white border border-border hover:border-primary/50 p-6 flex flex-col justify-between cursor-pointer transition duration-300 hover:shadow-md relative rounded-xs h-full"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm text-primary">
            {paper.category}
          </span>
          <span className="text-gray-300 text-sm">&bull;</span>
          <span className="text-sm text-gray-500">Published {paper.year}</span>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold leading-snug text-blue-600  transition duration-200 line-clamp-2">
          {paper.title}
        </h2>

        <p className="text-sm text-gray-600 flex items-center gap-1 truncate">
          <span className="text-primary text-sm">{paper.profiles?.full_name}</span> &bull;
          <span className="text-gray-500 text-sm truncate">{paper.profiles?.institution || 'Independent'}</span>
        </p>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 text-left">
          {paper.abstract}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3 gap-2">
        <span className="flex items-center gap-1 font-mono hover:text-primary text-sm">
          <Quote className="w-3 h-3 shrink-0" /> {paper.citations} Cite
        </span>
        <span className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5 text-sm cursor-pointer">
          Read Paper <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </article>
  );
}
