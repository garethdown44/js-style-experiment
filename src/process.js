'use strict';

var reduce = function (obj, fn, memo) {
  for (var propName in obj) {
    if (obj.hasOwnProperty(propName)) {
        memo = fn(memo, obj[propName], propName);
    }
  }
  return memo;
};

//Converts camel case into dashes. marginTop -> margin-top
var dashCase = function (str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  });
};

//Clones the array, pushes to it, and returns it
var clonePush = function (arr, val) {
  var temp = arr.slice(0);
  temp.push(val);
  return temp;
};

var css = function (styles, classMappings, modularize) {
  if (Array.isArray(styles)) {
    return styles.map(css).join('');
  } else {
    return preprocess(styles, classMappings, modularize);
  }
};

function preprocess(json, classMappings, modularize) {
  var rules = [];

  var getValue = function (rule, val) {
    return css.space + dashCase(rule) + ': ' + val + ';\n';
  };

  var processContents = function (scope, contents) {
    return reduce(contents, function (result, val, rule) {
      if (Array.isArray(val)) {
        return result + val.map(getValue.bind(null, rule)).join('');
      } else if (typeof val === 'object') {
        addRule(clonePush(scope, rule), val);
      } else {
        return result + getValue(rule, val);
      }
      return result;
    }, '');
  };

  var joinScope = function (scope) {
    return scope.reduce(function (acc, rule) {
      var sep = ' ';
      if (rule[0] === '&') {
        sep = '';
        rule = rule.slice(1);
      }
      return (acc ? acc + sep : '') + modularize(rule, true);
    }, '');
  };

  var addRule = function (scope, contents) {
    var selector = scope.slice(-1).pop();
    classMappings[dedot(selector)] = modularize(selector);
    var content = processContents(scope, contents);

    if (content) {
      rules.unshift(joinScope(scope) + ' {\n' + content + '}\n');
    }
  };

  for (var def in json) {
    addRule([def], json[def]);
  }
  return rules.join('');
}

css.space = ' ';

module.exports = css;

function dedot(item) {
  const itemStr = item.toString();
  // console.log(itemStr);
  // console.log(itemStr.substring(1, 0));
  if (itemStr.substring(1, 0) === '.') {
    return itemStr.substring(1);
  }
  
  return itemStr;
}