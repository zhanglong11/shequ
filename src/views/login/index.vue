<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-left">
        <img src="~@/assets/images/login-form-user.jpg" />
      </div>
      <div class="login-right">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
          <div class="title-container">
            <img src="~@/assets/images/login-logo.png" class="title-logo" />
            <h3 class="title">{{ title }}</h3>
          </div>
          <el-form-item prop="loginName">
            <el-input
              ref="loginName"
              v-model="loginForm.loginName"
              placeholder="用户名"
              name="loginName"
              type="text"
              tabindex="1"
              auto-complete="on"
              size="lg"
            >
              <span slot="prefix" class="svg-container"> <svg-icon icon-class="user" /> </span>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              size="lg"
              @keyup.enter.native="submit"
            >
              <span slot="prefix" class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <span slot="suffix" class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-input>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width: 100%" size="lg" @click.native.prevent="submit"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { userEncryption } from '@/utils'
import settings from '@/settings'
export default {
  name: 'Login',
  data() {
    return {
      // 展示项目列表
      visible: false,
      title: settings.title,
      loginForm: {
        loginName: process.env.VUE_APP_USERNAME,
        password: process.env.VUE_APP_USEPSWD
      },
      loginRules: {
        loginName: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, min: 6, message: '密码最少6位' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 项目列表
      projectList: [],
      imgUrl: null
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    // 查看密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录加密
          const params = userEncryption(this.loginForm)
          this.loading = true
          this.$store
            .dispatch('user/login', params)
            .then(() => {
              this.$router.push('/')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container .el-dialog__body {
  max-height: 500px;
  overflow-y: scroll;
}

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input__inner {
    height: 60px;
    line-height: 60px;
  }
  .el-input__prefix {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-input {
    display: inline-block;
    height: 50px;
    width: 100%;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding-left: 45px;
      color: #333;
      height: 50px;
      font-size: 18px;
      box-shadow: none !important;
      border-bottom: 1px solid #eee !important;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }

  .el-form-item {
    margin-bottom: 30px;
    box-shadow: none;
    background: none;
    color: #454545;
    .el-form-item__error {
      margin-top: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
@import './index.scss';
</style>
