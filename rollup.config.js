var typescript = require('rollup-plugin-typescript2');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
import { terser } from 'rollup-plugin-terser';
var config = require('./config.js');
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      // When export and export default are not used at the same time, set legacy to true.
      legacy: true,
      name: config.name,
      banner: config.banner,
      plugins: [terser()],
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      plugins: [],
    },
  ],
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};
