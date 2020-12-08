<template>
  <div class="login" :style="`background-image:url('${back}')`">
    <el-card class="login-form">
      <div>{{ name.title }}</div>
    </el-card>
  </div>
</template>

<script>
import { getDepts } from '@/api/login'
import Background from '@/assets/images/back.jpg'
import name from '@/assets/config/name'
export default {
  data() {
    return {
      name,
      back: Background
    }
  },
  computed: {
    
  },
  created() {
    
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100vh;
    background-size:100% 100%;
    background-repeat:no-repeat;
    background-attachment: fixed;
  }
  .login-form {
    width: 400px;
    height: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
