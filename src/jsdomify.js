
import {jsdom} from 'jsdom';
let actualDOM;

let create = (domString) => {

  actualDOM = domString || '';
  global.document = jsdom(actualDOM);
  global.window = document.defaultView;
  global.Element = window.Element;
  global.navigator = {
    userAgent: 'node.js'
  };

  // shim document.classList
  require('./polyfills/classList')(global.window);
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

  if (clearRequireCache) {
    Object.keys(require.cache).forEach((key) => {
      if (key.indexOf('require') !== -1) {
        delete require.cache[key];
      }
    });
  }

};

module.exports = {
  create: create,
  clear: clear,
  destroy: destroy
};