const storageKeyToken = 'keepCloneUserToken';
const storageKeyDarkMode = 'keepCloneDarkMode';

const saveUser = user =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user));

const getUser = () => JSON.parse(localStorage.getItem(storageKeyToken));

const removeUser = () => localStorage.removeItem(storageKeyToken);


