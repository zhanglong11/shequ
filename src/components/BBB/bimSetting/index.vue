<template>
  <div class="container">
    <div class="header">
      <span />
      <h3>设置</h3>
      <i class="close el-icon-close" @click="$parent.showSetting" />
    </div>
    <section>
      <div>
        <span class="label">亮度</span>
        <span class="val">
          <el-slider v-model="bright" :max="1" :step="0.01" :show-tooltip="false" @input="changeBright"
        /></span>
      </div>
      <div>
        <span class="label">经度</span>
        <span class="val">
          <el-slider v-model="latitude" :max="Math.PI" :step="0.01" :show-tooltip="false" @input="changeLatitude"
        /></span>
      </div>
      <div>
        <span class="label">纬度</span>
        <span class="val">
          <el-slider v-model="longitude" :max="Math.PI * 2" :step="0.01" :show-tooltip="false" @input="changeLongitude"
        /></span>
      </div>
      <div>
        <span class="label">阴影</span>
        <span class="val">
          <el-switch v-model="shadow" @change="changeShadow" />
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BimSetting',
  // import引入的组件
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      bright: 0.5,
      latitude: 1,
      longitude: 1,
      shadow: false
    }
  },
  // 生命周期 - 挂载完成
  created() {},
  // 方法集合
  methods: {
    //刷新
    refresh() {},
    changeBright(val) {
      this.bright = val
      bimfishModeloApp.shadowBrightness(val)
    },
    changeLatitude(val) {
      bimfishModeloApp.shadowRange(val)
    },
    changeLongitude(val) {
      bimfishModeloApp.shadowRangeLong(val)
    },
    changeShadow(val) {
      bimfishModeloApp.shadowButton(val)
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.container {
  background-color: #f6f6f6;
  width: 280px;
  border-radius: 4px;
  box-shadow: 0 1px 7px 0 rgb(0 0 0 / 17%);
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
  > section {
    height: 230px;
    overflow: auto;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      .label {
        width: 100px;
      }
      .val {
        width: 90%;
      }
    }
  }
}
</style>
