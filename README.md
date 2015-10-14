# jsdomify
[![Build Status](https://travis-ci.org/podio/jsdomify.svg)](https://travis-ci.org/podio/jsdomify)
[![Coverage Status](https://coveralls.io/repos/podio/jsdomify/badge.svg?branch=master&service=github)](https://coveralls.io/github/podio/jsdomify?branch=master)

A ready to use DOM right at your finger tips for easy and fast testing without any browser in the Node environment
(with [mocha](http://mochajs.org/), for example)

## Getting started

```
npm install jsdomify
```

## Usage

You can create a new jsdom instance simply with 

```javascript
var jsdomify = require('jsdomify').create();
```

Or you can provide a valid HTML string that will be used as your DOM

```javascript
var jsdomify = require('jsdomify').create(
  '<!DOCTYPE html><html><head></head><body>hello</body></html>'
);
```

## Methods

`jsdomify` expose some useful methods that can be used to control the DOM instance

### create(domString)

```javascript
jsdomify.create();
```

Create a new DOM instance (with or withouth the optional DOM string).

### clear()

```javascript
jsdomify.clear();
```

Clear the current instance and recreate a new one using the same DOM string (basically clearing up the DOM).

### destroy()

```javascript
jsdomify.destroy([clearRequireCache]);
```

Close the window and destroy the document.
Can be used to isolate the tests and prevent leaking from one test suite to another.

If `clearRequireCache === true` all the cached node require modules will be purged (defaults to `true`).  
This is needed in order to use ReactJS with MochaJS.

Related issues: 
* [React](https://github.com/facebook/react/issues/4025 "React issue 4025")
* [Mocha](https://github.com/mochajs/mocha/issues/1722 "Mocha issue 1722")


### getDocument()

```javascript
var documentRef = jsdomify.getDocument();
var elm = documentRef.getElementById('whatever');
```

Get a reference to the document that has been created as a `global`.  
Useful when running with strict linting that doesn't allow globals but still want to test things on the document itself.

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

##### The MIT License (MIT)

Copyright (c) 2015 Podio Dev Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
