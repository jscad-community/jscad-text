const test = require('ava')

const { geometries } = require('@jscad/modeling')

const { loadFont, textToPaths } = require('../src/index')

test('textToPaths (japanese)', (t) => {
  let font = loadFont('./localfont/fonts/Habana.ttf')
  let paths = textToPaths({font}, 'JSCAD Rocks!')
  t.is(paths.length, 15)

  let path3 = paths[3]
  let pts = geometries.path2.toPoints(path3)

  t.is(pts.length, 39)
})
