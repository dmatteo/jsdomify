
import {jsdom} from 'jsdom';
let actualDOM;
let documentRef;
let exposedProperties = ['window', 'navigator', 'document'];

let create = (domString) => {

  actualDOM = domString || '';
  global.document = jsdom(actualDOM);
  global.window = document.defaultView;
  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      exposedProperties.push(property);
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js'
  };

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

  if (typeof global.window !== 'undefined') {
    global.window.close();
  }
  documentRef = undefined;
  exposedProperties.map((property) => {
    delete global[property];
  });

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


export default {
  create: create,
  clear: clear,
  destroy: destroy,
  getDocument: getDocument
};