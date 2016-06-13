var DOMNodeCollection = require('./dom_node_collection.js');

var _callbacks = [];
var _ready = false;

window.$l = function (arg) {
  if (typeof arg === 'string') {
    var nodeList = document.querySelectorAll(arg);
    var nodeListArray = [].slice.call(nodeList);
      return new DOMNodeCollection(nodeListArray);
  } else if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function) {
      handleDocReadyCallback(callback);
  }
};

var handleDocReadyCallback = function (callback) {
  if (_ready) {
    callback();
  } else {
    _callbacks.push(callback);
  }
};

$l.extend = function() {
  var result = {};
  for (var i = 0; i < arguments.length; i++) {
    result = Object.assign(result, arguments[i]);
  }
  return result;
};

$l.ajax = function(optionsObject) {
  var request = new XMLHttpRequest();
  var defaults = {
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  method: "GET",
  url: "",
  success: function () {},
  error: function () {},
  data: {},
};
  options = $l.extend(defaults, options);

  if (options.method.toUpperCase() === "GET") {
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url);
  request.onload = function () {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
  request.send(JSON.stringify(options.data));
};

var toQueryString = function (data) {
  var result = "";
  for (var key in data) {
    result += key + "=" + data[key] + "&";
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener("DOMContentLoaded", function () {
  _ready = true;
  _callbacks.forEach(function (callback) {
    callback();
  });
});
