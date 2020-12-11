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
      style="width: 90%"
    >
      <el-form-item label="名单值" prop="value">
        <el-input 
          size="mini" 
          v-model="form.value" 
          style="width:250px" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select 
          clearable 
          size="mini"
          v-model="form.type"
        >
          <el-option
            v-for="item in dict.aaa ? dict.aaa.list : []"
            :key="item.id"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button size="mini" :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/user';
export default {
  components: {},
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  created() {
    
  },
  data() {
    return {
      loading: false, 
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
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
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
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
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
