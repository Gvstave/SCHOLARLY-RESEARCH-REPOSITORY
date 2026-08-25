import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Info / success / error banner used by the submission and profile forms.
const HEADINGS = {
 success: 'Success',
 error: 'Something went wrong',
 info: 'Working...',
};

const STYLES = {
 success: 'bg-[#EBF7EE] text-[#1E4D2B] border-[#D1ECD5]',
 error: 'bg-[#FFF0F0] text-[#7A1F1D] border-[#FFD6D6]',
 info: 'bg-[#F5F5F0] text-[#4A473D] border-[#E6E6DC]',
};

export default function StatusBanner({ type, text, heading }) {
 if (!text) return null;
 const style = STYLES[type] || STYLES.info;
 const title = heading || HEADINGS[type] || HEADINGS.info;

 return (
  <div className={`p-4 border flex items-start gap-2.5 ${style}`}>
   {type === 'success' ? (
    <CheckCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
   ) : type === 'error' ? (
    <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
   ) : (
    <div className="w-4 h-4 rounded-full border border-gray-600 border-t-transparent animate-spin shrink-0" />
   )}
   <div className="space-y-0.5">
    <p className="">{title}</p>
    <p className="    ">{text}</p>
   </div>
  </div>
 );
}
