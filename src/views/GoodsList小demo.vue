<template>

  <!--动态路由 获取 id和name-->
  <!--<div>
    这是个商品列表页面
    <span>{{$route.params.gooldsId}} </span> <br>
    <span>{{$route.params.name}} </span>
  </div>-->

  <div>

    <div>
      嵌套路由
      <router-link :to="{path:'/goods/title'}"> 显示商品标题 </router-link>
      <!--<router-link :to="{path:'/goods/img'}"> 显示商品图片 </router-link>-->

      <!--这种叫命名路由-->
      <router-link :to="{name:'img',params:{cartId:123}}">显示商品图片</router-link>

      <!-- params 是路由的参数 并不是页面跳转的参数 需要注意
        http://localhost:8080/goods/img/123
      -->
    </div>
    <br>
    <div>
      编程式路由

      <router-link :to="{path:'cart1'}"> <!--使用router-link 必须备to 否则会报错-->
        跳转到购物车页面
      </router-link>

      <button @click.prevent="jump()" > 跳转到购物车页面 </button>

    </div>


    <div> <!--这个div 放 router-view 视图渲染-->
      <!--
        载体 组件渲染
      -->


      <!--
        完全不懂 为什么在这里路由视图命名是无效的，需要在App.vue里面才有效 路由配置js也已经配置好
      -->
      <!--<router-view name="title" class="01"></router-view>-->
      <!--<router-view name="img" class="02"></router-view>-->
    </div>



  </div>



</template>

<script>
  export default {
    name: "GoodsList",
    data(){
      return {

      }
    },
    methods:{
      jump () {
        this.$router.push({path:"/cart1?goodsId=123"})
      }
    }
  }
</script>

<style scoped>

</style>
