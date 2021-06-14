export const getUserFromLocalStorage = () => localStorage.getItem('user');
export const setUserOnLocalStorage = (userData) =>
  localStorage.setItem('user', JSON.stringify(userData));

export const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);
