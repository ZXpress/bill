const path = require('path')

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  style: {
    // 配置postcss-pxtorem
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            [
              'postcss-pxtorem',
              {
                rootValue: 375 / 10, // 根元素字体大小
                // propList: ['width', 'height']
                propList: ['*']
              }
            ]
          ]
        }
      }
    }
  }
}
