const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 压缩gzip文件插件
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin') // 使用day.js代替moment.js，减少代码包体积
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 采用缓存提升打包速度
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 开启打包和开发进度条
const { LifeCycleWebpackPlugin } = require('lifecycle-webpack-plugin') // webpack生命周期
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清除上次打包的文件夹
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 查看打包后各依赖体积
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 查看打包过程中的时间花费
const smp = new SpeedMeasurePlugin()
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
  addWebpackPlugin
} = require('customize-cra')
const isProduction = process.env.NODE_ENV === 'production'
let analyzer_type = process.env.ANALYZER_ENV
// 热跟新
const hotLoader = () => (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}
const config = {
  webpack: override(
    // 添加解析less配置
    addLessLoader({
      modifyVars: { '@primary-color': '#3377FF' }, // 配置antd主题颜色
      javascriptEnabled: true
    }),
    // 开启热更新
    hotLoader(),
    // 配置按需引入,antd4版本js模块自动tree-shaking,但是css没有
    fixBabelImports('import', {
      libraryName: 'antd',
      style: true
    }),
    // 别明配置
    addWebpackAlias({
      '@': path.resolve(__dirname, './src'),
      'react-dom': '@hot-loader/react-dom'
    }),
    addWebpackPlugin(
      // 配置环境变量
      new webpack.DefinePlugin({
        'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
      })
    ),
    // 使用day.js代替moment.js，减少代码包体积
    // addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    addWebpackPlugin(
      // 添加打包进度条
      new ProgressBarPlugin()
    ),
    analyzer_type &&
      addWebpackPlugin(
        new BundleAnalyzerPlugin({
          analyzerPort: 8889, // 指定端口号
          openAnalyzer: true
        })
      ),
    isProduction &&
      addWebpackPlugin(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          cache: true,
          threshold: 10240, //只有大小大于该值的资源会被处理。默认值是 10k
          minRatio: 0.8 //只有压缩率小于这个值的资源才会被处理,默认值是 0.8
        })
      ),
    // 开启缓存压缩
    // isProduction && addWebpackPlugin(new HardSourceWebpackPlugin()),
    // 每次打包都清空dist文件
    isProduction && addWebpackPlugin(new CleanWebpackPlugin([path.resolve(__dirname, 'dist')])),
    // 打包完成后更改build名称为dist
    isProduction &&
      addWebpackPlugin(
        // webpack生命周期
        new LifeCycleWebpackPlugin({
          done: (compiler) => {
            setTimeout(() => {
              fs.renameSync(path.resolve(__dirname, 'build'), path.resolve(__dirname, 'dist'))
            }, 100)
          }
        })
      ),
    // 可以在此处修改webpack配置
    (config) => {
      if (config.mode === 'production') {
        config.devtool = false // 取消js map文件
        config.optimization.minimizer[1].options.cssProcessorOptions.map = false // 取消css map文件
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console =
          process.env.BASE_ENV === 'production' //生产环境去除console
        config.optimization.splitChunks = {
          cacheGroups: {
            // vendor: {
            //   test: /node_modules/,
            //   name: 'vendors',
            //   minChunks: 2,
            //   chunks: 'all',
            //   minSize: 0,
            //   priority: 1
            // },
            common: {
              name: 'commons',
              minChunks: 2,
              chunks: 'all',
              minSize: 0
              // priority: 0
            }
          }
        }
      }
      // 是否添加分析打包时间
      return analyzer_type ? smp.wrap(config) : config
    }
  ),
  // 开发环境配置
  devServer: overrideDevServer((config) => {
    config.proxy = {
      '/api': {
        target: '*********',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    return config
  })
}

module.exports = config