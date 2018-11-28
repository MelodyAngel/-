<template>

  <div id="app">
      <b1></b1>
      <b2></b2>
  </div>
</template>

<script>
  import b1 from './b1'
  import b2 from './b2'

    export default {
      name: "app",
      data () {
        return {}
      },
      components:{
        b1,b2
      }
    }
</script>

