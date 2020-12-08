<template>
  <div class="login">
    <el-card class="login-form">
      <div class="login-title">{{ name.title }}</div>
      <el-form 
        ref="form" 
        :model="form" 
        :rules="rules" 
        size="small" 
      >
        <el-form-item prop="username">
          <el-input 
            v-model="form.username"
            size="medium"
            placeholder="用户名"
            @keyup.enter.native="login"
          >
            <i slot="prefix" class="icon el-icon-user-solid" style="font-size:16px"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            v-model="form.password"
            type="password"
            size="medium"
            placeholder="密码"
            @keyup.enter.native="login"
          >
            <i slot="prefix" class="icon el-icon-s-goods" style="font-size:16px"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="flex-start-center">
            <el-input 
              v-model="form.code"
              size="medium"
              placeholder="验证码"
              style="width:180px"
              @keyup.enter.native="login"
            >
              <i slot="prefix" class="icon el-icon-s-tools" style="font-size:16px"></i>
            </el-input>
            <img 
              :src="codeUrl" 
              @click="getCode" 
              style="margin-left:20px"
              class="pointer"
            />
          </div>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        style="width:100%;margin-top:10px"
        @click="login"
      >登录</el-button>
    </el-card>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
import { getCodeImg, login } from '@/api/login'
import name from '@/assets/config/name'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      name,
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
      },
      codeUrl: '',
      uuid: '',
      redirect: undefined
    }
  },
  computed: {
    
  },
  created() {
    this.getCode()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCode () {
      getCodeImg().then(res => {
        this.codeUrl = res.img;
        this.uuid = res.uuid;
      })
    },
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.uuid = this.uuid;
          this.form.password = encrypt(this.form.password);
          login(this.form).then(res => {
            Cookies.set('token', res.token || '', {
              expires: 7
            })
            this.$store.commit('SET_USER', res.user || {})
            this.$router.push({ path: this.redirect || '/' })
          }).catch(err => {
            this.getCode();
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/styles/public.less";
  .login {
    background-image: url('../../assets/images/back.jpg');
    width: 100%;
    height: 100vh;
    background-size:100% 100%;
    background-repeat:no-repeat;
    background-attachment: fixed;
    .icon {
      transform: translateY(2px);
    }
  }
  .login-form {
    width: 400px;
    height: 320px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login-title {
    color: @fontcolor;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }
</style>
