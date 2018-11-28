<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

    <Buttom v-bind:buttomNum="num"
            v-on:incre="increHello"
            v-on:decre="decreHello"></Buttom>

    <p>parent:{{num}}</p>
    <!--调用组件-->
    <!--父组件 10 传给 子组件-->

  </div>

</template>

<script type="text/ecmascript-6">

  import  Buttom from './button'

export default {
  name: 'HelloWorld',
  data () { //Vue 实例的数据对象
    return {
      msg: 'Welcome to Your Vue.js App',
      num: 10, //父组件定义的数据 准备传递给子组件的
    }
  },
  components:{ // 模块系统中引用局部注册
    Buttom
  },
  methods:{ //触发条件 例如点击
    //父组件向子组件传递数据 通过自定义事件
    increHello () { // increHello 赋值给 incre 所以 incre是子组件拿到的名称 用于想父组件传递数据
      this.num++;
    },
    decreHello () { // decreHello 赋值给 incre 所以 decre是子组件拿到的名称 用于想父组件传递数据
      this.num--;
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
