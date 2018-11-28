var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
/*Express的中间件，
用来实现cookie的解析，是官方脚手架内置的中间件之一。*/
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
var index = require('./routes/index');
var goods = require('./routes/goods');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//全局登录拦截 捕获登录 放在注入路由之前
app.use(function (req,res,next) {
  //取cookies值
    if(req.cookies.userId){
      //有则表示为登录 继续往后走
        next();
    }else{
        //mongdb 日志里面打印出来 命令行
        console.log("url:"+req.originalUrl);
        //登录路由或者登出路由 商品列表名单 白名单匹配
        // req.path == '/goods/list'
        /* 分页有很多参数 使用 req.originalUrl 其实是不对啊 指向 ‘/’  而分页需要有参数
        req.originalUrl.indexOf('/goods/list')>-1
        * */
        if(req.originalUrl=='/users/login' ||
          req.originalUrl=='/users/logout' ||
          req.path=='/goods/list'){
            next();
        }else{
            res.json({
                status:'10001',
                msg:'当前未登录',
                result:''
            });
        }
    }
});



// use 使用
app.use('/', index);
//看模块goods module.exports = router; 输出goods 否则拿到的是空
app.use('/goods', goods);
app.use('/users', users);

// catch 404 and forward to error handler 捕获404
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler 捕获500
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
