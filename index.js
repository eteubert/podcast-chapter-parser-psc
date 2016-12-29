// when run in a browser, we can use the native DOMParser, but node doesn't have it
if (typeof window === 'undefined' || typeof window.DOMParser === 'undefined') {
    var DOMParser = require('xmldom').DOMParser;
}

var npt = require('normalplaytime');

var parse = function(text) {

    var parser = new DOMParser();
    var xml    = parser.parseFromString(text, "text/xml");
    var chapterTags = xml.getElementsByTagNameNS('http://podlove.org/simple-chapters', 'chapter');

    var chapters = [];

    for (var i = 0; i < chapterTags.length; i++) {
        var start = npt.parse(chapterTags[i].getAttribute('start'));
        var title = chapterTags[i].getAttribute('title').trim();

        if (start !== null) {
            var chapter = {
                start: start,
                title: title
            };
            chapters.push(chapter);
        }
    }

    return chapters;

};

module.exports = {
    parse: parse
};
