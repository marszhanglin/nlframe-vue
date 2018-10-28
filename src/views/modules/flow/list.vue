<template>
  <div class="mod-transflow">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">

      <el-form-item>
        <el-input v-model="dataForm.outOrderNo" placeholder="外部订单号" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">


      <el-table-column
        prop="outOrderNo"
        header-align="center"
        align="center"
        width="200"
        label="外部订单号">
      </el-table-column>

      <el-table-column
      prop="amount"
      header-align="center"
      align="center"
      label="交易金额(分)">
    </el-table-column>

      <el-table-column
        prop="transType"
        header-align="center"
        align="center"
        label="交易类型">
      </el-table-column>

      <el-table-column
        prop="transTime"
        header-align="center"
        align="center"
        label="交易时间">
      </el-table-column>


      <el-table-column
        prop="channelId"
        header-align="center"
        align="center"
        width="180"
        label="支付渠道">
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('flow:list:detail')" type="text" size="small" @click="queryDetailHandle(scope.row)">详细</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import addOrUpdate from './list-detail'
  export default {
    data () {
      return {
        dataForm: {
          cashierName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        storeoptions: [],
        storemap: {},
        addOrUpdateVisible: false
      }
    },
    components: {
      addOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/flow/transflow/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'outOrderNo': this.dataForm.outOrderNo
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            /* this.$http({
              url: this.$http.adornUrl(`/mgr/store/select`),
              method: 'post',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.storeoptions = []
                this.storemap = {}
                for (var j = 0, len = data.stores.length; j < len; j++) {
                  this.storeoptions.push({'value': data.stores[j].storeId, 'label': data.stores[j].storeName})
                  this.storemap[data.stores[j].storeId] = data.stores[j].storeName
                }
                for (var i = 0; i < this.dataList.length; i++) {
                  this.$set(this.dataList[i], 'storeName', this.storemap[this.dataList[i].storeId])
                }
                this.dataListLoading = false
              }
            }) */
            this.dataListLoading = false
          } else {
            this.dataList = []
            this.totalPage = 0
            this.dataListLoading = false
          }
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      getTransTypeStr (transType) {
        var map = {}
        map['2'] = '消费'
        map['3'] = '预授权完成'
        map['5'] = '预授权'
        map['6'] = '退货'
        map['7'] = '消费撤销'
        map['8'] = '预授权完成撤销'
        map['9'] = '预授权撤销'
        return map[transType]
      },
      // 查询明细
      queryDetailHandle (data) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(data)
        })
      }
    }
  }
</script>
