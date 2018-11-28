<template>
    <div>
      <!--登录界面-->
      <div class="md-modal modal-msg md-modal-transition"
           :class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-top">
            <!--这里做插槽-->
            <!--<div class="md-title">Login in</div>-->
            <button class="md-close" @click="closeModal">Close</button>
          </div>

          <div class="md-content">
            <div class="confirm-tips">

             <!-- <div class="error-wrap">
                &lt;!&ndash;提示错误&ndash;&gt;
                <span class="error error-show"
                      v-show="errorTip"
                >用户名或者密码错误</span>
              </div>-->
              <!--<ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  &lt;!&ndash;双向数据绑定&ndash;&gt;
                  <input type="text" tabindex="1" name="loginname"
                         class="regi_login_input regi_login_input_left"
                         placeholder="用户名"
                         data-type="loginname"
                         v-model="userName">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  &lt;!&ndash;双向数据绑定&ndash;&gt;
                  <input type="password" tabindex="2"  name="password"
                         class="regi_login_input regi_login_input_left login-input-no input_text"
                         placeholder="密码"
                         v-model="userPwd">
                </li>
              </ul>-->

              <!--提示文字 确认删除吗-->
              <slot name="message"></slot>

            </div>
           <!-- <div class="login-wrap">
              <a href="javascript:;"
                 class="btn-login"
                 @click="login"
              >
                登  录</a>
            </div>-->

            <!--删除按钮-->
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>

          </div>
        </div>
      </div>
      <!--遮罩-->
      <div class="md-overlay"
           v-if="mdShow"
           @click="closeModal">

      </div>
    </div>
</template>

<script>
    export default {
      name: "Model",
      data () {
        return {}
      },
      props:['mdShow'],
      methods:{
        closeModal () {
          this.$emit('close')
        }
      }
    }
</script>

<style scoped>

</style>
