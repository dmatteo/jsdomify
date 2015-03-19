var jsdom = require('jsdom').jsdom;

exports.create = function(domString) {

  global.document = jsdom(domString || '<html><head></head><body></body></html>');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };

};

exports.clear = function() {
  this.destroy();
  this.create();
};

exports.destroy = function() {
  window.close();
};
