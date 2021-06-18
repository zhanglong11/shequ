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
            <el-col :span="8">
              <DetailItem label="当前积分" labelWidth="120"
                ><strong style="color: green">{{ info.score }}</strong></DetailItem
              >
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="common-card mt20">
        <div class="common-card-title">
          <span class="title-content">积分记录</span>
          <span class="title-opt">
            总扣除<strong style="margin-left: 3px; color: green">{{ info.deductScore }}</strong>
          </span>
        </div>
        <div class="common-card-body">
          <div>
            <vxe-table ref="xTable" :data="info.complains" auto-resize border stripe show-overflow="tooltip">
              <vxe-table-colgroup title="投诉申诉">
                <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                <vxe-table-column field="code" title="投诉单号" width="200"></vxe-table-column>
                <vxe-table-column field="content" title="投诉内容" min-width="180"></vxe-table-column>
                <vxe-table-column field="score" title="扣分" width="120"></vxe-table-column>
                <vxe-table-column field="updateTime" title="扣分时间" width="180"></vxe-table-column>
              </vxe-table-colgroup>
            </vxe-table>
          </div>
          <div class="mt20">
            <vxe-table ref="xTable" :data="info.polices" auto-resize border stripe show-overflow="tooltip">
              <vxe-table-colgroup title="物业巡查">
                <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                <vxe-table-column field="code" title="巡查单号" width="200"></vxe-table-column>
                <vxe-table-column field="name" title="巡查名称" min-width="180"></vxe-table-column>
                <vxe-table-column field="typeName" title="巡查类型" width="150"></vxe-table-column>
                <vxe-table-column field="score" title="扣分" width="120"></vxe-table-column>
                <vxe-table-column field="createTime" title="扣分时间" width="180"></vxe-table-column>
              </vxe-table-colgroup>
            </vxe-table>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
      <!--  <el-button type="primary">确定</el-button>-->
    </div>
  </div>
</template>

<script>
import Api from '../api'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'PropertyIntegralDetail',
  components: {},
  data() {
    // 这里存放数据
    return {
      id: this.$route.params.id || '',
      info: { complains: [], polices: [] }
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
      const res = await Api.getIntegralDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>
<style lang="less" scoped></style>
