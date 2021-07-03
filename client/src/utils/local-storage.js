const storageKeyToken = 'keepcloneusertoken';
const storageKeyDarkMode = 'keepclonedarkMode';
const storageKeyListMode = 'keepclonelistMode';
const storageKeyExpirationTime = 'keepcloneexpirationtime';

export const saveUser = user => {
  localStorage.setItem(storageKeyToken, user);
};

export const getUser = () => localStorage.getItem(storageKeyToken);

export const removeUser = () => {
  localStorage.removeItem(storageKeyToken);
};

export const setExpirationTime = time =>
  localStorage.setItem(storageKeyExpirationTime, JSON.stringify(time));

export const getExpirationTime = () =>
  JSON.parse(localStorage.getItem(storageKeyExpirationTime));

export const clearExpirationTime = () =>
  localStorage.removeItem(storageKeyExpirationTime);

export const saveDarkMode = boolean =>
  localStorage.setItem(storageKeyDarkMode, JSON.stringify(boolean));

export const loadDarkMode = () =>
  JSON.parse(localStorage.getItem(storageKeyDarkMode));

export const saveListMode = boolean =>
  localStorage.setItem(storageKeyListMode, JSON.stringify(boolean));

export const loadListMode = () =>
  JSON.parse(localStorage.getItem(storageKeyListMode));
