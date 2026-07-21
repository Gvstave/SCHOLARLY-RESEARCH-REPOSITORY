import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { submitPaper } from '../services/api';
import { FileText } from 'lucide-react';
import StatusBanner from './ui/StatusBanner';
import CollaboratorFormSection from './sections/CollaboratorFormSection';
import UploadDetailsSection from './sections/UploadDetailsSection';
import UploadContentsSection from './sections/UploadContentsSection';
import UploadFilesSection from './sections/UploadFilesSection';

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
        <UploadDetailsSection formData={formData} onInputChange={handleInputChange} />

        <UploadContentsSection formData={formData} onInputChange={handleInputChange} />

        <UploadFilesSection
          files={files}
          onUpdateFiles={setFiles}
          coverPreviewUrl={coverPreviewUrl}
          onSetStatusMsg={setStatusMsg}
        />

        <div className="space-y-6">
          <div className="text-[12px] uppercase tracking-wider text-primary font-bold border-b border-border pb-2">4. Co-authors</div>
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
