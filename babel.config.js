module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [ // 按需引入element-ui样式的配置
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
