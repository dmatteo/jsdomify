var jsdom = require('jsdom').jsdom;

var actualDOM;

exports.create = function(domString) {

  actualDOM = domString || '';
  global.document = jsdom(domString || '');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };

};

exports.clear = function() {
  this.destroy();
  this.create(actualDOM);
};

exports.destroy = function() {
  window.close();
  delete document;
};
