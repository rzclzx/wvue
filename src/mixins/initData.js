import { initData } from '@/api/data'
import PageContainer from '@/components/PageContainer'

export default {
  data() {
    return {
      loading: true,
      data: [],
      page: 0,
      size: 10,
      total: 0,
      url: '',
      params: {},
      paramsSerializer: null,
      query: {},
      time: 50,
      isAdd: false,
      downloadLoading: false,
      columns: JSON.parse(localStorage.columns)
    }
  },
  components: { PageContainer },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        for (let i in this.params) {
          if (!this.params[i] && this.params[i] !== 0) delete this.params[i]
        }
        initData(this.url, this.params, this.paramsSerializer).then(res => {
          if (res.searchCount === true) {
            this.total = res.total
            this.data = res.records || []
          } else if (res.data) {
            if (res.data.records) {
              this.data = res.data.records || []
              this.total = res.data.total
            } else {
              this.data = res.data || []
              this.total = res.total
            }
          } else {
            this.total = res.totalElements
            this.data = res.content || []
          }
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    tableRefresh() {
      this.columns = JSON.parse(localStorage.columns)
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1
      }
    },
    toQuery() {
      this.page = 0
      this.init()
    },
    columnsWidthChange(newWidth, oldWidth, column, e, name) {
      if (!this.columns[name][column.property]) return
      this.columns[name][column.property].width = newWidth;
      localStorage.columns = JSON.stringify(this.columns);
    },
    reset () {
      this.query = {}
    }
  }
}
