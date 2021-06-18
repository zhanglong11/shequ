<template>
  <div class="map-wrapper">
    <div id="map" ref="map" class="map">
      <div class="commonWin">模态框</div>
    </div>
    <div class="search-container" :style="{ height: showSearchContent ? 'calc(100% - 30px)' : '30px' }">
      <div class="search">
        <el-input v-model="searchKeyword" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <div v-if="showSearchContent" class="search-content">
        <div v-if="promptHtml" id="promptDiv" class="prompt" v-html="promptHtml"></div>
        <!-- 统计面板 -->
        <div id="statisticsDiv" class="statistics"></div>
        <!-- 建议词面板 -->
        <div id="suggestsDiv" class="suggests"></div>
        <!-- 公交提示面板 -->
        <div id="lineDataDiv" class="lineData"></div>
        <!-- 搜索结果面板 -->
        <div v-if="showResult" id="resultDiv" ref="resultDiv" class="result">
          <div id="searchDiv" ref="searchDiv">
            <div class="marker-list-container">
              <div v-for="(item, index) of markerArr" :key="'ma' + index">
                <a href="Javascript:void(0)" @click="showPosition(item)"
                  >{{ item.index + 1 }} <span style="margin-right: 3px">.</span> {{ item.name }}</a
                >
              </div>
            </div>
            <p>
              共{{ localsearch.getCountNumber() }} 条记录，分{{ localsearch.getCountPage() }}页,当前第
              {{ localsearch.getPageIndex() }}
              页
            </p>
          </div>
          <div id="pageDiv">
            <el-button
              type="primary"
              size="mini"
              :disabled="localsearch.getPageIndex() === 1"
              @click="localsearch.firstPage()"
              >第一页</el-button
            >
            <el-button
              type="primary"
              size="mini"
              :disabled="localsearch.getPageIndex() === 1"
              @click="localsearch.previousPage()"
              >上一页</el-button
            >
            <el-button
              type="primary"
              size="mini"
              :disabled="localsearch.getPageIndex() === localsearch.getCountPage()"
              @click="localsearch.nextPage()"
              >下一页</el-button
            >
            <el-button type="primary" size="mini" @click="localsearch.lastPage()">最后一页</el-button>
            <br />
            转到第
            <el-input-number
              :min="0"
              :max="localsearch.getCountPage()"
              :value="localsearch.getPageIndex()"
              @change="e => localsearch.gotoPage(e)"
            ></el-input-number
            >页
            <el-button type="primary" size="mini" @click="localsearch.gotoPage()">转到</el-button>
            <!--        <input id="pageId" type="text" value="1" size="3" />页-->
            <!--<input
              type="button"
              onClick="localsearch.gotoPage(parseInt(document.getElementById('pageId').value));"
              value="转到"
            />-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const T = window.T
