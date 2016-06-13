# Select

  Select is a Javascript library that emulates the core functionality of
JQuery. It has functions that allow the user to manipulate the DOM, handle
events, and make AJAX requests. It accomplishes this by interacting
with the DOM API built into most browsers.

## How it Works

  Much like JQuery, the core $elect function can take a CSS string, an HTMLElement,
or a function as an argument. In the first two instances it will return an
instance of 'DOMNodeCollection,' which has further methods defined on it. If passed
a function, it will execute that function as a callback after the DOM content is
loaded.
  Calling $elect.ajax also provides a convenient interface for making XHR requests.

### Manipulation and Traversal

  DOM manipulation methods include:

  * html, empty, append, attr, addClass, removeClass

  Traversal methods:

  * children, parent, find, remove

### Event Handling

  * on, off methods

### Document Ready

  Functions passed to $elect will be stored in a callbacks array that is
executed upon "DOMContentLoaded."

### AJAX

  $elect.ajax takes an options object that it then merges into provided
defaults with a custom extend method:
  $elect.extend = function() {
    var result = {};
    for (var i = 0; i < arguments.length; i++) {
      result = Object.assign(result, arguments[i]);
    }
    return result;
  };
The response from the request is then parsed into JSON.

## Future Improvements

  I would like to explore the possibility of having the ajax function
return a promise. I may also add more DOM manipulation methods. 
Any other suggestions are welcome.
