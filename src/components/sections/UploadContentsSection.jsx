import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import FormField from '../ui/FormField';

/**
 * UploadContentsSection for paper texts (Abstract, Introduction, Conclusion).
 */
export default function UploadContentsSection({ formData, onInputChange }) {
  return (
    <div className="space-y-6">
      <SectionHeader>2. Contents</SectionHeader>

      <FormField
        label="Abstract"
        name="abstract"
        type="textarea"
        required
        rows={4}
        placeholder="Briefly describe the problem, your approach, and the main findings..."
        className="py-3"
        labelClassName="text-gray-500 uppercase tracking-wider text-[10px] font-medium block"
        value={formData.abstract}
        onChange={onInputChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Introduction (optional)"
          name="introduction"
          type="textarea"
          rows={3}
          placeholder="Background and prior work..."
          className="py-3"
          labelClassName="text-gray-500 uppercase tracking-wider text-[10px] font-medium block"
          value={formData.introduction}
          onChange={onInputChange}
        />

        <FormField
          label="Conclusion (optional)"
          name="conclusion"
          type="textarea"
          rows={3}
          placeholder="Main takeaways and future work..."
          className="py-3"
          labelClassName="text-gray-500 uppercase tracking-wider text-[10px] font-medium block"
          value={formData.conclusion}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}
