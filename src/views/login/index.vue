<template>
  <div class="login-container">
    <Form ref="loginForm" class="login-form" :model="form" :rules="rules">
      <div class="tc">
        <img src="../../assets/img/logo.png" alt="" width="50" height="50">
      </div>
      <h3 class="login-form-title">前端日志分析系统</h3>
      <FormItem prop="username" class="mb30">
        <Input v-model="form.username" size="large" placeholder="请输入用户名">
          <span slot="prepend">
            <Icon :size="16" type="person"></Icon>
          </span>
        </Input>
      </FormItem>
      <FormItem prop="password" class="mb30">
        <Input type="password" v-model="form.password" size="large" placeholder="请输入密码">
          <span slot="prepend">
            <Icon :size="14" type="locked"></Icon>
          </span>
        </Input>
      </FormItem>
      <FormItem>
        <Button @click="onLogin" size="large" type="primary" long :loading="loading">登录</Button>
      </FormItem>
    </Form>
    <div class="login-footer">
      Copyright  2017 每天健康前端技术部出品
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      loading: false,
      form: {
        username: 'admin',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return

        const { username, password } = this.form
        const pms = { username, password }
        this.$Loading.start()
        this.loading = true
        this.$store.dispatch(this.$$types.LOGIN, pms)
          .then(res => {
            this.loading = false
            this.$Loading.finish()
            this.$Message.success('登录成功')
            // 缓存下用户名，方便用户在锁屏之后解锁时，直接使用当前用户名
            Cookies.set('username', res.username)
            setTimeout(() => this.$router.push({ name: 'home' }), 1000)
          })
          .catch(err => {
            this.loading = false
            this.$Loading.finish()
            this.$Message.warning(err.message)
          })
      })
    }
  }
}
</script>

<style lang="less">
.login-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  position: relative;
}
.login-form {
  width: 400px;
  background: #fff;
  border-radius: 5px;
  padding: 40px 20px;
  box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
  &-title {
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 30px;
  }
}
.login-footer{
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 16px;
  margin: 48px 0 24px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

@keyframes neon {
  0% {
    text-shadow: 0 0 8px #fff, 0 0 17px #fff, 0 0 24px #fff, 0 0 28px #228DFF, 0 0 55px #228DFF, 0 0 66px #228DFF, 0 0 86px #228DFF, 0 0 135px #228DFF;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228DFF, 0 0 35px #228DFF, 0 0 40px #228DFF, 0 0 50px #228DFF, 0 0 75px #228DFF;
  }
}
</style>
