import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'dist/src/index.js',
  external: [
    "@jscad/modeling",
  ],
  output: [
    {
      file: 'dist/jscad-text.min.js',
      format: 'umd',
      name: 'jscadText',
      globals: {
        '@jscad/modeling': 'jscadModeling',
      },
    },
    {
      file: 'dist/jscad-text.commonjs.js',
      format: 'cjs',
      banner : 'var exports = module.exports',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
  ]
}
