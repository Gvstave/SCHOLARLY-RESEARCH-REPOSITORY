import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import FormField from '../ui/FormField';
import { PAPER_CATEGORIES } from '../../constants/categories';

/**
 * UploadDetailsSection for paper metadata input (Title, Category, Year).
 */
export default function UploadDetailsSection({ formData, onInputChange }) {
 return (
  <div className="space-y-6">
   <SectionHeader>1. Paper details</SectionHeader>

   <FormField
    label="Title"
    name="title"
    required
    placeholder="e.g. Spectral Signatures of Post-Degenerate White Dwarfs"
    className="text-base py-3"
    labelClassName="   block"
    value={formData.title}
    onChange={onInputChange}
   />

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
     label="Faculty"
     name="category"
     type="select"
     required
     placeholder="Choose one..."
     options={PAPER_CATEGORIES}
     className="py-3"
     labelClassName="   block"
     value={formData.category}
     onChange={onInputChange}
    />

    <FormField
     label="Year of Publication"
     name="year"
     type="number"
     required
     min={1900}
     max={2030}
     className="py-3"
     labelClassName="   block"
     value={formData.year}
     onChange={onInputChange}
    />
   </div>
  </div>
 );
}
