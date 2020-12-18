<template>
  <div class="app-header flex-between-center">
    <div class="flex-start-center">
      <el-breadcrumb separator="/" style="margin:0 20px 0 10px">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
        <template v-for="item in $route.matched">
          <el-breadcrumb-item 
            :key="item.path" 
            v-if="item.path && item.path != '/dashboard'"
          >{{ item.name }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <Tags />
    </div>
    <div style="margin-right: 30px">
      <el-dropdown trigger="click">
        <div class="link flex-start-center">
          <i class="el-icon-user-solid" style="font-size:20px;margin-right:5px"></i>
          <span style="margin-right:5px">admin</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Tags from '@/views/layout/components/tags'
export default {
  components: {
    Tags
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  created() {
    
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(res => {
        location.reload();
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/styles/public.less';
  .app-header {
    background-color: @appheaderback;
    z-index: 999;
    position: fixed;
    right:0;
    top:0;
    font-size: 12px;
    width: calc(100% - 195px);
    height: 40px;
    color: @fontcolor;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
</style>
