/**
 * Sets an item in localStorage with an expiration time.
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to store.
 * @param {number} ttlMs - Time to live in milliseconds.
 */
export const setWithExpiry = (key, value, ttlMs) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Gets an item from localStorage, checking for expiration.
 * If the item has expired, it is removed from localStorage and null is returned.
 * @param {string} key - The key of the item to retrieve.
 * @returns {any|null} The stored value or null if not found or expired.
 */
export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    // If parsing fails, return null
    return null;
  }
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The key of the item to remove.
 */
export const removeWithExpiry = (key) => {
  localStorage.removeItem(key);
};
