<template>
  <div>
    <template  v-for="(item, key) in columns.opHotlist">
      <el-table-column
        v-if="item.show"
        :key="key"
        :width="item.width"
        :label="item.label"
        :prop="key"
        :align="item.align"
        :show-overflow-tooltip="item.tooltip"
      >
        <template slot-scope="scope">
          <TableTrans :scope="scope" :item="item" :prop="key" />
        </template>
      </el-table-column>
    </template>
    <div class="app-container">
      <div class="head-container">
        <div class="flex-wrap-center">
          <div class="header-item-l">
            <el-input v-model="query.value" size="mini" placeholder="名单值" @keyup.enter.native="toQuery"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 标题 -->
    <div class="table-header flex-between-center">
      <h3 class="table-title">风险名单维护</h3>
      <div class="flex-end-center">
        <el-button icon="el-icon-plus" size="mini" type="primary" style="margin-right: 10px">新增</el-button>
        <el-button icon="el-icon-download" size="mini" type="primary" style="margin-right: 10px">导出</el-button>
        <TableSet :name="'opHotlist'" @tableRefresh="tableRefresh" />
      </div>
    </div>
    <!-- 表头 -->
    <el-table
      v-loading="loading"
      :data="data" 
      border 
      size="mini"
      highlight-current-row
      :cell-style="{padding: (columns.opHotlist.height ? columns.opHotlist.height : 0) + 'px 0!important'}"
      :header-cell-style="{padding: (columns.opHotlist.height ? columns.opHotlist.height : 0) + 'px 0!important'}"
      @header-dragend="(a,b,c,d) => columnsWidthChange(a,b,c,d,'opHotlist')"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
        :resizable="false"
      ></el-table-column>
    </el-table>
    <!-- 查询重置按钮 -->
    <div class="header-item-l">
      <el-button size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <el-button size="mini" icon="el-icon-refresh-left" type="info" @click="reset()">重置</el-button>
    </div>
    <!-- 录入人 -->
    <el-form-item label="录入人" prop="name">
      <div style="width: 178px">{{ $store.state.user.user.fullname }}</div>
    </el-form-item>
    <!-- 权限，或关系 -->
    <div v-permission="['admin','user:edit']">权限</div>
    <!-- checkbox -->
    <el-checkbox v-model="checked">备选项</el-checkbox>
    <!-- 单选组 -->
    <el-radio-group style="margin-right: 30px;" v-model="form.period">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="2">否</el-radio>
    </el-radio-group>
    <!-- 输入 -->
    <div class="header-item-l">
      <el-input 
        v-model="form.value" 
        size="mini" 
        placeholder="名单值" 
        @keyup.enter.native="toQuery"
      ></el-input>
    </div>
    <!-- 时间 -->
    <div class="header-item-l">
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
      :api="'/api/caseAttachment'" />
    <!-- 单选 -->
    <div class="header-item-l">
      <el-select clearable placeholder="单选"
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
    <div class="header-item-l">
      <el-select clearable placeholder="多选"
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
import { parseTime, downloadFile, getToken } from '@/utils/index';
import { getDepts } from '@/api/dept';
import { getToken } from '@/utils/auth';
import TableTrans from '@/components/TableTrans';
export default {
  data () {
    return {
      form: {},
      list: [],
      headers: { 'Authorization': 'Bearer ' + getToken() },
      baseApi: process.env.BASE_API,
    }
  },
  props: ['columns'],
  watch: {
    '$route': {
      handler (value) {
        
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    dict () {
      return this.$store.state.app.dict || {}
    }
  },
  methods: {
    handleSuccess () {
      this.$notify({
        title: '批量导入成功',
        type: 'success',
        duration: 2500
      })
    },
    handleError (res) {
      const msg = JSON.parse(res.message).message;
      this.$notify({
        title: msg,
        type: 'error',
        duration: 2500
      })
    },
    download () {
      downApi(this.params).then(result => {
        this.$utils.downloadFile(result, 'AntiCaseApply列表', 'xlsx')
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    }
  }
}

// 正整数
// /^[1-9]\d*$/
</script>
<style lang="scss" scoped>
  
</style>