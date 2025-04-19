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
- [Projects](#projects)
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

cd examples/localfont

npm install
```

Execution:
```
npm run cli
```
And open 'index.svg' using any browser.

The contents of 'index.js' can be modified to change the path to the font file, or change the options to the textToPaths() function.
This is also a typical JSCAD design, and can be nodified to do whatever you want with the paths.

### Google Font Project

This project obtains fonts from the [Google Fonts website](https://fonts.google.com/).
Just go there, find a nice font 'family', and write down the name.

Another cool library called 'node-fetch' is being used to download the font from the internet.

Setup:
```
npm install

cd examples/googlefont

npm install
```

Execution:
```
npm run cli
```
And open 'test.svg' using any browser.

## Projects

Still there...

So, here's how to use this library inside a project (JSCAD design).

If not already, create a new folder for the project. (This example is using 'newproject' as the folder name.)

Download this library, unzip, and copy everything to the project folder.
Click on the green CODE above, and select Download ZIP.

Now, find a font, and copy that into the project folder.

Inside the project folder, create a file called index.js, and add the following code.
```
const { primitives } = require('@jscad/modeling')

const { loadFontFromData, textToPaths } = require('./jscad-text-master')

const fs = require('fs')

const main = (params) => {
  const data = fs.readFileSync('newproject/Habana.ttf') // CHANGE THIS TO THE FONT FILE NAME

  const font = loadFontFromData(data)

  const paths = textToPaths({font, segments: 144}, 'JSCAD ROCKS!!')

  return paths
}

module.exports = { main }
```

Almost there. Now download the opentype.js library from here; https://github.com/opentypejs/opentype.js
Unzip the contents, and copy opentype.js/dist/opentype.js to newproject/jscad-text-master/src/opentype.js

Done!

Now, just drag and drop the project folder onto the JSCAD website.

## Special Note

**THIS PROJECT ONLY WORKS WITH JSCAD V2.**

See the [User Guide](https://openjscad.xyz/guide.html) for some tips.

## License

[The MIT License (MIT)](./LICENSE)

