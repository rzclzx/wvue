<template>
  <div :class="{ hideSidebar: !menuExpand }" >
    <div class="sidebar-container">
      <div v-if="menuExpand" class="logo">{{ name.title }}</div>
      <div v-else class="logo">
        <i class="el-icon-menu"></i>
      </div>
      <div class="flex-end-center app-expand pointer" @click="toggle">
        <i v-if="menuExpand" class="el-icon-d-arrow-left"></i>
        <i v-else class="el-icon-d-arrow-right"></i>
      </div>
      <Menu />
    </div>
    <Header />
    <div 
      v-show="hasTags" 
      class="app-tags" 
      :style="{width: `calc(100% - ${menuExpand ? 195 : 36}px)`}"
    >
      <Tags ref="tags" @hasTagsChange="hasTagsChange" />
    </div>
    <div class="app-main" :style="{paddingTop: hasTags ? '70px' : '40px'}">
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
import { listDict } from '@/api/dict'
import dicts from '@/assets/config/dict'
export default {
  components: {
    Menu,
    Main,
    Header,
    Tags
  },
  data() {
    return {
      name,
      hasTags: false
    }
  },
  created() {
    listDict({
      page: 0,
      size: 99999
    }).then(res => {
      let configDicts = this.$utils.clone(dicts);
      let resDicts = res.content || [];
      let dictList = configDicts.concat(resDicts);
      this.$store.dispatch('setDict', dictList);
    })
  },
  computed: {
    menuExpand() {
      return this.$store.state.app.menuExpand;
    }
  },
  methods: {
    hasTagsChange(value) {
      this.hasTags = value;
    },
    toggle() {
      let value = this.menuExpand;
      this.$store.commit('SET_MENUEXPAND', !value);
    }
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
    overflow: hidden;
  }
  .app-main {
    padding-left: 195px;
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
    height: 30px;
    color: @fontcolor;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
  .app-expand {
    height: 24px;
    i {
      color: #fff;
      margin-right: 10px;
    }
  }
  .app-expand:hover {
    background-color: @menubackhover;
  }
</style>
