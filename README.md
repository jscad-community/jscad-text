## jscad-text

## Create Outlines of Text using TTF fonts

> This project contains a set of functions that produce 2D outlines of text using TTF fonts.

## Overview

The JSCAD project does not provide the ability to use TTF fonts when creating outlines of text (It only supports SIMPLEX fonts.)
Therefore, a special set of functionality has been created to suppliment JSCAD.

NOTE: Due to the nature of TTF fonts this library cannot be used via the JSCAD Web UI. Keep reading...

Basically, this library depends on the 'opentype.js' library.
It's a really cool library which does some slick stuff; uncompresses the font, reads the contents, and produces SVG like structures.

But even before that, a TTF font file must be available.
All operating systems come with one or more fonts, and those can be used, if you can find them.
Fonts can also be downloaded from websites.

There are two examples; one which reads local font files, and one that downloads fonts from Google Fonts.

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Special Note](#special-note)
- [License](#license)

## Installation

For Node.js based projects, this package can be installed using NPM.
```
npm install jscad-text
```

For standalone projects, this package can be downloaded and included as a component.
- Download the package from GitHub
- Unzip the contents, which will produce a directory called 'jscad-text'
- Copy the 'jscad-text' directory into the larger project

## Examples

Each of the eamples is a small stand-alone NPM project; localfont and googlefont.

### Local Font Project

This project is the easiest to use, as fonts are read from local files.
Just find a nice font, and copy the file into the localFont folder.
- MacOS : see /Library/Fonts or /System/Library/Fonts
- Windows :
- Linux : 

Setup:
```
npm install
cd localfont
ln -s ../../jscad-text ./jscad-text
cd ..
```

Execution:
```
npm run example
```
And open 'localfont/index.svg' using any browser.

The contents of 'index.js' can be modified to change the path to the font file, or change the options to the textToPaths() function.
This is also a typical JSCAD design, and can be nodified to do whatever you want with the paths.

### Google Font Project

This project obtains fonts from the [Google Fonts website](https://fonts.google.com/).
Just go there, find a nice font 'family', and write down the name.

Another cool library called 'node-fetch' is being used to download the font from the internet.

Setup:
```
cd googlefont
npm install
ln -s ../../jscad-text ./jscad-text
```

Execution:
```
npm run cli
```
And open 'text.svg' using any browser.

### Closing Remark

You probably now know that fonts are not trivial to work with. The openfont.js library makes that easier.

You probably now know that HTTP downloads are painful in JavaScript.  The node-fetch library makes that easier.

Putting these two together inside a website... well... it's not impossible. But JSCAD won't do it.

## Special Note

**THIS PROJECT ONLY WORKS WITH JSCAD V2.**

As of today, the JSCAD V2 libraries / applications are available NPM as part of the '@jscad' organization.

See the user guide on [Early Adoption of V2](https://openjscad.org/dokuwiki/doku.php?id=early_v2) for some tips.

## License

[The MIT License (MIT)](./LICENSE)

