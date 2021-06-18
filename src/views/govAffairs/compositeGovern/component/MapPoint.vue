<template>
  <div id="main">
    <div id="olContainer" class="olContainer" />
    <div v-if="edit" class="btnBox">
      <el-button type="primary" round @click="addFlag = !addFlag">{{ addFlag ? '关闭' : '开启' }}标记位置</el-button>
      <el-button type="primary" round @click="removeMarker">清除位置</el-button>
    </div>
  </div>
</template>

<script>
let webgis = null
const TDMapKey = '153a21da9b77a590babb1538dc2d62a8'
const T = window.T
export default {
  name: 'OLMap',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    },
    gridInfo: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: '未命名'
    },
    markerPosition: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      routeName: null,
      webgisOlMap: null,
      saveInfoArr: [],
      selectedFeatureId: null,
      addFlag: false, // 添加标记
      markerId: ''
    }
  },
  computed: {},
  watch: {
    gridInfo: {
      immediate: false,
      deep: true,
      handler(val) {
        if (_.isEmpty(val)) {
          return
        }
        this.drawGrid()
      }
    },
    markerPosition: {
      immediate: true,
      handler(val) {
        if (!val) return
        this.addFlag = !!val
        if (this.webgisOlMap === null) {
          setTimeout(() => {
            this.addMarker()
          }, 100)
        } else {
          this.addMarker()
        }
      }
    },
    name: {
      immediate: false,
      handler(val) {
        if (!this.markerPosition || !this.markerId) return
        this.addMarker()
      }
    }
  },
  created() {},
  mounted() {
    console.log(T)
    this.init()
  },
  methods: {
    init() {
      // eslint-disable-next-line
      webgis = new WebGISApp2D('olContainer')
      webgis.init(() => {
        this.webgisOlMap = webgis.getOlMapObject()
        this.addTDMap_VEC()
        this.addTDMap_CVA()
        this.setInitCenter()
        this.setInitZoom()
        if (this.edit) {
          this.webgisOlMap.olMap.on('click', this.mapClick)
        }
      })
    },
    mapClick(e) {
      if (!this.addFlag) {
        return
      }
      this.$emit('update:markerPosition', e.coordinate.join(','))
    },
    async drawGrid() {
      await this.clearMarker()
      if (this.gridInfo.points) {
        this.addPolygon(this.gridInfo.name, this.gridInfo.points.split(','), this.gridInfo.color || [0, 255, 0, 0.5])
        this.webgisOlMap.setCenter_OL(this.gridInfo.centerPoint.split(','))
        this.webgisOlMap.setZoom_OL(14)
        this.webgisOlMap.addMarker_OL({
          id: this.gridInfo.id,
          position: this.gridInfo.centerPoint.split(','),
          text: this.gridInfo.name + '<br/> 面积：' + this.gridInfo.area,
          noImage: true,
          isOverlay: true,
          background: true
        })
        if (this.markerPosition) {
          this.addMarker()
        }
      } else {
        this.setInitCenter()
        this.setInitZoom()
      }
    },
    addMarker() {
      if (!this.markerId) {
        this.markerId = _.uniqueId('marker')
      } else {
        this.removeMarker()
      }
      const options = {
        /* anchor:[0.5,1], */
        id: this.markerId,
        position: this.markerPosition.split(','),
        text: this.name || '未命名',
        noImage: false,
        overlayOffset: [0, -40],
        isOverlay: true,
        background: true
      }
      this.webgisOlMap.addMarker_OL(options)
    },
    removeMarker() {
      if (!this.markerId) return
      this.webgisOlMap.deleteMarkerById_OL(this.markerId)
    },
    // 加载天地图矢量底图
    addTDMap_VEC() {
      const url =
        'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' +
        TDMapKey
      const epsg = 'EPSG:3857'
      const options = {
        url,
        epsg
      }

      this.webgisOlMap.addXYZMap_OL(options)
    },
    // 加载天地图电子地图注记
    addTDMap_CVA() {
      const url =
        'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' +
        TDMapKey
      const epsg = 'EPSG:3857'
      const options = {
        url,
        epsg
      }

      this.webgisOlMap.addXYZMap_OL(options)
    },
    setInitCenter() {
      const center = [12513326.751439743, 4123390.1169813853]
      this.webgisOlMap.setCenter_OL(center)
    },
    setInitZoom() {
      this.webgisOlMap.setZoom_OL(17)
    },
    addPolygon(id, points, fillColor) {
      const positions = [_.chunk(points, 2)]
      const options = {
        id: id,
        positions: positions,
        fillColor: fillColor
      }
      this.clearPolygon()
      this.webgisOlMap.addPolygon_OL(options)
    },
    clearPolygon() {
      this.webgisOlMap.deleteAllPolygon_OL()
    },
    clearMarker() {
      this.webgisOlMap.deleteAllMarker_OL()
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .olContainer {
    height: 100%;
  }
  /deep/.ol-zoom {
    top: unset;
    left: unset;
    right: 20px;
    bottom: 20px;
  }
  .btnBox {
    position: absolute;
    left: 10px;
    top: 10px;
  }
}
</style>
<style>
.ol-markerTooltip.ol-markerTooltip-marker {
  max-width: 200px;
}
</style>
