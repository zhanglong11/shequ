<template>
  <div class="map-wrap">
    <fast-map
      ref="map"
      style="height: 500px"
      :zoom="15"
      :mid="12"
      :options="options"
      :center="center"
      :double-click-zoom="false"
      @click="handleMapClick"
      @complete="handleComplete"
    >
      <fast-marker
        ref="marker"
        draggable
        clickable
        icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
        :mid="12"
        :offset="[-26.5, -68]"
        :options="markerOptions"
      ></fast-marker>
    </fast-map>
    <input
      id="keyword"
      autocomplete="off"
      type="text"
      name="keyword"
      value="请输入关键字：(选定后搜索)"
      onfocus='this.value=""'
    />
    <div id="result" class="amap-sug-result"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { aMapWebServiceKey } from '@/settings'

export default {
  name: 'Map',
  components: {},
  props: {
    longitude: {
      type: String,
      default: null
    },
    latitude: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      options: {
        zooms: [3, 16]
      },
      center: [112.405424, 34.657345]
    }
  },
  computed: {
    markerOptions() {
      return this.longitude
        ? [
            {
              position: [this.longitude, this.latitude]
            }
          ]
        : []
    }
  },
  methods: {
    async handleMapClick({ lnglat: { lng, lat } }) {
      this.$emit('update:longitude', '' + lng)
      this.$emit('update:latitude', '' + lat)
      this.$emit('input', { longitude: lng, latitude: lat })
      await axios
        .get('https://restapi.amap.com/v3/geocode/regeo?parameters', {
          params: {
            key: aMapWebServiceKey,
            location: lng + ',' + lat
          }
        })
        .then(res => {
          let address = res.data.regeocode.formatted_address
          const { province, city, district } = res.data.regeocode.addressComponent
          ;[province, city, district].forEach(text => {
            if (_.isString(text)) address = address.replace(text, '')
          })
          this.$emit('update:address', address)
        })
    },
    async handleComplete() {
      if (this.longitude) {
        this.center = [this.longitude, this.latitude]
      }
      const map = this.$refs.map.getMapInstance()
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar())

        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale())

        // 在图面添加定位控件，用来获取和展示用业主机所在的经纬度位置
        map.addControl(new AMap.Geolocation())

        const autoOptions = {
          city: '全国', // 城市，默认全国
          input: 'keyword', // 使用联想输入的input的id
          output: 'result'
        }
        const autocomplete = new AMap.Autocomplete(autoOptions)
        const placeSearch = new AMap.PlaceSearch({
          city: '全国'
        })
        AMap.event.addListener(autocomplete, 'select', function (e) {
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name)
        })
        AMap.event.addListener(placeSearch, 'complete', e => {
          if (_.size(e.poiList.pois)) {
            const { lng, lat } = e.poiList.pois[0].location
            this.center = [lng, lat]
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-wrap {
  position: relative;
  > input {
    position: absolute;
    width: 300px;
    top: 15px;
    right: 15px;
    border: 2px solid #bbb;
    outline: none;
    &:hover {
      border: 2px solid #777;
    }
  }
  #result {
    position: absolute;
    width: 300px;
    top: 53px;
    right: 15px;
  }
}
</style>
