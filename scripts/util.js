const esbuild = require('esbuild')
const { dtsPlugin } = require('esbuild-plugin-d.ts')
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
    target: ['es2015']

  }
  return config
}

/**
 * @param {String} rootDir
 * @param {import('esbuild').BuildOptions} options
 */
async function build (rootDir, options) {
  const targetConfig = Object.assign({}, getDefaults(), options)
  targetConfig.absWorkingDir = rootDir
  targetConfig.plugins = [dtsPlugin({
    outDir: path.resolve(rootDir, 'dist'),
    tsconfig: path.resolve(rootDir, 'tsconfig.json')
  })]

  // const eps = targetConfig.entryPoints
  // for (let i = 0; i < eps.length; i++) {
  //   eps[i] = path.resolve(rootDir, eps[i])
  // }
  // targetConfig.outfile = path.resolve(rootDir, targetConfig.outfile)

  return await esbuild.build(targetConfig)
}

module.exports = {
  build
}
