# react-bucket

## what is this?
react全家桶，简单易用，webpack4搭建<br/>
这是一个React脚手架，集成多页与单页应用，全能脚手架<br/>
标准的React+Redux分层结构<br/>
经过了多个项目的实践，不停的更新和优化出来的。目前自己做项目也在用。

* PWA、代码分割、HMR热替换、ES6+语法

## 构建架构

```
npm install		    # 安装依赖模块
```

```
npm run build		# 正式打包，用于生产环境
```

```
npm run dev	        # 开发环境，启动服务
```


## 更新日志 Update log
* 2018-04-18
	<br/>1.redux 4.0
	<br/>2.开发环境加入了最新的HappyPack插件
	<br/>3.打包输出细节及包版本更新
* 2018-03-05
	<br/>1.webpack升级为4.1.0，更新相关配置
	<br/>2.代码分割使用了react-loadable,异步加载时有loading动画，具体查看src/a_container/root/index.js中代码
	<br/>3.异步加载的代码可以配置预加载，具体查看src/a_container/root/index.js中代码
	<br/>4.目前webpack4.0刚出现不久，与其相关的某些插件会提示一些奇怪的警告，但不影响代码执行
* 2018-03-04
	<br/>1.webpack升级到4.0，相关配置和插件修改


## 目录结构 Structure

```
.
├── build                          # 正式打包后，会自动生成该文件夹，其中会包含最终用于生产环境的文件
├── mock                           # mock测试数据
├── src                            # 项目代码目录
│   ├── app                        # 多入口
│   ├── action                     # 所有的action
│   ├── component                  # 所有的公共类UI组件
│   ├── container                  # 所有的页面级容器组件
|	├── ...
|   	└── root                   # 根页，里面配置了顶级的路由
│   ├── reducer                    # 所有的reducer
│   ├── assets                     # 所有的图片、文件等静态资源
│   ├── styles                     # 所有的样式文件
│   ├── store                      # store数据中心
│   ├── tool                       # 自定义工具
│   ├── template                   # 多页应用人口模板
│   └── config.js                  # 配置文件
├── server.js                      # 用于开发环境的服务部署
├── webpack.dev.config.js          # 用于开发环境的webpack配置
├── webpack.dll.config.js          # 静态资源预编译所需webpack配置
└── webpack.production.config.js   # 用于生产环境正式打包的webpack配置
```

## 参阅资料
React GitHub地址：https://github.com/facebook/react <br/>
react-router GitHub地址：https://github.com/ReactTraining/react-router <br/>
React官方更新日志：https://github.com/facebook/react/releases <br/>
React16更新内容：http://blog.csdn.net/lx376693576/article/details/78192768 <br/>
mockjs官网：http://mockjs.com/ <br/>
Eslint中文站：http://eslint.cn/ <br/>
