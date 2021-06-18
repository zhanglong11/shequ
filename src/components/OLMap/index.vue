<template>
  <div id="main">
    <div id="olContainer" class="olContainer" />
    <div v-if="edit" class="btnBox">
      <el-button
        v-if="(mapDelete || (!value && selectedFeatureId === currentDraw)) && selectedFeatureId"
        type="primary"
        round
        @click="removePolygon"
      >
        删除选中网格
      </el-button>
      <el-button v-if="mapAdd" type="primary" round @click="drawPolygon"> 绘制区域 </el-button>
      <!--
      <el-button type="primary" round @click="openEdit"> 打开编辑 </el-button>
      <el-button type="primary" round @click="closeEdit"> 结束编辑 </el-button>
      <el-button type="primary" round @click="saveDrawPolygon"> 保存绘制 </el-button>
      -->
    </div>
    <div id="popup" class="ol-popup">
      <div id="popup-content" ref="popupContent" class="ol-popup-content"></div>
    </div>
  </div>
</template>

<script>
import GirdApi from '@/views/bigScreen/api/gird' // 大屏相关Api
let webgis = null
const TDMapKey = '153a21da9b77a590babb1538dc2d62a8'

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
    gridName: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    point: {
      type: String,
      default: ''
    },
    center: {
      type: String,
      default: ''
    },
    area: {
      type: [Number, String],
      default: 0
    },
    // 是否允许绘制区域
    mapAdd: {
      type: Boolean,
      default: false
    },
    // 是否允许删除区域
    mapDelete: {
      type: Boolean,
      default: false
    },
    // 是否多个网格
    multiple: {
      type: Boolean,
      default: false
    },
    multipleEdit: {
      type: Boolean,
      default: false
    },
    // 多个网格数据
    multiplePoint: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      routeName: null,
      webgisOlMap: null,
      saveInfoArr: [],
      isEdit: this.edit || false,
      selectedFeatureId: null,
      markerIds: [], // 记录已添加的锚点
      currentDraw: '' // 当前绘制的id
    }
  },
  computed: {},
  watch: {
    point: {
      immediate: false,
      handler(val) {
        if (!val) {
          this.clearGrid()
          return
        }
        this.drawGrid()
      }
    },
    multiplePoint: {
      immediate: false,
      handler(val) {
        if (!val) {
          this.drawGridAll('clearGrid')
          return
        }
        this.drawGridAll()
      }
    }
  },
  mounted() {
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
        if (!this.center) {
          this.setInitCenter()
          this.setInitZoom()
        }
        /* const points = [
          12513419.311903682,
          4123167.374703648,
          12513592.489545891,
          4122957.1728758635,
          12513830.160930716,
          4123243.811731933,
          12513547.105060346,
          4123308.3054745486,
          12513352.429503933,
          4123267.698303272,
          12513419.311903682,
          4123167.374703648
        ]
        this.addPolygon(this.gridName, points, [0, 255, 0, 0.5]) */
        this.edit || this.multipleEdit ? this.openEdit() : this.closeEdit()
      })
    },
    // 显示所有网格
    async drawGridAll(isClear) {
      if (isClear || this.multiplePoint.length === 0) {
        // 批量删除锚点
        this.batcDeleteMarker('grid')
        this.clearPolygon()
      }
      await this.$nextTick()
      this.multiplePoint.forEach((e, i) => {
        const index = this.markerIds.indexOf(e.id)
        if (index < 0) {
          this.markerIds.push(e.id)
        }
        this.deletePolygon(e.id)
        this.addPolygon(e.id, e.points, e.color || [0, 255, 0, 0.5])
        this.addMarker(e.id, e.centerPoint, e.gridName, e.area, e.color || [0, 255, 0, 0.5])
      })
      if (this.multiplePoint.length > 0) {
        this.webgisOlMap.setCenter_OL(this.multiplePoint[0].centerPoint)
      }
      this.webgisOlMap.setZoom_OL(14)
    },
    async drawGrid() {
      await this.clearGrid()
      await this.$nextTick()
      if (this.multiple) {
        this.multiplePoint.forEach((e, i) => {
          this.addPolygon(e.id, e.points, e.color || [0, 255, 0, 0.5])
          this.addMarker(e.id, e.centerPoint, e.gridName, e.area, e.color || [0, 255, 0, 0.5])
        })
        if (this.multiplePoint.length > 0) {
          this.webgisOlMap.setCenter_OL(this.multiplePoint[0].centerPoint)
        }
      } else {
        const point = this.point ? this.point.split(',') : []
        const center = this.center ? this.center.split(',') : []
        this.addPolygon(this.gridName, point, this.color || [0, 255, 0, 0.5])
        this.addMarker(this.gridName, center, this.gridName, this.area, this.color || [0, 255, 0, 0.5])
        this.webgisOlMap.setCenter_OL(center)
      }
      this.webgisOlMap.setZoom_OL(14)
    },
    async clearGrid() {
      this.setInitCenter()
      this.setInitZoom()
      this.clearPolygon()
      this.clearMarker()
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
    // 绘制区域
    drawPolygon() {
      if (!this.isEdit) return
      this.saveInfoArr = []
      const uniqueId = '_' + _.uniqueId()
      let gridId = this.value || `grid_${uniqueId}`
      let gridName = this.gridName ? this.gridName : '临时网格'
      if (this.value) {
        const item = _.find(this.multiplePoint, { gridId: this.value })
        // console.log('item--', item)
        if (item) {
          gridId = item.id
          gridName = item.gridName
          // 删除对应的区域及锚点
          this.deletePolygon(gridId)
          // console.log('删除正式区域ID--', gridId)
        }
      }
      const fillColor = this.color || '#ff0000'
      const currentDraw = gridId + '_polygon'
      // 删除对应的区域及锚点
      this.deletePolygon(this.currentDraw, true)
      // console.log('删除上一次绘制的区域ID--', this.currentDraw)

      this.$nextTick(() => {
        // 开始绘制区域
        this.webgisOlMap.drawFeature_OL(
          {
            id: currentDraw,
            type: 'Polygon',
            fillColor: this.$utils.colorToRgb(fillColor, 0.5),
            strokeColor: this.$utils.colorToRgb(fillColor, 1)
          },
          feature => {
            const area = _.ceil(feature.getGeometry().getArea(), 2)
            const extent = feature.getGeometry().getExtent()
            const points = this.webgisOlMap.getPointsFromFeature_OL(feature, false)
            const center = this.webgisOlMap.getCenterFromExtent_OL(extent)
            this.addMarker(currentDraw, center, gridName, area)
            this.currentDraw = currentDraw
            // console.log('记录本次绘制的区域ID', this.currentDraw)
            this.saveInfoArr.push({
              text: gridId,
              points,
              center,
              area,
              fillColor
            })
          }
        )
      })
    },
    // 添加锚点
    addMarker(id, position, text, area) {
      const options = {
        id,
        position: position,
        text: text + '<br/> 面积：' + area + ' ㎡',
        noImage: true,
        isOverlay: true,
        background: true
      }
      this.webgisOlMap.addMarker_OL(options)

      const index = this.markerIds.indexOf(id)
      if (index < 0) {
        this.markerIds.push(id)
      }
    },
    // 添加锚点并定位到锚点位置
    addMarkerJump(options) {
      const index = this.markerIds.indexOf(options.id)
      if (index < 0) {
        this.markerIds.push(options.id)
      } else {
        this.webgisOlMap.deleteMarkerById_OL(options.id)
        this.markerIds.splice(index)
        return
      }
      const longitude = options.position[0].split('.')[0]
      let position = options.position
      // 判断坐标是否需要转换
      if (longitude.length === 3) {
        position = this.webgisOlMap.degreeToXYZ_OL(options.position)
        options.position = position
      }
      this.webgisOlMap.addMarker_OL(options)
      this.webgisOlMap.setCenter_OL(position)
      this.webgisOlMap.setZoom_OL(18)
    },
    // 批量删除锚点
    batcDeleteMarker(markerKey, id) {
      if (markerKey) {
        this.markerIds.forEach((e, i) => {
          if (e === id) {
            this.webgisOlMap.deleteMarkerById_OL(e)
            this.$nextTick(() => {
              this.markerIds.splice(i)
            })
            return
          }
          if (!id && e.indexOf(markerKey + '_') >= 0) {
            this.webgisOlMap.deleteMarkerById_OL(e)
            this.$nextTick(() => {
              this.markerIds.splice(i)
            })
          }
        })
      }
    },
    // 批量添加锚点
    batchAddMarker(obj) {
      for (const key in obj) {
        const array = obj[key]
        // 批量删除锚点
        const markerKey = array.length > 0 ? '' : key
        this.batcDeleteMarker(markerKey)

        array.forEach(e => {
          this.webgisOlMap.deleteMarkerById_OL(e.id)
          const longitude = e.position[0].split('.')[0]
          // 判断坐标是否需要转换
          if (longitude.length === 3) {
            const position = this.webgisOlMap.degreeToXYZ_OL(e.position)
            e.position = position
          }
          this.webgisOlMap.addMarker_OL(e)
          const index = this.markerIds.indexOf(e.id)
          if (index < 0) {
            this.markerIds.push(e.id)
          }
        })
      }
    },
    // 删除区域
    deletePolygon(id, isTemp = false) {
      if (!id) {
        return
      }
      if (isTemp) {
        // 删除临时绘制
        this.webgisOlMap.removeDrawFeatureById_OL(id)
      } else {
        // 删除正式绘制
        this.webgisOlMap.deletePolygonById_OL(id)
      }

      this.batcDeleteMarker('grid', id)
    },
    addPolygon(id, points, fillColor) {
      if (!id) {
        return
      }
      const positions = [_.chunk(points, 2)]
      const options = {
        id,
        positions,
        fillColor: this.$utils.colorToRgb(fillColor, 0.5),
        strokeColor: this.$utils.colorToRgb(fillColor, 1)
      }
      if (!this.multiple) {
        this.clearPolygon()
      }
      this.webgisOlMap.addPolygon_OL(options)
    },
    removePolygon() {
      if (!this.selectedFeatureId) {
        return
      }
      const index = this.selectedFeatureId.includes('_polygon')
      if (index) {
        // 删除临时网格
        this.webgisOlMap.removeDrawFeatureById_OL(this.selectedFeatureId)
        this.webgisOlMap.deleteMarkerById_OL(this.selectedFeatureId.split('_polygon')[0] + '_marker')
      } else {
        // 删除保存过的网格
        this.webgisOlMap.deletePolygonById_OL(this.selectedFeatureId)
        this.webgisOlMap.deleteMarkerById_OL(this.selectedFeatureId)
      }

      this.batcDeleteMarker('grid', this.selectedFeatureId)
    },
    clearPolygon() {
      this.webgisOlMap.deleteAllPolygon_OL()
    },
    clearMarker() {
      this.webgisOlMap.deleteAllMarker_OL()
    },
    openEdit() {
      this.isEdit = true
      this.singleSelect()
    },
    closeEdit() {
      this.isEdit = false
      this.webgisOlMap.closeSelect_OL()
    },
    // 点击事件
    singleSelect() {
      this.webgisOlMap.clickSelect_OL('single', e => {
        this.webgisOlMap.closeSelectPropertyOverLay_OL()
        const coordinate = e.mapBrowserEvent.coordinate
        if (e.selected.length > 0) {
          const feature = e.selected[0]
          const featureId = feature.getId()
          // console.log('feature', feature, propertyObject)
          const isMarker = feature.get('isMarker')
          // 如果加载的是标注
          if (isMarker) {
            const markerId = featureId.split('_')[0]
            const layerId = featureId.split('_')[1]

            // console.log('如果加载的是标注', featureId, layerId)

            this.$nextTick(async () => {
              await this.getInnerHTML(coordinate, markerId, layerId)

              const enterpriseInfo = document.getElementById('enterpriseInfo')
              const ccpDetailsInfo = document.getElementById('ccpDetailsInfo')
              const incidentInfo = document.getElementById('incidentInfo')
              // 企业信息详情
              if (enterpriseInfo) {
                const enterpriseId = enterpriseInfo.getAttribute('id-data')
                enterpriseInfo.onclick = () => {
                  this.$emit('mapShowDetails', {
                    el: 'showEnterpriseDetails',
                    key: 'enterpriseDetailsDialog',
                    tableKey: 'enterpriseDetailsTable',
                    id: enterpriseId
                  })
                }
              }
              // 党组织详情
              if (ccpDetailsInfo) {
                const ccpDetailsId = ccpDetailsInfo.getAttribute('id-data')
                ccpDetailsInfo.onclick = () => {
                  this.$emit('mapShowDetails', {
                    el: 'showCcpDetails',
                    key: 'ccpDetailsDialog',
                    tableKey: 'ccpDetailsDialogTable',
                    id: ccpDetailsId
                  })
                }
              }
              // 重点事件详情
              if (incidentInfo) {
                const incidentInfoId = incidentInfo.getAttribute('id-data')
                incidentInfo.onclick = () => {
                  this.$emit('mapShowDetails', {
                    el: 'showIncidentDetails',
                    key: 'incidentDetailsDialog',
                    tableKey: '',
                    id: incidentInfoId
                  })
                }
              }
            })
          } else {
            // console.log('如果加载的不是标注--', featureId)
            const layerIds = featureId.split('_')
            const wbsCode = layerIds[1]
            const id = layerIds[2]
            this.$emit('girdClick', wbsCode, id)
          }

          // 注释原有逻辑
          this.selectedFeatureId = featureId
        } else {
          this.selectedFeatureId = ''
        }
        // console.log('点击事件', this.markerIds, this.selectedFeatureId)
      })
    },
    // 处理锚点点击回显html
    async getInnerHTML(coordinate, markerId, layerId) {
      let innerHTML = ``
      const apiParams = {
        spaceLocation: 'getPartyOrganizationalManagement',
        keyRegionLocation: 'getKeyRegion',
        enterpriseLocation: 'getDetailsEnterprise',
        propertyLocation: 'getProperty',
        incidentLocation: 'getIncident'
      }
      const result = await GirdApi[apiParams[markerId]](layerId)
      const datas = result.data
      const emptyText = '暂无'
      switch (markerId) {
        // 党组织
        case 'spaceLocation':
          innerHTML = `
            <div class="pupup-header">
              <img src="/images/bimIcon/icon_${markerId}.png" />
              <span class="title" title="${datas.name}">${datas.name || emptyText}</span>
            </div>
            <div class="popup-body">
              <div class="popup-item">
                <label class="popup-label">上级单位：</label>
                <div class="popup-desc">${datas.parentName || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">党组织地址：</label>
                <div class="popup-desc">${datas.address || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">党组织负责人：</label>
                <div class="popup-desc">${datas.principal || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">联系电话：</label>
                <div class="popup-desc">${datas.phone || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">备注：</label>
                <div class="popup-desc">${datas.remark || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">组织人数：</label>
                <div class="popup-desc">
                  <a href="javascript:;" id="ccpDetailsInfo" id-data="${datas.id}">
                  ${datas.memberCount || 0}</a> 人
                </div>
              </div>
            </div>
          `
          break
        // 重点区域
        case 'keyRegionLocation':
          innerHTML = `
            <div class="pupup-header">
              <img src="/images/bimIcon/icon_${markerId}.png" />
              <span class="title" title="${datas.name}">${datas.name || emptyText}</span>
            </div>
            <div class="popup-body">
              <div class="popup-item">
                <label class="popup-label">区域类型：</label>
                <div class="popup-desc">${datas.typeName || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">区域负责人：</label>
                <div class="popup-desc">${datas.principalName || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">联系电话：</label>
                <div class="popup-desc">${datas.principalMobile || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">备注：</label>
                <div class="popup-desc">${datas.remark || emptyText}</div>
              </div>
            </div>
          `
          break
        // 企业分布
        case 'enterpriseLocation':
          innerHTML = `
            <div class="pupup-header">
              <img src="/images/bimIcon/icon_${markerId}.png" />
              <span class="title" title="${datas.name}">${datas.name || emptyText}</span>
            </div>
            <div class="popup-body">
              <div class="popup-item">
                <label class="popup-label">行业类别：</label>
                <div class="popup-desc">${datas.companyIndustryName || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">法人：</label>
                <div class="popup-desc">${datas.legalPerson || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">联系人：</label>
                <div class="popup-desc">${datas.linkman || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">联系电话：</label>
                <div class="popup-desc">${datas.linkmanMobile || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">员工数量：</label>
                <div class="popup-desc">${datas.workerNum || 0} 人</div>
              </div>
              <div class="popup-item">
                <a href="javascript:;" id="enterpriseInfo" id-data="${datas.id}">查看详情>></a>
              </div>
            </div>
          `
          break
        // 物业组织
        case 'propertyLocation':
          innerHTML = `
            <div class="pupup-header">
              <img src="/images/bimIcon/icon_${markerId}.png" />
              <span class="title" title="${datas.name}">${datas.name || emptyText}</span>
            </div>
            <div class="popup-body">
              <div class="popup-item">
                <label class="popup-label">物业负责人：</label>
                <div class="popup-desc">${datas.director || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">联系电话：</label>
                <div class="popup-desc">${datas.phone || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">物业位置：</label>
                <div class="popup-desc">${datas.address || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">备注：</label>
                <div class="popup-desc">${datas.remark || emptyText}</div>
              </div>
            </div>
          `
          break
        // 重要事件
        case 'incidentLocation':
          innerHTML = `
            <div class="pupup-header">
              <img src="/images/bimIcon/icon_${markerId}.png" />
              <span class="title" title="${datas.orgName}">${datas.orgName || emptyText}</span>
            </div>
            <div class="popup-body">
              <div class="popup-item">
                <label class="popup-label">事件描述：</label>
                <div class="popup-desc">${datas.description || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">事件类型：</label>
                <div class="popup-desc">${datas.typeName || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">事件规模：</label>
                <div class="popup-desc">${datas.scaleName || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">发生时间：</label>
                <div class="popup-desc">${datas.occurrenceTime || emptyText}</div>
              </div>
              <div class="popup-item">
                <label class="popup-label">处理状态：</label>
                <div class="popup-desc">${datas.status ? '已处理' : '处理中'}</div>
              </div>
              <div class="popup-item">
                <a href="javascript:;" id="incidentInfo" id-data="${datas.id}">查看详情>></a>
              </div>
            </div>
          `
          break
      }
      this.webgisOlMap.setSelectPropertyOverLayContent_OL(coordinate, innerHTML)
    },
    saveDrawPolygon() {
      // 关闭编辑
      this.closeEdit()
      const pointArr = []
      let center = []
      let area = ''
      this.saveInfoArr.forEach(info => {
        center = info.center
        area = info.area
        pointArr.push(...info.points)
        // 清除绘制实体
        this.webgisOlMap.removeDrawFeatureById_OL(info.text + '_polygon')
        this.webgisOlMap.deleteMarkerById_OL(info.text + '_marker')
        // 添加新的实体
        this.addPolygon(info.text, info.points, info.fillColor)
        this.addMarker(info.text, info.center, info.text, info.area)
      })
      this.$emit('update:point', pointArr.join(','))
      this.$emit('update:center', center.join(','))
      this.$emit('update:area', area)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';
#main {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .olContainer {
    height: 100%;
  }
  ::v-deep.ol-zoom {
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
  .ol-popup {
    width: 320px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .ol-popup-content {
      padding: 5px 10px;
      ::v-deep.pupup-header {
        display: flex;
        align-items: center;
        border-bottom: 1px #ec3f4f solid;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        position: relative;
        .title {
          flex: 1;
          @include ellipsis;
        }
        img {
          margin-right: 10px;
        }
        &:before,
        &:after {
          content: '';
          width: 3px;
          height: 3px;
          background: #ec3f4f;
          position: absolute;
          bottom: -2px;
        }
        &:before {
          left: 0;
        }
        &:after {
          right: 0;
        }
      }
      ::v-deep.popup-body {
        .popup-item {
          display: flex;
          align-items: center;
          color: #333;
          font-size: 15px;
          margin: 6px 0;
          .popup-label {
            color: #999;
            font-size: 13px;
          }
          .popup-desc {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
<style>
.ol-markerTooltip.ol-markerTooltip-marker {
  max-width: 200px;
}
</style>
