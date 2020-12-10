<template>
  <el-menu
    :show-timeout="200"
    :default-active="$route.path"
    :unique-opened="true"
    mode="vertical"
    background-color="#1F335C"
    text-color="#fff"
    active-text-color="#fff"
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
    }
  },
  created() {
    
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
