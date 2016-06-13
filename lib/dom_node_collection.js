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
