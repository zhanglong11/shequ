<template>
  <BigCard :icon="require('../../images/title/title8.png')" title="重点区域">
    <EchartsBarHorizontal
      v-if="keyRegionInfo.yAxis"
      id="keyAreasBar"
      :isLegend="false"
      :yAxis="keyRegionInfo.yAxis"
      :dataList="keyRegionInfo.dataList"
    />
  </BigCard>
</template>

<script>
import BigCard from '../BigCard' // 卡片
import EchartsBarHorizontal from '../EchartsBarHorizontal' // 水平柱状图
import Api from '../../api/home'
export default {
  components: {
    BigCard,
    EchartsBarHorizontal
  },
  data() {
    // 这里存放数据
    return {
      keyRegionInfo: {
        yAxis: '',
        dataList: []
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getGridKeyRegionInfo()
  },
  // 方法集合
  methods: {
    // 重点区域
    async getGridKeyRegionInfo() {
      const result = await Api.getGridKeyRegionInfo()
      const datas = result.data
      const yAxis = []
      const dataList = [[]]
      datas.forEach(e => {
        yAxis.push(e.typeName)
        dataList[0].push({
          name: e.typeName,
          value: e.count
        })
      })
      console.log(111, this.keyRegionInfo)
      this.keyRegionInfo = {
        yAxis,
        dataList
      }
    }
  }
}
</script>
