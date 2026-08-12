// Roles must come from Clerk-managed public metadata, never from editable
// browser storage or a discoverable email-address rule.
export const resolveRole = (_email, role) => role === 'admin' ? 'admin' : 'researcher';
