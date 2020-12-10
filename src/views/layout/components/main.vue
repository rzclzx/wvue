<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    cachedViews() {
      return {}
    },
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
