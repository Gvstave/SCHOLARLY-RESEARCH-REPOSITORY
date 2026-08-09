const SANDBOX_KEY_PREFIX = 'curated_archive_';

/**
 * Robust localStorage wrapper that automatically handles JSON encoding/decoding,
 * namespaces keys, and provides safe catch blocks for browser environments.
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const fullKey = key.startsWith(SANDBOX_KEY_PREFIX) ? key : SANDBOX_KEY_PREFIX + key;
    const data = localStorage.getItem(fullKey);
    return data !== null ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    const fullKey = key.startsWith(SANDBOX_KEY_PREFIX) ? key : SANDBOX_KEY_PREFIX + key;
    localStorage.setItem(fullKey, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeStorageItem = (key) => {
  try {
    const fullKey = key.startsWith(SANDBOX_KEY_PREFIX) ? key : SANDBOX_KEY_PREFIX + key;
    localStorage.removeItem(fullKey);
    return true;
  } catch {
    return false;
  }
};
