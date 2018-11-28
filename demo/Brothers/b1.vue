<template>
    <div class="firstChild">
      <h2>b1组件</h2>
      <buttom @click="sendMsg">向b2组件传值</buttom>
    </div>
</template>

<script>
    import bus from '../../src/assets/Bus'
    export default {
        name: "b1",
      methods:{
        sendMsg () {
          bus.$emit('userDefinedEvent','this message is form firstChild')
        }
      }
    }
</script>

<style scoped>

</style>
