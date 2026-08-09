export function adaptClerkUser(clerkUser) {
  if (!clerkUser) return null;

  const email = clerkUser.primaryEmailAddress?.emailAddress || '';
  return {
    id: clerkUser.id,
    email,
    user_metadata: {
      full_name: clerkUser.fullName || clerkUser.username || email,
      institution: clerkUser.publicMetadata?.institution,
      role: clerkUser.publicMetadata?.role,
    },
  };
}
