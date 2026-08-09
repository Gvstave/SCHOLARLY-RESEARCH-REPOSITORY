const ADMIN_EMAIL = 'ilungagustave73@gmail.com';

// Resolves the role for a user: keeps an existing role if valid,
// otherwise promotes the configured admin email and defaults everyone else to researcher.
export const resolveRole = (email, existingRole) => {
  if (existingRole === 'admin' || existingRole === 'researcher') return existingRole;
  return (email || '').toLowerCase() === ADMIN_EMAIL ? 'admin' : 'researcher';
};
