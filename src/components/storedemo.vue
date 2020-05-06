<template>
  <div style="width: 200px;height: 200px; border: solid 1px #000">
    <div>
      <div>{{ num }}</div>
      <el-button @click="numChange" type="primary">num</el-button>
    </div>
    <div>
      <div>{{ code }}</div>
      <el-button @click="codeChange" type="primary">code</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StoreDemo',
  data () {
    return {
      
    }
  },
  created () {
    // 提交action
    // this.$store.dispatch('setUserInfo')
    // 提交mutations
    // this.$store.commit('value')
  },
  methods: {
    numChange () {
      this.$store.commit('SET_NUM', Math.random())
    },
    codeChange () {
      this.$store.commit('SET_CODE', Math.random())
    }
  },
  computed: {
    ...mapState({
      num: state => state.user.num,
      code: state => state.user.code
    })
  }
}
</script>

<style lang="less" scoped>

</style>
