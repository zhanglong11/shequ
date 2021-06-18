<template>
  <div class="wrap">
    <div
      v-if="!noModel && !noModelId"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading bimModelMask"
      element-loading-background="rgba(255, 255, 255, 0.4)"
      class="container"
    >
      <div class="tree-wrap" :class="bimTreeVisible ? 'show' : ''">
        <BimTree ref="tree" :modelReady="isReady" :visible="bimTreeVisible" :modelId="modelId" />
      </div>
      <div id="cubeBox">
        <div class="front" />
        <div class="back" />
        <div class="top" />
        <div class="bottom" />
        <div class="left" />
        <div class="right" />
      </div>
      <div v-if="isMeasure" class="measure-wrap">
        <BimMeasure :measureData="measureData" />
      </div>
      <div v-if="detailVisible" class="detail-wrap">
        <BimDetail :modelId="modelId" :curId="curDetailId" />
      </div>
      <div class="setting-wrap" :class="isSetting ? 'show' : ''">
        <BimSetting v-if="isSetting" />
      </div>
      <div id="bimfishModelo" class="bimfishModeloApp" />
    </div>
    <div v-if="noModelId" class="no-data">暂无模型</div>
  </div>
</template>

<script>
import axios from 'axios'
import BimTree from '../bimTree'
import BimMeasure from '../bimMeasure'
import BimSetting from '../bimSetting'
import BimDetail from '../bimDetail'
import icon from './icon'
import localForage from 'localforage'
export default {
  name: 'BimView',
  // import引入的组件
  components: {
    BimTree,
    BimMeasure,
    BimSetting,
    BimDetail
  },
  props: {
    modelId: null,
    noModel: {
      default: false
    },
    // 模型背景色
    bimBgColor: {
      type: [Array, String],
      default: ''
    }
  },
  data() {
    // 这里存放数据
    return {
      viewer: null,
      isRegion: false,
      bimTreeVisible: false,
      detailVisible: false,
      isSection: false,
      isMeasure: false,
      isSetting: false,
      measureData: null,
      activeType: null,
      curDetailId: null,
      isReady: false,
      isLoading: true,
      noModelId: false,
      bimToolsConfig: {
        el: 'bimfishModelo',
        dataList: [
          {
            children: [
              {
                title: '设置',
                icon: icon.setting,
                event: () => {
                  this.showSetting()
                }
              },
              {
                title: '框选',
                icon: icon.select,
                event: () => {
                  this.regionSelect()
                }
              },
              {
                title: '剖切',
                icon: icon.section,
                event: () => {
                  this.startSection()
                }
              },
              {
                title: '测量',
                icon: icon.measure,
                event: () => {},
                children: [
                  {
                    title: '一',
                    icon: icon.icon1,
                    event: () => {
                      this.startMeasure(1)
                    }
                  },
                  {
                    title: '二',
                    icon: icon.icon2,
                    event: () => {
                      this.startMeasure(2)
                    }
                  },
                  {
                    title: '三',
                    icon: icon.icon3,
                    event: () => {
                      this.startMeasure(3)
                    }
                  },
                  {
                    title: '四',
                    icon: icon.icon4,
                    event: () => {
                      this.startMeasure(4)
                    }
                  },
                  {
                    title: '五',
                    icon: icon.icon5,
                    event: () => {
                      this.startMeasure(5)
                    }
                  },
                  {
                    title: '六',
                    icon: icon.icon6,
                    event: () => {
                      this.startMeasure(6)
                    }
                  }
                ]
              },
              {
                title: 'bim树',
                icon: icon.tree,
                event: () => {
                  this.showBimTree()
                }
              }
              // {
              //   title: '设置视角',
              //   icon: icon.fixed,
              //   event: () => {
              //     this.saveCamera()
              //   }
              // }
            ]
          }
        ]
      }
    }
  },
  watch: {
    $route() {
      if (!this.isReady) return
      this.init()
    }
  },
  mounted() {
    if (this.noModel) return
    this.refresh()
  },
  beforeDestroy() {
    this.destroy()
  },
  // 方法集合
  methods: {
    async refresh() {
      if (!this.modelId || this.modelId === 'undefined') {
        this.isLoading = false
        this.noModelId = true
        window.allEleAry = []
        return false
      }
      const res = await axios.get(`/bim-storage/model/getCacheResult/${this.modelId}`)
      const path = res?.data?.data?.modelPath || null
      const cacheFileFlag = res?.data?.data?.cacheFileFlag || null
      const cacheTreeFlag = res?.data?.data?.cacheTreeFlag || null
      this.loadView(path)
      if (!cacheFileFlag) {
        this.saveLocalUrl(this.modelId)
      }
      if (!cacheTreeFlag) {
        this.saveTreeData(this.modelId)
      }
    },

    // 展示模型
    async loadView(modelLocalUrl) {
      window.bimfishModeloApp = new BimfishModelo('bimfishModelo')
      bimfishModeloApp.init()
      const cameraInfo = JSON.parse(localStorage.getItem('bimModelCamera'))
      bimfishModeloApp.loadModel({
        modelId: this.modelId,
        modelLocalUrl,
        cameraInfo,
        callback: async () => {
          this.isLoading = false
          if (this.bimBgColor) {
            this.setBackground(this.bimBgColor)
          }
          await this.initTools()
          await this.saveModelAllElements()
          await this.$emit('ready')
          this.isReady = true
        }
      })
    },

    // 重置数据
    init() {
      if (!window.bimfishModeloApp) return
      // 视角还原
      this.switchView()
      // 清除标注
      this.clearMark()
      // //清除上色
      // this.clearElementsColor()
      // //清除选中
      this.setCameraPickData()
    },

    destroy() {
      if (window.bimfishModeloApp) {
        // console.log(window.bimfishModeloApp)
        window.bimfishModeloApp.destroy()
        window.bimfishModeloApp = null
      }
    },

    // 设置背景颜色
    setBackground(color) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.setBackgroundColor(color)
    },

    // 保存所有构件
    async saveModelAllElements() {
      let localModelAllElements = await localForage.getItem('allEleObj').then(res => res)
      localModelAllElements = JSON.parse(localModelAllElements)
      if (this.modelId === localModelAllElements?.modelId) {
        window.allEleAry = localModelAllElements.allEleAry
        return
      }
      const res = await axios.get(`/bim-storage/model/getElementList/${this.modelId}`).catch(e => {
        console.log(e)
      })
      const allEleAry = res.data.data
      const allEleObj = {
        modelId: this.modelId,
        allEleAry
      }
      window.allEleAry = allEleAry
      localForage.setItem('allEleObj', JSON.stringify(allEleObj))
    },

    // 获取全部构件
    getModelAllElementAry() {
      return this.allEleAry
    },

    // 缓存模型数据
    cacheModel(modelId) {
      this.saveLocalUrl(modelId)
      this.saveTreeData(modelId)
    },

    // 保存模型文件
    async saveLocalUrl(modelId) {
      const localUrl = await Modelo.Model.get(modelId).then(res => res.convertedUrls)
      await axios
        .post('/bim-storage/model/saveFile', {
          fileList: localUrl,
          modelId: modelId
        })
        .catch(e => {
          console.log(e)
        })
    },

    // 保存模型树
    async saveTreeData(modelId) {
      const treeData = await Modelo.BIM.getTreeInfo(modelId).then(tree => tree)
      await axios.post('/bim-storage/model/addModelTree', treeData).catch(e => {
        console.log(e)
      })
      this.$refs.tree.loadNode({ level: null })
    },

    // 加载工具栏
    initTools() {
      bimTools.init(this.bimToolsConfig)
    },

    // 剖切
    startSection() {
      if (!window.bimfishModeloApp) return
      if (this.isSection) {
        this.isSection = false
        bimfishModeloApp.endSection()
        return
      }
      this.isSection = true
      bimfishModeloApp.startSection()
    },

    // 显示详情
    showSetting() {
      this.isSetting = !this.isSetting
    },

    // 开始测量
    startMeasure(type) {
      if (!window.bimfishModeloApp) return
      this.isMeasure = true
      bimfishModeloApp.startMeasure(type, this.getMeasure)
    },

    // 结束测量
    endMeasure() {
      if (!window.bimfishModeloApp) return
      this.isMeasure = false
      bimfishModeloApp.endMeasure()
    },

    getMeasure(data) {
      this.measureData = data
    },

    // 显示树
    showBimTree() {
      if (this.bimTreeVisible) {
        this.$refs.tree.closeDetail()
      }
      this.bimTreeVisible = !this.bimTreeVisible
    },

    // 框选
    regionSelect() {
      if (!window.bimfishModeloApp) return
      if (this.isRegion) {
        this.isRegion = false
        bimfishModeloApp.regionUnSelect()
        return
      }
      this.isRegion = true
      bimfishModeloApp.regionSelect()
    },

    // 获取框选构件
    getSelectElements() {
      if (!window.bimfishModeloApp) return
      return bimfishModeloApp.getSelectElements()
    },

    // 构件上色
    setElementsColor(eleAry, color) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.setElementsColor(eleAry, color)
    },

    // 清除构件颜色
    clearElementsColor() {
      if (!window.bimfishModeloApp) return
      const ids = _.map(window.allEleAry, 'id')
      bimfishModeloApp.clearElementsColor(ids)
    },

    // 构件标注
    setMark(props) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.setMark(props)
    },

    // 清除标注
    clearMark(type = null) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.clearMark(type)
    },

    // 模型显示隐藏
    setModelVisible(visible) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.setModelVisible(visible)
    },

    // 构件显示隐藏
    setElementsVisible(eleIdAry, visible) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.setElementsVisible(eleIdAry, visible)
    },

    // 选中构件
    pickElement(eleAry = []) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.pickElement(eleAry)
    },

    // 显示详情
    showDetail(id) {
      this.bimTreeVisible = false
      this.detailVisible = true
      this.curDetailId = id
    },

    // 关闭详情
    closeDetail() {
      this.detailVisible = false
      this.curDetailId = null
    },

    // 镜头切换
    switchView(type = '6') {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.switchView(type)
    },

    saveCamera() {
      const cameraData = this.getCameraData()
      const param = {
        modelId: this.modelId,
        cameraData
      }
      localForage.setItem('modelCamera', JSON.stringify(param))
      this.$message.success('操作成功')
    },

    async getLocalCamera() {
      let modelCamera = await localForage.getItem('modelCamera').then(res => res)
      modelCamera = JSON.parse(modelCamera)
      let cameraInfo = null
      if (this.modelId === modelCamera?.modelId) {
        cameraInfo = modelCamera.cameraData
      }
      return cameraInfo
    },

    // 获取相机信息
    getCameraData() {
      return bimfishModeloApp.getCameraData()
    },

    // 设置相机信息
    setCameraData(data, animation) {
      if (!window.bimfishModeloApp) return
      bimfishModeloApp.setCameraData(data, animation)
    },

    // 设置相机信息
    setCameraPickData() {
      const cameraInfo = JSON.parse(localStorage.getItem('bimModelCamera'))
      cameraInfo ? this.setCameraData(cameraInfo, true) : this.pickElement([])
    },

    // 选中高亮
    setHighlightEnabled(enable) {
      bimfishModeloApp.setHighlightEnabled(enable)
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  width: 100%;
  height: 100%;
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
.container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  #cubeBox {
    position: absolute;
    right: 50px;
    top: 50px;
    width: 50px;
    height: 50px;
    transform-style: preserve-3d;
    z-index: 5;
    background: #ccc;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      -webkit-box-shadow: 0 0 25px #5fbcff;
      opacity: 0.8;
    }
    .front {
      transform: translateZ(25px);
      background-image: url(./images/viewCube/a5.png);
    }
    .back {
      transform: translateZ(-25px);
      background-image: url(./images/viewCube/a1.png);
    }
    .left {
      transform: translateX(-25px) rotateY(90deg);
      background-image: url(./images/viewCube/a2.png);
    }
    .right {
      transform: translateX(25px) rotateY(90deg);
      background-image: url(./images/viewCube/a3.png);
    }
    .top {
      transform: translateY(-25px) rotateX(90deg);
      background-image: url(./images/viewCube/a4.png);
    }
    .bottom {
      transform: translateY(25px) rotateX(90deg);
      background-image: url(./images/viewCube/a8.png);
    }
  }

  .tree-wrap {
    position: absolute;
    left: -300px;
    top: 0;
    width: 300px;
    height: 100%;
    background: #f6f6f6;
    transition: all 0.3s ease-in-out;
    z-index: 5;
    &.show {
      left: 0;
    }
  }
  .measure-wrap {
    position: absolute;
    right: 20px;
    top: 150px;
    z-index: 5;
  }

  .setting-wrap {
    position: absolute;
    bottom: 35px;
    right: -300px;
    transition: all 0.3s ease-in-out;
    &.show {
      right: 30px;
    }
    z-index: 6;
  }
  .detail-wrap {
    position: absolute;
    width: 300px;
    height: 100%;
    background: #f6f6f6;
    border-left: 1px solid #bbb8b8;
    left: 0;
    top: 0;
    z-index: 3;
  }

  #bimfishModeloApp,
  .bimfishModeloApp {
    width: 100%;
    height: 100%;
    min-height: 100px;
    z-index: 1;
  }
  .no-data {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 15px;
    color: #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
