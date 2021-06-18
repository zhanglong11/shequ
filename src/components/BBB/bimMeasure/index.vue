<template>
  <div class="container">
    <header class="header"><span>测量</span> <i class="close el-icon-close" @click="$parent.endMeasure" /></header>
    <div>
      <!--      <p>{{ meaSureData }}</p>-->
      <el-select v-model="unitVal" placeholder="请选择" @change="changeUnit">
        <el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BimMeasure',
  // import引入的组件
  components: {},
  props: { measureData: {} },
  data() {
    // 这里存放数据
    return {
      unitVal: '',
      unit: [
        {
          value: '0',
          label: 'm'
        },
        {
          value: '1',
          label: 'cm'
        },
        {
          value: '2',
          label: 'feet'
        },
        {
          value: '3',
          label: 'inches'
        }
      ]
    }
  },
  computed: {
    meaSureData() {
      return '1111'
      return this.measureData.distance.toFixed(2) || ''
    }
  },
  // 生命周期 - 挂载完成
  created() {},
  // 方法集合
  methods: {
    //刷新
    refresh() {},
    changeUnit(val) {
      this.unitVal = val
      bimfishModeloApp.setMeasureUnit(val)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background-color: #f6f6f6;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 17%);
  .header {
    display: flex;
    width: 200px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dedede;
    padding: 4px 8px;
    .close {
      cursor: pointer;
    }
  }
}
</style>
