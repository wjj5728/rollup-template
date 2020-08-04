import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
var config = require('./config.js');
const env = process.env.NODE_ENV == 'production';
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: config.name,
      banner: config.banner,
      /**如果需要去除Object.definePropert 这个ie8不支持 */
      esModule: false,
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
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
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
    env && terser(),
  ],
};
