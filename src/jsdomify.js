
import {jsdom} from 'jsdom';
let actualDOM;
let documentRef;

let create = (domString) => {

  actualDOM = domString || '';
  global.document = jsdom(actualDOM);
  global.window = document.parentWindow;
  global.Element = window.Element;
  global.navigator = {
    userAgent: 'node.js'
  };

  // shim document.classList
  require('./polyfills/classList')(global.window);

  documentRef = document;
};

let clear = () => {
  destroy();
  create(actualDOM);
};

let destroy = (clearRequireCache) => {

  if(typeof clearRequireCache === 'undefined') {
    clearRequireCache = true;
  }

  window.close();
  delete global.document;
  documentRef = undefined;

  if (clearRequireCache) {
    Object.keys(require.cache).forEach((key) => {
      if (key.indexOf('require') !== -1) {
        delete require.cache[key];
      }
    });
  }

};

let getDocument = () => {
  if (typeof documentRef === 'undefined') {
    throw new Error(`document is undefined\nTry calling jsdomify.create() before requesting it\n`);
  }

  return documentRef;
};


module.exports = {
  create: create,
  clear: clear,
  destroy: destroy,
  getDocument: getDocument
};