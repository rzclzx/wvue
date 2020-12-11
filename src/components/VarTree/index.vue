<template>
  <el-dialog
    :visible.sync="dialog"
    :close-on-click-modal="false"
    :before-close="cancel"
    :title="`请选择${title}`"
    append-to-body
    width="550px"
  >
    <el-form
      ref="form"
      size="small"
      label-width="90px"
    >
      <el-form-item label="搜索">
        <el-input size="mini" v-model="query" style="width:350px" @input="$refs.tree.filter(query)" />
      </el-form-item>
      <el-form-item label="已选择">
        <div class="flex-wrap-center input-wrap-border" style="width:350px;padding:0 10px">
          <el-tag
            v-for="val in selfVals"
            :key="val"
            size="mini"
            style="margin:5px"
            closable
            :disable-transitions="true"
            @close="handleClose(val)">
            {{ valObj(val).desc }}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item :label="title">
        <div>
          <el-tree
            class="var-tree"
            :class="{'var-single': single}"
            ref="tree"
            style="width:350px"
            v-if="dialog"
            :data="options"
            :props="{
              label: labelkey,
              children: childkey
            }"
            :default-checked-keys="selfVals"
            :default-expand-all="true"
            check-strictly
            show-checkbox
            :node-key="valuekey"
            @node-click="singleSelect"
            @check-change="selectChange"
            :filter-node-method="filterNode"
          >
          </el-tree>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="text" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: ['title', 'options', 'vals', 'labelkey', 'childkey', 'valuekey', 'single'],
  watch: {
    vals: {
      handler () {
        this.selfVals = this.vals;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      query: '',
      selfVals: [],
    }
  },
  methods: {
    valObj (val) {
      return this.$utils.getChildByKey(this.options, this.valuekey, this.childkey, val) || {};
    },
    handleClose (val) {
      this.selfVals.splice(this.selfVals.indexOf(val), 1);
      try {
        this.$refs.tree.setCheckedKeys(this.selfVals, true);
      } catch (error) {

      }
    },
    cancel () {
      this.query = '' // 清空搜索框
      this.dialog = false;
    },
    doSubmit () {
      this.$emit('change', this.selfVals);
      this.cancel();
    },
    selectChange () {
      this.selfVals = this.$refs.tree.getCheckedKeys(true);
    },
    singleSelect (item, node) {
      if (this.single) {
        if (node.childNodes.length == 0) {
          this.selfVals = [item[this.valuekey]]
          try {
            this.$refs.tree.setCheckedKeys(this.selfVals, true);
          } catch (error) {

          }
        }
      }
    },
    filterNode(value, data) {
      if (!value || !data.desc) return true
      return data.desc.indexOf(value) !== -1;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
