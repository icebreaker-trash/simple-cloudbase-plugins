const fs = require('fs')
const path = require('path')
  ; (async () => {
  const sharedTsconfigPath = path.resolve(__dirname, '../shared/tsconfig.json')
  const pkgPath = path.resolve(__dirname, '../packages')
  const dirs = fs.readdirSync(pkgPath)
  for (let i = 0; i < dirs.length; i++) {
    const dirPath = path.resolve(pkgPath, dirs[i])
    const stat = fs.statSync(dirPath)
    if (stat.isDirectory()) {
      const p = path.resolve(dirPath, 'tsconfig.json')
      fs.unlinkSync(p)
      fs.symlinkSync(sharedTsconfigPath, p, 'file')
    }
  }
})()
