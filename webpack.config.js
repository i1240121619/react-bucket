const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 生成html模块
const TransferWebpackPlugin = require('transfer-webpack-plugin');// 复制文件夹到build目录模块
const CopyWebpackPlugin = require('copy-webpack-plugin');// 复制文件到build目录模块
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 抽离css

// 定义函数判断是否是在当前生产环境，这个很重要，开发环境和生产环境配置上有一些区别
let config = {
  entry:{
    'indexApp': ['./src/app/indexApp.js'],
    'specialEdit/specialEditApp': ['./src/app/specialEditApp.js'],
    'special/specialApp': ['./src/app/specialApp.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf).*$/,
        use: ["url-loader?limit=90000&name=[path][name].[ext]"]
      },
      {
        test:/\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  devServer: {
    disableHostCheck: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      tool:  path.resolve(__dirname, "src/tool/tool"),
      head:  path.resolve(__dirname, "src/tool/head"),
      common:  path.resolve(__dirname, "src/tool/common"),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].css"
    }),
    new TransferWebpackPlugin([{from: 'images',to: './images'}], path.resolve(__dirname,"src")),
    new CopyWebpackPlugin([
      {from: './src/images/favicon.ico',to: './' },
      {from: './src/config.js',to: './' }
    ]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      tool: 'tool',
      common: 'common',
      head: 'head',
    })

  ]
};
if(process.env.NODE_ENV === 'production') {
    //压缩js与css
    let uglifyJsPlugin=new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  });
  config.plugins.push(uglifyJsPlugin);
}//if

//模板定义与模板配置 PageName：文件夹名称，title：模板标题
let templateArr=[
  {PageName:'index', title:'', app:'indexApp'},
  {PageName:'specialEdit', title:'', app:'specialEdit/specialEditApp'},
  {PageName:'special', title:'', app:'special/specialApp'}
];

templateArr.map(
    (templateJson) =>{
      let htmlWebpackPlugin=new HtmlWebpackPlugin({
        title: templateJson.title,
        filename: (templateJson.PageName === 'index' ? '' : templateJson.PageName) + '/index.html',
        template: './src/template/'+templateJson.PageName+'.ejs',
        inject: true,
        hash: true,
        chunksSortMode: 'none',
        chunks:[templateJson.app]
      });
      config.plugins.push(htmlWebpackPlugin);
    }//map
);

module.exports = config;


