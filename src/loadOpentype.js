try {
  const opentype = require('opentype.js') // load module
  module.exports = opentype // export entry
} catch {
  const fake = require('./opentype.js') // load local library
  module.exports = opentype // export global
}
