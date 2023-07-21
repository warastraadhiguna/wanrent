export const saveLocalStorage = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalStorage = (name) => {
  const dataLocalStorage = window.localStorage.getItem(name);
  return dataLocalStorage ? JSON.parse(dataLocalStorage) : null;
};

export const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name);
};
