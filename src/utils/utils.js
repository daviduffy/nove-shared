export const titleize = str => str.split(/[\_\-|\s]/).map(str => capitalize(str.toLowerCase())).join(' ');
