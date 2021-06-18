<template>
  <div class="container-margin">
    <div class="wrapper">
      <div class="left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>组织架构</span>
            <el-button style="float: right; padding: 3px 0" type="text" />
          </div>
          <div>
            <el-tree
              ref="tree"
              :data="treeData"
              node-key="id"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ data }" class="custom-tree-node">
                <span>{{ data.name }}({{ data.userNum }})</span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card v-show="selectTreeId" class="rightContent">
          <header slot="header">
            <div class="name">{{ selectTreeData.name }}</div>
            <el-button
              v-if="$hasPower('SystemDepartmentUserEdit')"
              plain
              type="primary"
              size="mini"
              @click="dialogEditFormVisible = true"
              >编辑</el-button
            >
          </header>
          <div style="margin-bottom: 10px"><i class="el-icon-user-solid" />部门成员</div>
          <div class="buttonWrapper">
            <div>
              <el-button
                v-if="$hasPower('SystemDepartmentUserAdd')"
                type="primary"
                size="mini"
                @click="
                  () => {
                    isAdd = true
                    dialogAddUserFormVisible = true
                  }
                "
              >
                添加成员
              </el-button>
              <el-button v-if="$hasPower('SystemDepartmentUserUpdate')" size="mini" @click="handleAdjustUserDepartment"
                >调整部门</el-button
              >
            </div>
            <div>
              <el-button
                v-if="$hasPower('SystemDepartmentUserDelete')"
                :disabled="!selectRows.length"
                type="danger"
                size="mini"
                @click="() => handleDelete()"
                >移除成员</el-button
              >
            </div>
          </div>
          <div class="tableWrapper">
            <vxe-table
              ref="xTable"
              resizable
              auto-resize
              :border="false"
              :data="tableData"
              :checkbox-config="{
                highlight: false,
                showHeader: true
              }"
              @checkbox-change="selectChangeEvent"
              @checkbox-all="handleCheckAll"
            >
              <vxe-table-column type="checkbox" width="50px" />
              <vxe-table-column field="realName" title="姓名" align="left">
                <template slot-scope="{ row }">
                  <span>{{ row.realName }}</span>
                  <el-tag v-if="!!row.principalFlag" size="mini" style="margin-left: 5px">主管</el-tag>
                </template>
              </vxe-table-column>
              <vxe-table-column field="position" title="职位" />
              <vxe-table-column
                field="roleTexts"
                title="角色"
                :formatter="({ cellValue }) => cellValue && cellValue.join(',')"
              />
              <vxe-table-column field="mobile" title="手机" />
              <vxe-table-column field="email" title="邮箱" />
              <vxe-table-column field="aa" title="操作" width="120">
                <template #default="{ row }">
                  <el-button
                    type="primary"
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
            </vxe-table>
          </div>
        </el-card>
        <el-card v-if="!selectTreeId" class="no-data">
          <p>请选择部门</p>
        </el-card>
      </div>
    </div>
    <UserDetail :id="activeUserId" :visible.sync="detailDialogVisible" />
    <FormEditDialog
      v-if="dialogEditFormVisible"
      :form-info="selectTreeData"
      :visible.sync="dialogEditFormVisible"
      @submit="handleEditSubmit"
    />
    <FormEditParentDialog
      v-if="dialogEditParentFormVisible"
      :form-info="selectTreeData"
      :visible.sync="dialogEditParentFormVisible"
      @submit="handleEditParentSubmit"
    />
    <FormAddUserDialog
      v-if="dialogAddUserFormVisible"
      :department-id="selectTreeId"
      :department-name="selectTreeData.name"
      :visible.sync="dialogAddUserFormVisible"
      @submit="handleEditUserSubmit"
    />
  </div>
</template>

