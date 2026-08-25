import { supabase, isSupabaseConfigured } from '../lib/supabase';

function getSupabase() {
 if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
 return supabase;
}

async function uploadFile(bucket, folder, file) {
 const client = getSupabase();
 const extension = file.name.split('.').pop();
 const path = `${folder}/${crypto.randomUUID()}.${extension}`;
 const { error } = await client.storage.from(bucket).upload(path, file, {
  cacheControl: '3600', upsert: false,
 });
 if (error) throw error;
 return client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function getPapers() {
 const { data, error } = await getSupabase().from('papers')
  .select('*, profiles:author_id (full_name, institution, metadata)')
  .order('created_at', { ascending: false });
 if (error) throw error;
 return data ?? [];
}

export async function submitPaper(paperData, files, authorId) {
 if (!files.pdf) throw new Error('A manuscript file is required.');
 const client = getSupabase();
 const fileUrl = await uploadFile('research-papers', authorId, files.pdf);
 const coverImage = files.cover ? await uploadFile('covers', authorId, files.cover) : null;
 const { data: paper, error } = await client.from('papers').insert({
  title: paperData.title,
  abstract: paperData.abstract,
  introduction: paperData.introduction,
  conclusion: paperData.conclusion,
  category: paperData.category,
  cover_image: coverImage,
  file_url: fileUrl,
  year: Number.parseInt(String(paperData.year), 10),
  date_posted: new Date().toLocaleDateString('en-US', {
   year: 'numeric', month: 'long', day: 'numeric',
  }),
  author_id: authorId,
  status: 'pending',
 }).select().single();
 if (error) throw error;

 for (const collaborator of paperData.collaborators ?? []) {
  const { data: existing, error: lookupError } = await client.from('collaborators')
   .select('id').eq('email', collaborator.email).maybeSingle();
  if (lookupError) throw lookupError;
  let collaboratorId = existing?.id;
  if (!collaboratorId) {
   const { data: created, error: createError } = await client.from('collaborators').insert({
    full_name: collaborator.fullName,
    institution: collaborator.institution,
    email: collaborator.email,
   }).select('id').single();
   if (createError) throw createError;
   collaboratorId = created.id;
  }
  const { error: linkError } = await client.from('paper_collaborators')
   .insert({ paper_id: paper.id, collaborator_id: collaboratorId });
  if (linkError) throw linkError;
 }
 return paper;
}

export async function updatePaperStatus(paperId, status, reviewerId) {
 const { error } = await getSupabase().from('papers')
  .update({ status, reviewed_by: reviewerId }).eq('id', paperId);
 if (error) throw error;
}

export async function deletePaper(paperId) {
 const { error } = await getSupabase().from('papers').delete().eq('id', paperId);
 if (error) throw error;
}

export async function trackDownload(paperId, userId) {
 if (!userId) throw new Error('You must be signed in to track a download.');
 const client = getSupabase();
 const { data: existing, error: lookupError } = await client.from('downloads')
  .select('id').eq('user_id', userId).eq('paper_id', paperId).maybeSingle();
 if (lookupError) throw lookupError;
 if (existing) return { alreadyLogged: true };
 const { error: insertError } = await client.from('downloads')
  .insert({ user_id: userId, paper_id: paperId });
 if (insertError) throw insertError;
 const { error: incrementError } = await client.rpc('increment_downloads', { row_id: paperId });
 if (incrementError) throw incrementError;
 return { alreadyLogged: false };
}

export async function trackCitation(paperId, userId) {
 if (!userId) throw new Error('You must be signed in to track a citation.');
 const client = getSupabase();
 const { data: profile, error: profileError } = await client.from('profiles')
  .select('metadata').eq('id', userId).single();
 if (profileError) throw profileError;
 const metadata = Array.isArray(profile?.metadata) ? profile.metadata : [];
 const paperIdString = String(paperId);
 if (metadata.map(String).includes(paperIdString)) return { alreadyLogged: true };
 const { error: updateError } = await client.from('profiles')
  .update({ metadata: [...metadata, paperIdString] }).eq('id', userId);
 if (updateError) throw updateError;
 const { error: incrementError } = await client.rpc('increment_citations', { row_id: paperId });
 if (incrementError) throw incrementError;
 return { alreadyLogged: false };
}

export async function updateProfile(userId, profileData, avatarFile) {
 const avatarUrl = avatarFile
  ? await uploadFile('avatars', userId, avatarFile)
  : profileData.avatar_url;
 const { data, error } = await getSupabase().from('profiles').update({
  full_name: profileData.fullName,
  institution: profileData.institution,
  specialty: profileData.specialty,
  about_author: profileData.about_author,
  avatar_url: avatarUrl,
  metadata: profileData.metadata,
 }).eq('id', userId).select().single();
 if (error) throw error;
 return data;
}
