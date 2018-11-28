<template>
    <div>
      <button @click="is"> + </button>
      <button @click="de"> - </button>
      <p><span>{{buttomNum}}</span></p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
       props:[ // props 是个数组形式
         'buttomNum' // 父组件传递数据的名称
       ],


      data () {
          return {

          }
      },
      methods:{ //methods函数内 不要使用箭头函数 api文档 触发条件 例如点击
        is () { // $emit 事件 子组件向父组件传递数据
          this.$emit('incre') //注意 父组件中 incre 的位置
        },
        de () {
          this.$emit('decre') //注意 父组件中 decre 的位置
        }

      }


    }
</script>
<style scoped></style>
