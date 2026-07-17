import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { submitPaper } from '../services/api';
import { PAPER_CATEGORIES } from '../constants/categories';
import { FileText } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import StatusBanner from './ui/StatusBanner';
import FileDropZone from './sections/FileDropZone';
import FormField from './ui/FormField';
import CollaboratorFormSection from './sections/CollaboratorFormSection';

/**
 * Main form for research paper manuscript submission.
 * Decoupled and modularized for high maintainability.
 */
export default function UploadPaperForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    introduction: '',
    conclusion: '',
    category: '',
    year: new Date().getFullYear(),
  });

  const [files, setFiles] = useState({ pdf: null, cover: null });
  const [collaborators, setCollaborators] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');

  useEffect(() => {
    if (statusMsg && statusMsg.text && statusMsg.type !== 'info') {
      const timer = setTimeout(() => {
        setStatusMsg({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  useEffect(() => {
    if (!files.cover) {
      setCoverPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(files.cover);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [files.cover]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubError = (errText) => {
    setStatusMsg({ type: 'error', text: errText });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatusMsg({ type: 'error', text: 'Please sign in to submit a paper.' });
      return;
    }
    if (!files.pdf) {
      setStatusMsg({ type: 'error', text: 'Please upload a PDF, DOCX, or DOC of your manuscript.' });
      return;
    }
    setSubmitting(true);
    setStatusMsg({ type: 'info', text: 'Uploading your paper...' });

    try {
      const dataToSubmit = { ...formData, collaborators, submitter_email: user.email };
      await submitPaper(dataToSubmit, files, user.id);

      setStatusMsg({
        type: 'success',
        text: 'Your paper has been submitted and is now waiting for review.',
      });

      setFormData({
        title: '',
        abstract: '',
        introduction: '',
        conclusion: '',
        category: '',
        year: new Date().getFullYear(),
      });
      setCollaborators([]);
      setFiles({ pdf: null, cover: null });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Submission failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto border border-border p-6 md:p-10 md:rounded-xl">
      <div className="border-b border-gray-100 pb-5 mb-8 text-center md:text-left">
        <h2 className="text-3xl font-extralight tracking-tight text-primary">Submit a Paper</h2>
        <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-1.5 flex items-center justify-center md:justify-start gap-1">
          <FileText className="w-3.5 h-3.5 text-gray-400" /> Vetted by administrators for inconsistencies and errors before indexing
        </p>
      </div>

      <div className="mb-6">
        <StatusBanner
          type={statusMsg.type}
          text={statusMsg.text}
          heading={
            statusMsg.type === 'success' ? 'Paper submitted'
            : statusMsg.type === 'error' ? 'Submission failed'
            : 'Uploading'
          }
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Paper metadata */}
        <div className="space-y-6">
          <SectionHeader>1. Paper details</SectionHeader>

          <FormField
            label="Title"
            name="title"
            required
            placeholder="e.g. Spectral Signatures of Post-Degenerate White Dwarfs"
            className="text-base py-3"
            labelClassName="text-gray-500 uppercase tracking-wider text-[10px] font-medium block"
            value={formData.title}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Category"
              name="category"
              type="select"
              required
              placeholder="Choose one..."
              options={PAPER_CATEGORIES}
              className="py-3"
              labelClassName="text-gray-500 uppercase tracking-wider text-[10px] font-medium block"
              value={formData.category}
              onChange={handleInputChange}
            />

            <FormField
              label="Year"
              name="year"
              type="number"
              required
              min={1900}
              max={2030}
              className="py-3"
              labelClassName="text-gray-500 uppercase tracking-wider text-[10px] font-medium block"
              value={formData.year}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Long text */}
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
            onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* File uploads */}
        <div className="space-y-6">
          <SectionHeader>3. Files</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileDropZone
              label="Manuscript (PDF or Word)"
              required
              accept=".pdf,.doc,.docx"
              file={files.pdf}
              onFile={(file) => setFiles((prev) => ({ ...prev, pdf: file }))}
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
                setStatusMsg({ type: 'error', text: 'Please upload a PDF, DOCX, or DOC file.' })
              }
            />

            <FileDropZone
              label="Cover image (optional)"
              accept="image/*"
              file={files.cover}
              onFile={(file) => setFiles((prev) => ({ ...prev, cover: file }))}
              preview={coverPreviewUrl}
              helperText="JPG, PNG or WEBP"
            />
          </div>
        </div>

        {/* Co-authors */}
        <div className="space-y-6">
          <SectionHeader>4. Co-authors</SectionHeader>
          <CollaboratorFormSection
            collaborators={collaborators}
            onUpdateCollaborators={setCollaborators}
            onError={handleSubError}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary border border-gray-950 text-white text-xs uppercase tracking-widest py-4 hover:bg-primary hover:text-white font-medium hover:shadow-md transition duration-300 disabled:bg-gray-300 disabled:border-border"
        >
          {submitting ? 'Submitting...' : 'Submit for review'}
        </button>
      </form>
    </div>
  );
}
