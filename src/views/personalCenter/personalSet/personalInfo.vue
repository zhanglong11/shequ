<template>
  <div class="personal-info">
    <h3>个人信息</h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="头像" prop="headImage">
            <div>
              <div class="avatar-wrap">
                <el-avatar :size="100" :src="form.headImage" />
                <i id="pick-avatar" class="el-icon-edit-outline" />
              </div>
              <avatar-cropper
                trigger="#pick-avatar"
                :upload-headers="{ 'x-access-token': $store.state.user.token }"
                :upload-url="`${filePreviewUrl}/file/commonFile/uploadImage`"
                :output-options="{ width: 200, height: 200 }"
                @uploaded="handleUploaded"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">{{ detailData.realName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机">
            <div class="phone-wrap">
              <div>{{ detailData.mobile }}</div>
              <el-button type="text" @click="handleChangePhone">变更手机</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门">{{ detailData.department ? detailData.department : '-' }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位">{{ detailData.position }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="角色">
            <div v-if="detailData.roleTexts.length" class="role-wrap">
              <div v-for="(roleItem, index) in detailData.roleTexts" :key="index" class="role-item">{{ roleItem }}</div>
            </div>
            <div v-else>-</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" prop="identityCardNumber">
            <el-input v-model="form.identityCardNumber" :maxlength="50" placeholder="请输入身份证号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="QQ" prop="qqNumber">
            <el-input v-model="form.qqNumber" :maxlength="50" placeholder="请输入QQ号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="微信" prop="wechatNumber">
            <el-input v-model="form.wechatNumber" :maxlength="50" placeholder="请输入微信号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="入职时间" prop="entryDate">
            <el-date-picker
              v-model="form.entryDate"
              type="date"
              placeholder="选择入职日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" :maxlength="50" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" resize="none" :rows="3" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <div class="btn-con">
            <el-button type="primary" :loading="btnLoading" @click="handleSave">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!-- 变更手机模态框组件 start -->
    <ModalUpdatePhone :visible.sync="visibleUpdatePhone" @updatePhone="updatePhone" />
    <!-- 变更手机模态框组件 end -->
  </div>
</template>

<script>
import { filePreviewUrl } from '@/plugins/axios'
import AvatarCropper from 'vue-avatar-cropper'
import anyRules from '@/lib/anyRule'
import ModalUpdatePhone from './ModalUpdatePhone'
import { getInfo, updateUserInfo } from '@/api/system/user'

export default {
  components: { AvatarCropper, ModalUpdatePhone },
  data() {
    return {
      filePreviewUrl,
      form: {
        headImage: null,
        identityCardNumber: '',
        qqNumber: '',
        wechatNumber: '',
        entryDate: undefined,
        email: '',
        remark: ''
      },
      rules: {
        identityCardNumber: [{ pattern: anyRules.identityNumber, message: '请输入正确的身份证号' }],
        qqNumber: [{ pattern: anyRules.qq, message: '请输入正确的qq号' }],
        email: [{ pattern: anyRules.email, message: '请输入正确的邮箱' }]
      },
      visibleUpdatePhone: false,
      detailData: {
        roleTexts: []
      },
      btnLoading: false
    }
  },
  mounted() {
    this.getUserInfo()
  },
  // 方法集合
  methods: {
    // 获取当前用户信息
    getUserInfo() {
      getInfo().then(res => {
        // console.log(res)
        this.detailData = res.data
        this.form.headImage = res.data.headImage
        this.form.identityCardNumber = res.data.identityCardNumber
        this.form.qqNumber = res.data.qqNumber
        this.form.wechatNumber = res.data.wechatNumber
        this.form.entryDate = res.data.entryDate
        this.form.email = res.data.email
        this.form.remark = res.data.remark
        this.detailData.department = _.map(res.data.departmentList, 'departmentName').join(',')
        this.form.departmentIdList = _.map(res.data.departmentList, 'departmentId')
        this.form.roleIdList = _.map(res.data.roleList, 'roleId')
      })
    },
    // 头像上传
    handleUploaded(res) {
      this.form.headImage = res.data
    },
    // 变更手机
    handleChangePhone() {
      this.visibleUpdatePhone = true
    },
    // 变更手机模态框关闭后续操作
    updatePhone(phone) {
      this.detailData.mobile = phone
    },
    // 保存
    handleSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            id: this.detailData.id,
            mobile: this.detailData.mobile,
            ...this.form
          }
          this.btnLoading = true
          // console.log(params)
          updateUserInfo(params).then(
            res => {
              this.$message.success('操作成功')
              this.getUserInfo()
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
h3 {
  margin-bottom: 10px;
}
.personal-info {
  height: calc(100vh - 164px);
  overflow: auto;
  .avatar-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    #pick-avatar {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      height: 25px;
      color: #fff;
      text-align: center;
      line-height: 25px;
    }
  }
  .phone-wrap {
    display: flex;
    align-items: center;
    > div {
      margin-right: 10px;
    }
  }
  .role-wrap {
    display: flex;
    flex-wrap: wrap;
    .role-item {
      background: #f5f5f5;
      padding: 0px 10px;
      color: #999999;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  /deep/ .el-textarea__inner {
    font-family: Arial !important;
  }
  .btn-con {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
