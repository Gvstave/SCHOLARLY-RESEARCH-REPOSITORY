 
import { Mail } from 'lucide-react';

/**
 * Reusable badge for displaying a paper's submitter email with a direct mailto link.
 */
export default function SubmitterEmailBadge({ email, size = 'md', className = '' }) {
 if (!email) return null;

 if (size === 'sm') {
  return (
   <p className={`   flex items-center gap-1.5 mt-0.5 ${className}`}>
    <Mail className="w-3 h-3 text-amber-700 shrink-0" />
    <span>Submitter Email:</span>
    <a href={`mailto:${email}`} className="text-primary hover:underline  ">
     {email}
    </a>
   </p>
  );
 }

 return (
  <p className={`   flex items-center gap-1.5 mt-2 bg-amber-50/50 border border-amber-100 px-3 py-1.5 w-fit rounded-sm ${className}`}>
   <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
   <span className="  ">Submitter Email:</span>
   <a href={`mailto:${email}`} className="text-amber-900 hover:underline   ">
    {email}
   </a>
  </p>
 );
}
