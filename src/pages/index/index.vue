<template>
  <div class="app-container">
    <el-button 
      size="mini"
      type="primary"
      @click="showExcel"
    >excel预览</el-button>
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {
    
  },
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    showExcel () {
      this.$axios(this.$store.state.utils.getExcel).then(res => {
        console.log(res)
      })
    }
  },
  computed: {
    
  }
}
</script>

<style lang="less" scoped>
  
</style>