<script>
import Api from '@/api/system/departmentUser'
import FormEditDialog from './components/FormEditDialog'
import FormEditParentDialog from './components/FormEditParentDialog'
import FormAddUserDialog from './components/FormAddUserDialog'
import UserDetail from '../user/components/user-detail'
import { getUserList } from '@/api/system/user'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'SystemDepartmentUser',
  components: {
    FormEditDialog,
    FormEditParentDialog,
    FormAddUserDialog,
    UserDetail
  },
  data() {
    // 这里存放数据
    return {
      treeData: [],
      tableData: [],
      dialogEditFormVisible: false,
      dialogEditParentFormVisible: false, // 调整部门
      dialogAddUserFormVisible: false, // 添加成员
      detailDialogVisible: false, // 用户详情弹窗
      isAdd: true,
      selectTreeId: '',
      selectTreeData: {},
      selectRows: [],
      selectRow: {},
      activeUserId: '',
      deleteId: '', // 编辑成员删除传递的id,
      isRoot: true // 判断树的根节点,是公司还是部门
    }
  },
  created() {
    this.getTreeData()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async getTreeData() {
      const res = await Api.getDepartment([])
      if (res.data[0]) {
        res.data[0].isRoot = true
      }
      this.treeData = res.data
    },
    async getTableData() {
      if (!this.selectTreeId) {
        this.tableData = []
      } else {
        const res = await getUserList({ departmentId: this.selectTreeId, page: 1, rows: 10000 })
        this.tableData = res.data.records
      }
    },
    handleNodeClick(data) {
      this.isRoot = !!data.isRoot
      this.selectTreeId = data.id
      this.selectTreeData = data
      this.getTableData()
    },
    selectChangeEvent({ records }) {
      this.selectRows = [...records]
    },
    // 编辑部门提交事件
    async handleEditSubmit(data) {
      await Api.editOneDepartment(data)
      this.dialogEditFormVisible = false
      await this.getTreeData()
      this.$refs.tree.setCurrentKey(this.selectTreeId)
      await this.getTableData()
    },
    handleAdjustUserDepartment() {
      if (!this.selectRows.length) {
        this.$message.error('请选择一个成员再操作')
        return
      }
      this.dialogEditParentFormVisible = true
    },
    // 编辑选择人员的部门
    async handleEditParentSubmit(data) {
      const Ids = this.selectRows.map(item => item.id)
      const names = this.selectRows.map(item => item.realName)
      await Api.editUserDepartment({ ...data, userIdList: Ids, userNameList: names })
      this.dialogEditParentFormVisible = false
      await this.getTreeData()
      this.$refs.tree.setCurrentKey(this.selectTreeId)
      await this.getTableData()
    },
    // 添加/查看人员
    async handleEditUserSubmit() {
      this.dialogAddUserFormVisible = false
      await this.getTreeData()
      this.$refs.tree.setCurrentKey(this.selectTreeId)
      await this.getTableData()
    },
    async handleDelete() {
      await Api.deleteUserDepartment(this.selectTreeId, _.map(this.selectRows, 'id')).then(res => {
        this.$message.success('移除成功')
        this.getTableData()
      })
    },
    // 删除部门
    async handleDeleteDepartment(id) {
      const res = await this.$confirm('此操作将删除所选部门吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      if (!res) return
      await Api.deleteDepartment([id])
      this.$message.success('删除成功')
      await this.getTreeData()
    },
    handleCheckAll({ records }) {
      this.selectRows = records
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  height: 100%;
  .left {
    width: 400px;
    border-right: none;
    padding: 0 10px 0 0;
    /deep/ .el-card {
      height: 100%;
      .el-card__header {
        padding: 10px 20px;
      }
      .el-card__body {
        height: calc(100% - 39px);
        overflow: auto;
      }
    }
  }
  .right {
    flex: 1;
    overflow: auto;
    .rightContent {
      height: 100%;
      display: flex;
      flex-direction: column;
      /deep/ .el-card__header {
        padding: 8px 15px;
      }
      /deep/ .el-card__body {
        padding: 15px;
      }
      header {
        display: flex;
        align-items: center;
        .name {
          margin-right: 15px;
        }
      }
      .buttonWrapper {
        display: flex;
        height: 40px;
        padding: 5px 10px;
        background-color: #eceff4;
        justify-content: space-between;
        align-items: center;
        /deep/ .el-button {
          width: 100px;
        }
      }
      .tableWrapper {
        overflow: auto;
        max-height: calc(100vh - 245px);
        margin-top: 10px;
      }
    }
  }
}
.no-data {
  height: 100%;
  /deep/.el-card__body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
  }
}
</style>
