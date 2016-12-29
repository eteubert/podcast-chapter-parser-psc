var npt = require('normalplaytime');

/**
 * Return parser instance
 * 
 * @param  DOMParser domparser DOMParser via dependency injection. 
 *         Via node, xmldom can be used. In the browser, the native DOMParser is available.
 *         
 * @return object with `parse` method
 */
var parser = function(domparser) {
    
    var parse = function(text) {

        var parser = new domparser();
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

    return {
        parse: parse
    }
}



module.exports = {
    parser: parser
};
