const esbuild = require('esbuild')
const path = require('path')

const getDefaults = () => {
  /** @type {import('esbuild').BuildOptions} config */
  const config = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    format: 'esm',
    platform: 'browser',
    sourcemap: true,
    treeShaking: true,
    target: ['es6']
  }
  return config
}

/**
 * @param {String} rootDir
 * @param {import('esbuild').BuildOptions} options
 */
async function build (rootDir, options) {
  const targetConfig = Object.assign({}, getDefaults(), options)
  const eps = targetConfig.entryPoints
  for (let i = 0; i < eps.length; i++) {
    eps[i] = path.resolve(rootDir, eps[i])
  }
  targetConfig.outfile = path.resolve(rootDir, targetConfig.outfile)

  return await esbuild.build(targetConfig)
}

module.exports = {
  build
}
