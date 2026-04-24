import { useState, useEffect } from 'react';
import { getWithExpiry, setWithExpiry, removeWithExpiry } from '../utils/localStorageHelper';

/**
 * Custom hook for managing localStorage with expiration.
 * @param {string} key - The key for localStorage.
 * @param {any} initialValue - The initial value if nothing is found in storage.
 * @param {number} ttlMs - Time to live in milliseconds.
 * @returns {[any, Function, Function]} Returns [storedValue, setValue, removeValue]
 */
const useLocalStorageExpiry = (key, initialValue, ttlMs) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = getWithExpiry(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      setWithExpiry(key, valueToStore, ttlMs);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      removeWithExpiry(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorageExpiry;
