const pkg = require('./package.json')

/** @type {import('esbuild').BuildOptions} config */
const config = {
  platform: 'node',
  target: ['node12'],
  sourcemap: false,
  external: [...Object.keys(pkg.dependencies)]
}

module.exports = config
