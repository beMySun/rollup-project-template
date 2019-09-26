const json = require('rollup-plugin-json')
const alias = require('rollup-plugin-alias')
const { eslint } = require('rollup-plugin-eslint')
const resolve = require('rollup-plugin-node-resolve') // help find node package
const commonjs = require('rollup-plugin-commonjs') // transform commonjs to esm
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const typescript = require('rollup-plugin-typescript')

module.exports = {
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  plugins: [
    alias({
      resolve: ['.ts,.js'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    resolve({
      jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true,  // Default: true 
      browser: true // Default: false
    }),
    json(),
    typescript(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.js'],
    }),
    babel({
      runtimeHelpers: true,
      presets: ['es2015', '@babel/preset-react', 'react'],
      include: ['src/**/*.ts', 'src/**/*.js'], // only transpile our source code
      plugins: ['external-helpers'],
    }),
    commonjs({
      include: 'node_modules/**',
    })
  ],
}
