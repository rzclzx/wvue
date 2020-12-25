<template>
  <div>
    <el-table
      @selection-change="handleSelectionChange"

      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      lazy
      :load="load"
    >
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
    </el-table>
    <!-- 权限，或关系 -->
    <div v-permission="['admin','user:edit']">权限</div>
    <!-- checkbox -->
    <el-checkbox v-model="checked">备选项</el-checkbox>
    <!-- 单选组 -->
    <el-radio-group v-model="form.period">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="2">否</el-radio>
    </el-radio-group>
    <!-- 按钮 -->
    <el-button 
      icon="el-icon-plus" 
      size="mini" 
      type="primary"
    >新增</el-button>
    <!-- 输入 -->
    <div class="header-item">
      <el-input 
        v-model="form.value" 
        size="mini" 
        placeholder="名单值" 
        @keyup.enter.native="toQuery"
      ></el-input>
    </div>
    <!-- 时间 -->
    <div class="header-item">
      <el-date-picker
        size="mini"
        v-model="query.startTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        placeholder="开始日期">
      </el-date-picker>
    </div>
    <!-- 文件上传 -->
    <Upload 
      ref="upload"
      :form="form" 
      :name="'选择文件'"
      :msg="'上传成功'"
      :handler="handleSuccess"
      :orientation="true"
      :api="'/api/caseAttachment'" 
    />
    <!-- 单选 -->
    <div class="header-item">
      <el-select 
        clearable
        filterable
        placeholder="单选"
        size="mini"
        v-model="form.item"
        value-key="id"
      >
        <el-option
          v-for="item in dict.aaa ? dict.aaa.list : []"
          :key="item.id"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <!-- 多选 -->
    <div class="header-item">
      <el-select 
        clearable 
        placeholder="多选"
        size="mini"
        v-model="form.aaa"
        value-key="id"
        multiple
      >
        <el-option
          v-for="item in dict.aaa ? dict.aaa.list : []"
          :key="item.id"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { downloadFile } from '@/utils/index';
export default {
  data () {
    return {
      
    }
  },
  computed: {
    dict () {
      return this.$store.state.app.dict || {}
    }
  },
  methods: {
    handleSelectionChange(value) {
      this.selects = value;
    },
    load(tree, treeNode, resolve) {
      // 后端懒加载
      getMenus({ pid: tree.id }).then(res => {
        resolve(res.content)
      })
      // 前端懒加载 :tree-props="{children: 'child', hasChildren: 'hasChild'}"
      // table 列表数据 data 拿到后调用 下面addChild方法
      // 放开下面 resolve(tree.children)
      // resolve(tree.children)
    },
    addChild (list) {
      list.forEach(item => {
        this.$utils.rootCallBack(item, 'children', a =>{
          a.hasChild = false;
        }, b => {
          b.hasChild = true;
        })
      })
    },
    handleSuccess() {
      this.$notify({
        title: '批量导入成功',
        type: 'success',
        duration: 2500
      })
    },
    download() {
      downApi(this.params).then(result => {
        this.$utils.downloadFile(result, 'AntiCaseApply列表', 'xlsx')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>