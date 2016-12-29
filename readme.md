# Podcast Chapter Parser for psc

Podcast Chapter Parser for [Podlove Simple Chapters](https://podlove.org/simple-chapters/).

## Installation

```bash
npm install podcast-chapter-parser-psc
```

## Example

```js
var psc = require('podcast-chapter-parser-psc');

var chapters = psc.parse('<psc:chapters xmlns:psc="http://podlove.org/simple-chapters" version="1.2">' 
  + '<psc:chapter title="Intro" start="00:00:01.200"/>'
  + '<psc:chapter title="Say Hello" start="00:00:02.000"/>' 
  + '</psc:chapters>');
// =>
// [
//     { start: 1200, title: "Intro" },
//     { start: 2000, title: "Say Hello" }
// ]
```

## Development

```
npm install
npm test
```
