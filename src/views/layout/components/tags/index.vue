<template>
  <div 
    ref="scrollContainer"
    class="row-scroll flex-start-center" 
    style="padding-bottom: 3px;margin-left: 10px" 
    @wheel.prevent="handleScroll"
  >
    <el-tag
      size="mini"
      effect="plain"
      type="info"
      v-for="tag in tags"
      :key="tag.name"
      closable
      class="pointer tag-cell"
      :class="{'tag-active': tag.path === $route.path}"
      @click="focusTag(tag)"
      @close="closeTag(tag)"
    >
      {{tag.name}}
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (!route.meta.noCache && !this.$utils.hasItem(route, this.tags, 'path', 'path')) {
          this.tags.push(route);
          this.$emit('hasTagsChange', true);
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    
  },
  created() {
    
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      this.$refs.scrollContainer.scrollLeft += eventDelta / 4;
    },
    focusTag(tag) {
      this.$router.push(tag.path);
    },
    closeTag(tag) {
      this.tags = this.tags.filter(item => item.path !== tag.path);
      if (tag.path === this.$route.path) {
        this.$router.push('/');
      }
      if (this.tags.length === 0) {
        this.$emit('hasTagsChange', false);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/styles/public.less';
  .row-scroll::-webkit-scrollbar {
    height: 1px;
  }
  .tag-active {
    background-color: @buttonback!important;
    color: #fff;
  }
  .tag-cell {
    margin-right:5px;
    transform:translateY(2px);
    border-radius: 2px!important;
    border-color: @buttonback!important;
    height: 25px;
    line-height: 25px;
  }
</style>
