var assert = require("assert");
var psc = require('../index.js');

describe('psc', function() {
  describe('#parse()', function() {
    
    it('should return empty list for invalid strings', function() {
      assert.deepEqual([], psc.parse("abc"));
    });

  });
});
