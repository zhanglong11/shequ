import FastAMap from 'fast-amap'
import Vue from 'vue'
import { aMapWebApiKey } from '@/settings'
FastAMap.mapOptions.setOptions({
  key: aMapWebApiKey,
  version: '1.4.15',
  plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.Geolocation']
})
Vue.use(FastAMap)
