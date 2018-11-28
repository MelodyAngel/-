var express = require('express');
var router = express.Router();
//日期工具类
require('./../util/util')
var User = require('./../models/user');

// 登录接口
router.post("/login", function (req,res,next) {
    var param = {
        userName:req.body.userName,
        userPwd:req.body.userPwd
    }
    User.findOne(param, function (err,doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            });
        }else{
            if(doc){
                res.cookie("userId",doc.userId,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.cookie("userName",doc.userName,{
                    path:'/',
                    maxAge:1000*60*60
                });
                //session 需要安装插件 express.sessino
                //req.session.user=doc;
                res.json({
                    status:'0',
                    msg:'',
                    result:{
                        userName:doc.userName
                    }
                });
            }else {
              res.json({
                status:'1',
                msg:'帐号密码错误',
                result:""
              });
            }

        }
    });
});

//登出接口
router.post("/logout", function (req,res,next) {
    res.cookie("userId","",{
        path:"/",
        maxAge:-1
    });
    res.json({
        status:"0",
        msg:'',
        result:''
    })
});

// 检查登录状态cookies
router.get("/checkLogin", function (req,res,next) {
    if(req.cookies.userId){
        res.json({
            status:'0',
            msg:'',
            result:req.cookies.userName || ''
        });
    }else{
        res.json({
            status:'1',
            msg:'未登录',
            result:''
        });
    }
});

//查询当前用户的购物车数据列表
router.get("/cartList", function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId}, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        });
      }
    }
  });
});


// 获取购车商品数量 登录名右边那个svg图标 做vuex需要
router.get("/getCartCount", function (req,res,next) {
  if(req.cookies && req.cookies.userId){
    console.log("userId:"+req.cookies.userId);
    var userId = req.cookies.userId;
    User.findOne({"userId":userId}, function (err,doc) {
      if(err){
        res.json({
          status:"0",
          msg:err.message
        });
      }else{
        let cartList = doc.cartList;
        //获取商品数量
        let cartCount = 0;
        cartList.map(function(item){
          cartCount += parseFloat(item.productNum);
        });
        res.json({
          status:"0",
          msg:"",
          result:cartCount
        });
      }
    });
  }else{
    res.json({
      status:"0",
      msg:"当前用户不存在"
    });
  }
});

//购物车删除
router.post("/cartDel", function (req,res,next) {
    var userId = req.cookies.userId;
    var productId = req.body.productId;
    User.update({
      //条件
        userId:userId
    },{
      //删除的元素 删除子文档
        $pull:{
            'cartList':{
                'productId':productId
            }
        }
    },
      //回调
      function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    });
});

//修改商品数量
router.post("/cartEdit", function (req,res,next) {
    var userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    //更新用户文档
    User.update(
      {"userId":userId,"cartList.productId":productId},
      {
        "cartList.$.productNum":productNum,
        "cartList.$.checked":checked,
      },
      function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    })
});

//修改商品的状态 是否全选
router.post("/editCheckAll", function (req,res,next) {
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll?'1':'0';
    User.findOne({userId:userId},
      function (err,user) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            if(user){
              user.cartList.forEach((item)=>{
                  item.checked = checkAll;
              })
              // save 保存
              user.save(function (err1,doc) {
                if(err1){
                  res.json({
                      status:'1',
                      msg:err1,message,
                      result:''
                  });
                }else{
                  res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                  });
                }
              })
            }
        }
    });
});


//查询用户地址接口
router.get("/addressList", function (req,res,next) {
    var userId = req.cookies.userId;
    User.findOne({userId:userId}, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc.addressList
            });
        }
    })
});

//设置默认地址接口
router.post("/setDefault", function (req,res,next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if(!addressId){
        res.json({
            status:'1003',
            msg:'addressId is null',
            result:''
        });
    }else{
        User.findOne({userId:userId}, function (err,doc) {
            if(err){
                res.json({
                    status:'1',
                    msg:err.message,
                    result:''
                });
            }else{
                var addressList = doc.addressList;
                //地址列表遍历
                addressList.forEach((item)=>{
                    if(item.addressId ==addressId){
                        item.isDefault = true;
                    }else{
                        item.isDefault = false;
                    }
                });
                //重新导入数据
                doc.save(function (err1,doc1) {
                    if(err){
                        res.json({
                            status:'1',
                            msg:err.message,
                            result:''
                        });
                    }else{
                        res.json({
                            status:'0',
                            msg:'',
                            result:''
                        });
                    }
                })
            }
        });
    }
});

//删除地址接口 借助购物车的删除那段
router.post("/delAddress", function (req,res,next) {
    var userId = req.cookies.userId,addressId = req.body.addressId;
    User.update({
        userId:userId
    },{
      //删除的元素 删除子文档
        $pull:{
            'addressList':{
                'addressId':addressId
            }
        }
    }, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:''
            });
        }
    });
});

//支付
router.post("/payMent", function (req,res,next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal;
    User.findOne({userId:userId}, function (err,doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:''
            });
        }else{

            //储存信息
            var address = '',goodsList = [];
            //获取当前用户的地址信息
            doc.addressList.forEach((item)=>{
                if(addressId==item.addressId){
                  //自定义空变量 存储当前选择的地址
                    address = item;
                }
            })
            //获取用户购物车的购买商品
            doc.cartList.filter((item)=>{
                if(item.checked=='1'){
                    goodsList.push(item);
                }
            });

            //日期工具类  util文件夹
            //系统平台码
            var platform = '622';
            //生成随机数
            var r1 = Math.floor(Math.random()*10);
            var r2 = Math.floor(Math.random()*10);
            //生成日期 多位数 避免重复数字 16位码
            var sysDate = new Date().Format('yyyyMMddhhmmss');
            //订单创建的日期
            var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            //订单id 仅为方案 还是有可能 id重复的
            var orderId = platform+r1+sysDate+r2;

            var order = {
                orderId:orderId,
                orderTotal:orderTotal,
                addressInfo:address,
                goodsList:goodsList,
                orderStatus:'1',
                createDate:createDate
            };

            doc.orderList.push(order);

            doc.save(function (err1,doc1) {
                if(err1){
                    res.json({
                        status:"1",
                        msg:err.message,
                        result:''
                    });
                }else{
                    res.json({
                        status:"0",
                        msg:'',
                        result:{
                            orderId:order.orderId,
                            orderTotal:order.orderTotal
                        }
                    });
                }
            });
        }
    })
});

//根据订单Id查询订单信息
router.get("/orderDetail", function (req,res,next) {
    var userId = req.cookies.userId,
        orderId = req.param("orderId");
    User.findOne({userId:userId}, function (err,userInfo) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            var orderList = userInfo.orderList;
            if(orderList.length>0){
              //价格
                var orderTotal = 0;
                orderList.forEach((item)=>{
                    if(item.orderId == orderId){
                        orderTotal = item.orderTotal;
                    }
                });
                if(orderTotal>0){
                    res.json({
                        status:'0',
                        msg:'',
                        result:{
                            orderId:orderId,
                            orderTotal:orderTotal
                        }
                    })
                }else{
                    res.json({
                        status:'120002',
                        msg:'无此订单',
                        result:''
                    });
                }
            }else{
                res.json({
                    status:'120001',
                    msg:'当前用户未创建订单',
                    result:''
                });
            }
        }
    })
});
module.exports = router;
