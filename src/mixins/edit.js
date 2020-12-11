export default {
  data() {
    return {
      cache: []
    }
  },
  methods: {
    search () {
      return new Promise((resolve, reject) => {
        this.init().then(res =>{
          if (res.searchCount === true) {
            this.cache = this.$utils.clone(res.records || [])
          } else if (res.data) {
            if (res.data.records) {
              this.cache = this.$utils.clone(res.data.records || [])
            } else {
              this.cache = this.$utils.clone(res.data || [])
            }
          } else {
            this.cache = this.$utils.clone(res.content || [])
          }
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    cancel () {
      this.data = this.$utils.clone(this.cache);
    },
    cellAdd(id) {
      this.data = this.$utils.clone(this.cache);
      this.data.push({edit: true, isAdd: true});
      // 新增一列对应列表滚动条自动移到底部
      if (typeof id !== 'string') return;
      let el = document.getElementById(id).getElementsByClassName('el-table__body-wrapper')[0] || {};
      setTimeout(() =>{
        el.scrollTop = el.scrollHeight;
      }, 1);
    },
    cellEdit(index) {
      this.data = this.$utils.clone(this.cache);
      this.data[index].edit = true;
      if (this.trans) {
        // show代表回显时需要转化的数据类型
        this.data[index] = this.trans(this.data[index], 'show')
      }
    },
    submit (row) {
      // 在views页面填充valid方法
      if (!this.valid(row)) {
        return;
      }
      if (this.trans) {
        row = this.trans(row);
      }
      if (!row.isAdd) {
        this.edit(row).then(res => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.search()
        }).catch(err => {
          
        })
      } else {
        this.add(row).then(res => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.search()
        }).catch(err => {
          
        })
      }
    }
  }
}
