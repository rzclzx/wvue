<template>
  <div class="app-container">
    <Form ref="form" :isAdd="isAdd" />
    <div class="head-container">
      <div class="flex-wrap-center">
        <div class="header-item">
          <el-input 
            v-model="query.blurry" 
            size="mini" 
            placeholder="名称"
            @keyup.enter.native="toQuery"
          ></el-input>
        </div>
        <div class="header-item">
          <el-button 
            size="mini" 
            type="primary" 
            icon="el-icon-search"
            @click="toQuery"
          >搜索</el-button>
          <el-button 
            style="margin-left:5px"
            size="mini" 
            icon="el-icon-refresh-left" 
            type="info" 
            @click="reset()"
          >重置</el-button>
        </div>
      </div>
    </div>
    <div class="table-header flex-between-center">
      <h3 class="table-title">用户列表</h3>
      <div class="flex-end-center">
        <el-button 
          @click="add" 
          icon="el-icon-plus" 
          size="mini" 
          type="primary" 
          style="margin-right:10px"
        >新增</el-button>
        <TableSet :name="prop" @tableRefresh="tableRefresh" />
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="data" 
      border 
      size="mini"
      highlight-current-row
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
      @header-dragend="headerDrag"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
        :resizable="false"
      ></el-table-column>
      <template  v-for="(item, key) in columns[prop]">
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
            width="100"
          >
            <el-button 
              slot="reference" 
              type="text" 
              size="mini"
            >删除</el-button>
            <div style="text-align:center;margin:10px">确定删除吗?</div>
            <div class="flex-center-center">
              <div>
                <el-button
                  size="mini"
                  type="text"
                  @click="$refs[scope.row.id].doClose()"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="subDelete(scope.row.id)"
                >确定</el-button>
              </div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-end-center">
      <el-pagination 
        :page-size="size"
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
import initData from '@/mixins/initData'
import TableSet from "@/components/Table/TableSet"
import TableTrans from '@/components/Table/TableTrans'
import Form from './form'
import { del } from '@/api/user'
export default {
  components: {
    Form, 
    TableSet, 
    TableTrans
  },
  mixins: [initData],
  data() {
    return {
      prop: 'user'
    }
  },
  created() {
    this.init();
  },
  methods: {
    beforeInit() {
      this.url = 'api/users';
      const sort = 'id,desc';
      this.params = Object.assign({ page: this.page, size: this.size, sort: sort }, this.query);
      return true;
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.$refs.form.form = this.$utils.clone(row);
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    subDelete(id) {
      del(id).then(res => {
        this.$refs[id].doClose();
        this.dleChangePage();
        this.init();
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        });
      }).catch(err => {
        this.$refs[id].doClose();
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
