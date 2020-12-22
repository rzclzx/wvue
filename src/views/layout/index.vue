<template>
  <div>
    <div class="sidebar-container">
      <div class="logo">{{ name.title }}</div>
      <Menu />
    </div>
    <Header />
    <div class="app-tags">
      <Tags />
    </div>
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
import Tags from '@/views/layout/components/tags'
export default {
  components: {
    Menu,
    Main,
    Header,
    Tags
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
  @import '~@/styles/public.less';
  .logo {
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: solid 1px #3b5f93;
  }
  .app-main {
    padding: 70px 0 0 195px;
    position: relative;
    overflow: hidden;
  }
  .app-tags {
    background-color: @apptagsback;
    z-index: 999;
    position: fixed;
    right: 0;
    top: 41px;
    font-size: 12px;
    width: calc(100% - 195px);
    height: 30px;
    color: @fontcolor;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
</style>
