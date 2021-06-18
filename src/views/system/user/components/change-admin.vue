<template>
  <div>
    <el-dialog title="变更管理员" :visible="visible" width="400px" @close="close">
      <el-form v-if="step === 1" label-width="100px">
        <el-alert title="变更管理员，需要验证当前管理员账号的身份" type="info" style="margin-bottom: 15px" />
        <el-form-item label="当前管理员:">
          <span>{{ currentAdminInfo.realName }}</span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span>{{ currentAdminInfo.mobile }}</span>
          <el-button style="margin-left: 15px" size="mini" type="primary" :loading="!!seconds" @click="getMsgCode(1)">
            获取验证码 {{ seconds ? `(${seconds})` : '' }}
          </el-button>
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input v-model="formOld.msgCode">123</el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="step === 1" type="primary" :disabled="!formOld.msgCode || !oldUuid" @click="submitOld"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
      <el-form v-else label-width="100px">
        <el-form-item label="新的管理员:">
          <SelectUser v-model="formNew.newUserId" :mobile.sync="newUserMobile" :disabled-keys="[currentAdminInfo.id]" />
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{ newUserMobile }}</span>
          <el-button style="margin-left: 15px" size="mini" type="primary" :loading="!!seconds" @click="getMsgCode(2)">
            获取验证码 {{ seconds ? `(${seconds})` : '' }}
          </el-button>
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input v-model="formNew.msgCode">123</el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!formNew.msgCode || !newUuid" @click="submitNew">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SelectUser from './select-user'
export default {
  name: 'ChangeAdmin',
  components: { SelectUser },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentAdminInfo: {},
      seconds: 0,
      step: 1,
      formOld: {},
      formNew: {},
      oldUuid: null, // 发送短信验证码之后拿到的唯一标识
      newUuid: null, // 发送短信验证码之后拿到的唯一标识
      newUserMobile: ''
    }
  },
  created() {
    this.axios.system.get('/cim6d/system/getCompanyAdminUser').then(res => {
      this.currentAdminInfo = res.data
    })
  },
  mounted() {},
  methods: {
    async submitOld() {
      await this.axios
        .system(`/community/verify/code/checkSmsCode/${this.oldUuid}/${this.formOld.msgCode}`)
        .then(res => res.data)
      this.step = 2
      this.seconds = null
      clearInterval(this.clock)
    },
    async submitNew() {
      this.axios.system
        .post('/cim6d/system/user/changeCompanyAdmin', {
          code: this.formNew.msgCode,
          newUserId: this.formNew.newUserId,
          newUuid: this.newUuid,
          oldUuid: this.oldUuid
        })
        .then(res => {
          this.$message.success('设置成功，即将退出系统')
          setTimeout(() => {
            this.$store.dispatch('user/logout')
            location.reload()
          }, 1000)
        })
    },
    async getMsgCode(type) {
      // type  1 管理员  2 新管理员
      if (type === 1) {
        this.oldUuid = await this.axios.system
          .post('/community/verify/code/sendSmsCode/' + this.currentAdminInfo.id)
          .then(res => res.data)
      } else if (type === 2) {
        this.newUuid = await this.axios.system
          .post('/community/verify/code/sendSmsCode/' + this.formNew.newUserId)
          .then(res => res.data)
      }
      this.$message.success('验证码已发送')
      this.seconds = 60
      // todo 此方法获取的倒计时不太准确
      this.clock = setInterval(() => {
        this.seconds -= 1
        if (this.seconds === 0) {
          clearInterval(this.clock)
        }
      }, 1000)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less"></style>
