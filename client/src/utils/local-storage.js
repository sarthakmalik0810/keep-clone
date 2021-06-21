const storageKeyToken = 'keepCloneUserToken';
const storageKeyDarkMode = 'keepCloneDarkMode';
const storageKeyListMode = 'keepCloneListMode';

export const saveUser = user =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user));

export const getUser = () => JSON.parse(localStorage.getItem(storageKeyToken));

export const removeUser = () => localStorage.removeItem(storageKeyToken);

export const saveDarkMode = boolean =>
  localStorage.setItem(storageKeyDarkMode, JSON.stringify(boolean));

export const loadDarkMode = () =>
  JSON.parse(localStorage.getItem(storageKeyDarkMode));

export const saveListMode = boolean =>
  localStorage.setItem(storageKeyListMode, JSON.stringify(boolean));

export const loadListMode = () =>
  JSON.parse(localStorage.getItem(storageKeyListMode));
