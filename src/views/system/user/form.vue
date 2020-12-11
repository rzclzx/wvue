<template>
  <el-dialog 
    :visible.sync="dialog" 
    :close-on-click-modal="false" 
    :before-close="cancel" 
    :title="isAdd ? '新增' : '修改'" 
    append-to-body 
    width="400px"
  >
    <el-form 
      ref="form" 
      :model="form" 
      :rules="rules" 
      size="small" 
      label-width="90px"
      style="width: 100%"
    >
      <el-form-item label="名称" prop="nickName">
        <el-input 
          size="mini" 
          v-model="form.nickName" 
          style="width:250px" 
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/user';
export default {
  props: ['isAdd'],
  created() {
    
  },
  data() {
    return {
      dialog: false,
      form: {},
      rules: {
        // label: [
        //   { required: true, message: '请输入名称', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    dict () {
      return this.$store.state.app.dict || {}
    }
  },
  methods: {
    cancel () {
      this.resetForm();
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.doAdd();
          } else {
            this.doEdit();
          }
        }
      });
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.$parent.init()
      }).catch(err => {
        console.log(err)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.$parent.init()
      }).catch(err => {
        console.log(err)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {};
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
