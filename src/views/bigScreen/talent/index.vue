<template>
  <div>
    <div class="left">
      <!-- 社群组织与活动 start -->
      <BigCard :icon="require('../images/title/title6.png')" title="社群组织与活动">
        <div class="community-con">
          <div class="community">
            <div class="organizations">
              <div class="left-icon">
                <img src="../images/talent/icon1.png" alt="" />
              </div>
              <div class="right-info">
                <div class="right-number">{{ activityCommunity.orgNum }}</div>
                <div class="info-bottom" @click="communityOrganizeClick">
                  <div class="right-title">社群组织总数</div>
                  <img src="../images/talent/icon3.png" alt="" />
                </div>
              </div>
            </div>
            <div class="action">
              <div class="left-icon">
                <img src="../images/talent/icon2.png" alt="" />
              </div>
              <div class="right-info">
                <div class="right-number">{{ activityCommunity.activityNum }}</div>
                <div class="info-bottom" @click="communityActivityClick">
                  <div class="right-title">社群活动总数</div>
                  <img src="../images/talent/icon3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <EchartsPie
            v-if="activityCommunity.echartsData && activityCommunity.echartsData.length > 0"
            id="communityPie"
            title="社群活动"
            :dataList="activityCommunity.echartsData"
          />
        </div>
      </BigCard>
      <!-- 社群组织与活动 end -->

      <!-- 志愿组织与活动 start -->
      <BigCard :icon="require('../images/title/title7.png')" title="志愿组织与活动">
        <div class="community-con">
          <div class="volunteer">
            <div class="organizations">
              <div class="left-icon">
                <img src="../images/talent/icon4.png" alt="" />
              </div>
              <div class="right-info">
                <div class="right-number">{{ activityVolunteer.orgNum }}</div>
                <div class="info-bottom" @click="volunteerOrganizeClick">
                  <div class="right-title">志愿组织总数</div>
                  <img src="../images/talent/icon3.png" alt="" />
                </div>
              </div>
            </div>
            <div class="action">
              <div class="left-icon">
                <img src="../images/talent/icon2.png" alt="" />
              </div>
              <div class="right-info">
                <div class="right-number">{{ activityVolunteer.activityNum }}</div>
                <div class="info-bottom" @click="volunteerActivityClick">
                  <div class="right-title">志愿活动总数</div>
                  <img src="../images/talent/icon3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <EchartsPie
            v-if="activityVolunteer.echartsData && activityVolunteer.echartsData.length > 0"
            id="votePie"
            title="志愿活动"
            :dataList="activityVolunteer.echartsData"
          />
        </div>
      </BigCard>
      <!-- 志愿组织与活动 end -->
    </div>

    <div class="center">
      <!-- 大图轮播 start -->
      <div class="big-swiper">
        <swiper
          ref="mySwiper"
          :class="{ 'bigSwiper-container': true, 'swiper-no-swiping': swiperTextHeight === '100%' ? true : false }"
          :options="swiperOptions"
        >
          <swiper-slide v-for="(item, index) in dataList" :key="index">
            <img class="swiper-bgImg" :src="getImgUrl(item.surfacePic)" />
            <div class="video-img" @click.stop="openBigSwiper" v-if="item.video && swiperTextHeight === '92px'"></div>
            <div class="swiper-text" :style="{ height: swiperTextHeight }">
              <div class="swiper-titleView">
                <div class="swiper-title">{{ item.title }}</div>
                <div class="open-img" @click.stop="openBigSwiper">
                  <img v-if="swiperTextHeight === '92px'" src="../images/icon-open.png" />
                  <img v-else src="../images/icon-close.png" />
                </div>
              </div>
              <div v-if="swiperTextHeight === '92px'" class="swiper-desc">
                {{ item.contentStr }}
              </div>
              <!-- <video v-if="swiperTextHeight==='100%' && item.video" style="width:50%;height:50%;margin:20px 0 0 9%;object-fit: fill;" controls="controls" autoplay="autoplay">
                <source :src="item.fileUrl" type="video/mp4" />
                您的浏览器不支持 video 标签。
              </video>  -->
              <div v-if="swiperTextHeight === '100%'" class="swiper-RichDesc">
                <video
                  v-if="item.video"
                  :src="item.fileUrl"
                  controls="controls"
                  style="margin: 20px 0 0 22%; width: 50%"
                  autoplay="autoplay"
                >
                  您的浏览器不支持 video 标签。
                </video>
                <div v-html="item.content"></div>
              </div>
            </div>
          </swiper-slide>
          <div v-show="swiperTextHeight === '92px'" id="buttonPrev" slot="button-prev" class="swiper-button-prev"></div>
          <div v-show="swiperTextHeight === '92px'" id="buttonNext" slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </div>
      <!-- 大图轮播 end -->
      <!-- 通知公告 start -->
      <BigCard :icon="require('../images/title/title4.png')" title="通知公告" class="small-container">
        <swiper ref="mySwiperSmall" :options="swiperSmallOptions">
          <swiper-slide v-for="(item, index) in informList" :key="index">
            <div style="width: 100%; height: 100%" @click.stop="handlePropagandaDetail(item)">
              <img :src="getImgUrl(item.surfacePlot)" />
              <div class="swiper-text">
                <div class="title">{{ item.title }}</div>
              </div>
            </div>
          </swiper-slide>
          <div id="buttonSmallPrev" slot="button-prev" class="swiper-button-prev"></div>
          <div id="buttonSmallNext" slot="button-next" class="swiper-button-next"></div>
        </swiper>
      </BigCard>
      <!-- 通知公告 end -->
    </div>

    <div class="right">
      <!-- 党组织与党建活动 start -->
      <BigCard overflow :icon="require('../images/title/title6.png')" title="党组织与党建活动">
        <div class="community-con">
          <div class="party">
            <div class="organizations">
              <div class="left-icon">
                <img src="../images/talent/icon5.png" alt="" />
              </div>
              <div class="right-info">
                <div class="right-number">{{ activityParty.orgNum }}</div>
                <div class="info-bottom" @click="partyOrgClick">
                  <div class="right-title">党组织总数</div>
                  <img src="../images/talent/icon3.png" alt="" />
                </div>
              </div>
            </div>
            <div class="action">
              <div class="left-icon">
                <img src="../images/talent/icon2.png" alt="" />
              </div>
              <div class="right-info">
                <div class="right-number">{{ activityParty.activityNum }}</div>
                <div class="info-bottom" @click="partyActivityClick">
                  <div class="right-title">党建活动总数</div>
                  <img src="../images/talent/icon3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <EchartsPies
            v-if="activityParty.echartsData && activityParty.echartsData.length > 0"
            id="partyPie"
            title="党建活动"
            :dataList="activityParty.echartsData"
          />
        </div>
      </BigCard>
      <!-- 党组织与党建活动 end -->

      <!-- 投票与问卷 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="投票与问卷">
        <div class="community-con">
          <div class="SmoothedTitle">
            <img src="../images/talent/icon6.png" alt="" />
            投票
          </div>
          <EchartsSmoothedLineChart id="partySmoothed" :dataList="voteList" />
          <div class="SmoothedTitle">
            <img src="../images/talent/icon6.png" alt="" />
            问卷
          </div>
          <EchartsSmoothedLineChart id="partySmootheds" :dataList="questionnaireList" />
        </div>
      </BigCard>
      <!-- 投票与问卷 end -->
    </div>
    <!-- 组织弹窗 start -->
    <ElDialog ref="organizeDialog" :dialogTitle="organizeDialogTitle" @dialogClose="dialogClose">
      <div v-if="!showOrgDetail" class="DialogForm">
        <el-form inline>
          <el-form-item>
            <el-input v-model="organizeFilterForm.name" placeholder="组织名称"></el-input>
          </el-form-item>
          <el-form-item label="组织类型：">
            <Select v-model="organizeFilterForm.serviceType" :arg-group="orgArgGroup" has-all />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="organizeSearch()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="$refs.organizeTable.reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Grid
        v-if="!showOrgDetail"
        ref="organizeTable"
        :request="organizationData"
        :isPagination="true"
        :filter-form.sync="organizeFilterForm"
        height="100%"
      >
        <vxe-table-column show-overflow title="组织名称" field="name" />
        <vxe-table-column show-overflow title="组织类型" field="serviceTypeName" />
        <vxe-table-column show-overflow title="负责人" field="leader" />
        <vxe-table-column show-overflow title="手机号" field="phone" />
        <vxe-table-column show-overflow title="成员人数" field="memberNum" />
        <vxe-table-column show-overflow title="发起活动数量" field="activityNum" />
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <div style="cursor: pointer; color: #ff2f29" @click="seeOrgRowEvent(row.id)">查看详情</div>
          </template>
        </vxe-table-column>
      </Grid>
      <OrganizeDetail v-if="showOrgDetail" :id="orgId" @goBack="showOrgDetail = false" />
    </ElDialog>
    <!-- 组织弹窗 end -->

    <!-- 活动弹窗 start -->
    <ElDialog ref="activityDialog" :dialogTitle="activityDialogTitle" @dialogClose="dialogClose">
      <div v-if="!showActDetail" class="DialogForm">
        <el-form inline>
          <el-form-item>
            <el-input v-model="activityFilterForm.name" placeholder="活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动类型：">
            <Select v-model="activityFilterForm.type" :arg-group="actArgGroup" has-all />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="activitySearch()">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="$refs.activityTable.reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Grid
        v-if="!showActDetail"
        ref="activityTable"
        :request="activityListData"
        :filter-form.sync="activityFilterForm"
        :isPagination="true"
        height="100%"
      >
        <vxe-table-column show-overflow title="活动名称" field="name" />
        <vxe-table-column show-overflow title="活动类型" field="typeName" />
        <vxe-table-column show-overflow title="活动状态" field="status">
          <template #default="{ row }">
            <div v-if="row.status == 0">未开始</div>
            <div v-if="row.status == 1">进行中</div>
            <div v-if="row.status == 2">已结束</div>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow title="活动开始时间" field="activityBeginTime" />
        <vxe-table-column show-overflow title="活动结束时间" field="activityEndTime" />
        <vxe-table-column show-overflow title="发起组织" field="organizationName" />
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <div style="cursor: pointer; color: #ff2f29" @click="seeActRowEvent(row.id)">查看详情</div>
          </template>
        </vxe-table-column>
      </Grid>
      <ActivityDetail v-if="showActDetail" :id="actId" @goBack="showActDetail = false" />
    </ElDialog>
    <!-- 活动弹窗 end -->

    <!-- 党组织弹窗 start -->
    <ElDialog ref="partyOrgDialog" dialogTitle="党组织">
      <Grid
        v-if="showPartyOrgDetail"
        ref="partyOrgTable"
        :request="partyOrgListData"
        :isPagination="true"
        height="100%"
      >
        <vxe-table-column show-overflow title="党组织名称" field="name" />
        <vxe-table-column show-overflow title="上级单位" field="pname" />
        <vxe-table-column show-overflow title="党组织地址" field="address" />
        <vxe-table-column show-overflow title="党组织负责人" field="principal" />
        <vxe-table-column show-overflow title="联系电话" field="phone" />
        <vxe-table-column show-overflow title="成员数量" field="count" />
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <div style="cursor: pointer; color: #ff2f29" @click="seePartyOrgRowEvent(row.id)">查看成员</div>
          </template>
        </vxe-table-column>
      </Grid>
      <PartyOrgDetail v-if="!showPartyOrgDetail" :id="partyOrgId" @goBack="showPartyOrgDetail = true" />
    </ElDialog>
    <!-- 党组织弹窗 end -->
    <!-- 公告详情弹窗 start -->
    <ElDialog ref="propagandaDetailDialog" dialogTitle="通知公告" @dialogClose="dialogClose">
      <div class="dialog-info col2">
        <el-form ref="form" label-width="100px">
          <el-form-item label="发布党组织">
            {{ dialogData.propagandaDetail.parentName }}
          </el-form-item>
          <el-form-item label="公告标题">
            {{ dialogData.propagandaDetail.title }}
          </el-form-item>
          <el-form-item label="公告类型">
            {{ dialogData.propagandaDetail.typeName }}
          </el-form-item>
          <el-form-item label="创建人">
            {{ dialogData.propagandaDetail.creatorName }}
          </el-form-item>
          <el-form-item label="创建时间">
            {{ dialogData.propagandaDetail.createTime }}
          </el-form-item>
          <el-form-item label="发布状态">
            {{ $getLabel(noticePublicStatusList, dialogData.propagandaDetail.status) }}
          </el-form-item>
          <el-form-item label="发布时间">
            {{ dialogData.propagandaDetail.checkTime }}
          </el-form-item>
          <el-form-item label="接收人">
            {{ dialogData.propagandaDetail.recipientName }}
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item label="封面图片" style="width: 100%">
            <img style="width: 50%; margin-top: 10px" :src="dialogData.propagandaDetail.surfacePlot | imgUrl" />
          </el-form-item>
          <el-form-item label="公告内容" style="width: 100%">
            <div v-html="dialogData.propagandaDetail.content"></div>
          </el-form-item>
          <el-form-item label="公告标签" style="width: 100%">
            <el-tag
              v-for="item of dialogData.propagandaDetail.label ? dialogData.propagandaDetail.label.split(',') : []"
              :key="item"
              style="margin: 0 5px"
              size="mini"
              >{{ item }}</el-tag
            >
          </el-form-item>
          <el-form-item label="是否置顶">
            {{ dialogData.propagandaDetail.topFlag === 0 ? '否' : '是' }}
          </el-form-item>
        </el-form>
      </div>
    </ElDialog>
    <!-- 公告详情弹窗 end -->
  </div>
