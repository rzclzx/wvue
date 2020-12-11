<template>
  <div class="app-container">
    <eForm ref="form" :is-add="isAdd"/>
    <div class="head-container">
      <div class="flex-wrap-center">
        <div class="header-item-l">
          <el-input 
            v-model="query.value" 
            size="mini" 
            placeholder="名单值"
            @keyup.enter.native="toQuery"></el-input>
        </div>
      </div>
    </div>
    <div class="table-header flex-between-center">
      <h3 class="table-title">页面展示字段</h3>
      <div class="flex-end-center">
        <el-button 
          @click="add" 
          icon="el-icon-plus" 
          size="mini" 
          type="primary" 
          style="margin-right: 10px;"
        >新增</el-button>
        <TableSet :name="'user'" @tableRefresh="tableRefresh" />
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="data" 
      border 
      size="mini"
      highlight-current-row
      :cell-style="{padding: (columns.user.height ? columns.user.height : 0) + 'px 0!important'}"
      :header-cell-style="{padding: (columns.user.height ? columns.user.height : 0) + 'px 0!important'}"
      @header-dragend="(a,b,c,d) => columnsWidthChange(a,b,c,d,'user')"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
        :resizable="false"
      ></el-table-column>
      <template  v-for="(item, key) in columns.user">
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
      <el-table-column
        width="100"
        label="操作"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              @click="edit(scope.row)"
          >修改</el-button>
          <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180"
          >
              <p>确定移出本条名单吗？</p>
              <div style="text-align: right; margin: 0">
                  <el-button
                      size="mini"
                      type="text"
                      @click="$refs[scope.row.id].doClose()"
                  >取消</el-button>
                  <el-button
                      :loading="delLoading"
                      type="primary"
                      size="mini"
                      @click="subDelete(scope.row.id)"
                  >确定</el-button>
              </div>
              <el-button slot="reference" type="text" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-end-center">
      <el-pagination :page-size="size"
        background
        :total="total"
        :current-page="page + 1"
        style="margin-top: 8px;"
        layout="prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import initData from '@/mixins/initData';
import TableSet from "@/components/TableSet";
import eForm from './form'
import { del } from '@/api/user';
import TableTrans from '@/components/TableTrans';
export default {
  components: { eForm, TableSet, TableTrans },
  mixins: [initData],
  data() {
    return {
      delLoading: false
    }
  },
  created() {
    this.init()
  },
  computed: {
    dict () {
      return this.$store.state.app.dict || {}
    }
  },
  methods: {
    beforeInit() {
      this.url = 'users'
      const sort = 'id,desc'
      this.params = Object.assign({ page: this.page, size: this.size, sort: sort }, this.query);
      return true
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(row) {
      this.$refs.form.form = this.$utils.clone(row)
      this.isAdd = false
      this.$refs.form.dialog = true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
