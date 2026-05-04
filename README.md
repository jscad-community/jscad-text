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
<dt><a href="#textToPaths">textToPaths</a> ⇒ <code>Array</code></dt>
<dd><p>Convert the given text to a set of outline paths.</p>
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

<a name="loadFontFromData"></a>

## loadFontFromData ⇒ <code>Font</code>
Load the font description from the given data.

**Kind**: global constant  
**Returns**: <code>Font</code> - new font object which contains the contents of the font  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>ArrayBuffer</code> | raw data from font file |

<a name="loadGoogleFont"></a>

## loadGoogleFont ⇒ <code>Font</code>
Load the font from the Google Fonts website, using the given family and variant.

This function is asycronous, and fetchs the data via the given fetch function.
This is required due to the fetching of data across the internet via HTTP protocols.

**Kind**: global constant  
**Returns**: <code>Font</code> - new font object which contains the contents of the font  
**See**: https://developers.google.com/fonts/

NOTE: Uncomment the console statements to see available families and variants.  

| Param | Type | Description |
| --- | --- | --- |
| family | <code>String</code> | family name of font to load |
| variant | <code>String</code> | variant name of font to load |
| fetch | <code>function</code> | function to use for fetching the font from Google |

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

<a name="textToPaths"></a>

## textToPaths ⇒ <code>Array</code>
Convert the given text to a set of outline paths.

**Kind**: global constant  
**Returns**: <code>Array</code> - list of outline paths, i.e. path2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for the conversion |
| options.font | <code>Font</code> |  | the font representing a loaded OpenType font file |
| [options.fontSize] | <code>Number</code> | <code>14</code> | size of the text in pixels |
| [options.xOffset] | <code>Number</code> | <code>0</code> | horizontal position of the beginning of the text |
| [options.xOffset] | <code>Number</code> | <code>0</code> | vertical position of the baseline of the text |
| [options.fontKerning] | <code>Boolean</code> | <code>true</code> | if true takes kerning information into account aa |
| [options.fontHinting] | <code>Boolean</code> | <code>true</code> | if true uses TrueType font hinting if available |
| [options.segments] | <code>Number</code> | <code>32</code> | number of segments to create per full rotation |
| text | <code>String</code> |  | text of which to convert to outlines |

