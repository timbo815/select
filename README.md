# Select

  Select is a lightweight Javascript DOM manipulation library. It has
functions that allow the user to manipulate the DOM, handle
events, and make AJAX requests. It accomplishes this by interacting
with the DOM API built into most browsers.

## How it Works

  The core $elect function can take a CSS string, an HTMLElement,
or a function as an argument. In the first two instances it will return an
instance of 'DOMNodeCollection,' which has further methods defined on it. If passed
a function, it will execute that function as a callback after the DOM content is
loaded.
  Calling $elect.ajax also provides a convenient interface for making XHR requests.

```javascript
window.$elect = function (arg) {
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
```

## Public API

`$elect(arg)` - will return a new instance of `DOMNodeCollection` if
`arg` is a `string` or `HTMLElement`. If `arg` is a function it will add
it to `_callbacks` to be executed on `DOMContentLoaded`.

### DOM Manipulation

`html()` - returns the `innerHTML` of first matched element in `DOMNodeCollection`  

`html(string)` - sets the `innerHTML` of all matched elements

`empty` - sets `innerHTML` of DOM elements to an empty string

`append` - appends the `outerHTML` of each element in the argument to the `innerHTML`
of each element in the `DOMNodeCollection`.

`attr(string)` - retrieve value of attribute for first matched element

`attr(string, value)` - sets value of attribute for first matched element

`addClass(className)` - add class to DOM elements

`removeClass(className)` - remove class from DOM elements

### DOM Traversal

`children(parentNode)` - returns a `DOMNodeCollection` of all children of `parentNode`

`parent(child) ` - returns a `DOMNodeCollection` of all parents of `child`

`find(selector)` - returns a `DOMNodeCollection` of all children matching the selector

`remove` - removes the HTML from all the nodes in the array

### Event Handling

`on(event, handler)` - sets a callback to be executed on given event

`off(event, handler)` - removes event listeners from DOM elements  
off methods

### AJAX

`$elect.ajax(options)` - perform an Asynchronous XMLHttpRequest after
merging options passed with a default hash using custom `$elect.extend`
method:

```javascript
  $elect.extend = function() {
    var result = {};
    for (var i = 0; i < arguments.length; i++) {
      result = Object.assign(result, arguments[i]);
    }
    return result;
  };
```
The response from the request is then parsed into JSON.

## Future Improvements

  I would like to explore the possibility of having the ajax function
return a promise. I may also add more DOM manipulation methods.
Any other suggestions are welcome.
