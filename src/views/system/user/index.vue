<template>
  <div class="container-margin main">
    <el-card>
      <div class="tooltips">
        <el-form inline>
          <el-form-item label="姓名">
            <el-input v-model="filterForm.realName" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="filterForm.loginName" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="filterForm.mobile" />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="() => $refs.table.reset()">重置</el-button>
            </el-button-group>
          </el-form-item>
          <br />
          <div>
            <el-button
              v-if="$hasPower('SystemUserAdd')"
              icon="el-icon-plus"
              type="primary"
              plain
              @click.native="
                () => {
                  activeUserId = null
                  editDialogVisible = true
                }
              "
              >新建员工</el-button
            >
            <el-button
              v-if="$hasPower('SystemUserChangeAdmin')"
              type="primary"
              plain
              @click="changeAdminDialogVisible = true"
              >变更管理员</el-button
            >
            <el-button
              v-if="$hasPower('SystemUserResetPassword')"
              type="primary"
              plain
              :disabled="!selectedUserList.length"
              @click="resetPassword(selectedUserList)"
              >重置密码</el-button
            >
            <el-button
              v-if="$hasPower('SystemUserDelete')"
              type="primary"
              plain
              :disabled="!selectedUserList.length"
              @click="remove(selectedUserList)"
              >删除</el-button
            >
          </div>
        </el-form>
      </div>
      <Grid
        ref="table"
        :checkbox-config="{ highlight: true, reserve: false, range: true, checkMethod }"
        :filter-form.sync="filterForm"
        :request="request"
        @checkboxChange="handleTableSelectionChange"
      >
        <vxe-table-column type="checkbox" width="55" />
        <vxe-table-column title="姓名" field="realName" width="160px">
          <template #default="{ row }">
            <div style="display: flex; align-items: center">
              <el-avatar :size="30" :src="row.headImage || '/img/avatar.png'" style="margin-right: 10px" />
              <span>{{ row.realName }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column title="用户名" field="loginName" width="200px" />
        <vxe-table-column title="手机号" field="mobile" width="120px" />
        <vxe-table-column
          title="性别"
          field="sex"
          width="80px"
          :formatter="({ cellValue }) => ['保密', '男', '女'][cellValue]"
        />
        <vxe-table-column
          title="部门"
          field="departmentList"
          :formatter="({ row }) => (row.departmentList || []).map(e => e.departmentName).join(',')"
        />
        <vxe-table-column title="职位" field="position" width="200px" />
        <vxe-table-column title="角色" field="roleTexts" />
        <vxe-table-column title="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="$hasPower('SystemUserEdit')"
              type="text"
              @click="
                () => {
                  activeUserId = row.id
                  editDialogVisible = true
                }
              "
              >编辑</el-button
            >
            <el-button v-if="$hasPower('SystemUserDelete') && !row.companyAdminFlag" type="text" @click="remove([row])"
              >删除</el-button
            >
            <el-button
              v-if="$hasPower('SystemUserEDetail')"
              type="text"
              @click="
                () => {
                  activeUserId = row.id
                  detailDialogVisible = true
                }
              "
              >详情</el-button
            >
          </template>
        </vxe-table-column>
      </Grid>
    </el-card>
    <user-edit v-if="editDialogVisible" :id="activeUserId" :visible.sync="editDialogVisible" />
    <ChangeAdmin v-if="changeAdminDialogVisible" :visible.sync="changeAdminDialogVisible" />
    <UserDetail :id="activeUserId" :visible.sync="detailDialogVisible" />
  </div>
</template>

<script type="text/jsx">
import UserEdit from './components/user-edit'
import ChangeAdmin from './components/change-admin'
import UserDetail from './components/user-detail'
import { batchDeleteUser, getUserList, userResetPwd } from '@/api/system/user'

export default {
  name: 'SystemUser',
  // import引入的组件需要注入到对象中才能使用
  components: { UserEdit, ChangeAdmin, UserDetail },
  data() {
    // 这里存放数据
    return {
      activeUserId: null, // 编辑弹窗使用的用户id,
      activeDepartmentId: null, // 左侧树选中的节点
      editDialogVisible: false, // 编辑弹窗是否显示
      detailDialogVisible: false, // 详情弹窗是否显示
      linkUserToDepartmentDialogVisible: false, // 关联已有员工弹窗
      setRoleDialogVisible: false, // 设置角色弹窗
      changeAdminDialogVisible: false, // 变更管理员
      activeTabPaneName: '组织机构管理',
      departmentList: [],
      filterText: null, // 树筛选输入框
      filterForm: {
        realName: '',
        status: null
      },
      request(body) {
        return getUserList(body)
      },
      selectedUserList: [] // 被选中的用户列表
    }
  },
  computed: {
    departmentListWithCompanyName() {
      return [
        {
          label: this.$store.state.system.companyInfo.companyName,
          name: this.$store.state.system.companyInfo.companyName,
          children: this.departmentList, isRoot: true, id: 'root', value: 'root'
        }
      ]
    },
    companyAdminFlag() {
      return this.$store.state.user.companyAdminFlag
    }
  },
  watch: {
    // 监听书筛选输入框的变化
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    activeDepartmentId(val) {
      this.filterForm.departmentId = val === 'root' ? null : val
      this.refresh()
    }
  },
  mounted () {

  },
  // 方法集合
  methods: {
    // 刷新列表
    refresh() {
      this.$refs.table.refresh()
    },
    // 删除
    async remove(rows) {
      await this.$remove(rows, 'realName')
      await batchDeleteUser(_.map(rows,'id'))
      this.refresh()

    },
    // 选择人员
    handleTableSelectionChange(selection) {
      console.log(selection)
      this.selectedUserList = selection
    },
    // 重置密码
    resetPassword(userList) {
      const message = <div style='text-align:center'>
        <h4 style='font-weight:bold;font-size:16px;margin-bottom:10px'>是否确认重置密码？</h4>
        <p>重置后密码为123456</p>
      </div>
      this.$msgbox({
        title: '提示',
        message,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        customClass: 'reset-password-dialog'
      }).then(() => {
        this.userResetPwd(_.map(userList, 'id'))
      })
    },
    // 批量重置用户密码
    async userResetPwd(userList){
      await userResetPwd(userList)
      this.$message.success('重置密码成功')
    },
    checkMethod({ row }) {
      return !row.companyAdminFlag
    }
  }
}
</script>

<style scoped lang="less">
.main {
  padding: 0;
  .struct-row {
    align-items: stretch;
    .el-card {
      height: 100%;
    }
  }
  .struct-card {
    /deep/ .el-card__body {
      padding: 10px;
    }
  }
  .el-tree {
    font-size: 15px;
  }
}
.el-tree {
  /deep/ .is-current > .el-tree-node__content {
    background-color: #4b9cff;
    color: #fff;
  }
}
</style>
<style>
.reset-password-dialog {
  width: 300px;
}
</style>
