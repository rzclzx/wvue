<template>
  <div class="app-container">
    <div class="head-container">
      <div class="flex-wrap-center">
        <div class="header-item">
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
      <TableSet :name="'user'" @tableRefresh="tableRefresh" />
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
    </el-table>
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import TableSet from "@/components/TableSet"
import TableTrans from '@/components/TableTrans'
export default {
  components: { TableSet, TableTrans },
  mixins: [initData],
  data() {
    return {
      
    }
  },
  created() {
    this.init().then(res => res).catch(res => {
      this.data = [];
      for (let i = 0; i < 8; i++) {
        this.data.push({
          a: 1,
          b: 2,
          c: 3,
          d: 1,
          e: 2,
          f: 3,
          g: 1,
          v: 2,
          ff: 3,
        })
      }
    })
  },
  methods: {
    beforeInit() {
      this.url = 'users'
      const sort = 'id,desc'
      this.params = Object.assign({ page: this.page, size: this.size, sort: sort }, this.query);
      return true
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
