import React, { useState } from 'react';
import { Plus, Trash2, User, Landmark, Mail, Users } from 'lucide-react';
import FormField from '../ui/FormField';

/**
 * Modular component managing co-authors in paper submission.
 */
export default function CollaboratorFormSection({ collaborators, onUpdateCollaborators, onError }) {
  const [collabForm, setCollabForm] = useState({ fullName: '', institution: '', email: '' });

  const addCollaborator = () => {
    if (!collabForm.fullName || !collabForm.email) {
      if (onError) {
        onError('Please enter a name and an email for the co-author.');
      }
      return;
    }
    onUpdateCollaborators([...collaborators, collabForm]);
    setCollabForm({ fullName: '', institution: '', email: '' });
  };

  const removeCollaborator = (index) => {
    onUpdateCollaborators(collaborators.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <FormField
            label="Full name"
            placeholder="e.g. Dr. Arthur Dent"
            icon={User}
            className="py-2 text-xs"
            labelClassName="text-gray-400 uppercase tracking-widest text-[9px] block mb-1"
            value={collabForm.fullName}
            onChange={(e) => setCollabForm({ ...collabForm, fullName: e.target.value })}
          />

          <FormField
            label="Institution"
            placeholder="University or lab"
            icon={Landmark}
            className="py-2 text-xs"
            labelClassName="text-gray-400 uppercase tracking-widest text-[9px] block mb-1"
            value={collabForm.institution}
            onChange={(e) => setCollabForm({ ...collabForm, institution: e.target.value })}
          />

          <FormField
            label="Email"
            type="email"
            placeholder="dent@oxford.edu"
            icon={Mail}
            className="py-2 text-xs"
            labelClassName="text-gray-400 uppercase tracking-widest text-[9px] block mb-1"
            value={collabForm.email}
            onChange={(e) => setCollabForm({ ...collabForm, email: e.target.value })}
          />
        </div>

        <button
          type="button"
          onClick={addCollaborator}
          className="mt-4 flex items-center gap-1.5 border border-gray-800 px-3.5 py-1.5 text-primary-text text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 hover:text-white transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add co-author
        </button>
      </div>

      {collaborators.length > 0 && (
        <div className="space-y-2 border border-border divide-y divide-gray-100">
          <div className="bg-gray-100 px-4 py-2 text-[10px] text-gray-600 font-bold uppercase tracking-wider flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-gray-500" /> Co-authors on this paper
          </div>
          {collaborators.map((c, idx) => (
            <div key={idx} className="px-4 py-3 flex justify-between items-center text-xs text-primary-text bg-white">
              <div>
                <span className="font-semibold">{c.fullName}</span>
                <span className="text-gray-500 block text-[10.5px] mt-0.5">{c.institution} &bull; {c.email}</span>
              </div>
              <button
                type="button"
                onClick={() => removeCollaborator(idx)}
                className="text-gray-400 hover:text-rose-600 border border-gray-100 hover:border-rose-100 p-1.5 transition rounded-sm bg-gray-50 hover:bg-rose-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
