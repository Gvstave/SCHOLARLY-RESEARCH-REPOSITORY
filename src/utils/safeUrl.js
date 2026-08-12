const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'blob:']);
const SAFE_DOCUMENT_DATA_URL = /^data:application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)[;,]/i;

export function getSafeDocumentUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const candidate = value.trim();
  if (SAFE_DOCUMENT_DATA_URL.test(candidate)) return candidate;

  try {
    const url = new URL(candidate, window.location.origin);
    return SAFE_PROTOCOLS.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function openDocumentSafely(value) {
  const url = getSafeDocumentUrl(value);
  if (!url) return false;
  const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (openedWindow) openedWindow.opener = null;
  return true;
}
