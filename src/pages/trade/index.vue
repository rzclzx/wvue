<template>
  <div class="box">
    <div>
      <div>{{ valueChange }}</div>
      <el-button @click="addValue" type="primary">测试computed</el-button>
    </div>
    <router-link style="color: blue" to="CookiePathTest">去cookie-path-text</router-link>
    <StoreDemo style="margin-top: 10px" />
    <ApiDemo style="margin-top: 10px" />
  </div>
</template>

<script>
// import * as screenfull from 'screenfull'
import StoreDemo from '@/components/storedemo'
import ApiDemo from '@/components/apiDemo'
export default {
  name: 'Index',
  components: {
    StoreDemo,
    ApiDemo
  },
  watch: {
    '$store.state.user.code': {
      handler (val) {
        //console.log('watch: ' + val)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      value: 0
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    addValue () {
      this.value++
    }
  },
  computed: {
    valueChange () {
      return this.value * 2;
    }
  }
}
</script>

<style scoped>
  .box {
    width: 70%;
    margin: 20px auto;
  }
</style>
