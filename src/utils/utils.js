export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
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
