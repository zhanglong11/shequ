<template>
  <BigCard :icon="require('../../images/title/title6.png')" title="重点人员">
    <EchartsPie v-if="keyPersonInfo" id="personnelPie" :dataList="keyPersonInfo" />
  </BigCard>
</template>

<script>
import BigCard from '../BigCard' // 卡片
import EchartsPie from '../EchartsPie' // 环形图
import Api from '../../api/home'
export default {
  components: {
    BigCard,
    EchartsPie
  },
  data() {
    // 这里存放数据
    return {
      keyPersonInfo: ''
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getGridKeyPersonInfo()
  },
  // 方法集合
  methods: {
    // 重点人员
    async getGridKeyPersonInfo() {
      const result = await Api.getGridKeyPersonInfo()
      const datas = result.data
      const list = []
      for (const key in datas) {
        const item = datas[key]
        list.push({
          name: key,
          value: item
        })
      }
      this.keyPersonInfo = list
    }
  }
}
</script>
