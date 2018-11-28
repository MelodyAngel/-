<template>

  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <!--这里需要注意 因为这块是公用的 所以需要用插槽 slot来定义 以便显示其他地址使用-->
        <slot name="Goods"></slot>
        <!--<slot name="b"></slot>-->
        <!--<span>Goods</span>-->
      </nav>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Navbread"
    }
</script>

<style scoped>

</style>
