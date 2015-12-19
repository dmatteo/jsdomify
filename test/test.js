"use strict";

import expect from 'unexpected';

import jsdomify from '../src/jsdomify';

describe('jsdomify API', () => {

  describe('General behaviour', () => {

    before(() => {
      jsdomify.create();
    });

    after(() => {
      jsdomify.destroy();
    });

    it('should expose all jsdom properties to Node.js global', () => {
      const jsdomInstance = require('jsdom').jsdom();
      Object.keys(jsdomInstance.defaultView).forEach((property) => {
        expect(global[property], 'to be defined');
      });
    });

    it('should append a child to the body', () => {

      var par = document.createElement("P");
      var text = document.createTextNode("some text");
      par.appendChild(text);
      document.body.appendChild(par);

      expect(document.body.innerHTML, 'not to be empty');
    });

    it('should have cleared the window from any child', () => {

      jsdomify.clear();
      expect(document.body.innerHTML, 'to be empty');
    });

    it('should have destroyed the DOM', () => {

      jsdomify.destroy();
      let createElement = () => {
        document.createElement("P")
      };

      expect(createElement, 'to throw exception');
    });

    it('should keep the DOM string after clear()', () => {

      jsdomify.create('<p>par1</p><p>par2</p>');

      let par = document.createElement("P");
      let text = document.createTextNode("par3");
      par.appendChild(text);
      document.body.appendChild(par);

      let parCount = document.getElementsByTagName("P");
      expect(parCount.length, 'to be', 3);

      jsdomify.clear();
      parCount = document.getElementsByTagName("P");
      expect(parCount.length, 'to be', 2);
    });

    it('should get a reference to the document when using .getDocument', () => {
      jsdomify.create('<div id="test-document"></div>');
      var docReference = jsdomify.getDocument();

      expect(docReference.getElementById('test-document'), 'to be defined');
    });

    it('should throw if trying to access the document after .destroy', () => {
      jsdomify.create('<div id="test-document"></div>');
      jsdomify.destroy();

      expect(jsdomify.getDocument, 'to throw');
    });

  });


  describe('Isolation test', () => {

    before(() => {
      jsdomify.create();
    });

    beforeEach(() => {
      jsdomify.clear();
    });

    after(() => {
      jsdomify.destroy();
    });

    it('should append a child to the body', () => {

      let par = document.createElement("P");
      let text = document.createTextNode("some text");
      par.appendChild(text);
      document.body.appendChild(par);
      let parCount = document.getElementsByTagName("P");

      expect(document.body.innerHTML, 'not to be empty');
      expect(parCount.length, 'to be', 1);
    });

    it('should not find the previously appended child', () => {

      let parCount = document.getElementsByTagName("P");

      expect(document.body.innerHTML, 'to be empty');
      expect(parCount.length, 'to be', 0);
    });

  });


});