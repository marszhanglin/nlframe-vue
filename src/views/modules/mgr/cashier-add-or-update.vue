<template>
  <el-dialog
    :title="!dataForm.cashierId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="姓名" prop="cashierName">
        <el-input v-model="dataForm.cashierName" placeholder="收银员姓名"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="cashierAddr">
        <el-input v-model="dataForm.cashierAddr" placeholder="地址"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="cashierPhone">
        <el-input v-model="dataForm.cashierPhone" placeholder="商户联系电话"></el-input>
      </el-form-item>

      <el-form-item label="联系邮箱" prop="cashierEmail">
        <el-input v-model="dataForm.cashierEmail" placeholder="联系人邮箱"></el-input>
      </el-form-item>

      <el-form-item label="所属门店"    prop="storeId" >
        <el-select v-model="dataForm.storeId" filterable   placeholder="请选择">
          <el-option
            v-for="item in storeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="userName"   >
        <el-input v-model="dataForm.userName" placeholder="登录帐号" :disabled="!!dataForm.cashierId" ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }"  v-if="!dataForm.cashierId">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }"   v-if="!dataForm.cashierId">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>


      <el-form-item label="状态" size="mini" prop="enableFlag">
        <el-radio-group v-model="dataForm.enableFlag">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" size="medium" prop="remark">
        <el-input  v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          cashierId: 0,
          cashierName: '',
          mrchName: '',
          storeId: undefined,
          cashierAddr: '',
          cashierPhone: '',
          cashierEmail: '',
          enableFlag: 1,
          remark: '',
          userName: '',
          password: '',
          comfirmPassword: ''
        },
        storeoptions: [],
        dataRule: {
          cashierName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          cashierAddr: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          cashierPhone: [
            { required: true, message: '电话不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          cashierEmail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          storeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: validateComfirmPassword, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.cashierId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })

        this.$http({
          url: this.$http.adornUrl(`/mgr/store/select`),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.storeoptions = []
            for (var j = 0, len = data.stores.length; j < len; j++) {
              this.storeoptions.push({'value': data.stores[j].storeId, 'label': data.stores[j].storeName})
            }
          }
        })

        if (this.dataForm.cashierId) {
          this.$http({
            url: this.$http.adornUrl(`/mgr/cashier/info/${this.dataForm.cashierId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.cashierName = data.cashier.cashierName
              this.dataForm.mrchName = data.cashier.mrchName
              this.dataForm.storeId = data.cashier.storeId
              this.dataForm.cashierAddr = data.cashier.cashierAddr
              this.dataForm.cashierPhone = data.cashier.cashierPhone
              this.dataForm.cashierEmail = data.cashier.cashierEmail
              this.dataForm.userName = data.cashier.userName
              this.dataForm.enableFlag = data.cashier.enableFlag
              this.dataForm.remark = data.cashier.remark
            }
          })
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/mgr/cashier/${!this.dataForm.cashierId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'cashierId': this.dataForm.cashierId || undefined,
                'storeId': this.dataForm.storeId,
                'cashierName': this.dataForm.cashierName,
                'cashierAddr': this.dataForm.cashierAddr,
                'cashierPhone': this.dataForm.cashierPhone,
                'cashierEmail': this.dataForm.cashierEmail,
                'userName': this.dataForm.userName,
                'password': this.dataForm.password,
                'enableFlag': this.dataForm.enableFlag,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 100,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
