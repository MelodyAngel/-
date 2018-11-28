<template>
  <div id="app">
    <router-view/>


    <!--这是GoodsListde的视图命名 不懂为什么需要放在这里才生效-->
   <!-- <div>
      <router-view name="title" class="01"></router-view>
      <router-view name="img" class="02"></router-view>
    </div>
-->

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
}
</script>


