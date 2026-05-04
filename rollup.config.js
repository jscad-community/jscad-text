import * as fs from 'fs'

import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const { name, version, license } = JSON.parse(fs.readFileSync('package.json'))

export default {
  input: './src/index.js',
  external: ["@jscad/modeling", "fs"],
  output: [
    {
      file: './dist/jscad-text.umd.js',
      format: 'umd',
      name: 'jscad-text',
      banner: `/*! ${name} V${version} (${license}) */`,
      globals: { '@jscad/modeling': 'jscadModeling', "fs": "fs" }
    },
    {
      file: './dist/jscad-text.js',
      format: 'es',
      banner: `/*! ${name} V${version} (${license}) */`
    },
  ],
  plugins: [
    nodeResolve(),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
