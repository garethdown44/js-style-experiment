//import sha1 from 'sha1';
import md5 from 'blueimp-md5';
import process from './process';

const modularize = addHash;

export function create(obj) {
  const ruleMappings = {};
  const converted = process(obj, ruleMappings, modularize);

  console.log(converted);
  addCssToHtml(converted);

  console.log(ruleMappings);

  return ruleMappings;
}

function id(key) {
  return key;
}

function addHash(key, preserveDot) {
  if (key.substring(1, 0) === '.') {
    key = key.substring(1);
  }

  const dot = preserveDot ? '.' : '';
  return `${dot}${key}_${md5(key)}`;
}

function addCssToHtml(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}