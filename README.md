
# jsdomify

A ready to use DOM right at your finger tips for easy and fast testing without any browser in the Node environment
(with [mocha](http://mochajs.org/), for example)

## Getting started

```
npm install jsdomify
```

## Usage

You can create a new jsdom instance simply with 

```javascript
var jsdomify = require('jsdomify').create()
```

Or you can provide a valid HTML string that will be used as your DOM

```javascript
var jsdomify = require('jsdomify').create('<!DOCTYPE html><html><head></head><body>hello</body></html>')
```

## Methods

`jsdomify` expose some useful methods that can be used to control the DOM instance

### create(domString)

```javascript
jsdomify.create()
```

Create a new DOM instance (with or withouth the optional DOM string).

### clear()

```javascript
jsdomify.clear()
```

Clear the current instance and recreate a new one using the same DOM string (basically clearing up the DOM).

### destroy()

```javascript
jsdomify.destroy([clearRequireCache])
```

Close the window and destroy the document.
Can be used to isolate the tests and prevent leaking from one test suite to another.

If `clearRequireCache === true` all the cached node require modules will be purged (defaults to `true`).
This is needed in order to use ReactJS with MochaJS.

React related issue: https://github.com/facebook/react/issues/4025
MochaJS related issue: https://github.com/mochajs/mocha/issues/1722

## Usage examples

From our very own test suite

```javascript
describe('Isolation test', function() {

  before(function() {
    jsdomify.create();
  });

  beforeEach(function() {
    jsdomify.clear();
  });

  after(function() {
    jsdomify.destroy();
  });

  it('should append a child to the body', function() {

    var par = document.createElement("P");
    var text = document.createTextNode("some text");
    par.appendChild(text);
    document.body.appendChild(par);
    var parCount = document.getElementsByTagName("P");

    expect(document.body.innerHTML, 'not to be empty');
    expect(parCount.length, 'to be', 1);
  });

  it('should not find the previously appended child', function() {

    var parCount = document.getElementsByTagName("P");

    expect(document.body.innerHTML, 'to be empty');
    expect(parCount.length, 'to be', 0);
  });

});
```

## Test

```
npm test
```

## License
MIT