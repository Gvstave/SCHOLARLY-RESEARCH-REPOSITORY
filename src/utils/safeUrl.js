export function getSafeDocumentUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

export function openDocumentSafely(value) {
  const url = getSafeDocumentUrl(value);
  if (!url) return false;
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}
