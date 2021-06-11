export const getUserFromLocalStorage = () => localStorage.getItem('user');

export const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);
