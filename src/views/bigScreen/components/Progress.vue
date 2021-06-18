<template>
  <div class="progress">
    <div class="progress-item">
      <div class="progress-title">
        <span class="number">{{ getPercentage(dataList[0].value, dataList[1].value) }}%({{ dataList[0].value }})</span>
        <span class="title">{{ dataList[0].label }}</span>
      </div>
      <div class="progress-con">
        <div :style="`width: ${getPercentage(dataList[0].value, dataList[1].value)}%`" class="progress-line"></div>
      </div>
    </div>
    <div class="progress-item progress-right">
      <div class="progress-title">
        <span class="title">{{ dataList[1].label }}</span>
        <span class="number">{{ getPercentage(dataList[1].value, dataList[0].value) }}%({{ dataList[1].value }})</span>
      </div>
      <div class="progress-con">
        <div :style="`width: ${getPercentage(dataList[1].value, dataList[0].value)}%`" class="progress-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    // 这里存放数据
    return {}
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    // 获取百分比
    getPercentage(a, b) {
      return Math.round((a / (a + b)) * 100)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.progress {
  margin: 10% 0;
  display: flex;
  align-items: center;
  color: #333;
  .progress-item {
    padding: 0 1px;
    flex: 1;
    .progress-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .number {
        font-weight: bold;
        color: $bigScreenColor;
      }
      .title {
        padding: 0 4px;
        font-size: 14px;
        color: #333;
      }
    }
    .progress-con {
      background: #dadada;
      border-radius: 4px;
      height: 6px;
      position: relative;
      .progress-line {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        background: $bigScreenColor;
        border-radius: 4px;
      }
    }
    &.progress-right {
      .progress-title {
        .number {
          color: $bigScreenDangerColor;
        }
      }
      .progress-con {
        .progress-line {
          right: initial;
          left: 0;
          background: $bigScreenDangerColor;
        }
      }
    }
  }
}
</style>
