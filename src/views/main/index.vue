<template>
  <div class="app-container">
    123
  </div>
</template>

<script>
import { getDepts } from '@/api/login'
import { add } from '@/api/user'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  created() {
    getDepts()
    add()
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
