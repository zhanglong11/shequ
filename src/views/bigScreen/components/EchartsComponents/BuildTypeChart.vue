<template>
  <BigCard :icon="require('../../images/title/title4.png')" title="建筑类别">
    <EchartsBar
      v-if="buildType"
      id="buildingCategoryBar"
      :isLegend="false"
      :xAxis="xAxis"
      :dataList="[
        [
          buildType.liveCount || 0,
          buildType.publicCount || 0,
          buildType.industryCount || 0,
          buildType.agricultureCount || 0
        ]
      ]"
    />
  </BigCard>
</template>

<script>
import BigCard from '../BigCard' // 卡片
import EchartsBar from '../EchartsBar' // 柱状图
import Api from '../../api/home'
export default {
  components: {
    BigCard,
    EchartsBar
  },
  data() {
    // 这里存放数据
    return {
      xAxis: ['居住建筑', '公共建筑', '工业建筑', '农业建筑'],
      buildType: ''
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getGridBuildType()
  },
  // 方法集合
  methods: {
    // 建筑类别
    async getGridBuildType() {
      const result = await Api.getGridBuildType()
      const datas = result.data
      this.buildType = datas
    }
  }
}
</script>
