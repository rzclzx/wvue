<template>
  <div>
    <el-submenu v-if="menu.children && !menu.single" :index="menu.path">
      <template slot="title">
        <i :class="menu.meta.icon"></i>
        <span>{{ menu.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="item in menu.children"
        :key="item.path"
        :index="`${menu.path}/${item.path}`"
      >
        <span>●</span>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="`${menu.path}${menu.children[0].path}`">
      <i :class="menu.meta.icon"></i>
      <span slot="title">{{ menu.meta.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  props: ['menu'],
  data() {
    return {
      
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

</style>
