<template>
    <div id="firstChild">
      <h2>b1组件</h2>
      <a href="javascript:;" @click="sendMsg">向b2组件传值</a>
    </div>
</template>

<script>
    import bus from '@/assets/Bus'
    export default {
        name: "b1",
      data () {
          return {}
      },
      methods:{
        sendMsg () {
          bus.$emit('userDefinedEvent','this message is form firstChild')
        }
      }
    }
</script>

<style scoped>

</style>
