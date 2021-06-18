<template>
  <div>
    <div class="left">
      <!-- 便民服务数量累计（当月） start -->
      <BigCard overflow :icon="require('../images/title/title6.png')" title="便民服务数量累计（当月）">
        <div class="convenientService">
          <div v-for="(item, index) in convenientService" :key="index" class="convenientService-item">
            <div class="item-title">
              <h3>{{ item.type }}</h3>
            </div>
            <div class="item-number">
              <div class="number-left">{{ item.completed }}</div>
              <div class="number-right">{{ item.dealing }}</div>
            </div>
          </div>
        </div>
      </BigCard>
      <!-- 便民服务数量累计（当月） end -->

      <!-- 便民服务满意度TOP5 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="便民服务满意度TOP5">
        <div v-for="(item, index) in customColors" :key="index" class="service-ranking">
          <img v-if="index < 3" :src="require(`../images/handyService/top-${index + 1}.png`)" alt="" />
          <h3 v-else>NO.{{ index + 1 }}</h3>
          <el-progress
            style="width: 86%"
            :show-text="false"
            :percentage="90 - index * 20"
            :color="progressColorsList[index]"
          ></el-progress>
          <h3 class="ranking-title">{{ item.type }}</h3>
        </div>
      </BigCard>
      <!-- 便民服务满意度TOP5 end -->
    </div>

    <div class="center">
      <!-- 活动室 start -->
      <BigCard overflow :icon="require('../images/title/title4.png')" title="活动室">
        <div class="room-con">
          <iframe
            src="https://a5ejehutw.720think.com/t/a5ejehutw?def_sid=1081692"
            width="100%"
            style="flex: 1"
            frameborder="0"
          ></iframe>
          <!-- <div class="Activity-room">
            <div
              v-for="(item, index) in activityRoomList"
              :key="index"
              :class="{ 'room-item': true, 'active-item': activityRoomIndex == index ? true : false }"
              @click="clickActivityRoom(index)"
            >
              {{ item.name }}
            </div>
          </div> -->
          <el-tabs class="handyService-tabs" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in activityRoomList" :key="index" :label="item.name" />
          </el-tabs>
          <div v-if="activityRoomList.length" class="Activity-detail">
            <div>
              <div class="detail-title">活动室位置：</div>
              <div class="detail-content">{{ currentActivityRoom.location }}</div>
            </div>
            <div>
              <div class="detail-title">开放时间：</div>
              <div class="detail-content">{{ currentActivityRoom.openTime }}</div>
            </div>
            <div>
              <div class="detail-title">可预约人数：</div>
              <div class="detail-content">{{ currentActivityRoom.appointmentCount }}人</div>
            </div>
            <div>
              <div class="detail-title">负责人：</div>
              <div class="detail-content">{{ currentActivityRoom.principal }}</div>
            </div>
            <div>
              <div class="detail-title">联系电话：</div>
              <div class="detail-content">{{ currentActivityRoom.phone }}</div>
            </div>
            <div>
              <div class="detail-title">备注：</div>
              <div class="detail-content">{{ currentActivityRoom.remark }}</div>
            </div>
          </div>
          <div class="room-swiper">
            <swiper ref="mySwiperSmall" :options="swiperSmallOptions">
              <swiper-slide v-for="(item, index) in currentRoomImagesList" :key="index">
                <img :src="item.fileUrl" />
              </swiper-slide>
              <div id="buttonSmallPrev" slot="button-prev" class="swiper-button-prev"></div>
              <div id="buttonSmallNext" slot="button-next" class="swiper-button-next"></div>
            </swiper>
          </div>
        </div>
      </BigCard>
      <!-- 活动室 end -->
    </div>

    <div class="right">
      <!-- 社区配套 start -->
      <BigCard overflow :icon="require('../images/title/title6.png')" title="社区配套">
        <div class="Community-support">
          <div v-for="(item, index) in communitySupport" :key="index" class="communitySupport-item">
            <img :src="item.icon" alt="" />
            <h3 class="ranking-title">{{ item.title }}</h3>
          </div>
        </div>
      </BigCard>
      <!-- 社区配套 end -->

      <!-- 积分兑换记录 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="积分兑换记录">
        <Grid ref="table" :request="request" :isPagination="false" height="100%">
          <vxe-table-column title="兑换商品" field="giftName" />
          <vxe-table-column title="兑换人" field="realName" />
          <vxe-table-column title="兑换时间" field="orderSubmitTime" formatter="ymd" />
        </Grid>
      </BigCard>
      <!-- 积分兑换记录 end -->

      <!-- 社区居民积分排行 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="社区居民积分排行">
        <div v-for="(item, index) in integralRanking" :key="index" class="integral-ranking">
          <div v-if="index < 3" class="rowNo">
            <img :src="require(`../images/handyService/top-${index + 1}.png`)" alt="" />
          </div>
          <div v-else class="rowNo">NO.{{ index + 1 }}</div>
          <div class="ranking-name">{{ item.name }}</div>
          <div class="ranking-sex">{{ item.sex == '1' ? '男' : '女' }}</div>
          <div class="ranking-phone">{{ item.phone ? item.phone : '秘密' }}</div>
          <div class="ranking-integral">{{ item.totalScore }}</div>
        </div>
      </BigCard>
      <!-- 社区居民积分排行 end -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BigCard from '../components/BigCard' // 卡片
