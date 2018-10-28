<template>
  <el-dialog
    :title="'详细'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="明细：" >
        {{ dataForm }}
      </el-form-item>

      <el-form-item label="金额：" >
        {{ dataForm.amount }}
      </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {},
        dataRule: {
        }
      }
    },
    methods: {
      init (transflow) {
        this.dataForm = transflow || {}
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }
    }
  }
</script>
