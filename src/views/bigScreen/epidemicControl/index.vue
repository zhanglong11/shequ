<template>
  <div class="epidemic-wrap">
    <div class="left">
      <!-- 重点人员 start -->
      <BigCard :icon="require('../images/title/title6.png')" title="重点人员">
        <EchartsPie v-if="keyPersonInfo" id="personnelPie" :dataList="keyPersonInfo" />
      </BigCard>
      <!-- 重点人员 end -->
      <!-- 通知公告 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="通知公告">
        <Grid ref="table" :request="notificationData" :isPagination="false" height="100%">
          <vxe-table-column title="公告标题" field="title" />
          <vxe-table-column title="公告类型" field="typeName" />
          <vxe-table-column title="发布时间" field="issueTime" formatter="mdhm" />
        </Grid>
      </BigCard>
      <!-- 通知公告 end -->
      <!-- 巡查记录 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="巡查记录">
        <Grid ref="table" :request="epidemicSituationPatrolData" :isPagination="false" height="100%">
          <vxe-table-column title="巡查内容" field="patrolContent" />
          <vxe-table-column title="巡查项目" field="patrolProject" />
          <vxe-table-column title="巡查时间" field="patrolTime" formatter="ymd" />
        </Grid>
      </BigCard>
      <!-- 巡查记录 end -->
    </div>
    <!-- 疫情情况 start -->
    <div class="map-center">
      <MapInfo :provinceInfo="provinceInfo" :countryNow="countryNow" :countryYesterday="countryYesterday" />
      <MapChart :option="provinces" />
    </div>
    <!-- 疫情情况 end -->
    <div class="right">
      <!-- 接种情况统计 start -->
      <BigCard overflow :icon="require('../images/title/title6.png')" title="接种情况统计">
        <div class="inoculate-info-wrap">
          <div class="iiw-pie">
            <EchartsPie v-if="inoculateInfo" id="personnelPie" :dataList="inoculateInfo" />
          </div>
          <div class="iiw-table">
            <vxe-table v-loading="loading" :data="inoculateTable" size="mini" show-overflow>
              <vxe-table-column title="建筑" field="name" width="25%" />
              <vxe-table-column title="未预约" field="notOrder" width="25%" />
              <vxe-table-column title="已预约" field="ordered" width="25%" />
              <vxe-table-column title="已接种" field="done" width="25%" />
            </vxe-table>
          </div>
        </div>
      </BigCard>
      <!-- 接种情况统计 end -->
    </div>
  </div>
</template>

<script>
import BigCard from '../components/BigCard' // 卡片
import EchartsPie from '../components/EchartsPie' // 环形图

import Api from '../api/epidemicControl.js'
import MapChart from './MapChart'
import MapInfo from './MapInfo'
export default {
  components: {
    BigCard,
    EchartsPie,
    MapChart,
    MapInfo
  },
  data() {
    // 这里存放数据
    return {
      keyPersonInfo: '',
      notificationData: async () => {
        const params = {
          page: 1,
          parentType: 'module_7',
          rows: 20
        }
        const result = await Api.queryNotification(params)
        return result
      },
      epidemicSituationPatrolData: async () => {
        const params = {
          page: 1,
          rows: 20
        }
        const result = await Api.queryEpidemicSituationPatrol(params)
        return result
      },
      inoculateInfo: '',
      inoculateTable: [],
      loading: false,
      provinceInfo: {
        today: {
          nowConfirm: 0,
          confirm: 0,
          dead: 0,
          heal: 0
        },
        total: {
          nowConfirm: 0,
          confirm: 0,
          dead: 0,
          heal: 0
        }
      },
      countryNow: {
        nowConfirm: 0,
        noInfect: 0,
        suspect: 0,
        nowSevere: 0,
        confirm: 0,
        importedCase: 0,
        dead: 0,
        heal: 0,
        lastUpdateTime: ''
      },
      countryYesterday: {
        nowConfirm: 0,
        noInfect: 0,
        suspect: 0,
        nowSevere: 0,
        confirm: 0,
        importedCase: 0,
        dead: 0,
        heal: 0
      },
      provinces: [],
      mapTimer: null
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getEpidemicKeyPersonInfo()
    this.getInoculateInfo()
    this.getNcovOverviewNow()
    this.getNcovOverviewYesterday()
    this.getNcovCity()
    this.initMapTimer()

    // 头部设置背景色
    const screenHeader = document.getElementsByClassName('screen-header')[0]
    screenHeader.style.backgroundColor = '#fffaf9'
  },
  destroyed() {
    // 取消头部设置的背景色
    const screenHeader = document.getElementsByClassName('screen-header')[0]
    screenHeader.style.backgroundColor = 'unset'
    // 清除定时器
    clearInterval(this.mapTimer)
    this.mapTimer = null
  },
  // 方法集合
  methods: {
    // 重点人员
    async getEpidemicKeyPersonInfo() {
      // this.keyPersonInfo = [
      //   {
      //     name: '感染人员',
      //     value: null
      //   },
      //   {
      //     name: '疑似人员',
      //     value: null
      //   },
      //   {
      //     name: '隔离人员',
      //     value: null
      //   },
      //   {
      //     name: '密切接触者',
      //     value: null
      //   },
      //   {
      //     name: '往返务工人员',
      //     value: 2
      //   },
      //   {
      //     name: '高危区域返洛人员',
      //     value: 1
      //   }
      // ]
      Api.queryEpidemicPersonInfo().then(
        res => {
          // console.log(res)
          if (res && res.data && Object.keys(res.data).length) {
            const keyPersonInfo = []
            for (const key in res.data) {
              keyPersonInfo.push({
                name: key,
                value: res.data[key]
              })
            }
            this.keyPersonInfo = keyPersonInfo
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 接种情况统计饼图、表格
    getInoculateInfo() {
      this.loading = true
      Api.queryVaccineCount().then(
        res => {
          // console.log(res)
          if (res && res.data && res.data.vaccineDTOs && res.data.vaccineDTOs.length) {
            this.inoculateTable = res.data.vaccineDTOs
            this.inoculateInfo = [
              {
                name: '未预约',
                value: res.data.notOrder
              },
              {
                name: '已预约',
                value: res.data.ordered
              },
              {
                name: '已接种',
                value: res.data.done
              }
            ]
          }
          this.loading = false
        },
        err => {
          console.log(err)
          this.loading = false
        }
      )
    },
    // 初始中国地图实时更新定时器
    initMapTimer() {
      const self = this
      this.mapTimer = setInterval(() => {
        self.getNcovOverviewNow()
        self.getNcovOverviewYesterday()
        self.getNcovCity()
      }, 1000 * 60 * 10)
    },
    // 当前全国疫情
    getNcovOverviewNow() {
      Api.queryNcovOverviewNow().then(
        res => {
          // console.log(res)
          if (res.data) {
            this.countryNow = res.data
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 较昨日全国疫情
    getNcovOverviewYesterday() {
      Api.queryNcovOverviewYesterday().then(
        res => {
          // console.log(res)
          if (res.data) {
            this.countryYesterday = res.data
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 国内省市疫情
    getNcovCity() {
      Api.queryNcovCity().then(
        res => {
          // console.log(res)
          if (res.data && res.data.length) {
            const children = res.data[0][0].children
            this.provinces = children
            const henan = children.filter(item => item.name === '河南')[0]
            this.provinceInfo.total = henan.total
            this.provinceInfo.today = henan.today
          } else {
            this.provinces = []
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
@import './epidemicControl.scss';
</style>
