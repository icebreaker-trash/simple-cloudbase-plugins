const fs = require('fs')
const path = require('path')
const { build } = require('./util')
  ; (async () => {
  const pkgPath = path.resolve(__dirname, '../packages')
  const dirs = fs.readdirSync(pkgPath)
  for (let i = 0; i < dirs.length; i++) {
    const dirPath = path.resolve(pkgPath, dirs[i])
    const stat = fs.statSync(dirPath)
    if (stat.isDirectory()) {
      const configPath = path.resolve(dirPath, 'esbuild.config.js')
      let res
      if (fs.existsSync(configPath)) {
        try {
          const config = require(configPath)
          res = await build(dirPath, config)
        } catch (error) {
          console.error(error)
        }
      } else {
        res = await build(dirPath)
      }
      console.log(res)
    }
  }
})()
