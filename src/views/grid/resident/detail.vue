<template>
  <div class="container">
    <el-form ref="form" label-width="110px">
      <el-card header="基本信息">
        <div class="base-info-wrap">
          <el-avatar :key="form.headImage" :size="160" shape="square" :src="form.headImage | imgUrl"></el-avatar>
          <div class="base-info">
            <el-form-item label="姓名">{{ form.name }}</el-form-item>
            <el-form-item label="性别">{{ form.sex | sex }}</el-form-item>
            <el-form-item label="出生年月">{{ form.birthday }}</el-form-item>
            <el-form-item label="身份证">{{ form.identityCardNumber }}</el-form-item>
            <el-form-item label="籍贯">{{ form.nativePlace }}</el-form-item>
            <el-form-item label="民族">{{ form.nationCodeName }}</el-form-item>
            <el-form-item label="联系电话">{{ form.phone }}</el-form-item>
            <el-form-item label="家庭住址">{{ form.familyAddress }}</el-form-item>
            <el-form-item label="工作单位">{{ form.workCompany }}</el-form-item>
            <el-form-item label="人口类型">{{ $getLabel(residentTypeOptions, form.type) }}</el-form-item>
            <el-form-item label="户籍性质">{{ $getLabel(residentStatusOptions, form.status) }}</el-form-item>
            <el-form-item label="政治面貌">{{ form.politicsStatusName }}</el-form-item>
            <el-form-item label="婚姻状况">{{ $getLabel(maritalStatusOptions, form.maritalStatus) }}</el-form-item>
            <el-form-item label="学历">{{ form.educationCodeName }}</el-form-item>
            <el-form-item label="备注">{{ form.remark }}</el-form-item>
            <el-form-item label="微信绑定状态" style="width: 50%">
              <span v-if="form.bindStatus" style="color: #ec3f4f">已绑定（{{ form.bindMobile }}）</span>
              <span v-else style="color: #999">未绑定</span>
            </el-form-item>
          </div>
        </div>
      </el-card>
      <el-row :gutter="15" style="margin-top: 15px">
        <el-col :span="12">
          <el-card header="空间信息">
            <vue-aspect-ratio ar="20:9">
              <swiper
                v-if="bimReady"
                ref="roomSwiper"
                class="room-swiper"
                :options="swiperOptions"
                @slideChange="changeRoom"
              >
                <template v-if="form.roomList && form.roomList.length">
                  <swiper-slide v-for="item in form.roomList" :key="item.roomId">
                    <div class="space-info">
                      <el-form-item label="所属网格">{{ item.orgName }}</el-form-item>
                      <el-form-item label="所属区域">{{ item.regionName }}</el-form-item>
                      <el-form-item label="详细地址">
                        <router-link :to="`/grid/room/${item.roomId}/detail`">
                          {{ item.buildName }}-{{ item.unitName }}-{{ item.floorName }}-{{ item.roomName }}
                        </router-link>
                      </el-form-item>
                      <el-form-item label="租住状态">{{ $getLabel(roomStatusOptions, item.status) }}</el-form-item>
                      <el-form-item label="与业主关系">{{ item.ownersRelationshipName }}</el-form-item>
                    </div>
                  </swiper-slide>
                </template>
                <div slot="button-prev" class="swiper-button-prev"></div>
                <div slot="button-next" class="swiper-button-next"></div>
              </swiper>
              <div v-if="!form.roomList || form.roomList.length === 0" class="empty">
                <svg-icon icon-class="empty" />
                <p>暂无数据</p>
              </div>
              <div class="bim-con">
                <BimView ref="bim" model-id="91BkekYo" @ready="refresh(true)" />
              </div>
            </vue-aspect-ratio>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card header="车辆信息">
            <vue-aspect-ratio ar="20:9">
              <swiper v-if="form.carList.length" ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="item in form.carList" :key="item.licensePlateNumber">
                  <div class="car-info">
                    <el-form-item label="车牌号码">{{ item.licensePlateNumber }}</el-form-item>
                    <el-form-item label="车辆类型">{{ item.typeName }}</el-form-item>
                    <el-form-item label="联系电话">{{ item.mobile }}</el-form-item>
                    <el-form-item label="日常停放地点">{{ item.dailyParkingPlace }}</el-form-item>
                  </div>
                  <el-image fit="cover" :src="item.pictureFileId | imgUrl" alt="" />
                </swiper-slide>
                <div slot="button-prev" class="swiper-button-prev"></div>
                <div slot="button-next" class="swiper-button-next"></div>
              </swiper>
              <div v-else class="empty">
                <svg-icon icon-class="empty" />
                <p>暂无数据</p>
              </div>
            </vue-aspect-ratio>
          </el-card>
        </el-col>
      </el-row>

      <h3 style="margin-top: 15px">党建活动积分记录</h3>
      <CcpRankList :identityCardNumber="form.identityCardNumber"></CcpRankList>
      <h3 style="margin-top: 15px">社群活动积分记录</h3>
      <CommunityRankList :identityCardNumber="form.identityCardNumber"></CommunityRankList>
      <h3 style="margin-top: 15px">其它积分记录</h3>
      <OtherRankList :identityCardNumber="form.identityCardNumber"></OtherRankList>
      <footer-button style="margin-top: 20px">
        <el-button size="large" @click="$back">返回</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import { maritalStatusOptions, sexOptions } from '@/lib/otions'
