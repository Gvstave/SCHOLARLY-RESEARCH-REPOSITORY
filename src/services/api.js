import { supabase, isSupabaseConfigured, disableSupabase } from '../lib/supabase';
import { DEFAULT_PROFILES, DEFAULT_PAPERS, DEFAULT_COLLABORATORS } from '../constants/seedData';
import { getStorageItem, setStorageItem } from '../utils/localStorageHelper';

let supabaseFailed = false;

const shouldUseSupabase = () => {
  return isSupabaseConfigured && !supabaseFailed && supabase;
};

// Local storage fallback so the app keeps working without a backend.
const getLocalStorage = (key, defaultValue) => getStorageItem(key, defaultValue);
const setLocalStorage = (key, value) => setStorageItem(key, value);

export { DEFAULT_PROFILES, DEFAULT_PAPERS, DEFAULT_COLLABORATORS };

// Helper to convert files to local data URLs for high fidelity showcase
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

// --- MULTI-STAGE STORAGE OR FALLBACK FLOW ---

// Help upload generic files
export const uploadFile = async (bucket, folder, file) => {
  if (shouldUseSupabase()) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.warn("Supabase uploadFile failed, falling back to local data URL:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  // In sandbox mode, we convert the uploaded PDF or cover image into a loadable data URL
  // so the browser can actually review or showcase them perfectly!
  return await fileToDataURL(file);
};

// --- REPOSITORY SERVICES Wrapper ---

export const getPapers = async () => {
  if (shouldUseSupabase()) {
    try {
      const { data, error } = await supabase
        .from('papers')
        .select(`
          *,
          profiles:author_id (full_name, institution, metadata)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn("Supabase getPapers failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  let localPapers = getLocalStorage('papers', []);
  if (!Array.isArray(localPapers) || localPapers.length === 0) {
    localPapers = DEFAULT_PAPERS;
    setLocalStorage('papers', DEFAULT_PAPERS);
  }
  
  let localProfiles = getLocalStorage('profiles', []);
  if (!Array.isArray(localProfiles) || localProfiles.length === 0) {
    localProfiles = DEFAULT_PROFILES;
    setLocalStorage('profiles', DEFAULT_PROFILES);
  }
  
  // Joint Profiles to papers
  return localPapers.map(paper => {
    const authorProfile = localProfiles.find(p => p.id === paper.author_id);
    let authorEmail = paper.submitter_email || '';
    if (!authorEmail && authorProfile) {
      if (authorProfile.email) {
        authorEmail = authorProfile.email;
      } else if (Array.isArray(authorProfile.metadata)) {
        const emailMeta = authorProfile.metadata.find(m => typeof m === 'string' && m.startsWith('email:'));
        if (emailMeta) {
          authorEmail = emailMeta.split(':')[1];
        }
      }
    }
    return {
      ...paper,
      submitter_email: authorEmail,
      profiles: authorProfile ? {
        full_name: authorProfile.full_name,
        institution: authorProfile.institution,
        metadata: authorProfile.metadata || [],
        email: authorEmail || authorProfile.email || ''
      } : undefined
    };
  });
};

export const submitPaper = async (paperData, files, authorId) => {
  let fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  let coverImage = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600';

  if (files.pdf) {
    fileUrl = await uploadFile('research-papers', authorId, files.pdf);
  }
  if (files.cover) {
    coverImage = await uploadFile('covers', authorId, files.cover);
  }

  if (shouldUseSupabase()) {
    try {
      const { data: paper, error: paperError } = await supabase
        .from('papers')
        .insert({
          title: paperData.title,
          abstract: paperData.abstract,
          introduction: paperData.introduction,
          conclusion: paperData.conclusion,
          category: paperData.category,
          cover_image: coverImage || null,
          file_url: fileUrl,
          year: parseInt(String(paperData.year), 10),
          date_posted: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author_id: authorId,
          status: 'pending',
        })
        .select()
        .single();

      if (paperError) throw paperError;

      // Process collaborators
      if (paperData.collaborators && paperData.collaborators.length > 0) {
        for (const coll of paperData.collaborators) {
          const { data: existingColl } = await supabase
            .from('collaborators')
            .select('id')
            .eq('email', coll.email)
            .maybeSingle();

          let collaboratorId;
          if (existingColl) {
            collaboratorId = existingColl.id;
          } else {
            const { data: newColl, error: insertCollErr } = await supabase
              .from('collaborators')
              .insert({
                full_name: coll.fullName,
                institution: coll.institution,
                email: coll.email,
              })
              .select()
              .single();
            if (insertCollErr) throw insertCollErr;
            collaboratorId = newColl.id;
          }

          await supabase
            .from('paper_collaborators')
            .insert({ paper_id: paper.id, collaborator_id: collaboratorId });
        }
      }

      return paper;
    } catch (err) {
      console.warn("Supabase submitPaper failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  const localPapers = getLocalStorage('papers', DEFAULT_PAPERS);
  const newPaper = {
    id: Date.now(),
    title: paperData.title,
    abstract: paperData.abstract,
    introduction: paperData.introduction,
    conclusion: paperData.conclusion,
    category: paperData.category,
    cover_image: coverImage,
    file_url: fileUrl,
    citations: 0,
    downloads: 0,
    status: 'pending',
    year: parseInt(String(paperData.year), 10),
    date_posted: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author_id: authorId,
    submitter_email: paperData.submitter_email || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  localPapers.unshift(newPaper);
  setLocalStorage('papers', localPapers);

  // Save linked collaborators if present
  if (paperData.collaborators && paperData.collaborators.length > 0) {
    const localCollabs = getLocalStorage('collaborators', DEFAULT_COLLABORATORS);
    const paperCollabsMap = getLocalStorage('paper_collaborators_junction', {});
    
    const paperCollabsIds = [];
    paperData.collaborators.forEach(c => {
      let coll = localCollabs.find(lc => lc.email === c.email);
      if (!coll) {
        coll = {
          id: Date.now() + Math.floor(Math.random() * 10000),
          full_name: c.fullName,
          institution: c.institution,
          email: c.email,
          created_at: new Date().toISOString()
        };
        localCollabs.push(coll);
      }
      paperCollabsIds.push(coll.id);
    });
    
    paperCollabsMap[newPaper.id] = paperCollabsIds;
    setLocalStorage('collaborators', localCollabs);
    setLocalStorage('paper_collaborators_junction', paperCollabsMap);
  }

  return newPaper;
};

// --- UPDATE PAPER STATUS ---

export const updatePaperStatus = async (paperId, status, reviewerId) => {
  if (shouldUseSupabase()) {
    try {
      const { error } = await supabase
        .from('papers')
        .update({
          status,
          reviewed_by: reviewerId,
          updated_at: new Date().toISOString()
        })
        .eq('id', paperId);

      if (error) throw error;
      return;
    } catch (err) {
      console.warn("Supabase updatePaperStatus failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  const localPapers = getLocalStorage('papers', DEFAULT_PAPERS);
  const updatedPapers = localPapers.map(p => 
    p.id === paperId 
      ? { ...p, status, reviewed_by: reviewerId, updated_at: new Date().toISOString() } 
      : p
  );
  setLocalStorage('papers', updatedPapers);
};

// --- DELETE PAPER MANUSCRIPT ---

export const deletePaper = async (paperId) => {
  if (shouldUseSupabase()) {
    try {
      const { error } = await supabase
        .from('papers')
        .delete()
        .eq('id', paperId);
      if (error) throw error;
      return;
    } catch (err) {
      console.warn("Supabase deletePaper failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  const localPapers = getLocalStorage('papers', DEFAULT_PAPERS);
  const updatedPapers = localPapers.filter(p => p.id !== paperId);
  setLocalStorage('papers', updatedPapers);
};

// --- DOWNLOAD TRACKING ---

export const trackDownload = async (paperId, userId) => {
  if (!userId) {
    throw new Error("Must be logged in to track download");
  }

  if (shouldUseSupabase()) {
    try {
      const { data: existing, error: _ } = await supabase
        .from('downloads')
        .select('id')
        .eq('user_id', userId)
        .eq('paper_id', paperId)
        .maybeSingle();

      if (existing) {
        return { alreadyLogged: true };
      }

      try {
        await supabase.rpc('increment_downloads', { row_id: paperId });
      } catch {
        // Fallback
        const { data: curPaper } = await supabase.from('papers').select('downloads').eq('id', paperId).single();
        await supabase.from('papers').update({ downloads: (curPaper?.downloads || 0) + 1 }).eq('id', paperId);
      }
      await supabase.from('downloads').insert({
        user_id: userId,
        paper_id: paperId,
      });
      return { alreadyLogged: false };
    } catch (err) {
      console.warn("Supabase trackDownload failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  // Local increment
  const logs = getLocalStorage('downloads_logs', []);
  const alreadyLogged = logs.some(l => l.user_id === userId && String(l.paper_id) === String(paperId));
  if (alreadyLogged) {
    return { alreadyLogged: true };
  }

  const localPapers = getLocalStorage('papers', DEFAULT_PAPERS);
  const updated = localPapers.map(p => p.id === paperId ? { ...p, downloads: p.downloads + 1 } : p);
  setLocalStorage('papers', updated);

  // Save log
  logs.push({
    id: Date.now(),
    user_id: userId,
    paper_id: paperId,
    downloaded_at: new Date().toISOString()
  });
  setLocalStorage('downloads_logs', logs);
  return { alreadyLogged: false };
};

// --- INCREMENT CITATIONS ---

export const trackCitation = async (paperId, userId) => {
  if (!userId) {
    throw new Error("Must be logged in to track citation");
  }

  if (shouldUseSupabase()) {
    try {
      // Fetch user profile to see metadata
      const { data: profile, error: getErr } = await supabase
        .from('profiles')
        .select('metadata')
        .eq('id', userId)
        .single();

      if (getErr) throw getErr;

      let metadata = profile?.metadata;
      if (!metadata) {
        metadata = [];
      } else if (!Array.isArray(metadata)) {
        metadata = [];
      }

      const paperIdStr = String(paperId);
      if (metadata.map(String).includes(paperIdStr)) {
        return { alreadyLogged: true };
      }

      // Add to metadata
      const updatedMetadata = [...metadata, paperIdStr];

      // Update profile
      const { error: updateErr } = await supabase
        .from('profiles')
        .update({ metadata: updatedMetadata })
        .eq('id', userId);

      if (updateErr) throw updateErr;

      // Increment citation
      const { data: curPaper } = await supabase.from('papers').select('citations').eq('id', paperId).single();
      await supabase.from('papers').update({ citations: (curPaper?.citations || 0) + 1 }).eq('id', paperId);

      return { alreadyLogged: false };
    } catch (err) {
      console.warn("Supabase trackCitation failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  const localProfiles = getLocalStorage('profiles', DEFAULT_PROFILES);
  const profileIdx = localProfiles.findIndex(p => p.id === userId);
  if (profileIdx !== -1) {
    let metadata = localProfiles[profileIdx].metadata;
    if (!metadata) {
      metadata = [];
    } else if (!Array.isArray(metadata)) {
      metadata = [];
    }

    const paperIdStr = String(paperId);
    if (metadata.map(String).includes(paperIdStr)) {
      return { alreadyLogged: true };
    }

    localProfiles[profileIdx].metadata = [...metadata, paperIdStr];
    setLocalStorage('profiles', localProfiles);
  } else {
    // If fallback profile doesn't exist, let's create a placeholder
    const placeholderProfile = {
      id: userId,
      full_name: 'Researcher',
      institution: 'Independent / Other',
      specialty: 'Academic Research',
      role: 'researcher',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      about_author: 'A researcher on The Curated Archive.',
      metadata: [String(paperId)],
      created_at: new Date().toISOString(),
    };
    localProfiles.push(placeholderProfile);
    setLocalStorage('profiles', localProfiles);
  }

  const localPapers = getLocalStorage('papers', DEFAULT_PAPERS);
  const updated = localPapers.map(p => p.id === paperId ? { ...p, citations: p.citations + 1 } : p);
  setLocalStorage('papers', updated);
  return { alreadyLogged: false };
};

// --- BIO PROFILE SERVICES ---

export const getProfile = async (userId) => {
  if (shouldUseSupabase()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn("Supabase getProfile failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  const localProfiles = getLocalStorage('profiles', DEFAULT_PROFILES);
  return localProfiles.find(p => p.id === userId) || null;
};

export const updateProfile = async (userId, profileData, avatarFile) => {
  let avatarUrl = profileData.avatar_url;

  if (avatarFile) {
    avatarUrl = await uploadFile('avatars', userId, avatarFile);
  }

  if (shouldUseSupabase()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.fullName,
          institution: profileData.institution,
          specialty: profileData.specialty,
          about_author: profileData.about_author,
          avatar_url: avatarUrl,
          metadata: profileData.metadata,
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn("Supabase updateProfile failed, falling back to local storage:", err);
      supabaseFailed = true;
      disableSupabase();
    }
  }

  const localProfiles = getLocalStorage('profiles', DEFAULT_PROFILES);
  const existingIdx = localProfiles.findIndex(p => p.id === userId);
  const existingProfile = existingIdx !== -1 ? localProfiles[existingIdx] : null;
  
  const updatedProfile = {
    id: userId,
    full_name: profileData.fullName,
    institution: profileData.institution,
    specialty: profileData.specialty,
    about_author: profileData.about_author,
    avatar_url: avatarUrl,
    metadata: profileData.metadata,
    role: existingProfile?.role || 'researcher',
    created_at: existingProfile ? existingProfile.created_at : new Date().toISOString()
  };

  if (existingIdx !== -1) {
    localProfiles[existingIdx] = updatedProfile;
  } else {
    localProfiles.push(updatedProfile);
  }

  setLocalStorage('profiles', localProfiles);
  return updatedProfile;
};
