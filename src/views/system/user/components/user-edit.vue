<template>
  <div>
    <el-dialog
      :title="isAdd ? '添加成员' : '修改成员'"
      :visible="visible"
      width="1000px"
      top="10vh"
      append-to-body
      @close="$emit('update:visible', false)"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="formRule" class="dialogForm">
        <div style="display: flex; align-items: flex-end">
          <el-form-item prop="headImage" label="头像：">
            <div class="formInput">
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
          <el-form-item label="用户名：" prop="loginName">
            <el-input v-model="form.loginName" :disabled="!isAdd" :maxlength="50" class="formInput" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item ref="realName" label="姓名：" prop="realName">
            <el-input v-model="form.realName" :disabled="!isAdd" :maxlength="50" class="formInput" />
          </el-form-item>
          <el-form-item label="手机：" prop="mobile">
            <el-input v-model="form.mobile" :maxlength="11" class="formInput" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="form.sex" class="formInput">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职位：" prop="position">
            <el-input v-model="form.position" :maxlength="50" class="formInput" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="部门：" prop="departmentIdList">
            <DepartmentSelect v-model="form.departmentIdList" class="formInput" multiple />
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" :maxlength="50" class="formInput" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="角色：" prop="roleIdList">
            <RoleSelect v-model="form.roleIdList" multiple allow-root class="formInput" />
          </el-form-item>
          <el-form-item label="身份证号：" prop="identityCardNumber">
            <el-input v-model="form.identityCardNumber" :maxlength="50" class="formInput" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="生日：" prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择生日"
              value-format="yyyy-MM-dd"
              class="formInput"
            />
          </el-form-item>
          <el-form-item label="微信：" prop="wechatNumber">
            <el-input v-model="form.wechatNumber" :maxlength="50" class="formInput" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="QQ：" prop="qqNumber">
            <el-input v-model.number="form.qqNumber" :maxlength="50" class="formInput" />
          </el-form-item>
          <el-form-item label="就业日期：" prop="jobDate">
            <el-date-picker
              v-model="form.jobDate"
              type="date"
              placeholder="选择就业日期"
              value-format="yyyy-MM-dd"
              class="formInput"
            />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="入职时间：" prop="entryDate">
            <el-date-picker
              v-model="form.entryDate"
              type="date"
              placeholder="选择入职日期"
              value-format="yyyy-MM-dd"
              class="formInput"
            />
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="form.remark" :maxlength="50" style="width: 300px" type="textarea" placeholder="备注" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!isAdd && !form.companyAdminFlag" type="danger" @click="handleDelete">删 除</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
        <el-button v-if="isAdd" type="primary" @click="handleSave(false)">保存并继续添加</el-button>
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DepartmentSelect from '../../departmentUser/components/DepartmentSelect'
import RoleSelect from '../../departmentUser/components/RoleSelect'
import Api from '../../../../api/system/departmentUser'
import AvatarCropper from 'vue-avatar-cropper'
import anyRules from '@/lib/anyRule'
import { filePreviewUrl } from '@/plugins/axios'
export default {
  name: 'FormAddUserDialog',
  components: { DepartmentSelect, RoleSelect, AvatarCropper },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      filePreviewUrl,
      selectUserId: '',
      form: {
        headImage: null,
        loginName: '',
        mobile: '',
        roleIdList: []
      },
      formRule: {
        loginName: !this.id
          ? [
              { required: true, message: '请输入用户名' },
              { pattern: anyRules.loginName, message: '用户名6-20位字母、数字、下划线' }
            ]
          : [],
        realName: [
          { required: true, message: '请输入真实姓名' },
          { pattern: anyRules.realName, message: '真实姓名格式不对' }
        ],
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: anyRules.mobile, message: '请输入正确的手机号' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        departmentIdList: [{ required: true, message: '请选择部门', trigger: 'change' }],
        email: [{ pattern: anyRules.email, message: '请输入正确的邮箱' }],
        identityCardNumber: [{ pattern: anyRules.identityNumber, message: '请输入正确的身份证号' }],
        qqNumber: [{ pattern: anyRules.qq, message: '请输入正确的qq号' }]
      }
    }
  },
  computed: {
    isAdd() {
      return !this.id
    }
  },
  created() {
    if (this.id) {
      this.getUserInfo()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    handleClear() {
      this.selectUserId = ''
      this.form = {
        departmentIdList: this.departmentIdList
      }
    },
    async getUserInfo(id) {
      const res = await Api.getUserInfo(id || this.id)
      const departmentIds = res.data.departmentList && res.data.departmentList.map(item => item.departmentId)
      const roleIds = res.data.departmentList && res.data.roleList.map(item => item.roleId)
      this.form = { ...res.data, departmentIdList: departmentIds, roleIdList: roleIds }
    },
    handleUploaded(res) {
      this.form.headImage = res.data
    },
    async handleSave(toNext = true) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            await Api.addUser(this.form)
            this.$message.success('添加成功')
            if (!toNext) {
              this.$refs.form.resetFields()
              this.handleClear()
              return
            }
          } else {
            await Api.updateUser(this.form)
            this.$message.success('修改成功')
          }
          this.$emit('update:visible', false)
          this.$parent.refresh()
        } else {
          this.$message.error('请正确填写')
          return false
        }
      })
    },
    async handleDelete() {
      await this.$parent.remove([this.form])
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="less" scoped>
.formInput {
  width: 300px !important;
}
.dialogForm {
  padding: 10px 20px;
}
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
.selectItem {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;
}
.deleteIcon {
  color: red;
  font-weight: bolder;
  transform: scale(1.4);
  margin-right: 10px;
}
</style>
