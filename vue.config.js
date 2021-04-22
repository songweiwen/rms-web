const isProduction = process.env.NODE_ENV !== 'development'
const StylelintPlugin = require('stylelint-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const autoprefixer = require('autoprefixer') // rem适配方案（可选）
// const pxtorem = require('postcss-pxtorem') // rem适配方案（可选）
const path = require('path')
module.exports = {
  publicPath: './', // 部署应用包时的基本 URL。 不加上的话部署后会显示空白页面
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的目录。
  devServer: {
    // port,
    // host: '192.168.0.148',
    // port: 8081,
    proxy: { // 设置代理
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://songweiwenceshi.oicp.io', // 接口的基础地址
        // secure: false,  // 如果是https接口，需要配置这个参数
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  css: {
    // 是否使用css分离插件 ExtractTextPlugin4
    // extract: false,
    sourceMap: process.env.VUE_APP_ENV_CONFIG === 'prod', // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。有了source map，浏览器直接显示less，快速查看在less文件中的位置，方便调试。
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, './src/assets/css/base/variables/vars.less')}";`
        }
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      // 代码压缩
      return {
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                warnings: false,
                compress: {
                  drop_console: process.env.VUE_APP_ENV_CONFIG === 'prod', // 删除console.log
                  drop_debugger: true // 自动删除debugger
                }
              }
            })
          ]
        }
      }
    } else {
      // 为开发环境修改配置...
      return {
        plugins: [
          new StylelintPlugin({
            files: ['**/*.{vue,html,less}']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // ...your other webpack config overrides here
    if (isProduction) {
      if (process.env.npm_config_report) {
        config.plugin('webpack-report')
          .use(BundleAnalyzerPlugin, [{
            // ...webpack-bundle-analyzer options here
          }])
      }
    }
  },
  pluginOptions: {
    vant: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
}
