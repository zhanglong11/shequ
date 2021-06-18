<template>
  <div class="detail">
    <div class="header">
      <span />
      <h3>属性</h3>
      <i class="close el-icon-close" @click="$parent.closeDetail" />
    </div>
    <div class="bim-content">
      <div v-if="activeElementInfo[0]">
        <h6>标识数据</h6>
        <p v-for="(item, i) in activeElementInfo[0]" :key="i">
          <span class="label">{{ item.name }}</span> <span class="value">{{ item.strValue }}</span>
        </p>
      </div>
      <div v-if="activeElementInfo[3]">
        <h6>构造</h6>
        <p v-for="(item, i) in activeElementInfo[3]" :key="i">
          <span class="label">{{ item.name }}</span> <span class="value">{{ initDetailValue(item) }}</span>
        </p>
      </div>
      <div v-if="activeElementInfo[5]">
        <h6>材质和装饰</h6>
        <p v-for="(item, i) in activeElementInfo[5]" :key="i">
          <span class="label">{{ item.name }}</span> <span class="value">{{ initDetailValue(item) }}</span>
        </p>
      </div>
      <div v-if="activeElementInfo[19]">
        <h6>约束</h6>
        <p v-for="(item, i) in activeElementInfo[19]" :key="i">
          <span class="label">{{ item.name }}</span> <span class="value">{{ initDetailValue(item) }}</span>
        </p>
      </div>
      <div v-if="activeElementInfo[-1]">
        <h6>其他</h6>
        <p v-for="(item, i) in activeElementInfo[-1]" :key="i">
          <span class="label">{{ item.name }}</span> <span class="value">{{ initDetailValue(item) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BimModel',
  // import引入的组件
  components: {},
  props: {
    modelId: {},
    curId: {}
  },
  data() {
    // 这里存放数据
    return {
      activeElementInfo: {}
    }
  },
  watch: {
    curId() {
      this.getDetail()
    }
  },
  // 生命周期 - 挂载完成
  created() {
    this.getDetail()
  },
  // 方法集合
  methods: {
    //刷新
    refresh() {},
    //初始化
    initDetailValue(item) {
      if (item.strValue) {
        return item.strValue
      }
      if (!_.isNil(item.numValue)) {
        if (!item.numValue || !item.unit) {
          return item.numValue
        }
        if (item.unit === 'UT_LENGTH_FEET') {
          return `${item.numValue * 12} inches`
        }
        if (item.unit === 'UT_AREA_FEET_2') {
          return `${item.numValue * 114} inches`
        }
        if (item.unit === 'UT_AREA_FEET_3') {
          return `${item.numValue * 1728} inches`
        }
      }
    },
    async getDetail() {
      console.log(this.curId)
      this.activeElementInfo = {}
      await Modelo.BIM.getElementProperties(this.modelId, this.curId).then(resAry => {
        new Set(resAry.map(a => a.groupKey)).forEach(key => {
          this.activeElementInfo[key] = resAry.filter(a => a.groupKey === key)
        })
      })
      this.activeElementInfo = {
        ...this.activeElementInfo
      }
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.detail {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e3dfdf;
    .close {
      cursor: pointer;
    }
  }
  .bim-content {
    height: calc(100% - 50px);
    overflow-y: auto;
    > div + div {
      margin-top: 10px;
    }
    padding: 10px;
    h6 {
      font-size: 16px;
      font-weight: normal;
      padding: 4px 0;
      border-bottom: 1px solid #ddd;
    }
    p {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      color: #877f7f;
      font-size: 14px;
      > span {
        display: inline-block;
        overflow: hidden;
        word-break: break-word;
        vertical-align: top;
      }
      .label {
        text-align: left;
      }
      .value {
        width: 140px;
        text-align: right;
        color: #000;
        margin-left: 20px;
      }
    }
  }
}
</style>
