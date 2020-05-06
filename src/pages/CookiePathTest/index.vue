<template>
  <div>
    <el-button type="primary" @click="getToken">拿token</el-button>
    <el-button type="primary" @click="clearToken">清除token</el-button>
    <el-button type="primary" @click="send">发送请求</el-button>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'CookiePathTest',
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
      // path对于vue的hash路由没有效果，需要真实跳转到CookiePathTest才能拿到cookie
      // path功能一般用不到，不深究了
      Cookies.set('token', '123456', {
        expires: 6,
        path: '/CookiePathTest',
        domain: 'zhangfei.com'
      })
    },
    clearToken () {
      Cookies.remove('token', {
        path: '/CookiePathTest',
        domain: 'zhangfei.com'
      })
    }
  },
  computed: {
    
  }
}
</script>

<style lang="less" scoped>

</style>
