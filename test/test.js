"use strict";

var expect = require('unexpected');

var jsdomify = require('../lib/domify');
jsdomify.create();



describe('jsdomify API', function() {

  describe('general behaviour', function() {

    it('should append a child to the body', function() {

      var par = document.createElement("P");
      var text = document.createTextNode("some text");
      par.appendChild(text);
      document.body.appendChild(par);

      expect(document.body.innerHTML, 'not to be empty');
    });

    it('should have cleared the window from any child', function() {

      jsdomify.clear();
      expect(document.body.innerHTML, 'to be empty');
    });

    it('should have destroyed the DOM', function() {

      jsdomify.destroy();
      var createElement = function() {
        document.createElement("P")
      };

      expect(createElement, 'to throw exception');
    });

    it('should keep the DOM string after clear()', function() {

      jsdomify.create('<p>par1</p><p>par2</p>');

      var par = document.createElement("P");
      var text = document.createTextNode("par3");
      par.appendChild(text);
      document.body.appendChild(par);

      var parCount = document.getElementsByTagName("P");
      expect(parCount.length, 'to be', 3);

      jsdomify.clear();
      parCount = document.getElementsByTagName("P");
      expect(parCount.length, 'to be', 2);
    });

  });

});