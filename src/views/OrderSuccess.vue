<template>
  <div>
    <!--导航-->
    <nav-header></nav-header>

    <!--面包屑-->
    <nav-bread>
      <span slot="Goods">订单成功</span>
    </nav-bread>

    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>订单提交成功，请尽快付款！</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>确认</span> 收货地址</li>
          <li class="cur"><span>核对</span> 订单信息</li>
          <li class="cur"><span>支付</span> 方式</li>
          <li class="cur"><span>成功提交</span> 订单</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="../../static/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <h3>恭喜! <br>订单提交成功，请尽快付款！</h3>
          <p>
            <span>订单号：{{orderId}}</span>
            <span>应付金额：{{orderTotal |currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <!--<a href="javascript:;" class="btn btn&#45;&#45;m">购物车列表</a>-->
              <router-link class="btn btn--m"
                           to="/cart">购物车列表</router-link>
            </div>
            <div class="btn-r-wrap">
              <!--<a href="javascript:;" class="btn btn&#45;&#45;m">商品列表</a>-->
              <router-link class="btn btn--m"
                           to="/">商品列表
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部-->
    <nav-footer></nav-footer>

  </div>
</template>

<script>
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  /*面包屑*/
  import NavBread from '@/components/Navbread.vue'
  /*模态框 登录框和遮罩层*/
  import Model from  '@/components/Model.vue'
  /*axios*/
  import axios from "axios"
    export default {
      name: "OrderSuccess",
      data () {
        return {
          //订单id
          orderId:"",
          //总金额
          orderTotal:0
        }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Model
      },
      mounted () {
        var orderId = this.$route.query.orderId;
        console.log(orderId)
        if(!orderId){
          //查不到 orderId 人为篡改
          return
        }
        axios.get('/users/orderDetail',{
          params:{
            orderId:orderId
          }
        }).then( (response)=>{
          let res=response.data;
          if(res.status=='0'){
            this.orderId=orderId
            this.orderTotal=res.result.orderTotal

          }
        })
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
