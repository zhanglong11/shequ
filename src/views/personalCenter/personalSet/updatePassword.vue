<template>
  <div class="upd-pwd">
    <h3>修改密码</h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="当前密码" prop="currentPassword">
            <el-input v-model="form.currentPassword" type="password" placeholder="请输入当前密码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="explain">1.密码由6-21个字符组成，区分大小写</div>
          <div class="explain">2.需至少包含数字、字母和符号中的两种类型</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="确认密码" prop="enterPassword">
            <el-input v-model="form.enterPassword" type="password" placeholder="请输入确认密码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" :loading="btnLoading" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { updateUserPassword } from '@/api/system/user'
import { passwordEncryption } from '@/utils/userEncryption'
export default {
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        enterPassword: ''
      },
      rules: {
        currentPassword: [{ required: true, message: '必填' }],
        newPassword: [
          { required: true, message: '必填' },
          {
            pattern: /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-Za-z]+$)^.{6,21}$/,
            message: '密码格式不正确'
          }
        ],
        enterPassword: [{ required: true, message: '必填' }, { validator: this.validateEnterPwd }]
      },
      btnLoading: false
    }
  },
  methods: {
    // 保存
    handleSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            currentPassword: passwordEncryption(this.form.currentPassword),
            newPassword: passwordEncryption(this.form.newPassword)
          }
          // console.log(params)
          this.btnLoading = true
          updateUserPassword(params).then(
            res => {
              this.$message.success('操作成功')
              this.$refs.form.resetFields()
              this.btnLoading = false
            },
            err => {
              console.log(err)
              this.btnLoading = false
            }
          )
        }
      })
    },
    // 校验确认密码
    validateEnterPwd(rule, value, callback) {
      // console.log(rule, value, callback)
      if (value === this.form.newPassword) {
        callback()
      } else {
        callback(new Error('确认密码和新密码不一致'))
      }
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}
.upd-pwd {
  height: calc(100vh - 164px);
  .explain {
    font-size: 12px;
    color: #999999;
    margin-left: 10px;
  }
}
</style>
