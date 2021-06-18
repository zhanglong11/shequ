<template>
  <el-dialog title="变更手机" :visible="visible" width="500px" @close="handleCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入登录密码">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="新手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号">
          <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
        </el-input>
      </el-form-item>
      <!--<el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <i slot="prefix" class="el-input__icon el-icon-chat-dot-square"></i>
          <el-button slot="append">获取验证码</el-button>
        </el-input>
      </el-form-item>-->
    </el-form>

    <div slot="footer">
      <el-button type="primary" :loading="btnLoading" @click="handleEnter">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import anyRules from '@/lib/anyRule'
import { validPassword } from '@/api/system/user'
import { passwordEncryption } from '@/utils/userEncryption'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        password: '',
        mobile: '',
        code: ''
      },
      rules: {
        password: [
          { required: true, message: '必填' }
          // { pattern: anyRules.password, message: '请输入正确的密码' }
        ],
        mobile: [
          { required: true, message: '必填' },
          { pattern: anyRules.mobile, message: '请输入正确的手机号' }
        ]
        // code: [{ required: true, message: '必填' }]
      },
      btnLoading: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.form?.resetFields()
        })
      }
    }
  },
  methods: {
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // 确定
    handleEnter() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLoading = true
          validPassword(passwordEncryption(this.form.password)).then(
            res => {
              // console.log(res)
              if (res.data) {
                this.handleCancel()
                this.$emit('updatePhone', this.form.mobile)
              } else {
                this.$message.error('登录密码输入不正确')
              }
              this.btnLoading = false
            },
            err => {
              console.log(err)
              this.btnLoading = false
            }
          )
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
</style>
