<template>
  <el-dialog
    :title="!dataForm.storeId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="门店名称" prop="storeName">
        <el-input v-model="dataForm.storeName" placeholder="门店名称"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="storeAddr">
        <el-input v-model="dataForm.storeAddr" placeholder="地址"></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="lnkmName">
        <el-input v-model="dataForm.lnkmName" placeholder="商户联系人"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="storePhone">
        <el-input v-model="dataForm.storePhone" placeholder="商户联系电话"></el-input>
      </el-form-item>

      <el-form-item label="联系邮箱" prop="lnkmEmail">
        <el-input v-model="dataForm.lnkmEmail" placeholder="商户联系人邮箱"></el-input>
      </el-form-item>

      <el-form-item label="所属商户"    prop="mrchId" >
        <el-select v-model="dataForm.mrchId" filterable   placeholder="请选择">
          <el-option
            v-for="item in mrchoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="userName"   >
        <el-input v-model="dataForm.userName" placeholder="登录帐号" :disabled="!!dataForm.storeId" ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }"  v-if="!dataForm.storeId">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }"   v-if="!dataForm.storeId">
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
          storeId: 0,
          storeName: '',
          mrchName: '',
          mrchId: undefined,
          storeAddr: '',
          storePhone: '',
          lnkmName: '',
          lnkmEmail: '',
          enableFlag: 1,
          remark: '',
          userName: '',
          password: '',
          comfirmPassword: ''
        },
        mrchoptions: [],
        dataRule: {
          storeName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          storeAddr: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          storePhone: [
            { required: true, message: '电话不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          lnkmName: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          lnkmEmail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          mrchId: [
            { required: true, message: '所属商户不能为空', trigger: 'blur' }
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
        this.dataForm.storeId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        this.$http({
          url: this.$http.adornUrl(`/mgr/merchant/select`),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.mrchoptions = []
            for (var j = 0, len = data.merchants.length; j < len; j++) {
              this.mrchoptions.push({'value': data.merchants[j].mrchId, 'label': data.merchants[j].mrchName})
            }
          }
        })
        if (this.dataForm.storeId) {
          this.$http({
            url: this.$http.adornUrl(`/mgr/store/info/${this.dataForm.storeId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.storeName = data.store.storeName
              this.dataForm.mrchName = data.store.mrchName
              this.dataForm.mrchId = data.store.mrchId
              this.dataForm.storeAddr = data.store.storeAddr
              this.dataForm.storePhone = data.store.storePhone
              this.dataForm.lnkmName = data.store.lnkmName
              this.dataForm.lnkmEmail = data.store.lnkmEmail
              this.dataForm.userName = data.store.userName
              this.dataForm.enableFlag = data.store.enableFlag
              this.dataForm.remark = data.store.remark
            }
          })
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/mgr/store/${!this.dataForm.storeId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'storeId': this.dataForm.storeId || undefined,
                'mrchId': this.dataForm.mrchId,
                'storeName': this.dataForm.storeName,
                'storeAddr': this.dataForm.storeAddr,
                'storePhone': this.dataForm.storePhone,
                'lnkmName': this.dataForm.lnkmName,
                'lnkmEmail': this.dataForm.lnkmEmail,
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
