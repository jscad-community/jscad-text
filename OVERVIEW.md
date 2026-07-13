## jscad-text

## Create Outlines of Text using TTF fonts

> This project contains a set of functions that produce 2D outlines of text using TTF fonts.

## Overview

The JSCAD project does not provide the ability to use TTF fonts when creating outlines of text (It only supports SIMPLEX fonts.)
Therefore, a special set of functionality has been created to suppliment JSCAD.

Basically, this library depends on the 'opentype.js' library.
It's a really cool library which does some slick stuff; uncompresses the font, reads the contents, and produces SVG like structures.

But even before that, a TTF font file must be available.
All operating systems come with one or more fonts, and those can be used, if you can find them.
Fonts can also be downloaded from websites.

There are three examples
- a project (localfont) that contains a JSCAD design (index.js) that reads a font file (Habana.ttf)
- a JASDEC design that fetches a font file from Google Fonts
- a JASDEC design that fetches a font file from the web, via a URL

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Websites](#websites)
- [Special Note](#special-note)
- [License](#license)

## Installation

For Node.js based projects, this package can be installed using NPM.
```
npm install jscad-text
```

## Examples

Each of the examples is a small stand-alone NPM project; localfont and googlefont.

### Local Font Project

This project is the easiest to use, as fonts are read from local files.

Execution:
```
cd examples/localfont
node index.js
```

The contents of 'index.js' can be modified to change the path to the font file, or change the options to the textToPaths() function.
This is also a typical JSCAD design, and can be nodified to do whatever you want with the paths.

### Google Font Example

This example fetches a font from the [Google Fonts website](https://fonts.google.com/).
Just go there, find a nice font 'family', and write down the name.

Another cool library called 'node-fetch' is being used to download the font from the internet.

Execution:
```
cd examples
node exampleGoogleFont.js
```

### Web Font Example

This example fetches a font from a hosted file (URL).

Execution:
```
cd examples
node exampleWebFont.js
```

## Websites

This project builds packages for use in websites.

If using the JSCAD V3 Design UI, just drop and drop the example to the page.

If including the library as part of a web application then include the package from any DSN.

## Special Note

**THIS VERSION ONLY WORKS WITH JSCAD V3.**

See the [User Guide](https://openjscad.xyz/v3/guide.html) for some tips.

## License

[The MIT License (MIT)](./LICENSE)