export default {
  name: 'CommonMap',
  components: {},
  props: {
    lng: {
      type: [String, Number],
      default: ''
    },
    lat: {
      type: [String, Number],
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    pcaLabel: {
      type: String,
      default: ''
    },
    pca: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      localsearch: null,
      searchKeyword: '',
      showSearchContent: false,
      promptHtml: '',
      showResult: false,
      markerArr: [],
      geocode: null,
      propMarker: null
    }
  },
  computed: {},
  watch: {
    lng: {
      immediate: true,
      async handler() {
        if (this.lng) {
          await this.$nextTick()
          this.addPropMarker(this.lng, this.lat)
        }
      }
    }
  },
  mounted() {
    this.init()
    window.aa = this.aa
  },
  methods: {
    aa() {},
    init() {
      if (this.map) return
      this.map = new T.Map('map', {
        projection: 'EPSG:4326'
      })
      if (this.pcaLabel && !this.lng) {
        this.geocode.getPoint(this.pcaLabel, res => {
          this.map.centerAndZoom(res.getLocationPoint())
        })
        return
      }
      this.map.centerAndZoom(new T.LngLat(this.lng || 116.23, this.lat || 39.55), 6)
      this.map.addEventListener('click', this.mapClick)
      const config = {
        pageCapacity: 10, // 每页显示的数量
        onSearchComplete: this.localSearchResult // 接收数据的回调函数
      }
      // 创建搜索对象
      this.localsearch = new T.LocalSearch(this.map, config)
      this.geocode = new T.Geocoder()
    },
    async addPropMarker(lng, lat) {
      if (this.propMarker) await this.map.removeOverLay(this.propMarker)
      const lnglat = new T.LngLat(lng, lat)
      this.propMarker = new T.Marker(lnglat)
      this.map.addOverLay(this.propMarker)
      let winHtml = ``
      const markerInfoWin = new T.InfoWindow()
      const that = this
      this.geocode.getLocation(lnglat, res => {
        winHtml = `地址:${res.result.result.addressComponent.address}`
        markerInfoWin.setContent(winHtml)
        that.propMarker.openInfoWindow(markerInfoWin)
        that.propMarker.addEventListener('click', function () {
          that.propMarker.openInfoWindow(markerInfoWin)
        })
      })
      /* if (!this.address) {
        this.geocode.getLocation(lnglat, res => {
          winHtml = `地址:${res.result.result.addressComponent.address}`
          markerInfoWin.setContent(winHtml)
          this.propMarker.openInfoWindow(markerInfoWin)
          this.propMarker.addEventListener('click', function () {
            this.propMarker.openInfoWindow(markerInfoWin)
          })
        })
      } else {
        winHtml = `地址:${this.address}`
        markerInfoWin.setContent(winHtml)
        this.propMarker.openInfoWindow(markerInfoWin)
        this.propMarker.addEventListener('click', function () {
          this.propMarker.openInfoWindow(markerInfoWin)
        })
      } */
    },
    async mapClick(e) {
      if (this.showSearchContent) {
        this.showSearchContent = false
      }
      this.geocode.getLocation(e.lnglat, res => {
        this.$emit('update:lng', e.lnglat.lng)
        this.$emit('update:lat', e.lnglat.lat)
        const p = res.result.result.addressComponent.province_code.slice(3, 5)
        const pl = res.result.result.addressComponent.province
        const c = res.result.result.addressComponent.city_code.slice(3, 7)
        const cl = res.result.result.addressComponent.city
        const a = res.result.result.addressComponent.county_code.slice(3)
        const al = res.result.result.addressComponent.county
        this.$emit('update:pca', [p, c, a])
        this.$emit('update:pcaLabel', pl + cl + al)
        this.$emit('update:address', res.result.result.addressComponent.address)
        this.$emit('close')
      })
    },
    localSearchResult(result) {
      this.showSearchContent = true
      this.clearAll()
      this.markerArr = []
      this.prompt(result)
      // 根据返回类型解析搜索结果
      switch (parseInt(result.getResultType())) {
        case 1:
          // 解析点数据结果
          this.pois(result.getPois())
          break
        case 2:
          // 解析推荐城市
          // this.statistics(result.getStatistics())
          break
        case 3:
          // 解析行政区划边界
          this.area(result.getArea())
          break
        case 4:
          // 解析建议词信息
          // this.suggests(result.getSuggests())
          break
        case 5:
          // 解析公交信息
          // this.lineData(result.getLineData())
          break
      }
    },
    prompt(obj) {
      const prompts = obj.getPrompt()
      if (prompts) {
        this.promptHtml = ''
        for (let i = 0; i < prompts.length; i++) {
          const prompt = prompts[i]
          const promptType = prompt.type
          const promptAdmins = prompt.admins
          const meanprompt = prompt.DidYouMean
          if (promptType === 1) {
            this.promptHtml +=
              '<p>您是否要在第三方的<strong onclick="aa()">' +
              promptAdmins[0].name +
              '</strong >搜索更多包含<strong>' +
              obj.getKeyword() +
              '</strong>的相关内容？<p>'
          } else if (promptType === 2) {
            this.promptHtml +=
              '<p>在<strong>' +
              promptAdmins[0].name +
              '</strong>没有搜索到与<strong>' +
              obj.getKeyword() +
              '</strong>相关的结果。<p>'
            if (meanprompt) {
              this.promptHtml +=
                "<p>您是否要找：<font weight='bold' color='#035fbe'><strong>" + meanprompt + '</strong></font><p>'
            }
          } else if (promptType === 3) {
            this.promptHtml += "<p style='margin-bottom:3px;'>有以下相关结果，您是否要找：</p>"
            for (i = 0; i < promptAdmins.length; i++) {
              this.promptHtml += '<p>' + promptAdmins[i].name + '</p>'
            }
          }
        }
      }
    },
    pois(obj) {
      if (obj) {
        this.markerArr = []
        // 坐标数组，设置最佳比例尺时会用到
        const zoomArr = []
        const that = this
        for (let i = 0; i < obj.length; i++) {
          // 闭包
          ;(function (i) {
            // 名称
            const name = obj[i].name
            // 地址
            const address = obj[i].address
            // 坐标
            const lnglatArr = obj[i].lonlat.split(' ')
            const lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1])
            const winHtml = `地址:${address}`
            // 创建标注对象
            const marker = new T.Marker(lnglat)
            // 地图上添加标注点
            that.map.addOverLay(marker)
            // 注册标注点的点击事件
            const markerInfoWin = new T.InfoWindow(winHtml, { autoPan: true })
            marker.addEventListener('click', function () {
              marker.openInfoWindow(markerInfoWin)
              that.geocode.getLocation(lnglat, res => {
                that.$emit('update:lng', lnglatArr[0])
                that.$emit('update:lat', lnglatArr[1])
                const p = res.result.result.addressComponent.province_code.slice(3, 5)
                const pl = res.result.result.addressComponent.province
                const c = res.result.result.addressComponent.city_code.slice(3, 7)
                const cl = res.result.result.addressComponent.city
                const a = res.result.result.addressComponent.county_code.slice(3)
                const al = res.result.result.addressComponent.county
                that.$emit('update:pca', [p, c, a])
                that.$emit('update:pcaLabel', pl + cl + al)
                that.$emit('update:address', res.result.result.addressComponent.address)
                that.$emit('close')
              })
            })
            that.markerArr.push({
              index: i,
              name: name,
              address: address,
              winHtml: winHtml,
              marker: marker,
              lnglat: lnglat
            })
            zoomArr.push(lnglat)
          })(i)
        }
        // 显示地图的最佳级别
        this.map.setViewport(zoomArr)
        this.showResult = true
      }
    },
    showPosition(item) {
      const { marker, lnglat, winHtml } = item
      const markerInfoWin = new T.InfoWindow(winHtml, { autoPan: true })
      marker.openInfoWindow(markerInfoWin)
      marker.addEventListener('click', function () {
        this.$emit('close')
      })
      this.geocode.getLocation(lnglat, res => {
        this.$emit('update:lng', lnglat.lng)
        this.$emit('update:lat', lnglat.lat)
        const p = res.result.result.addressComponent.province_code.slice(3, 5)
        const pl = res.result.result.addressComponent.province
        const c = res.result.result.addressComponent.city_code.slice(3, 7)
        const cl = res.result.result.addressComponent.city
        const a = res.result.result.addressComponent.county_code.slice(3)
        const al = res.result.result.addressComponent.county
        this.$emit('update:pca', [p, c, a])
        this.$emit('update:pcaLabel', pl + cl + al)
        this.$emit('update:address', res.result.result.addressComponent.address)
      })
    },
    area(obj) {
      if (obj) {
        if (obj.points) {
          // 坐标数组，设置最佳比例尺时会用到
          const pointsArr = []
          const points = obj.points
          for (let i = 0; i < points.length; i++) {
            const regionLngLats = []
            const regionArr = points[i].region.split(',')
            for (let m = 0; m < regionArr.length; m++) {
              const lnglatArr = regionArr[m].split(' ')
              const lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1])
              regionLngLats.push(lnglat)
              pointsArr.push(lnglat)
            }
            // 创建线对象
            const line = new T.Polyline(regionLngLats, {
              color: 'blue',
              weight: 3,
              opacity: 1,
              lineStyle: 'dashed'
            })
            // 向地图上添加线
            this.map.addOverLay(line)
          }
          // 显示最佳比例尺
          this.map.setViewport(pointsArr)
        }
        if (obj.lonlat) {
          const regionArr = obj.lonlat.split(',')
          this.map.panTo(new T.LngLat(regionArr[0], regionArr[1]))
        }
      }
    },
    clearAll() {
      this.map.clearOverLays()
    },
    handleSearch() {
      this.localsearch.search(this.searchKeyword)
    },
    getLocation(lnglat) {
      this.geocode.getLocation(lnglat, this.getLocationCB)
    },
    getLocationCB(res) {
      console.log(res)
      this.$emit('update:address', res.result.result.addressComponent.address || '未知区域')
    }
  }
}
</script>

<style lang="less" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.map {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.search-container {
  background-color: #fff;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 10px;
  width: 300px;
  overflow: hidden;
  .search {
    height: 30px;
    /deep/ .el-input__inner,
    .el-input {
      height: 30px;
    }
  }
  .search-content {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    overflow: hidden;
  }
}
#resultDiv {
  height: 100%;
  overflow: auto;
}
.commonWin {
  position: absolute;
  top: 20px;
  right: 10px;
  width: 200px;
  height: 40px;
  border: 1px red solid;
  z-index: 999;
  color: #000;
}
</style>
