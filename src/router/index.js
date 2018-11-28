import Vue from 'vue'
import Router from 'vue-router' // vue-router.js
import HelloWorld from '@/components/HelloWorld'

import GoodsList from '@/views/GoodsList'

import Title from '@/views/gd-title'
import Img from '@/views/gd-img'

import Cart1 from '@/views/cart1'

import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

import brother from '@/views/hello'




Vue.use(Router) /*使用插件 Router*/

export default new Router({

  mode:"history", /*地址栏 # 去掉 */
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    },

    /*{ /!*这是个商品列表页面 动态路由 :gooldsId :name*!/
      //path: '/goods/:gooldsId/user/:name',
      //http://localhost:8080/goods/01/user/02
      path: '/goods',
      name: 'GoodsList',

      //component: GoodsList,

      components:{
        default:GoodsList,
        title: Title,
        img: Img
      },
      /!*嵌套路由 其实注意看 跟 父集合 routes (上面) 的模式是一样的 *!/
      children:[
        {
          path: 'title', //注意这里 不要加/ 否则变为绝对路径 wabpack有路径匹配 相当于 /goods/title
          name: 'title',
          component :Title, //注意 一般组件命名是驼峰
        },
        {
          //path: 'img/:cartId',//路由命名
          path: 'img',
          name: 'img',
          component :Img,
        }
      ]
    },*/

    /*测试demo*/
    /*{
      path: '/cart',
      name: 'cart1',
      component: Cart1,
    },*/

    /*项目购物车*/
    {
      path:'/cart',
      name:'cart',
      component: Cart,
    },
    /*项目地址页*/
    {
      path:'/address',
      name:'Address',
      component: Address,
    },
    /*金额结算页*/
    {
      path:"/orderConfirm",
      name:"orderConfirm",
      component:OrderConfirm
    },

    /*订单成功页面*/
    {
      path:"/orderSuccess",
      name:"OrderSuccess",
      component:OrderSuccess
    },

    /*兄弟组件传值*/
    {
      path:"/brother",
      name:"brother",
      component:brother
    }

  ]
})
