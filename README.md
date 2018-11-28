# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
# 简要说说该项目 仿某商城 后端用的是MongoDB 后端的服务器 我是放到server文件夹 需要安装2次依赖 一次是根目录 一次是server 需要的表数据 放在vue_shop里面 需要自行导入到mongodb

# 服务端启动 node bin/www

数据库：MongoDB服务端、MongoDB图形客户端
命令行批处理工具：mongodb_start.bat
C:\"Program Files"\MongoDB\Server\3.2\bin\mongod.exe --dbpath=D:/dongnaoedu/project/data/db
注意必须根据指定的dbpath，提前新建该文件
还原：mongorestore -h 127.0.0.1:27017 -d vue_shop_lesson D:\data_center\dump\vue_shop
备份：mongodump -h 127.0.0.1:27017 -d vue_shop -o D:\data_center\dump


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
