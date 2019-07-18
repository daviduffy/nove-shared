export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
export const tableize = str => str.toLowerCase().replace(/ /g, '-');
export const titleize = str => str.split(/[\_\-|\s]/).map(str => capitalize(str.toLowerCase())).join(' ');
export const uuid = (a) => {return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)};
export const camel2title = (camelCase = '') => camelCase
  .replace(/([A-Z])/g, match => ` ${match}`)
  .replace(/^./, match => match.toUpperCase());

const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
export const isValidV4UUID = uuid => uuidV4Regex.test(uuid);
  
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function outer(e) {
    if (e) {
      e.persist && e.persist();
      e.preventDefault && e.preventDefault();
    }
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function inner() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// yes I stole this
export const shadeColor = (color, percent) => {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
};

// and this too
// https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
export const objectEquals = (x, y) => {
    'use strict';
    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
};
