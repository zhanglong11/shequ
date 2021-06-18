<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-tabs v-model="activeName" :before-leave="handleChangeTab" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="basic">
            <div>
              <div class="common-card">
                <div class="common-card-title">
                  <span class="title-content">基本信息</span>
                  <span class="title-opt">
                    <el-button type="text"></el-button>
                  </span>
                </div>
                <div class="common-card-body">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="物业名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="物业负责人" prop="director">
                        <el-input v-model="form.director"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="物业位置" prop="address">
                        <el-input v-model="form.address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="common-card">
                <div class="common-card-title">
                  <span class="title-content">地图定位</span>
                  <span class="title-opt">
                    <el-button type="text"></el-button>
                  </span>
                </div>
                <div class="common-card-body">
                  <MapPoint
                    :name.sync="form.name"
                    :markerPosition.sync="form.location"
                    edit
                    style="height: 500px"
                  ></MapPoint>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="员工信息" name="user" lazy>
            <div>
              <div class="common-card">
                <div class="common-card-title">
                  <span class="title-content">员工列表</span>
                  <span class="title-opt">
                    <el-button type="text" icon="el-icon-plus" @click="addUser">添加员工</el-button>
                  </span>
                </div>
                <div class="common-card-body">
                  <Grid
                    ref="userTable"
                    :request="request"
                    :filter-form.sync="userFilterForm"
                    border
                    stripe
                    show-overflow="tooltip"
                  >
                    <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                    <vxe-table-column field="name" title="姓名" min-width="150"></vxe-table-column>
                    <vxe-table-column field="sex" title="性别" width="120">
                      <template #default="{ row }">
                        {{ row.sex === 0 ? '女' : '男' }}
                      </template>
                    </vxe-table-column>
                    <vxe-table-column field="phone" title="联系电话" width="180"></vxe-table-column>
                    <vxe-table-column field="position" title="岗位" width="120"></vxe-table-column>
                    <vxe-table-column field="remark" title="备注" min-width="180"></vxe-table-column>
                    <vxe-table-column title="操作" width="200">
                      <template #default="{ row }">
                        <el-button class="no-padding" type="text" @click="handleEdit(row)">编辑</el-button>
                        <el-button class="no-padding" type="text" @click="handleDelete(row)">删除</el-button>
                        <el-button class="no-padding" type="text" @click="handleDetail(row)">查看详情</el-button>
                      </template>
                    </vxe-table-column>
                  </Grid>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <AddUserDialog
        v-if="addVisible"
        :visible.sync="addVisible"
        :info="selectRow"
        @submit="handleUserSubmit"
      ></AddUserDialog>
      <UserDetailDialog v-if="detailVisible" :visible.sync="detailVisible" :info="selectRow"></UserDetailDialog>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import AddUserDialog from './componnets/AddUserDialog'
import UserDetailDialog from './componnets/UserDetailDialog'
import MapPoint from '@/views/govAffairs/compositeGovern/component/MapPoint'
import anyRule from '@/lib/anyRule'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyOrganizationAdd',
  components: { AddUserDialog, UserDetailDialog, MapPoint },
  data() {
    // 这里存放数据
    return {
      id: this.$route.params.id || '',
      activeName: this.$route.query.activeName || 'basic',
      form: { location: '' },
      request: Api.getOrganizationUserList,
      userFilterForm: { propertyId: this.$route.params.id || '' },
      addVisible: false,
      selectRow: {},
      selectRowIndex: null,
      detailVisible: false,
      rules: {
        name: [{ required: true, message: '必填' }],
        director: [{ required: true, message: '必填' }],
        phone: [
          { required: true, message: '必填' },
          { pattern: anyRule.mobile, message: '不合法' }
        ],
        address: [{ required: true, message: '必填' }],
        remark: [{ required: true, message: '必填' }]
      }
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async getDetail() {
      const res = await Api.getOrganizationDetail(this.id)
      this.form = { ...res.data }
    },
    refreshUser() {
      this.$refs.userTable.refresh()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChangeTab(activeName, oldActiveName) {
      if (oldActiveName === 'basic') {
        if (!this.id) {
          this.$message.warning('请先提交基本信息')
          return false
        }
      }
    },
    addUser() {
      this.selectRow = {}
      this.selectRowIndex = null
      this.addVisible = true
    },
    handleEdit(row, index) {
      this.selectRow = { ...row }
      this.selectRowIndex = index
      this.addVisible = true
    },
    async handleDelete(row) {
      await Api.deleteOrganizationUserById([row.id])
      this.$message.success('删除成功')
      await this.refreshUser()
    },
    handleDetail(row) {
      this.selectRow = { ...row }
      this.detailVisible = true
    },
    // 编辑或新加员工
    async handleUserSubmit(data) {
      if (this.selectRowIndex !== null) {
        await Api.updateOrganizationUser({ ...data })
        this.$message.success('修改成功')
      } else {
        await Api.addOrganizationUser({ ...data, propertyId: this.id })
        this.$message.success('添加成功')
      }
      this.addVisible = false
      await this.refreshUser()
    },
    async submit() {
      if (this.activeName === 'basic') {
        await this.$refs.form.validate()
        if (!this.id) {
          const res = await Api.addOrganization(this.form)
          this.$message.success('创建成功')
          this.userFilterForm.propertyId = res.data
          this.id = res.data
        } else {
          await Api.updateOrganization(this.form)
          this.$message.success('修改成功')
        }
        this.activeName = 'user'
      } else {
        await this.$back()
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
