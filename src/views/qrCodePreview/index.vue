<template>
  <div class="details">
    <div class="uni-header">
      <span class="uni-header-title">{{ title }}</span>
    </div>
    <h1 class="title" v-text="info.title"></h1>
    <div class="type-con">
      <span class="type"> {{ info.parentTypeName ? info.parentTypeName + ' - ' : '' }}{{ info.typeName }} </span>
      <span class="time">{{ info.createTime }}</span>
    </div>

    <div v-if="info.labels" class="desc-item">
      <div class="tags">
        <span
          v-for="(tag, j) in info.labels"
          :key="j"
          class="tag"
          :style="`background-color:${tag.backGroundColor};color:${tag.color}`"
          :backGroundColor="tag.backGroundColor"
        >
          {{ tag.label }}
        </span>
      </div>
    </div>
    <div v-if="info.surfacePlot" class="focus-img">
      <el-image style="width: 100%; height: 140px" fit="cover" :src="info.surfacePlot | imgUrl" />
    </div>
    <div class="details-content" v-html="info.content"></div>
    <div v-if="info.fileIds" class="files-list">
      <p>附件：</p>
      <FileList :ids="info.fileIds" :isDownload="false"></FileList>
    </div>
  </div>
</template>

<script>
import Api from './api'
import ColorHash from 'color-hash' // 随机颜色插件
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      id: this.$route.query.id || '',
      type: this.$route.query.type || '',
      title: this.$route.query.title || '公告详情',
      info: {}
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  // 方法集合
  methods: {
    // 初始化
    init() {
      this.getDetails()
    },
    // 获取详情
    async getDetails() {
      if (!this.id) {
        return
      }
      let result = ''
      if (!this.type) {
        result = await Api.getNotification(this.id)
      }
      if (this.type === 'thePublicGuide') {
        result = await Api.getThePublicGuide(this.id)
      }
      if (this.type === 'study') {
        result = await Api.getPartyStudy(this.id)
      }
      const datas = result.data || {}
      const labels = []
      const labelList = datas.label ? datas.label.split(',') : []
      labelList.forEach(f => {
        const colorHash = new ColorHash()
        const colors = colorHash.rgb(f)
        const color = `rgba(${colors.join(',')})`
        const backGroundColor = `rgba(${colors.join(',')}, 0.15)`
        labels.push({
          label: f,
          backGroundColor,
          color
        })
      })
      datas.labels = labels
      this.info = datas
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