import EchartsPie from '../components/EchartsPie' // 环形图
import Api from '../api/handyService'
import { getFileUrlByIds } from '@/api/file'
export default {
  components: {
    BigCard,
    EchartsPie
  },
  data() {
    // 这里存放数据
    return {
      swiperSmallOptions: {
        autoplay: {
          delay: 3000
        },
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '#buttonSmallNext',
          prevEl: '#buttonSmallPrev'
        }
      },
      request: async () => {
        const params = {
          page: 1,
          rows: 20
        }
        const result = await Api.scoreConvertList(params)
        return result
      },
      // request: async () => {
      //   return {
      //     data: {
      //       total: 3,
      //       records: [
      //         {
      //           title: '洗衣液大桶',
      //           typeName: '杨素民',
      //           createTime: '2021/5/10'
      //         },
      //         {
      //           title: '飘柔洗发水',
      //           typeName: '李姗姗',
      //           createTime: '2021/5/9'
      //         },
      //         {
      //           title: '保温杯',
      //           typeName: '朱黎明',
      //           createTime: '2021/5/8'
      //         },
      //         {
      //           title: '电池',
      //           typeName: '谢飞飞',
      //           createTime: '2021/5/7'
      //         },
      //         {
      //           title: '剪刀',
      //           typeName: '叶欣晨',
      //           createTime: '2021/5/6'
      //         },
      //         {
      //           title: '洗衣液',
      //           typeName: '曹爱民',
      //           createTime: '2021/5/5'
      //         },
      //         {
      //           title: '洗洁精大桶',
      //           typeName: '孙纯英',
      //           createTime: '2021/5/4'
      //         },
      //         {
      //           title: '衣架',
      //           typeName: '孙丽琴',
      //           createTime: '2021/5/3'
      //         },
      //         {
      //           title: '保鲜袋',
      //           typeName: '李红利',
      //           createTime: '2021/5/2'
      //         },
      //         {
      //           title: '保鲜膜',
      //           typeName: '程雅文',
      //           createTime: '2021/5/1'
      //         }
      //       ]
      //     }
      //   }
      // },
      convenientService: [
        // '社保服务',
        // '低保服务',
        // '助残服务',
        // '治安两劳',
        // '敬老服务',
        // '妇联服务',
        // '计生服务',
        // '环境卫生',
        // '农务补贴',
        // '代收服务',
        // '股东服务',
        // '纠纷调解',
        // '商铺管理',
        // '社区形象'
      ],
      activityRoom: ['乒乓球室', '书画院', '健身室', '舞蹈活动室', '阅览室', '未成年人活动室'],
      progressColorsList: ['#ff5d4d', '#ff9d3c', '#2bd0df', '#2b84df', '#ad5efd'],
      customColors: [
        // { title: '社保服务', color: '#ff5d4d', percentage: 90},
        // { title: '环境卫生', color: '#ff9d3c', percentage: 80},
        // { title: '敬老服务', color: '#2bd0df', percentage: 60},
        // { title: '助残服务', color: '#2b84df', percentage: 40},
        // { title: '低保服务', color: '#ad5efd', percentage: 20}
      ],
      communitySupport: [
        { title: '乒乓球室', icon: require('../images/handyService/communitySupport-icon1.png') },
        { title: '书画院', icon: require('../images/handyService/communitySupport-icon2.png') },
        { title: '健身室', icon: require('../images/handyService/communitySupport-icon3.png') },
        { title: '舞蹈活动室', icon: require('../images/handyService/communitySupport-icon4.png') },
        { title: '阅览室', icon: require('../images/handyService/communitySupport-icon5.png') },
        { title: '未成年人活动室', icon: require('../images/handyService/communitySupport-icon6.png') }
      ],
      integralRanking: [
        // {
        //   name: '刘莲香',
        //   sex: '女',
        //   phone: '12号楼',
        //   totalScore: '115',
        //   icon: require('../images/handyService/top-1.png')
        // },
        // {
        //   name: '杨东晓',
        //   sex: '男',
        //   phone: '10号楼',
        //   totalScore: '109',
        //   icon: require('../images/handyService/top-2.png')
        // },
        // {
        //   name: '崔大发',
        //   sex: '男',
        //   phone: '8号楼',
        //   totalScore: '102',
        //   icon: require('../images/handyService/top-3.png')
        // },
        // { name: '单秀清', sex: '女', phone: '6号楼', totalScore: '95' },
        // { name: '刘见彬', sex: '男', phone: '13号楼', totalScore: '93' },
        // { name: '郭妙玲', sex: '女', phone: '2号楼', totalScore: '89' },
        // { name: '庄竹青', sex: '女', phone: '4号楼', totalScore: '80' },
        // { name: '张治国', sex: '男', phone: '7号楼', totalScore: '75' },
        // { name: '杨爱换', sex: '女', phone: '9号楼', totalScore: '62' },
        // { name: '贠新亚', sex: '男', phone: '11号楼', totalScore: '55' }
      ],
      activityRoomIndex: 0, //当前选中活动室索引
      activityRoomList: [], //所有活动室列表
      currentActivityRoom: '', //当前选中活动室
      currentRoomImagesList: [] //当前活动室图片列表
    }
  },
  watch: {
    activityRoomIndex(newVal, oldVal) {
      this.currentRoomImagesList = []
      this.currentActivityRoom = this.activityRoomList[newVal]
      this.currentRoomImagesList = this.activityRoomList[newVal].roomImagesList
      console.log(1111, this.activityRoomList, newVal, this.currentRoomImagesList)
    }
  },
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  // 方法集合
  methods: {
    // 初始化
    init() {
      this.getActivityRoomList()
      this.getScoreConvertList()
      this.getScoreRankingList()
      this.getConvenientRankList()
      this.getConvenientList()
    },
    // 活动室列表
    async getActivityRoomList() {
      const params = {}
      const result = await Api.activityRoomList(params)
      const datas = result.data
      this.activityRoomList = datas
      this.activityRoomList.forEach(item => {
        this.getRoomImagesList(item)
      })
      // console.log(this.activityRoomList,'活动室列表qqqqqqqqqqq');
      this.currentActivityRoom = this.activityRoomList[this.activityRoomIndex]
    },
    async getRoomImagesList(item) {
      if (item.roomImages == '' || item.roomImages == null) return
      const arr = item.roomImages.split(',')
      const list = await getFileUrlByIds(arr)
      item.roomImagesList = list.data || []
      this.currentRoomImagesList = this.activityRoomList[this.activityRoomIndex].roomImagesList
    },
    // 积分兑换记录列表
    async getScoreConvertList() {
      const params = {}
      const result = await Api.scoreConvertList(params)
      const datas = result.data
      console.log(datas, '积分兑换记录列表')
    },
    // 积分兑换记录列表
    async getScoreRankingList() {
      const result = await Api.scoreRankingList()
      const datas = result.data
      console.log(datas, '社区居民积分排名列表')
      this.integralRanking = datas
    },
    // 便民服务满意度排行-列表
    async getConvenientRankList() {
      const params = {}
      const result = await Api.convenientRankList(params)
      const datas = result.data
      console.log(datas, '便民服务满意度排行列表')
      this.customColors = datas.records
    },
    //查询便民服务列表
    async getConvenientList() {
      const params = {}
      const result = await Api.convenientList(params)
      const datas = result.data
      console.log(datas, '查询便民服务列表')
      this.convenientService = datas.records
    },
    // 点击活动室列表
    clickActivityRoom(index) {
      if (this.activityRoomIndex == index) {
        return false
      }
      this.activityRoomIndex = index
    },
    // 点击el-tabs
    handleClick(tab) {
      // console.log(tab.index);
      this.clickActivityRoom(tab.index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
@import './handyService.scss';
</style>
