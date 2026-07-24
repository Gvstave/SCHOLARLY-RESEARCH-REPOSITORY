import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import FileDropZone from './FileDropZone';

/**
 * UploadFilesSection for file dropzone inputs.
 */
export default function UploadFilesSection({ files, onUpdateFiles, coverPreviewUrl, onSetStatusMsg }) {
  return (
    <div className="space-y-6">
      <SectionHeader>3. Files</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileDropZone
          label="Manuscript (PDF or Word)"
          required
          accept=".pdf,.doc,.docx"
          file={files.pdf}
          onFile={(file) => onUpdateFiles((prev) => ({ ...prev, pdf: file }))}
          helperText="PDF, DOCX, or DOC"
          validateType={(f) => {
            const allowedTypes = [
              'application/pdf',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/msword'
            ];
            const ext = f.name ? '.' + f.name.split('.').pop().toLowerCase() : '';
            return allowedTypes.includes(f.type) || ['.pdf', '.doc', '.docx'].includes(ext);
          }}
          onInvalidType={() =>
            onSetStatusMsg({ type: 'error', text: 'Please upload a PDF, DOCX, or DOC file.' })
          }
        />

        <FileDropZone
          label="Cover image (optional)"
          accept="image/*"
          file={files.cover}
          onFile={(file) => onUpdateFiles((prev) => ({ ...prev, cover: file }))}
          preview={coverPreviewUrl}
          helperText="JPG, PNG or WEBP"
        />
      </div>
    </div>
  );
}
