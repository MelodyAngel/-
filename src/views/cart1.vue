<template>
    <div>
      这是 <span class="cart">购物车页面</span>
      <span>{{$route.query.goodsId}}</span>
      <!--注意这里 $route 和 $router 是不一样的-->

      <!--
      $route为当前router跳转对象里面可以获取name、path、query、params等

      $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
      -->
    </div>
</template>

<script>
    export default {
        name: "cart"
    }
</script>

<style scoped>
  .cart{
    color: red;
  }
</style>
