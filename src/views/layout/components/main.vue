<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="caches">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      caches: []//要缓存的组件name名称
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
    '$store.state.user.menus': {
      handler(menus) {
        this.caches = [];
        menus.forEach(item => {
          if (item.children) {
            item.children.forEach(child => {
              if (!child.meta.noCache) {
                this.caches.push(child.path);
              }
            })
          }
        })
      },
      deep: true,
      immediate: true
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
