// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*图片懒加载*/
import VueLazyLoad from 'vue-lazyload'

/*滚动加载*/
import infiniteScroll from 'vue-infinite-scroll'
/*通过use来使用插件*/
Vue.use(VueLazyLoad,{
  loading:"/static/loading-svg/loading-bars.svg"
});

import '@/assets/css/base.css'
import '@/assets/css/product.css'
import '@/assets/css/checkout.css'

//vuex
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    //用户名
    nickName:"",
    //购物车数量
    cartCount:0
  },
  mutations:{
    //用户名
    updateUserInfo (state,nickName) {
      state.nickName = nickName
    },
    //购物车
    updateCartCount (state,cartCount) {
      state.cartCount += cartCount
    },
    //初始化
    initCartCount(state,cartCount){
      state.cartCount = cartCount
    },
  }
});


//全局过滤器 货币格式化 537.00 = ￥537.00 购物车页面
import {currency} from '@/util/currency'
Vue.filter("currency",currency)

Vue.use(infiniteScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', //监听对象
  router,//查找机制 默认router文夹中的index.js  vue配置有
  store,//vueX 注入 才可以使用
  components: { App }, //组件 声明-可用的有哪些组件
  template: '<App/>' //替换挂载的元素id=#app
})
