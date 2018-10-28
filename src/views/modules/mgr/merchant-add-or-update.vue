<template>
  <el-dialog
    :title="!dataForm.mrchId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="商户名称" prop="mrchName">
        <el-input v-model="dataForm.mrchName" placeholder="商户名称"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="mrchAddr">
        <el-input v-model="dataForm.mrchAddr" placeholder="地址"></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="lnkmName">
        <el-input v-model="dataForm.lnkmName" placeholder="商户联系人"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="mrchPhone">
        <el-input v-model="dataForm.mrchPhone" placeholder="商户联系电话"></el-input>
      </el-form-item>

      <el-form-item label="联系邮箱" prop="lnkmEmail">
        <el-input v-model="dataForm.lnkmEmail" placeholder="商户联系人邮箱"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="userName"   >
        <el-input v-model="dataForm.userName" placeholder="登录帐号" :disabled="!!dataForm.mrchId"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }"  v-if="!dataForm.mrchId">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }"   v-if="!dataForm.mrchId">
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
 // import { treeDataTranslate } from '@/utils/index'
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
          mrchId: 0,
          mrchName: '',
          mrchAddr: '',
          mrchPhone: '',
          lnkmName: '',
          lnkmEmail: '',
          enableFlag: 1,
          remark: '',
          userName: '',
          password: '',
          comfirmPassword: ''
        },
        dataRule: {
          mrchName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          mrchAddr: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          mrchPhone: [
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
        this.dataForm.mrchId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (this.dataForm.mrchId) {
          this.$http({
            url: this.$http.adornUrl(`/mgr/merchant/info/${this.dataForm.mrchId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.mrchName = data.merchant.mrchName
              this.dataForm.mrchAddr = data.merchant.mrchAddr
              this.dataForm.mrchPhone = data.merchant.mrchPhone
              this.dataForm.lnkmName = data.merchant.lnkmName
              this.dataForm.lnkmEmail = data.merchant.lnkmEmail
              this.dataForm.userName = data.merchant.userName
              this.dataForm.enableFlag = data.merchant.enableFlag
              this.dataForm.remark = data.merchant.remark
            }
          })
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/mgr/merchant/${!this.dataForm.mrchId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'mrchId': this.dataForm.mrchId || undefined,
                'mrchName': this.dataForm.mrchName,
                'mrchAddr': this.dataForm.mrchAddr,
                'mrchPhone': this.dataForm.mrchPhone,
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
