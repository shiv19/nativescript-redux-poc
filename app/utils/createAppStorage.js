import { getString, remove, setString } from '@nativescript/core/application-settings';

/**
 * Implements setItem and getItem using App Settings of {N}
 */
export default function createAppStorage() {
  return {
    getItem: (key) => new Promise((resolve, _) => {
      resolve(getString(key));
    }),
    setItem: (key, item) => new Promise((resolve, _) => {
      resolve(setString(key, item));
    }),
    removeItem: (key) => new Promise((resolve, _) => {
      resolve(remove(key));
    })
  };
}
