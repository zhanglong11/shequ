<template>
  <div class="container home">
    <div class="home-item-con">
      <div class="left">
        <!-- 个人信息 start -->
        <div class="home-item-info">
          <el-card shadow="hover" class="card-info">
            <div class="user-info">
              <el-avatar
                icon="el-icon-user-solid"
                class="user-avatar"
                :src="avatar + '?imageView2/1/w/100/h/100'"
                :size="100"
              ></el-avatar>
              <!-- <img :src="avatar + '?imageView2/1/w/100/h/100'" class="user-avatar" /> -->
              <div class="user-name">
                <p class="title">
                  {{ greetingText }}，{{ name }}
                  <span>{{ greetingDesc }}</span>
                </p>
                <p class="desc">
                  <span v-if="userInfo.companyAdminFlag">超级管理员</span>
                  <template v-else-if="userInfo.roleTexts && userInfo.roleTexts.length > 0">
                    <span>{{ userInfo.roleTexts.join('/') }}</span>
                  </template>
                  <span v-if="userInfo.departmentList && userInfo.departmentList.length > 0">
                    - {{ _.map(userInfo.departmentList, 'departmentName').join('/') }}
                  </span>
                </p>
              </div>
              <!-- <div class="user-total">
                <p class="todo">
                  <b>12</b>
                  <span>待处理</span>
                </p>
                <p>
                  <b>18</b>
                  <span>投诉建议</span>
                </p>
                <p>
                  <b>450</b>
                  <span>积分</span>
                </p>
              </div> -->
            </div>
          </el-card>
        </div>
        <!-- 个人信息 end -->
        <!-- 待办事项 start -->
        <el-card shadow="hover" class="card-left">
          <div slot="header" class="clearfix">
            <div class="card-header-title">
              <img src="~@/assets/images/home/icon1.png" class="card-icon" />
              <span class="title">待办事项</span>
              <div class="title-right">
                <el-badge :value="messageCount" class="item">
                  <el-button :type="tabIndex === 0 ? 'primary' : 'default'" size="small" @click="tabIndex = 0"
                    >会议</el-button
                  >
                </el-badge>
                <el-badge :value="taskCount" class="item">
                  <el-button :type="tabIndex === 1 ? 'primary' : 'default'" size="small" @click="tabIndex = 1"
                    >审批</el-button
                  >
                </el-badge>
              </div>
            </div>
          </div>
          <MessageCount v-show="tabIndex === 0" :messageCount.sync="messageCount" />
          <Work v-show="tabIndex === 1" :taskCount.sync="taskCount" />
        </el-card>
        <!-- 待办事项 end -->
      </div>

      <div class="right">
        <!-- 我的日程 start -->
        <el-card shadow="hover" class="card-right schedule-card">
          <div slot="header" class="clearfix">
            <div class="card-header-title">
              <img src="~@/assets/images/home/icon4.png" class="card-icon" />
              <span class="title">我的日程</span>
              <div class="title-right">
                <el-button type="text" icon="el-icon-plus" @click="myScheduleVisible = true">添加</el-button>
              </div>
            </div>
          </div>
          <el-calendar v-model="today">
            <template slot="dateCell" slot-scope="{ data }">
              <div class="schedule-list" :class="{ 'is-selected': data.isSelected, 'has-day': scheduleData[data.day] }">
                <!-- {{ data.day }} -->
                {{ data.day.split('-')[2] }}
                <div v-if="scheduleData[data.day]" class="log">
                  <p v-for="(item, i) in scheduleData[data.day]" :key="i">
                    <el-tag>{{ getScheduleType(item.type) }}</el-tag>
                    <span class="title">{{ item.content }}</span>
                    <span>时间：{{ item.scheduleDate | formatDate }}</span>
                  </p>
                </div>
              </div>
            </template>
          </el-calendar>
        </el-card>
        <AddMySchedule :visible.sync="myScheduleVisible" @change="queryMyScheduleList()" />
        <!-- 我的日程 end -->
      </div>
    </div>

    <div class="home-chart-con">
      <div class="left">
        <!-- 诉求意见统计表 start -->
        <el-card shadow="hover" class="card-left">
          <div slot="header" class="clearfix">
            <div class="card-header-title">
              <img src="~@/assets/images/home/icon3.png" class="card-icon" />
              <span class="title">诉求意见统计表</span>
            </div>
          </div>
          <EchartsPie
            v-if="statisticsData.appealOpinions.length > 0"
            id="appealOpinions"
            :dataList="statisticsData.appealOpinions"
          />
        </el-card>
        <!-- 诉求意见统计表 end -->
        <!-- 投诉商家统计表 start -->
        <el-card shadow="hover" class="card-left">
          <div slot="header" class="clearfix">
            <div class="card-header-title">
              <img src="~@/assets/images/home/icon5.png" class="card-icon" />
              <span class="title">投诉商家统计表</span>
            </div>
          </div>
          <EchartsPie
            v-if="statisticsData.againstMerchants.length > 0"
            id="againstMerchants"
            :dataList="statisticsData.againstMerchants"
          />
        </el-card>
        <!-- 投诉商家统计表 end -->
        <!-- 投诉物业统计表 start -->
        <el-card shadow="hover" class="card-left">
          <div slot="header" class="clearfix">
            <div class="card-header-title">
              <img src="~@/assets/images/home/icon6.png" class="card-icon" />
              <span class="title">投诉物业统计表</span>
            </div>
          </div>
          <EchartsPie
            v-if="statisticsData.propertyComplaints.length > 0"
            id="propertyComplaints"
            :dataList="statisticsData.propertyComplaints"
          />
        </el-card>
        <!-- 投诉物业统计表 end -->
      </div>
      <div class="right">
        <!-- 快捷导航 start -->
        <el-card shadow="hover" class="card-right card-fase-menu">
          <div slot="header" class="clearfix">
            <div class="card-header-title">
              <img src="~@/assets/images/home/icon2.png" class="card-icon" />
              <span class="title">快捷导航</span>
              <div class="title-right">
                <el-button type="text" icon="el-icon-plus" @click="navigationVisible = true">添加</el-button>
              </div>
            </div>
          </div>
          <FastNavigation :visible.sync="navigationVisible" />
        </el-card>
        <!-- 快捷导航 end -->
      </div>
    </div>
  </div>
