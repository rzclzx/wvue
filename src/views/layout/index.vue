<template>
  <div>
    <div class="sidebar-container">
      <div class="logo">{{ name.title }}</div>
      <Menu />
    </div>
    <Header />
    <div class="app-main">
      <Main />
    </div>
  </div>
</template>

<script>
import Menu from './components/menu/index'
import Main from './components/main'
import name from '@/assets/config/name'
import Header from './components/header/index'
export default {
  components: {
    Menu,
    Main,
    Header
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
  .app-main {
    padding: 40px 0 0 195px;
    position: relative;
    overflow: hidden;
  }
</style>
