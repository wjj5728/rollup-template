var typescript = require('rollup-plugin-typescript2');
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
var config = require('./config.js');
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: config.name,
      banner: config.banner,
      plugins: [],
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      plugins: [],
    },
  ],
  external: [],
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
    terser(),
  ],
};
