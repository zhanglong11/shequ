<template>
  <div>
    <div class="left">
      <!-- 信息总览 start -->
      <BigCard overflow :icon="require('../images/title/title1.png')" title="信息总览">
        <div class="info-total">
          <ul>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info1.png" />
                  网格总数
                </div>
                <div class="box-body">{{ totalInfo.gridCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info2.png" />
                  区域总数
                </div>
                <div class="box-body">{{ totalInfo.regionCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info3.png" />
                  建筑总数
                </div>
                <div class="box-body">{{ totalInfo.buildCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info4.png" />
                  居民总数
                </div>
                <div class="box-body">{{ totalInfo.residentCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info5.png" />
                  房屋总数
                </div>
                <div class="box-body">{{ totalInfo.roomCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info6.png" />
                  企业总数
                </div>
                <div class="box-body">{{ totalInfo.enterpriseCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info7.png" />
                  重点人员
                </div>
                <div class="box-body">{{ totalInfo.keyPersonCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info8.png" />
                  党员总数
                </div>
                <div class="box-body">{{ totalInfo.partyCount || 0 }}</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="box-header">
                  <img src="../images/home/screen-info9.png" />
                  车辆总数
                </div>
                <div class="box-body">{{ totalInfo.carCount || 0 }}</div>
              </div>
            </li>
          </ul>
        </div>
      </BigCard>
      <!-- 信息总览 end -->

      <!-- 居民信息 start -->
      <BigCard overflow :icon="require('../images/title/title2.png')" title="居民信息">
        <Progress
          :dataList="[
            { label: '户籍人口', value: residentInfo.registeredPopulationCount || 0 },
            { label: '流动人口', value: residentInfo.migrantPopulationCount || 0 }
          ]"
        />
        <Progress
          :dataList="[
            { label: '男性', value: residentInfo.maleCount || 0 },
            { label: '女性', value: residentInfo.femaleCount || 0 }
          ]"
        />
        <Progress
          :dataList="[
            { label: '留住', value: residentInfo.leaveCount || 0 },
            { label: '迁出', value: residentInfo.emigrationCount || 0 }
          ]"
        />
      </BigCard>
      <!-- 居民信息 end -->

      <!-- 车辆信息 start -->
      <BigCard :icon="require('../images/title/title3.png')" title="车辆信息">
        <EchartsPie
          v-if="carInfo"
          id="carPie"
          :dataList="[
            { name: '企业车辆', value: carInfo.enterpriseCarCount || 0 },
            { name: '个人车辆', value: carInfo.personallyCarCount || 0 }
          ]"
        />
      </BigCard>
      <!-- 车辆信息 end -->
    </div>

    <div class="center">
      <!-- 建筑类别 start -->
      <BuildTypeChart />
      <!-- 建筑类别 end -->

      <!-- 事件统计 start -->
      <IncidentInfoChart />
      <!-- 事件统计 end -->
    </div>

    <div class="right">
      <!-- 综治重点人员 start -->
      <BigCard :icon="require('../images/title/title6.png')" title="综治重点人员">
        <EchartsPie v-if="keyPersonInfo" id="personnelPie" :dataList="keyPersonInfo" />
      </BigCard>
      <!-- 综治重点人员 end -->

      <!-- 房屋信息 start -->
      <BigCard :icon="require('../images/title/title7.png')" title="房屋信息">
        <div class="housing-info">
          <div class="housing-state">
            <div class="title">房屋状态</div>
            <EchartsBar
              v-if="housingStateData"
              id="housingStateBar"
              :isLegend="false"
              :isYAxis="false"
              :xAxis="['自用', '出租', '空闲']"
              :isUnit="false"
              :dataList="housingStateData"
            />
          </div>
          <div class="housing-type">
            <div class="title">房屋类型</div>
            <EchartsBar
              v-if="housingTypeData"
              id="housingTypeBar"
              :isLegend="false"
              :isYAxis="false"
              :xAxis="['住宅', '商铺', '其他']"
              :isUnit="false"
              :dataList="housingTypeData"
            />
          </div>
        </div>
      </BigCard>
      <!-- 房屋信息 end -->

      <!-- 重点区域 start -->
      <KeyRegionInfoChart />
      <!-- 重点区域 end -->
    </div>
  </div>
</template>

<script>
import BigCard from '../components/BigCard' // 卡片
import Progress from '../components/Progress' // 进图条
import EchartsPie from '../components/EchartsPie' // 环形图
import EchartsBar from '../components/EchartsBar' // 柱状图
import BuildTypeChart from '../components/EchartsComponents/BuildTypeChart' // 建筑类别
import IncidentInfoChart from '../components/EchartsComponents/IncidentInfoChart' // 事件统计
import KeyRegionInfoChart from '../components/EchartsComponents/KeyRegionInfoChart' // 重点区域

import Api from '../api/home'
export default {
  components: {
    BigCard,
    Progress,
    EchartsPie,
    EchartsBar,
    BuildTypeChart,
    IncidentInfoChart,
    KeyRegionInfoChart
  },
  data() {
    // 这里存放数据
    return {
      totalInfo: {
        buildCount: 16,
        carCount: 935,
        enterpriseCount: 50,
        gridCount: 4,
        keyPersonCount: 163,
        partyCount: 158,
        regionCount: 1,
        residentCount: 7256,
        roomCount: 3696
      },
      residentInfo: {},
      carInfo: '',
      keyPersonInfo: '',
      housingStateData: '',
      housingTypeData: ''
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  // 方法集合
  methods: {
    // 初始化
    init() {
      this.getGridTotalInfo()
      this.getGridResidentInfo()
      this.getGridCarInfo()
      this.getGridKeyPersonInfo()
      this.getGridRoomInfo()
    },
    // 信息总览
    async getGridTotalInfo() {
      const result = await Api.getGridTotalInfo()
      const datas = result.data
      this.totalInfo = datas
    },
    // 居民信息
    async getGridResidentInfo() {
      const result = await Api.getGridResidentInfo()
      const datas = result.data
      this.residentInfo = datas
    },
    // 车辆信息
    async getGridCarInfo() {
      // this.carInfo = {
      //   enterpriseCarCount: 10,
      //   personallyCarCount: 925
      // }
      const result = await Api.getGridCarInfo()
      const datas = result.data
      this.carInfo = datas
    },
    // 重点人员
    async getGridKeyPersonInfo() {
      // this.keyPersonInfo = [
      //   {
      //     name: '高龄老人',
      //     value: 70
      //   },
      //   {
      //     name: '低保人员',
      //     value: 20
      //   },
      //   {
      //     name: '困难残疾人员',
      //     value: 20
      //   },
      //   {
      //     name: '重度残疾人员',
      //     value: 42
      //   },
      //   {
      //     name: '伤残军人',
      //     value: 5
      //   },
      //   {
      //     name: '社区矫正',
      //     value: 6
      //   }
      // ]
      const result = await Api.getGridKeyPersonInfo()
      const datas = result.data
      const list = []
      for (const key in datas) {
        const item = datas[key]
        list.push({
          name: key,
          value: item
        })
      }
      this.keyPersonInfo = list
    },
    // 房屋信息
    async getGridRoomInfo() {
      const result = await Api.getGridRoomInfo()
      const datas = result.data
      this.housingStateData = [
        [
          {
            value: datas.liveCount || 0,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#f9c67c' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#fbebd5' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            value: datas.rentOutCount || 0,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6383fa' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#c5cff3' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            value: datas.vacancyCount || 0,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#fa4d42' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#f3c0bc' // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      ]
      this.housingTypeData = [
        [
          {
            value: datas.houseCount || 0,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#f9c67c' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#fbebd5' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            value: datas.shopCount || 0,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6383fa' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#c5cff3' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            value: datas.otherCount || 0,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#fa4d42' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#f3c0bc' // 100% 处的颜色
                  }
                ]
              }
            }
          }
        ]
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
@import './home.scss';
</style>
