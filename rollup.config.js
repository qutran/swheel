import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import extensions from 'rollup-plugin-extensions';
import url from 'rollup-plugin-url';

const doc = process.env.NODE_ENV === 'doc';
const production = !process.env.ROLLUP_WATCH;
console.log(process.env.NODE_ENV);

let config = {
  input: 'src/examples/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    dir: 'public',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('public/bundle.css');
      },
    }),
    resolve({ browser: true }),
    commonjs(),
    !production && livereload('public'),
    production && terser(),
    extensions({
      extensions: ['.svelte', '.js'],
      resolveIndex: true,
    }),
  ],
  watch: {
    clearScreen: false,
  },
};

if (doc) {
  config = {
    ...config,
    input: 'doc/main.js',
    output: production
      ? {
          sourcemap: true,
          format: 'iife',
          name: 'app',
          dir: 'dist_doc',
        }
      : config.output,
    inlineDynamicImports: true,
    plugins: [...config.plugins, url()],
  };
} else if (production) {
  config = {
    ...config,
    input: 'src/Router/index.js',
    output: [
      {
        file: 'dist/es/index.mjs',
        format: 'es',
      },
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
      },
    ],
  };
} else {
  config = {
    ...config,
    inlineDynamicImports: true,
  };
}

export default config;
