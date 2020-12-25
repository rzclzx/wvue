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
      <el-form-item label="用户名" prop="username">
        <el-input 
          size="mini" 
          v-model="form.username" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input 
          size="mini" 
          v-model="form.phone" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="名称" prop="nickName">
        <el-input 
          size="mini" 
          v-model="form.nickName" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input 
          size="mini" 
          v-model="form.email" 
          style="width:250px" 
        />
      </el-form-item>
      <el-form-item label="角色岗位" prop="roles">
        <el-select 
          clearable
          multiple
          v-model="form.roles" 
          style="width: 250px" 
          placeholder="请选择角色"
          value-key="id"
        >
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio 
            v-for="item in dict.enabled ? dict.enabled.list : []"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/user'
import { getAll } from '@/api/role'
export default {
  props: ['isAdd'],
  created() {
    getAll().then(res => {
      this.roles = res || [];
    })
  },
  data() {
    return {
      dialog: false,
      form: {
        enabled: true
      },
      rules: {
        // label: [
        //   { required: true, message: '请输入名称', trigger: 'blur' }
        // ]
      },
      roles: []
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
      this.form = {
        enabled: true
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
