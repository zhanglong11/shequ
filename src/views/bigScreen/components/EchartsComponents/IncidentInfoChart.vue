<template>
  <BigCard :icon="require('../../images/title/title5.png')" title="事件统计">
    <EchartsBar
      v-if="incidentInfo.xAxis"
      id="eventStatisticsBar"
      :xAxis="incidentInfo.xAxis"
      :dataList="incidentInfo.dataList"
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
      incidentInfo: {
        xAxis: '',
        dataList: []
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getGridIncidentInfo()
  },
  // 方法集合
  methods: {
    // 事件统计
    async getGridIncidentInfo() {
      const result = await Api.getGridIncidentInfo()
      const datas = result.data
      const xAxis = []
      const dataList = [[], []]
      for (const key in datas) {
        const item = datas[key]
        xAxis.push(key)
        dataList[0].push(item.beProcessedCount)
        dataList[1].push(item.processedCount)
      }
      this.incidentInfo = {
        xAxis,
        dataList
      }
    }
  }
}
</script>
