<template>
  <el-upload
    :class="{'flex-start-center': orientation}"
    :data="form"
    :show-file-list="true"
    ref="upload"
    :limit="1"
    :auto-upload="false"
    :headers="headers"
    :on-success="handler"
    :on-error="handleError"
    :action="baseApi + api">
    <el-button size="mini" type="primary">{{ name }}</el-button>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth';
export default {
  props: ['form', 'api', 'name', 'msg', 'handler', 'orientation'],
  data() {
    return {
      headers: { 'Authorization': 'Bearer ' + getToken() },
      baseApi: process.env.BASE_API
    }
  },
  methods: {
    submit () {
      this.$refs.upload.submit();
    },
    handleError (res) {
      const msg = JSON.parse(res.message).message;
      this.$notify({
        title: msg,
        type: 'error',
        duration: 2500
      })
    },
    remove () {
      this.$refs.upload.clearFiles();
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