import { residentStatusOptions, residentTypeOptions, roomStatusOptions } from '../lib/options'
import { getResidentById, updateResident, createResident } from '@/api/grid/resident'
import BimView from '@/components/BBB/bim'

export default {
  name: 'GridResidentDetailTwo',
  components: {
    BimView
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        roomList: [],
        carList: []
      },
      sexOptions,
      roomStatusOptions,
      residentTypeOptions,
      residentStatusOptions,
      maritalStatusOptions,
      swiperOptions: {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      bimReady: false,
      roomIndex: 0
    }
  },
  computed: {
    ccpActivitiList() {
      return []
    },
    communityActivitiList() {
      return []
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    // 监听房间切换
    changeRoom() {
      const roomIndex = this.$refs.roomSwiper && this.$refs.roomSwiper.$swiper.activeIndex
      this.roomIndex = roomIndex
      this.$nextTick(() => {
        this.residentMark()
      })
    },
    refresh(bimReady = false) {
      if (!this.id) {
        return
      }
      this.bimReady = bimReady
      getResidentById(this.id).then(res => {
        this.form = res.data
        bimReady && this.residentMark()
      })
    },
    // 选中构件
    pickElement(guidArray) {
      if (!guidArray || guidArray.length === 0) {
        return
      }
      this.$refs.bim.pickElement(guidArray)
    },
    // 单个人员添加锚点
    residentMark() {
      // 清除锚点
      this.$refs.bim.clearMark()
      const guidArray = this.form.roomList[this.roomIndex].componentIdList
      if (guidArray.length === 0) {
        // 清除选中
        this.$refs.bim.switchView()
        this.$refs.bim.setCameraPickData()
        return
      }
      this.renderModelMark(guidArray)
    },
    // 模型添加锚点
    renderModelMark(array) {
      // 选中构件
      this.pickElement(array)
      this.$refs.bim.setMark({
        eleAry: [array[0]], // 构件idAry
        imgSrc: '/images/bimIcon/icon_keyPersonLocation.png', // 图标路径
        size: 20, // 图标大小
        props: { id: array[0] } // 对应参数
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await createResident(this.form)
        this.$message.success('创建成功')
      } else {
        await updateResident(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
    },
    handleRealNameChange(user) {
      this.matched = true
      this.form = Object.assign(this.form, user)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.base-info-wrap {
  display: flex;
  .el-avatar {
    flex-shrink: 0;
  }
}
.base-info {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 20%;
    padding-right: 15px;
    margin-bottom: 0;
  }
  .el-date-editor {
    width: 100%;
  }
}
.space-info,
.car-info {
  position: relative;
  z-index: 2;
  .el-form-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 5px;
  }
}
.swiper-container {
  height: 100%;
}
.room-swiper {
  height: auto !important;
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: initial;
  .el-image {
    flex: 1;
  }
}
.swiper-button-prev,
.swiper-button-next {
  color: $btnPrimaryColor;
}
.bim-con {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  ::v-deep .bim-tools,
  ::v-deep #cubeBox {
    display: none;
  }
}
</style>
<style>
.swiper-button-disabled {
  display: none;
}
</style>
