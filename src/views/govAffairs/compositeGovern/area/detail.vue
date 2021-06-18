<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
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
              <DetailItem label="所属网格" labelWidth="120" :value="info.orgName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="重点区域名称" labelWidth="120" :value="info.name"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="区域类型" labelWidth="120" :value="info.typeName"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="区域负责人" labelWidth="120" :value="info.principalName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="联系电话" labelWidth="120" :value="info.principalMobile"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="备注" labelWidth="120" :value="info.remark"></DetailItem>
            </el-col>
          </el-row>
        </div>
        <div class="common-card mt10">
          <div class="common-card-title">
            <span class="title-content">地图定位</span>
            <span class="title-opt">
              <el-button type="text"></el-button>
            </span>
          </div>
          <div class="common-card-body">
            <MapPoint
              :gridInfo="gridInfo"
              :name.sync="info.name"
              :markerPosition.sync="info.location"
              style="height: 500px"
            ></MapPoint>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>
<script>
import Api from '../api'
import { getOrganizationById } from '@/api/grid/department'
import MapPoint from '../component/MapPoint'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CompositeGovernAreaDetail',
  components: { MapPoint },
  data() {
    // 这里存放数据
    return {
      id: this.$route.params.id || '',
      info: {},
      gridInfo: {}
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
      const res = await Api.getAreaDetail(this.id)
      this.info = { ...res.data }
      const gridRes = await getOrganizationById(this.info.orgId)
      this.gridInfo = gridRes.data || {}
    }
  }
}
</script>
<style lang="less" scoped></style>
