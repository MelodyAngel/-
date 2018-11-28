<template>
  <div id="secondChild">
    <h2>b2组件</h2>
    <p>从b1接收的字符串参数:{{msg}}</p>
  </div>
</template>

<script>
  import bus from '@/assets/Bus'
  export default {
    name: "b1",
    data () {
      return {
        msg:"默认值"
      }
    },
    mounted () {
      var self=this
      bus.$on('userDefinedEvent',function (msg) {
        self.msg=msg
      })
    }
  }
</script>

<style scoped>

</style>