</template>

<script>
import EchartsPie from './components/EchartsPie'
import homeApi from './api'
import { mapGetters } from 'vuex'
import AddMySchedule from './components/AddMySchedule' // 添加日程
import MessageCount from './components/MessageCount' // 待办会议
import FastNavigation from './components/FastNavigation' // 快捷导航
import Work from './components/Work'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    EchartsPie,
    AddMySchedule,
    MessageCount,
    Work,
    FastNavigation
  },
  filters: {
    formatDate(str) {
      return str ? str.substring(11, 16) : str
    }
  },
  data() {
    // 这里存放数据
    return {
      today: new Date(),
      greetingText: '早安',
      greetingDesc: '祝你开心每一天',
      tabIndex: 0,
      messageCount: 0,
      taskCount: 0,
      scheduleForm: {
        startTime: '',
        endTime: ''
      },
      scheduleType: {
        1: '会议',
        2: '日程'
      },
      scheduleData: {},
      myScheduleVisible: false,
      navigationVisible: false,
      statisticsData: {
        appealOpinions: [],
        againstMerchants: [],
        propertyComplaints: []
      }
    }
  },
  computed: {
    ...mapGetters(['avatar', 'name', 'userInfo'])
  },
  watch: {
    today(val) {
      this.getDateMonth()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.greeting()
    this.init()
  },
  // 方法集合
  methods: {
    // 获取当前月份月初与月末 日期
    getDateMonth() {
      const datas = this.$utils.getDateMonth(this.today)
      this.scheduleForm = {
        startTime: datas.first + ' 00:00:00',
        endTime: datas.last + ' 23:59:59'
      }
      this.queryMyScheduleList()
    },
    // 设置问候语
    greeting() {
      const list = [
        '祝你开心每一天',
        '坚强的你，能使平凡的人生更加辉煌',
        '祝你工作顺利',
        '人生中需要奋斗，要有闯劲',
        '未来永远需要你去创造',
        '送你如意，把烦恼打败',
        '送你快乐，把忧伤击倒',
        '在繁忙的工作中请接受我真挚的诚意和问候',
        '祝你事业红火',
        '事业就像滚雪球，积累是成功的最大理由',
        '胜利在招手，勇敢往前走'
      ]
      this.greetingDesc = list[Math.round(Math.random() * list.length)]
      let text = ''
      const dd = new Date()
      const hour = dd.getHours()
      if (hour > 5 && hour <= 11) {
        text = '上午好'
      } else if (hour > 11 && hour <= 14) {
        text = '中午好'
      } else if (hour > 14 && hour <= 19) {
        text = '下午好'
      } else if ((hour > 19 && hour <= 24) || (hour > 0 && hour <= 5)) {
        text = '晚上好'
      } else {
        text = '早安'
      }
      this.greetingText = text
    },
    // 初始化
    init() {
      this.getDateMonth()
      this.queryStatistics()
    },
    // 查询我的日程
    async queryMyScheduleList() {
      const result = await homeApi.queryMyScheduleList(this.scheduleForm)
      const datas = result.data
      this.scheduleData = {}
      datas.forEach(e => {
        this.scheduleData[e.date] = e.schedule
      })
    },
    // 获取会议类型
    getScheduleType(type) {
      let typeStr = ''
      switch (type) {
        case 1:
          typeStr = '会议'
          break
        default:
          typeStr = '日程'
      }
      return typeStr
    },
    // 数据统计（饼状图）
    async queryStatistics() {
      const result = await homeApi.queryStatistics({})
      const datas = result.data
      // 处理诉求意见统计表 数据
      this.statisticsData.appealOpinions = [
        { value: datas.appealOpinionTodo || null, name: '待处理' },
        { value: datas.appealOpinionDone || null, name: '已处理' }
      ]
      // 处理投诉商家统计表 数据
      this.statisticsData.againstMerchants = [
        { value: datas.complainMerchantTodo || null, name: '待处理' },
        { value: datas.complainMerchantDone || null, name: '已处理' },
        { value: datas.complainMerchantToAssign || null, name: '待指派' }
      ]
      // 处理投诉物业统计表 数据
      this.statisticsData.propertyComplaints = [
        { value: datas.complainPropertyTodo || null, name: '待处理' },
        { value: datas.complainPropertyDone || null, name: '已处理' },
        { value: datas.complainPropertyToAssign || null, name: '待指派' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import './home.scss';
</style>
