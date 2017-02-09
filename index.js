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
            var tag = chapterTags[i];
            var start = npt.parse(tag.getAttribute('start'));
            var title = tag.getAttribute('title');
            var href  = tag.getAttribute('href');

            if (start !== null) {
                var chapter = {
                    start: start,
                    title: title.trim()
                };

                if (href) {
                    chapter.href = href.trim();
                }

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
