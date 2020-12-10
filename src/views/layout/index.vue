<template>
  <div class="flex-start-start">
    <div class="sidebar-container">
      <div class="logo">{{ name.title }}</div>
      <Menu />
    </div>
    <div>
      <Main />
    </div>
  </div>
</template>

<script>
import Menu from './components/menu/index'
import Main from './components/main'
import name from '@/assets/config/name'
export default {
  components: {
    Menu,
    Main
  },
  data() {
    return {
      name
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
  .logo {
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: solid 1px #3b5f93;
  }
</style>
