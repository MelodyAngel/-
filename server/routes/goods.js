var express = require('express');
var router = express.Router(); //将不同的路由分离到不同的路由文件中。返回一个新的function 实例化
var mongoose = require('mongoose');
var Goods = require('../models/goods');//拿到mongdb 返回的数据 获取商品列表模型
var User=require('../models/user');//拿到mongdb 返回的数据 获取购物车内商品模型

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_shop_lesson');

//  MongoDB https://www.cnblogs.com/zhongweiv/p/mongoose.html


//连接
// mongoose.connect("mongodb://dn_dba:pwd_song@101.200.129.112:27017/vue_shop_lesson", {auto_reconnect: true});
//连接成功
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});
//连接异常
mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});
//连接断开
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});

//查询商品列表数据
/*
    测试：http://localhost:4000/goods?page=2&pageSize=8&sort=1
 */
/*演示 商品加载*/
router.get('/list',(req,res,next)=>{
  //Goods 里面的 很多都是mongdb里面的api
  // 注意 通过 req.param 拿到的 是字符串 需要转为 数值

    //产品分页的参数 获取当前第几页
  let page = parseInt(req.param("page"));
    //当前一页多少条数据
  let pageSize = parseInt(req.param("pageSize"));

  //物价 页面左侧价格等级按钮
  let priceLevel=req.param('priceLevel')

    //参数 默认跳过几条数据 分页的公式
    //例如 page 第3页 3-1 pageSize 例如 8条数据
    //（3-1）* 8 =16条 跳过16条
  let skip=(page-1)*pageSize;

  /*获取 价格升降序*/
  //价格升降序的参数 获取是升序还是降序
  let sort=req.param("sort");

    //区间
  let priceGt="";
    //区间
  let priceLte=""

  //全部数据装载集合 条件查询
  let params={};

    //下标对应值
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=2000;break;
      case '4':priceGt = 2000;priceLte=3000;break;
      case '5':priceGt = 3000;priceLte=6000;break;
    }
    params={
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }

  //Goods.find(parma) 查找所有的数据 skip 跳过多少条 limit限制显示多少条
  let goodsModel=Goods.find(params).skip(skip).limit(pageSize);

  /*金额排序 salePrice 价格 接口键值对 字段 salePrice:699 1为升序 -1为降序*/
  goodsModel.sort({'salePrice':sort})
  /*获取 商品数据*/
  goodsModel.exec((err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else {
      res.json({
        status:"0",
        msg:0,
        result:{
          cout:doc.length,
          list:doc
        }
      })
    }
  })

});

/*项目需要*/
/*router.get("/list", function (req, res, next) {
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let priceLevel = req.param("priceLevel");
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let priceGt = '';
    let priceLte = '';
    let params = {};
    if(priceLevel!='all'){
        switch (priceLevel){
            case '0':priceGt = 0;priceLte=100;break;
            case '1':priceGt = 100;priceLte=500;break;
            case '2':priceGt = 500;priceLte=1000;break;
            case '3':priceGt = 1000;priceLte=2000;break;
            case '4':priceGt = 2000;priceLte=3000;break;
            case '4':priceGt = 3000;priceLte=6000;break;
        }
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec(function (err, doc) {
        if(err){
            res.json({
                status: '1',
                msg:err.message
            });
        } else {
            res.json({
                status: '0',
                msg:'',
                result:{
                    count: doc.length,
                    list:doc
                }
            })
        }
    })
})*/

/*演示 加入购物车 提交 post 不该用get*/
// app.js 已经定义1级路由 所以 不需要/goods/addCart
router.post( '/addCart', (req,res,next)=>{
  /*假设以登录*/
  let userId='100000077';
  /*post 获取参数 商品id*/
  let productId = req.body.productId;

  //User.findOne 只拿一个用户
  //userDoc 当前用户的文档信息 整个数据
  User.findOne({userId:userId},(err,userDoc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else {
      //node 控制台会显示 不再浏览器控制台显示
      //console.log("userDoc:"+userDoc);

      if(userDoc){
        /*判断 同一件商品 多次添加 应该是数量++
        不应是在数据库再次生成另一条商品信息*/
        let goodsItem='';

        //遍历 userDoc
        userDoc.cartList.forEach( (item) =>{
          if(item.productId==productId){
            //保存信息
            goodsItem=item;
            //数量++
            item.productNum++
          }
        });

        // 判断 goodsItem 如果ture 非空 数量++ 如果false 加商品 插入数据
        if(goodsItem){
          userDoc.save( (err2,doc2)=>{
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else {
              res.json({
                status:"0",
                msg:"",
                result:'suc'
              })
            }
          })
        }else {
          /*把productId 赋值给 user模型的productId 赋值给数据库productId*/
          /*doc 用户当前商品的信息*/
          Goods.findOne({productId:productId},(err1,doc)=>{
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else {
              if(doc){
                //添加字段 数量 和 选中状态
                doc.productNum=1;
                doc.checked=1;
                /*当前用户集合 mongdb NoSQL 里面
                uesrs 里面 cartList 里面 购物车插入商品信息*/
                userDoc.cartList.push(doc);
                userDoc.save( (err2,doc2)=>{
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else {
                    res.json({
                      status:"0",
                      msg:"",
                      result:'suc'
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
});

//加入到购物车
/*router.post("/addCart", function (req,res,next) {
    var userId = '100000077',productId = req.body.productId;
    var User = require('../models/user');
    User.findOne({userId:userId}, function (err,userDoc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        }else{
            console.log("userDoc:"+userDoc);
            if(userDoc){
                var goodsItem = '';
                userDoc.cartList.forEach(function (item) {
                    if(item.productId == productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                if(goodsItem){
                    userDoc.save(function (err2,doc2) {
                        if(err2){
                            res.json({
                                status:"1",
                                msg:err2.message
                            })
                        }else{
                            res.json({
                                status:'0',
                                msg:'',
                                result:'suc'
                            })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId}, function (err1,doc) {
                        if(err1){
                            res.json({
                                status:"1",
                                msg:err1.message
                            })
                        }else{
                            if(doc){
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function (err2,doc2) {
                                    if(err2){
                                        res.json({
                                            status:"1",
                                            msg:err2.message
                                        })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg:'',
                                            result:'suc'
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        }
    })
});*/

// 把本js输出到引用的模块

module.exports = router;
