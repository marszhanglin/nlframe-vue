<template>
  <div class="mod-cashier">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">

      <el-form-item>
        <el-input v-model="dataForm.cashierName" placeholder="姓名" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('mgr:cashier:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('mgr:cashier:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        prop="cashierId"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column>

      <el-table-column
      prop="cashierName"
      header-align="center"
      align="center"
      label="姓名">
    </el-table-column>

      <el-table-column
        prop="storeName"
        header-align="center"
        align="center"
        label="所属门店">
      </el-table-column>

      <el-table-column
        prop="cashierPhone"
        header-align="center"
        align="center"
        label="电话">
      </el-table-column>


      <el-table-column
        prop="cashierAddr"
        header-align="center"
        align="center"
        width="180"
        label="地址">
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('mgr:cashier:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.cashierId)">修改</el-button>
          <el-button v-if="isAuth('mgr:cashier:delete')" type="text" size="small" @click="deleteHandle(scope.row.cashierId)">删除</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './cashier-add-or-update'
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
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/mgr/cashier/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'cashierName': this.dataForm.cashierName
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.$http({
              url: this.$http.adornUrl(`/mgr/store/select`),
              method: 'post',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.storeoptions = []
                this.storemap = {}
                if (data.stores) {
                  for (var j = 0, len = data.stores.length; j < len; j++) {
                    this.storeoptions.push({'value': data.stores[j].storeId, 'label': data.stores[j].storeName})
                    this.storemap[data.stores[j].storeId] = data.stores[j].storeName
                  }
                  for (var i = 0; i < this.dataList.length; i++) {
                    this.$set(this.dataList[i], 'storeName', this.storemap[this.dataList[i].storeId])
                  }
                }
                this.dataListLoading = false
              }
            })
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.cashierId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/mgr/cashier/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
