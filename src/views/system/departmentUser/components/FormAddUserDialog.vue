<template>
  <div>
    <el-dialog title="添加成员" :visible="visible" width="400px" append-to-body @close="$emit('update:visible', false)">
      <el-form ref="form" label-width="80px">
        <el-form-item label="当前部门">
          <span>{{ departmentName }}</span>
        </el-form-item>
        <el-form-item label="选择人员" prop="loginName">
          <UserSelect v-model="selectUserId" :name.sync="selectUserName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSave">确定</el-button>
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from '@/api/system/departmentUser'
import UserSelect from '../../user/components/select-user'
export default {
  name: 'FormAddUserDialog',
  components: { UserSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    departmentId: {
      type: String,
      default: null
    },
    departmentName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      userList: [],
      selectUserId: '',
      selectUserName: '',
      id: ''
    }
  },
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async handleSave() {
      await Api.changeUserDepartmentBind({
        departmentIdList: [this.departmentId],
        userIdList: [this.selectUserId],
        userNameList: [this.selectUserName]
      })
      this.$message.success('添加成功')
      this.$emit('submit')
    }
  }
}
</script>
<style lang="less" scoped></style>
