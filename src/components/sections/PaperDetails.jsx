import { ChevronLeft, Layers } from 'lucide-react';
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
  <div className="max-w-4xl mx-auto space-y-8 text-primary px-4 sm:px-8 lg:px-8 py-8">
   <div className="flex items-center justify-between border-b border-border pb-4 ">
    <button
     onClick={() => setSelectedPaper(null)}
     className="flex flex-row items-center gap-2 text-primary hover:underline cursor-pointer"
    >
     <ChevronLeft /> Back to Papers
    </button>
   </div>

   <div className="space-y-4">
    <div className="flex flex-wrap items-center gap-2">
     <span className="text-primary bg-gray-50 px-2.5 py-1 border border-border">
      {selectedPaper.category}
     </span>
     <span className="bg-gray-50 px-2.5 py-1 border border-border">
      Published {selectedPaper.year}
     </span>
    </div>
    <h1 className="text-primary text-left">
     {selectedPaper.title}
    </h1>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-primary border-b border-gray-100 pb-4">
     <p className=" text-primary text-base">{selectedPaper.profiles?.full_name}</p>
     <span className="  hidden sm:inline">|</span>
     <p className="  ">{selectedPaper.profiles?.institution || 'Independent'}</p>
     {user && isEmailPublic && authorEmail && (
      <>
       <span className="  hidden sm:inline">|</span>
       <a href={`mailto:${authorEmail}`} className="text-primary hover:underline ">
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
      <h3 className=" text-primary flex items-center gap-1.5">
       <Layers className="w-4 h-4 text-primary shrink-0" /> Summary
      </h3>
      <p className="text-base text-primary-text  ">{selectedPaper.abstract}</p>
     </div>

     {selectedPaper.introduction && (
      <div className="space-y-3 pt-4 border-t border-gray-100 text-left">
       <h3 className=" text-primary ">Introduction</h3>
       <p className="text-base text-primary-text   whitespace-pre-line bg-gray-50 p-5 border border-border ">
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
