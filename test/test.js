"use strict";

var expect = require('unexpected');

var domify = require('../lib/domify');
domify.create();

describe('domify API', function() {

  it('should append a child to the body', function() {

    var par = document.createElement("P");
    var text = document.createTextNode("some text");
    par.appendChild(text);
    document.body.appendChild(par);

    expect(document.body.innerHTML, 'not to be empty');
  });

  it('should have cleared the window from any child', function() {

    domify.clear();
    expect(document.body.innerHTML, 'to be empty');
  });

  it('should have destroyed the DOM', function() {

    domify.destroy();
    var createElement = function() {
      document.createElement("P")
    };

    expect(createElement, 'to throw exception');
  })

});