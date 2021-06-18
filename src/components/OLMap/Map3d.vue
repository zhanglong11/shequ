<template>
  <div :id="id" class="web-gis"></div>
</template>

<script>
let webGis3D = null
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'webGis'
    },
    entityId: {
      type: String,
      default: ''
    }
  },
  data() {
    // 这里存放数据
    return {}
  },
  // watch: {
  //   visible(val) {
  //     console.log(1111222, val)
  //     if (val) {
  //       this.$nextTick(() => {
  //         this.init()
  //       })
  //     } else {
  //       webGis3D = null
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    webGis3D.clearTileSetLayer()
    webGis3D.viewer.destroy()
    webGis3D = null
  },
  methods: {
    // 初始化
    init() {
      // webGis3D = null
      webGis3D = new WebGISApp(this.id)
      webGis3D.init({
        isTerrain: false,
        // baseMapReverseType: 'reverse',
        lowResolution: true,
        loadBaseMap: false
      })
      this.addTileSetLayer()

      // 注册选中模型事件,当打开PICK开关后，可获得图层ID和实体ID，随后根据这两个ID，可以去数据库中查询数据
      window.addEventListener(webGis3D.MODEL_SELECT_CHANGE, e => {
        const datas = e.data
        const entityId = datas.entityId
        if (datas) {
          // const pickInfo = {
          //   layerId: datas.layerId,
          //   entityId: datas.entityId,
          //   isMarker: datas.isMarker,
          //   position: datas.position
          // }
          this.$emit('update:entityId', entityId)
          // alert(JSON.stringify(pickInfo))
        }
      })
    },
    addTileSetLayer() {
      const params = {
        id: 1,
        name: 'jz',
        url: '/jzb3dm/tileset.json'
      }

      webGis3D.addTileSetLayer(params, tileSet => {
        if (tileSet) {
          const boundingSphere = tileSet.boundingSphere
          const center = [boundingSphere.center.x, boundingSphere.center.y, boundingSphere.center.z]
          const radius = boundingSphere.radius
          webGis3D.flyToBoundingSphere(center, radius)
        }
      })
      this.setOpenPick(true)

      // 加载天地图
      const TDMapKey = 'd5d64f256faf9ea4029408ba352625ef'
      const vec = {
        id: 'tdmap_vec',
        name: 'tdmap_vec',
        type: 'WMTS',
        url: 'https://t0.tianditu.gov.cn/vec_w/wmts?tk=' + TDMapKey,
        layer: 'vec',
        style: 'default',
        tileMatrixSetID: 'w',
        format: 'tiles',
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        maximumLevel: 18
      }
      webGis3D.addImageryLayer(vec)

      const cva = {
        id: 'tdmap_cva',
        name: 'tdmap_cva',
        type: 'WMTS',
        url: 'https://t0.tianditu.gov.cn/cva_w/wmts?tk=' + TDMapKey,
        layer: 'cva',
        style: 'default',
        tileMatrixSetID: 'w',
        format: 'tiles',
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        maximumLevel: 18
      }
      webGis3D.addImageryLayer(cva)
      // webGis3D.loadBMap() //加载百度地图
    },
    oncePick() {
      webGis3D.oncePick(ids => {
        alert(JSON.stringify(ids))
      })
    },
    setOpenPick(bool) {
      webGis3D.setOpenPick(bool)
    }
  }
}
</script>
<style lang="scss" scoped>
.web-gis {
  flex: 1;
  height: calc(100vh - 260px);
}
</style>
