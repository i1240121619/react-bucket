const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html模块
const TransferWebpackPlugin = require("transfer-webpack-plugin"); // 复制文件夹到build目录模块
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件到build目录模块
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽离css
const HappyPack = require("happypack"); // 多线程编译

const PUBLIC_PATH = "/"; // 基础路径

// 模板定义与模板配置 PageName：文件夹名称，title：模板标题
let templateArr = [
  { PageName: "index", title: "", app: "indexApp" },
  { PageName: "page1", title: "", app: "page1/page1App" },
  { PageName: "page2", title: "", app: "page2/page2App" }
];

// 定义函数判断是否是在当前生产环境，这个很重要，开发环境和生产环境配置上有一些区别
let config = {
  entry: {
    indexApp: ["./src/app/indexApp.js"],
    "page1/page1App": ["./src/app/page1App.js"],
    "page2/page2App": ["./src/app/page2App.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: PUBLIC_PATH,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/, // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        enforce: "pre",
        use: ["eslint-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        exclude: /node_modules/,
        use: ["happypack/loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf).*$/,
        use: ["url-loader?limit=90000&name=[path][name].[ext]"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        // .less 解析 (用于解析antd的LESS文件)
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", `less-loader`],
        include: path.resolve(__dirname, "node_modules")
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          "postcss-loader",
          "less-loader"
        ],
        include: path.resolve(__dirname, "src")
      },
      {
        // .scss 解析
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      tool: path.resolve(__dirname, "./src/tool/tool")
    }
  },
  plugins: [
    new HappyPack({
      loaders: ["babel-loader"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new TransferWebpackPlugin(
      [{ from: "images", to: "./images" }],
      path.resolve(__dirname, "src")
    ),
    new CopyWebpackPlugin([
      { from: "./src/images/favicon.ico", to: "./" },
      { from: "./src/config.js", to: "./" }
    ]),
    new webpack.ProvidePlugin({
      tool: "tool"
    })
  ]
};

templateArr.map(
  templateJson => {
    let htmlWebpackPlugin = new HtmlWebpackPlugin({
      title: templateJson.title,
      filename:
        (templateJson.PageName === "index" ? "" : templateJson.PageName) +
        "/index.html",
      template: "./src/template/" + templateJson.PageName + ".ejs",
      inject: true,
      hash: true,
      chunksSortMode: "none",
      chunks: [templateJson.app]
    });
    config.plugins.push(htmlWebpackPlugin);
  } // map
);

module.exports = config;
