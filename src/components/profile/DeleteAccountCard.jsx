 
import { Trash2 } from 'lucide-react';
import Button from '../ui/Button';

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
    <h3 className=" text-red-900 flex items-center gap-1.5">
     <Trash2 className="w-4 h-4 text-red-650" /> Delete account
    </h3>
    <span className="  text-[#B45309] bg-amber-50 px-2 py-0.5 border border-amber-100">
     Cannot be undone
    </span>
   </div>

   <p className="   text-primary-text text-left">
    This removes your profile, your papers, and signs you out. There is no way to recover the data afterwards.
   </p>

   {showDeleteConfirm ? (
    <div className="bg-red-50/50 border border-red-200 p-3.5 space-y-3">
     <p className=" text-red-800 text-left">
      Are you sure? This cannot be undone.
     </p>
     <div className="flex gap-2  ">
    <Button
       onClick={handleDeleteAccount}
       disabled={deleting}
     className="flex-1 bg-red-750 hover:bg-red-850 border border-red-800 py-2"
      >
       {deleting ? 'Deleting account...' : 'Yes, delete my account'}
    </Button>
    <Button
     variant="secondary"
       onClick={() => setShowDeleteConfirm(false)}
       disabled={deleting}
     className="flex-1 py-2"
      >
       Cancel
    </Button>
     </div>
    </div>
   ) : (
    <Button
     onClick={() => setShowDeleteConfirm(true)}
     variant="secondary"
     leftIcon={<Trash2 className="w-3.5 h-3.5" />}
     className="w-full bg-red-50 hover:bg-red-100 border-red-200 text-red-800 py-2.5"
    >
     Delete my account
    </Button>
   )}
  </div>
 );
}
