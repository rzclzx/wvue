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
  created() {
    
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
