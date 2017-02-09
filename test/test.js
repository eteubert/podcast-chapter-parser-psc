var DOMParser = require('xmldom').DOMParser;
var assert = require("assert");
var psc = require('../index.js').parser(DOMParser);

const wrap = function(xml) {
    return '<psc:chapters xmlns:psc="http://podlove.org/simple-chapters" version="1.2">' + xml + '</psc:chapters>';
}

const chapter_json = { start: 1200, title: "Intro" };

describe('psc', function() {
  describe('#parse()', function() {
    
    it('should return empty list for invalid strings', function() {
      assert.deepEqual([], psc.parse("abc"));
    });

    it('should return json with start and title', function() {
      assert.deepEqual([chapter_json], psc.parse(wrap('<psc:chapter title="Intro" start="00:00:01.200"/>')));
    });

    it('should return json with start, title and href', function() {
      assert.deepEqual([{ start: 1200, title: "Intro", href: "http://example.com" }], psc.parse(wrap('<psc:chapter title="Intro" start="00:00:01.200" href="http://example.com" />')));
    });

    it('should return trim the title', function() {
      assert.deepEqual([chapter_json], psc.parse(wrap('<psc:chapter title=" Intro " start="00:00:01.200"/>')));
    });

    it('should accept emoji 💩 in the title', function() {
      assert.deepEqual([{start: 1200, title: "Intro 💩"}], psc.parse(wrap('<psc:chapter title="Intro 💩" start="00:00:01.200"/>')));
    });

    it('should skip chapters with invalid timecode', function() {
      assert.deepEqual([chapter_json], psc.parse(wrap('<psc:chapter title="Intro" start="00:00:01.200"/><psc:chapter title="Second" start="a00:00:01.200"/>')));
    });

    it('should read multiple chapters', function() {
      assert.deepEqual([
        { start: 1200, title: "Intro" },
        { start: 2400, title: "Second" }
      ], psc.parse(wrap('<psc:chapter title="Intro" start="00:00:01.200"/><psc:chapter title="Second" start="00:00:02.400"/>')));
    });

  });
});
