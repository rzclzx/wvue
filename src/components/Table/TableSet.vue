<template>
  <div class="tabset-container">
    <div class="box flex-end-center">
      <el-popover placement="left" width="240" v-model="visible">
        <div style="padding: 5px; font-size: 12px">
          <div
            class="flex-between-center"
            style="border-bottom: solid 1px #f7f7f7; padding-bottom: 5px"
          >
            <div>字段设置</div>
            <i @click="setShowHeader" class="el-icon-setting link" style="font-size: 18px"></i>
          </div>
          <div
            class="flex-between-center"
            style="
              border-bottom: solid 1px #f7f7f7;
              padding-bottom: 5px;
              margin-top: 10px;
            "
          >
            <div>恢复默认间距</div>
            <i
              @click="resetWidth"
              class="el-icon-refresh-left link"
              style="font-size: 18px"
            ></i>
          </div>
          <div class="flex-between-center" style="margin-top: 10px; margin-bottom: 10px">
            <div>行高设置</div>
          </div>
          <div class="flex-between-center">
            <div @click="changeHeight('12')" class="link flex-start-center">
              <SvgIcon 
                :name="'hangjianju1'" 
                :styleObj="{
                  fontSize: '16px',
                  marginRight: '5px'
                }" 
              />
              <span>宽松</span>
            </div>
            <div @click="changeHeight('6')" class="link flex-start-center">
              <SvgIcon 
                :name="'hangjianju2'" 
                :styleObj="{
                  fontSize: '16px',
                  marginRight: '5px'
                }" 
              />
              <span>适中</span>
            </div>
            <div @click="changeHeight('0')" class="link flex-start-center">
              <SvgIcon 
                :name="'hangjianju3'" 
                :styleObj="{
                  fontSize: '16px',
                  marginRight: '5px'
                }" 
              />
              <span>紧凑</span>
            </div>
          </div>
        </div>
        <span slot="reference" class="link icons">
          <i class="el-icon-setting" style="font-size: 18px"></i>
        </span>
      </el-popover>
    </div>
    <el-dialog title="设置" :visible.sync="show" width="650px">
      <div class="flex-center-center">
        <el-transfer :titles="['显示字段', '隐藏字段']" v-model="value" :data="data"></el-transfer>
      </div>
      <div slot="footer" class="flex-center-center">
        <el-button size="mini" @click="resetDefault" style="margin-right: 10px" type="text">恢复默认</el-button>
        <el-button size="mini" type="primary" @click="submit">确 认</el-button>
        <el-button size="mini" type="info" @click="show = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { columns } from "@/assets/config/columns";
export default {
  name: "TableSet",
  props: ["name"],
  data() {
    return {
      visible: false,
      show: false,
      data: [],
      value: []
    };
  },
  created() {
    this.transferInit();
  },
  methods: {
    transferInit() {
      let obj = JSON.parse(localStorage.columns)[this.name];
      this.data = [];
      this.value = [];
      for (let item in obj) {
        if (typeof obj[item] !== "object") continue;
        this.data.push({
          key: item,
          label: obj[item].label
        });

        if (!obj[item].show) this.value.push(item);
      }
    },
    resetDefault() {
      this.value = [];
    },
    resetWidth() {
      let currentColumns = JSON.parse(localStorage.columns);
      for (let i in currentColumns[this.name]) {
        if (typeof currentColumns[this.name][i] !== "object") continue;
        currentColumns[this.name][i].width = columns[this.name][i].width;
      }
      localStorage.columns = JSON.stringify(currentColumns);
      this.$emit("tableRefresh");
    },
    changeHeight(value) {
      let currentColumns = JSON.parse(localStorage.columns);
      currentColumns[this.name].height = value;
      localStorage.columns = JSON.stringify(currentColumns);
      this.$emit("tableRefresh");
    },
    setShowHeader() {
      this.show = true;
    },
    submit() {
      let currentColumns = JSON.parse(localStorage.columns);
      for (let i in currentColumns[this.name]) {
        if (typeof currentColumns[this.name][i] !== "object") continue;
        currentColumns[this.name][i].show = !this.value.includes(i);
      }
      localStorage.columns = JSON.stringify(currentColumns);
      this.$emit("tableRefresh");
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.tabset-container {
  display: inline-block;
}
.box {
  .popover {
    font-size: 12px;
  }

  .icon-SHEZHI {
    color: #646464;
    font-size: 14px;
  }
  .icon-arrow-down- {
    margin-left: 2px;
    color: #646464;
    font-size: 12px;
    vertical-align: 1px;
  }
}
</style>
