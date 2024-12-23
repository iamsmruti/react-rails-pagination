import styles from "rollup-plugin-styles";
// import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import babel from '@rollup/plugin-babel';
const autoprefixer = require('autoprefixer');

// the entry point for the library
const input = 'src/index.js'

//
var MODE = [
  {
    format: 'cjs'
  },
  {
    format: 'esm'
  },
  {
    format: 'umd'
  }
]

var config = []

MODE.map((m) => {
    var conf = {
        input: input,
        output: {
            // then name of your package
            name: "react-rails-pagination",
            file: `dist/index.${m.format}.js`,
            format: m.format,
            exports: "auto"
        },
        // this externelizes react to prevent rollup from compiling it
        external: ["react", "react-dom", "prop-type", /@babel\/runtime/],
        plugins: [
            // these are babel comfigurations
            babel({
                exclude: 'node_modules/**',
                plugins: ['@babel/transform-runtime'],
                babelHelpers: 'runtime'
            }),
            // this adds sourcemaps
            sourcemaps(),
            // this adds support for styles
            styles({
                postcss: {
                    plugins: [
                        autoprefixer()
                    ]
                }
            })
        ]
    }
    config.push(conf)
})

const exportConfig = [...config ]

export default exportConfig;
