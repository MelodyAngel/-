var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[/*加入购物车 商品的信息*/
        {
            "productId":String,
            "productName":String,
            "salePrice":String,
            "productImage":String,
            "checked":String,
            "productNum":String
        }
    ],
    "addressList":[ /*用户的快递 地址列表*/
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": Number,
            "tel": Number,
            "isDefault": Boolean
        }
    ]
});

module.exports = mongoose.model("User",userSchema);

//module.exports = mongoose.model("User",userSchema,"users");
// 跟数据库 集合 users 匹配 可以不写 默认在User 后面加个s
