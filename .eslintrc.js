module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'semi': ['off', 'always'], // 末尾加分号提示
    'no-multiple-empty-lines': ['error', {'max': 3}], // 最大空行数
    // 'no-tabs': 'off',   // 不限制逗号后的空格
    'indent': ['error', 2],     // 设置缩进为4个空格
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
