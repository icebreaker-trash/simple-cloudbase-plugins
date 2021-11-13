function getJestGlobals (flag = true) {
  return {
    afterAll: flag,
    afterEach: flag,
    beforeAll: flag,
    beforeEach: flag,
    describe: flag,
    expect: flag,
    fit: flag,
    it: flag,
    jest: flag,
    test: flag,
    xdescribe: flag,
    xit: flag,
    xtest: flag
  }
}

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
  },
  globals: {
    wx: true,
    uni: true,
    WechatMiniprogram: true,
    ...getJestGlobals()
  }
}
