import React, { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';

// A single drag-and-drop file picker. Used for the manuscript PDF
// and the optional cover image on the submit page.
export default function FileDropZone({
  label,
  required = false,
  accept,
  file,
  onFile,
  preview,           // optional image preview URL
  helperText,
  onInvalidType,     // optional handler when a wrong file type is dropped
  validateType,      // optional (file) => boolean
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (!dropped) return;
    if (validateType && !validateType(dropped)) {
      onInvalidType?.(dropped);
      return;
    }
    onFile(dropped);
  };

  const handleChange = (e) => {
    const picked = e.target.files?.[0];
    if (picked) onFile(picked);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-gray-500 uppercase tracking-widest text-[9.5px] font-bold block">
        {label} {required && <span className="text-amber-700">*</span>}
      </label>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border border-dashed p-6 text-center cursor-pointer transition ${
          isDragging
            ? 'border-gray-800 bg-gray-50'
            : file
            ? 'border-[#C2E4C9] bg-[#F7FBF8]'
            : 'border-border bg-gray-50/50 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          ref={inputRef}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {file ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            {preview ? (
              <img src={preview} alt="Preview" className="w-14 h-14 object-cover border border-border" />
            ) : (
              <div className="p-2.5 bg-[#EBF7EE] rounded-full text-[#1E4D2B]">
                <FileText className="w-5 h-5" />
              </div>
            )}
            <p className="text-xs font-semibold text-primary-text truncate max-w-xs">{file.name}</p>
            <p className="text-[10px] text-gray-400 font-mono">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="w-5 h-5 text-gray-400 stroke-[1.5]" />
            <p className="text-xs text-primary-text">Drop a file here, or click to choose one</p>
            {helperText && (
              <p className="text-[9px] text-gray-500 uppercase tracking-wider">{helperText}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
