export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
export const titleize = str => str.split(/[\_\-|\s]/).map(str => capitalize(str.toLowerCase())).join(' ');
