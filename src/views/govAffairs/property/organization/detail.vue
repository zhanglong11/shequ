<template>
  <div class="container has-footer">
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
                  <DetailItem label="物业名称" labelWidth="120" :value="info.name"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="物业负责人" labelWidth="120" :value="info.director"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="联系电话" labelWidth="120" :value="info.phone"></DetailItem>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <DetailItem label="物业位置" labelWidth="120" :value="info.address"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="备注" labelWidth="120" :value="info.remark"></DetailItem>
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
              <MapPoint :name.sync="info.name" :markerPosition.sync="info.location" style="height: 500px"></MapPoint>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="员工信息" name="user">
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
              <el-button class="no-padding" type="text" @click="handleDetail(row)">查看详情</el-button>
            </template>
          </vxe-table-column>
        </Grid>
      </el-tab-pane>
    </el-tabs>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
      <!-- <el-button type="primary">确定</el-button>-->
    </div>
    <UserDetailDialog v-if="detailVisible" :visible.sync="detailVisible" :info="selectRow"></UserDetailDialog>
  </div>
</template>

<script>
import Api from '../api'
import UserDetailDialog from './componnets/UserDetailDialog'
import MapPoint from '@/views/govAffairs/compositeGovern/component/MapPoint'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyOrganizationDetail',
  components: { UserDetailDialog, MapPoint },
  data() {
    // 这里存放数据
    return {
      id: this.$route.params.id || '',
      activeName: 'basic',
      request: Api.getOrganizationUserList,
      userFilterForm: { propertyId: this.$route.params.id },
      info: {},
      selectRow: {},
      detailVisible: false
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
      this.info = { ...res.data }
    },
    handleDetail(row) {
      this.selectRow = { ...row }
      this.detailVisible = true
    },
    handleClick() {}
  }
}
</script>
<style lang="less" scoped></style>
