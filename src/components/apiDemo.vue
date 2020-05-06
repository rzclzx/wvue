<template>
  <div>
    <el-button type="primary" @click="getToken">拿token</el-button>
    <el-button type="primary" @click="clearToken">清除token</el-button>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button type="primary" @click="loginout">退出登录</el-button>
    <el-button type="primary" @click="send">发送请求</el-button>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { refresh } from '@/assets/js/axios'
export default {
  name: 'ApiDemo',
  data () {
    return {
      
    }
  },
  created () {
    
  },
  methods: {
    send () {
      this.$axios(this.$store.state.admin.getContractAllList).then(res => res)
    },
    getToken () {
      // 过期时间6天
      // 后台管理系统等只有一个主站的不要加domain
      Cookies.set('token', '123456', {
        expires: 6,
        domain: 'zhangfei.com'
      })
    },
    // 需要加path确定哪个域名
    clearToken () {
      Cookies.remove('token', {
        domain: 'zhangfei.com'
      })
    },
    login () {
      refresh(Cookies.get('token'));
    },
    loginout () {
      refresh();
      // 跳转登录页面
    }
    // 常规
    // Cookies.set('name', 'value', { expires: 365 })
    // Cookies.get('name') // => 'value'
    // Cookies.remove('name')

    // 加path 一般用不到path功能，所以别加
    // Cookies.set('name', 'value', { expires: 365, path: ''})
    // Cookies.get('name') // => 'value'
    // Cookies.remove('name', {path: ''})
    
    // 设置共享主域名（不设置其他域名访问不了）
    // Cookies.set('name', 'value', { domain: 'zhangfei.com' })
    // Cookies.get('name')// a.zhangfei.com可以访问www.zhangfei.com设置下的cookie
    // Cookies.remove('name', { domain: 'zhangfei.com' })
  },
  computed: {
    
  }
}
</script>

<style lang="less" scoped>

</style>