</template>

<script>
import BigCard from '../components/BigCard' // 卡片
import EchartsPie from '../components/EchartsPie' // 普通饼图
import EchartsPies from '../components/EchartsPie_s' // 南丁格尔玫瑰图
import EchartsSmoothedLineChart from '../components/EchartsSmoothedLineChart' // 基础平滑折线图
import ElDialog from '../components/ElDialog' // 弹窗
import OrganizeDetail from './organizeDetail' // 组织详情
import ActivityDetail from './activityDetail' // 活动详情
import PartyOrgDetail from './partyOrgDetail' // 党组织详情
import Api from '../api/talent'
import { getImgUrl } from '@/plugins/axios'
import noticePublicStatusList from '@/lib/noticePublicStatusList'

export default {
  components: {
    BigCard,
    EchartsPie,
    EchartsPies,
    EchartsSmoothedLineChart,
    ElDialog,
    OrganizeDetail,
    ActivityDetail,
    PartyOrgDetail
  },
  data() {
    // 这里存放数据
    return {
      noticePublicStatusList,
      organizeFilterForm: {
        // 组织
        type: null
      },
      activityFilterForm: {
        // 活动
        module: null
      },
      // 活动相关数据
      activityListData(body) {
        return Api.queryActivityList(body)
      },
      // 组织相关数据
      organizationData(body) {
        return Api.queryOrganizationList(body)
      },
      // 党组织相关数据
      partyOrgListData(body) {
        return Api.queryPartyOrgList(body)
      },
      orgId: '', // 查看详情时的组织id
      actId: '', // 查看详情时的活动id
      partyOrgId: '', // 查看详情时的党组织id
      showOrgDetail: false, // 控制组织详情是否显示
      showActDetail: false, // 控制活动详情是否显示
      showPartyOrgDetail: true, // 控制党组织详情是否显示
      orgArgGroup: '', // 组织参数分组
      actArgGroup: '', // 活动参数分组
      organizeDialogTitle: '', // 组织弹窗标题
      activityDialogTitle: '', // 活动弹窗标题
      activityVolunteer: '', // 志愿组织
      activityCommunity: '', // 社群组织
      activityParty: '', // 党组织
      dataList: [], // 大图轮播
      informList: [], // 通知公告
      voteList: [], // 投票数据
      questionnaireList: [], // 问卷数据
      getImgUrl,
      bigSwiper: null,
      swiperTextHeight: '92px',
      swiperOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // loop: true,
        navigation: {
          nextEl: '#buttonNext',
          prevEl: '#buttonPrev'
        }
      },
      swiperSmallOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        // loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '#buttonSmallNext',
          prevEl: '#buttonSmallPrev'
        }
      },
      // 模态框数据
      dialogData: {
        propagandaDetail: {}
      }
    }
  },
  // 计算属性
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    smallSwiper() {
      return this.$refs.mySwiperSmall.$swiper
    }
  },
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
    // console.log("this is current swiper instance object", this.swiper);
  },
  // 方法集合
  methods: {
    openBigSwiper() {
      if (this.swiperTextHeight === '92px') {
        this.swiperTextHeight = '100%'
        // 暂停
        this.swiper.autoplay.stop()
        return false
      }
      if (this.swiperTextHeight === '100%') {
        this.swiperTextHeight = '92px'
        // 开启
        this.swiper.autoplay.start()
        return false
      }
    },
    // 组织弹窗点击查询
    organizeSearch() {
      this.$refs.organizeTable.refresh()
    },
    // 活动弹窗点击查询
    activitySearch() {
      this.$refs.activityTable.refresh()
    },
    // 组织查看详情
    seeOrgRowEvent(id) {
      this.orgId = id
      this.showOrgDetail = true
    },
    // 活动查看详情
    seeActRowEvent(id) {
      this.actId = id
      this.showActDetail = true
    },
    // 党组织查看详情
    seePartyOrgRowEvent(id) {
      this.partyOrgId = id
      console.log(this.partyOrgId)
      this.showPartyOrgDetail = false
    },
    // 点击社群组织
    communityOrganizeClick() {
      this.organizeFilterForm.type = 1
      this.organizeDialogTitle = '社群组织'
      this.orgArgGroup = 'unityType'
      this.$refs.organizeDialog.dialogVisible = true
      if (this.$refs.organizeTable) {
        this.$refs.organizeTable.refresh()
      }
    },
    // 点击社群活动
    communityActivityClick() {
      this.activityFilterForm.module = 1
      this.activityDialogTitle = '社群活动'
      this.actArgGroup = 'activityType'
      this.$refs.activityDialog.dialogVisible = true
      if (this.$refs.activityTable) {
        this.$refs.activityTable.refresh()
      }
    },
    // 点击志愿组织
    volunteerOrganizeClick() {
      this.organizeFilterForm.type = 0
      this.organizeDialogTitle = '志愿组织'
      this.orgArgGroup = 'serviceType'
      this.$refs.organizeDialog.dialogVisible = true
      if (this.$refs.organizeTable) {
        this.$refs.organizeTable.refresh()
      }
    },
    // 点击志愿活动
    volunteerActivityClick() {
      this.activityFilterForm.module = 0
      this.activityDialogTitle = '志愿活动'
      this.actArgGroup = 'activityType'
      this.$refs.activityDialog.dialogVisible = true
      if (this.$refs.activityTable) {
        this.$refs.activityTable.refresh()
      }
    },
    // 点击党组织
    partyOrgClick() {
      this.$refs.partyOrgDialog.dialogVisible = true
    },
    // 点击党建活动
    partyActivityClick() {
      this.activityFilterForm.module = 2
      this.activityDialogTitle = '党建活动'
      this.actArgGroup = 'ccpActivityType'
      this.$refs.activityDialog.dialogVisible = true
      if (this.$refs.activityTable) {
        this.$refs.activityTable.refresh()
      }
    },
    // 点击通知公告详情
    async handlePropagandaDetail(item) {
      console.log('查看详情')
      this.$refs.propagandaDetailDialog.dialogVisible = true
      // 暂停
      this.smallSwiper.autoplay.stop()
      const res = await Api.getInformGetDetail(item.id)
      this.dialogData.propagandaDetail = res.data || {}
    },
    // 弹窗关闭
    dialogClose() {
      if (this.showOrgDetail) this.showOrgDetail = false
      if (this.showActDetail) this.showActDetail = false
      this.organizeFilterForm = {
        type: this.organizeFilterForm.type
      }
      this.activityFilterForm = {
        module: this.activityFilterForm.module
      }
      // 开启
      this.smallSwiper.autoplay.start()
    },
    // 初始化
    init() {
      this.getActivityList()
      this.getInformList()
      this.queryElegantDemeanorList()
      this.queryQuestionnaireAndVote()
    },
    // 查询社区风采列表
    async queryElegantDemeanorList() {
      const result = await Api.queryElegantDemeanorList()
      const datas = result.data
      datas.forEach(e => {
        e.contentStr = e.content ? e.content.replace(/<.*?>/g, '') : ''
        e.contentStr = e.contentStr ? e.contentStr.replace(/&nbsp;/g, '') : ''
      })
      this.dataList = datas
      this.dataList.forEach(item => {
        item.fileUrl = ''
        this.getVideoUrl(item)
      })
    },
    // 查询投票与问卷
    async queryQuestionnaireAndVote() {
      const result = await Api.queryQuestionnaireAndVoteList()
      const datas = result.data
      if (datas.vote && datas.questionnaire) {
        const voteData = []
        const questionnaireData = []
        for (let i = 1; i <= 12; i++) {
          const monthName = i + '月'
          voteData.push(datas.vote[monthName])
          questionnaireData.push(datas.questionnaire[monthName])
        }
        // console.log(voteData, questionnaireData)
        this.voteList = voteData
        this.questionnaireList = questionnaireData
      }
    },
    // 获取视频地址
    async getVideoUrl(item) {
      if (item.video) {
        const result = await Api.getVideoUrl(item.video)
        const datas = result.data
        item.fileUrl = datas.fileUrl
      }
    },
    // 大屏活动信息列表
    async getActivityList() {
      const result = await Api.activityList()
      const datas = result.data
      console.log(datas, '大屏活动信息')
      // 处理大屏活动信息数据
      datas.forEach(item => {
        const newArr = []
        item.activity.forEach(e => {
          newArr.push({
            name: e.typeName,
            value: e.num
          })
        })
        item.echartsData = newArr
        switch (item.type) {
          case 0:
            this.activityVolunteer = item
            break
          case 1:
            this.activityCommunity = item
            break
          case 2:
            this.activityParty = item
            break
        }
      })
    },
    // 通知公告-列表
    async getInformList() {
      const result = await Api.queryInformList()
      const datas = result.data
      this.informList = datas
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
@import './talent.scss';
</style>
