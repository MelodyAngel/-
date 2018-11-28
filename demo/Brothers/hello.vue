<template>

  <div class="hello">
      <b1></b1>
      <b1></b1>
  </div>
</template>

<script>
  import b1 from './b1'
  import b2 from './b2'

    export default {
      name: "hello",
      data () {
        return {}
      },
      components:{
        b1,b2
      }
    }
</script>

<style scoped>

</style>
