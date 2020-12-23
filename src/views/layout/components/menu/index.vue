<template>
  <el-menu
    class="column-scroll"
    :collapse="!menuExpand"
    :default-active="$route.path"
    :show-timeout="200"
    :unique-opened="true"
    mode="vertical"
    background-color="#1F335C"
    text-color="#fff"
    active-text-color="#fff"
    @select="go"
  >
    <MenuItem 
      v-for="menu in menus"
      :key="menu.path"
      :menu="menu"
    />
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem
  },
  data() {
    return {
      
    }
  },
  computed: {
    menus () {
      return this.$store.state.user.menus.filter(item => !item.hidden) || [];
    },
    menuExpand() {
      return this.$store.state.app.menuExpand;
    }
  },
  created() {
    
  },
  methods: {
    go (path) {
      this.$router.push(path);
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/styles/public';
  .column-scroll::-webkit-scrollbar {
    width: 0px;
  }
  .column-scroll::-webkit-scrollbar-thumb {
    background: @menubackactive;
  }
  .column-scroll::-webkit-scrollbar-track {
    background: @menuback;
  }
  .column-scroll {
    max-height: calc(100vh - 40px);
  }
</style>
