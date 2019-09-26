const serve = require('rollup-plugin-serve')
const path = require('path')
const baseConf = require('./rollup.base')
const html = require('rollup-plugin-bundle-html')

const componentName = process.env.COMPONENT
const port = process.env.PORT || 10001
const componentType = process.env.COMPONENT_TYPE || 'js'

module.exports = {
  input: path.resolve(__dirname, `../src/${componentName}/index.${componentType}`),
  output: [
    {
      file: path.resolve(
        __dirname,
        `../src/${componentName}/dist/index.js`
      ),
      format: 'umd',
      sourcemap: true,
    }
  ],
  plugins: [
    ...baseConf.plugins,
    html({
      template:  path.resolve(__dirname, `../src/${componentName}/example/index.html`),
      filename: 'index.html',
      dest: path.resolve(__dirname, `../src/${componentName}/dist`),
    }),
    serve({
      port,
      open: true,
      contentBase: path.resolve(__dirname, `../src/${componentName}/dist`),
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
    })
  ],
}
