import React from 'react';
import { FileText } from 'lucide-react';
import UserPaperRow from './UserPaperRow';
import { Trash } from 'lucide-react';
import { Trash2 } from 'lucide-react';

/**
 * Lists research manuscripts authored by the signed-in user with status badges.
 */
export default function UserPapersList({ loadingPapers, userPapers }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className=" pb-3 flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-primary">Your Papers</h2>
        <h2 className="underline text-red-500 hover:rotate-10 hover:scale-z-105"><a href="mailto:ilungagustave73@gmail.com" className=''><Trash2 /></a></h2>
      </div>
      {loadingPapers ? (
        <div className="text-center text-primary-text py-14 font-semibold">Loading your papers...</div>
      ) : userPapers.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border bg-gray-50">
          <FileText className="w-8 h-8 text-gray-500 mx-auto stroke-[1.2] mb-3" />
          <h3 className="text-sm font-semibold text-primary">No papers yet</h3>
          <p className="text-sm text-gray-600 mt-1 ">You haven't submitted any papers</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userPapers.map((paper) => (
            <UserPaperRow key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}
