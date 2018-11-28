<template>
  <div class="firstChild">
    <h2>b2组件</h2>
    <p>从b1接收的字符串参数:{{this.msg}}</p>
  </div>
</template>

<script>
  import bus from '../../src/assets/Bus'
  export default {
    name: "b1",
    data () {
      return {
        msg:"默认值"
      }
    },
    methods () {
      bus.$on('userDefinedEvent',(msg)=>{
        this.msg=msg
      })
    }
  }
</script>

<style scoped>

</style>
