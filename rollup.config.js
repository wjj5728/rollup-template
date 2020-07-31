var typescript = require('rollup-plugin-typescript2');
var uglify = require('rollup-plugin-uglify-es');
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      // When export and export default are not used at the same time, set legacy to true.
      legacy: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    uglify({}),
  ],
};
