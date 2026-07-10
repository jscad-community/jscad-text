## Objects

<dl>
<dt><a href="#jscad-text">jscad-text</a> : <code>object</code></dt>
<dd><p>Create Outlines of Text using TTF fonts</p>
<p>The JSCAD project does not provide the ability to use TTF fonts when creating outlines of text (It only supports SIMPLEX fonts.)
Therefore, a special set of functionality has been created to suppliment JSCAD.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#loadFont">loadFont</a> ⇒ <code>Font</code></dt>
<dd><p>Load the font description from the given file path.</p>
</dd>
<dt><a href="#loadFontFromData">loadFontFromData</a> ⇒ <code>Font</code></dt>
<dd><p>Load the font description from the given data.</p>
</dd>
<dt><a href="#loadGoogleFont">loadGoogleFont</a> ⇒ <code>Font</code></dt>
<dd><p>Load the font from the Google Fonts website, using the given family and variant.</p>
<p>This function is asycronous, and fetchs the data via the given fetch function.
This is required due to the fetching of data across the internet via HTTP protocols.</p>
</dd>
<dt><a href="#loadWebFont">loadWebFont</a> ⇒ <code>Font</code></dt>
<dd><p>Load the font from a website using the given URL.</p>
<p>This function is asycronous, and fetchs the data via the given fetch function.
This is required due to the fetching of data across the internet via HTTP protocols.</p>
</dd>
<dt><a href="#textToGeom2">textToGeom2</a> ⇒ <code>Object</code></dt>
<dd><p>Convert the given text to a geom2 object.</p>
<p>The paths are created based on the original Font glyphs, and scaled to the fontSize.</p>
</dd>
<dt><a href="#textToPaths">textToPaths</a> ⇒ <code>Array</code></dt>
<dd><p>Convert the given text to a set of outline paths.</p>
<p>The paths are created based on the original Font glyphs, and scaled to the fontSize.</p>
<p>The paths may or may not be closed. See textToGeom2 for additional options.</p>
</dd>
</dl>

<a name="jscad-text"></a>

## jscad-text : <code>object</code>
Create Outlines of Text using TTF fonts

The JSCAD project does not provide the ability to use TTF fonts when creating outlines of text (It only supports SIMPLEX fonts.)
Therefore, a special set of functionality has been created to suppliment JSCAD.

**Kind**: global namespace  
**License**: MIT  
<a name="loadFont"></a>

## loadFont ⇒ <code>Font</code>
Load the font description from the given file path.

**Kind**: global constant  
**Returns**: <code>Font</code> - new font object which contains the contents of the font  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path to local file, i.e. font |

**Example**  
```js
const filePath = "./fonts/Habana.ttf"
const font = loadFont(filePath)
```
<a name="loadFontFromData"></a>

## loadFontFromData ⇒ <code>Font</code>
Load the font description from the given data.

**Kind**: global constant  
**Returns**: <code>Font</code> - new font object which contains the contents of the font  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>ArrayBuffer</code> | raw data from font file |

**Example**  
```js
const fontData = await response.arrayBuffer()
const font = loadFontFromData(fontData)
```
<a name="loadGoogleFont"></a>

## loadGoogleFont ⇒ <code>Font</code>
Load the font from the Google Fonts website, using the given family and variant.

This function is asycronous, and fetchs the data via the given fetch function.
This is required due to the fetching of data across the internet via HTTP protocols.

**Kind**: global constant  
**Returns**: <code>Font</code> - new font object which contains the contents of the font  
**See**: https://developers.google.com/fonts/

NOTE: See the console output for hints about available variants.  

| Param | Type | Description |
| --- | --- | --- |
| family | <code>String</code> | family name of font to load |
| variant | <code>String</code> | variant name of font to load |
| fetch | <code>function</code> | function to use for fetching the font from Google |

**Example**  
```js
// see the examples for additional information
const font = await loadGoogleFont(family, variant, fetchFunc)
```
<a name="loadWebFont"></a>

## loadWebFont ⇒ <code>Font</code>
Load the font from a website using the given URL.

This function is asycronous, and fetchs the data via the given fetch function.
This is required due to the fetching of data across the internet via HTTP protocols.

**Kind**: global constant  
**Returns**: <code>Font</code> - new font object which contains the contents of the font  

| Param | Type | Description |
| --- | --- | --- |
| fontUrl | <code>String</code> | URL of font file to load |
| fetch | <code>function</code> | function to use for fetching the font from Google |

**Example**  
```js
// see the examples for additional information
const fontUrl = "http://72.62.112.88/v3/docs/fonts/Montserrat/Montserrat-Regular.ttf"
const font = await loadWebFont(fontUrl, fetchFunc)
```
<a name="textToGeom2"></a>

## textToGeom2 ⇒ <code>Object</code>
Convert the given text to a geom2 object.

The paths are created based on the original Font glyphs, and scaled to the fontSize.

**Kind**: global constant  
**Returns**: <code>Object</code> - A geom2 object  
**See**: Font.getPath() at https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for the conversion |
| options.font | <code>Font</code> |  | the font representing a loaded OpenType font file |
| [options.fontSize] | <code>Number</code> | <code>72</code> | size of the text in pixels |
| [options.fontOptions] | <code>Object</code> | <code>{}</code> | options passed through to Font.getPath(),   e.g. kerning, features (liga, rlig, etc.), hinting. The opentype.js defaults apply.   See https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options |
| [options.segments] | <code>Number</code> | <code>32</code> | number of segments to create per full rotation |
| [options.center] | <code>Array</code> | <code>[true, true]</code> | centering options for the X and Y axes;   true, false, or the center coordinate in mm. Y centering is based on the font cap height. |
| text | <code>String</code> |  | text of which to convert to geom2 |

**Example**  
```js
const font = await loadWebFont(fontFileUrl, fetchFunc)
let paths = textToGeom2({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
```
<a name="textToPaths"></a>

## textToPaths ⇒ <code>Array</code>
Convert the given text to a set of outline paths.

The paths are created based on the original Font glyphs, and scaled to the fontSize.

The paths may or may not be closed. See textToGeom2 for additional options.

**Kind**: global constant  
**Returns**: <code>Array</code> - list of outline paths, i.e. path2  
**See**: Font.getPath() at https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for the conversion |
| options.font | <code>Font</code> |  | the font representing a loaded OpenType font file |
| [options.fontSize] | <code>Number</code> | <code>72</code> | size of the text in pixels |
| [options.fontOptions] | <code>Object</code> | <code>{}</code> | options passed through to Font.getPath(),   e.g. kerning, features (liga, rlig, etc.), hinting. The opentype.js defaults apply.   See https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options   Note: hinting is only needed for rasterization from vector data; it should not be   needed for vector output such as JSCAD paths. |
| [options.center] | <code>Array</code> | <code>[false, false]</code> | centering options for the X and Y axes;   true, false, or the center coordinate in mm. Y centering is based on the font cap height. |
| [options.segments] | <code>Number</code> | <code>32</code> | number of segments to create per full rotation |
| [options.forceClose] | <code>Boolean</code> | <code>false</code> | force closure of paths, as some fonts do not |
| text | <code>String</code> |  | text of which to convert to outlines |

**Example**  
```js
const font = await loadWebFont(fontFileUrl, fetchFunc)
let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
```
