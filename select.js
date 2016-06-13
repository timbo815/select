/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var DOMNodeCollection = function (elements) {
	  this.htmlArray = [].slice.call(elements);
	};
	
	DOMNodeCollection.prototype.html = function (string) {
	  if (string) {
	    this.htmlArray.forEach(function (node) {
	      node.innerHTML = string;
	    });
	  } else {
	    return this.htmlArray[0].innerHTML;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html('');
	};
	
	DOMNodeCollection.prototype.append = function (arg) {
	  this.htmlArray.forEach(function (node) {
	    node.innerHTML += arg.outerHTML;
	  });
	};
	
	DOMNodeCollection.prototype.attr = function (string, value) {
	  var array = this.htmlArray;
	    if (value) {
	      array.forEach(function (el) {
	        el.setAttribute(string, value);
	      });
	    }
	    else {
	      array[0].getAttribute(string);
	    }
	};
	
	DOMNodeCollection.prototype.addClass = function (className) {
	  var array = this.htmlArray;
	  array.forEach(function (el) {
	    el.classList.add(className);
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (className) {
	  var array = this.htmlArray;
	  array.forEach(function (el) {
	    el.classList.remove(className);
	  });
	};
	
	DOMNodeCollection.prototype.children = function (parentNode) {
	  var children = [];
	  var array = this.htmlArray;
	  array.forEach(function (el) {
	    children = children.concat(el.children());
	  });
	  return new DOMNodeCollection(children);
	};
	
	DOMNodeCollection.prototype.parent = function (child) {
	  var parents = [];
	  var array = this.htmlArray;
	  array.forEach(function (el) {
	    parents = parents.concat(el.parentNode());
	  });
	  return new DOMNodeCollection(parents);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var selected = [];
	  var array = this.htmlArray;
	  array.forEach(function (el) {
	    selected = selected.concat(el.querySelectorAll(selector));
	  });
	  return new DOMNodeCollection(selected);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  var array = this.htmlArray;
	  array.forEach(function (node) {
	    node.parentNode.removeChild(node);
	  });
	  this.htmlArray = [];
	};
	
	DOMNodeCollection.prototype.on = function (event, handler) {
	  var array = this.htmlArray;
	  array.forEach(function(el) {
	    el.addEventListener(event, handler);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (event, handler) {
	  array.forEach(function (el) {
	    el.removeEventListener(event, handler);
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=select.js.map