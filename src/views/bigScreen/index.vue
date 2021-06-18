<template>
  <div class="big-screen">
    <div class="screen-header">
      <img class="logo" src="./images/logo.png" @click="goHome()" />
      <div class="menu">
        <ul>
          <li v-for="(route, i) in routerList" :key="i">
            <router-link :to="route.path">{{ route.meta.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="nav-right-con">
        <div class="nav-right">
          <div class="time">
            <div class="hms">{{ hms }}</div>
            <div class="ymd">{{ ymd }}</div>
          </div>
          <div class="line"></div>
          <div class="weather">
            <div v-if="weatherInfo.weatherPic">
              <span class="icon" :class="weatherInfo.weatherPic.split(',')[0]"></span>
            </div>
            <div v-if="weatherInfo.weather" class="icon-text">{{ weatherInfo.weather }}</div>
            <div v-if="weatherInfo.temperature" class="temperature">{{ weatherInfo.temperature }}°C</div>
          </div>
          <!-- <div class="line"></div>
          <div class="user-info">
            <el-avatar
              icon="el-icon-user-solid"
              class="user-avatar"
              :src="avatar + '?imageView2/1/w/100/h/100'"
              :size="30"
            ></el-avatar>
            <div class="user-name">
              {{ name }}
            </div>
          </div> -->
        </div>
      </div>
      <div class="header-right"></div>
    </div>
    <div class="screen-body">
      <router-view :key="key" />
    </div>
    <div class="map3d">
      <div v-if="showTools" class="map-tools">
        <!-- 2D 工具条 start -->
        <template v-if="!bimType">
          <!-- 企业检索工具条 start -->
          <div class="tools-item">
            <span
              class="tools-btn"
              :class="{ active: toolsFormModal.enterpriseOpen }"
              @click="openTools('enterpriseOpen', 'enterpriseListOpen')"
            >
              <img v-if="!toolsFormModal.enterpriseOpen" src="./images/bimIcon/enterprise.png" />
              <img v-else src="./images/bimIcon/enterprise-hover.png" />
            </span>
            <div class="tools-body" :class="{ open: toolsFormModal.enterpriseOpen }">
              <div class="tools-search">
                <el-input
                  v-model="toolsForm.enterpriseKey"
                  placeholder="企业名称/统一社会信用代码"
                  class="input-with-select"
                  @keyup.enter.native="openToolsList('enterpriseListOpen')"
                >
                  <el-button
                    slot="append"
                    type="text"
                    icon="el-icon-search"
                    @click="openToolsList('enterpriseListOpen')"
                  ></el-button>
                </el-input>
              </div>
              <div
                class="tools-list"
                :class="{
                  open: toolsFormModal.enterpriseOpen && toolsFormModal.enterpriseListOpen,
                  noData: toolsForm.enterpriseList.length === 0
                }"
              >
                <ul>
                  <li v-for="(item, i) in toolsForm.enterpriseList" :key="i">
                    <div class="box">
                      <div class="box-desc">
                        <p class="name-con" @click="addMarkerEnterprise(item)">
                          <b class="name">{{ item.name }}</b>
                          <img src="./images/bimIcon/location.png" />
                        </p>
                        <p>
                          <label class="label">行业类别：</label>
                          <span>{{ item.companyIndustryName }}</span>
                        </p>
                        <p>
                          <label class="label">法人：</label>
                          <span>{{ item.legalPerson }}</span>
                        </p>
                        <p>
                          <label class="label">联系人：</label>
                          <span>{{ item.linkman }}</span>
                        </p>
                        <p>
                          <label class="label">联系人电话：</label>
                          <span>{{ item.linkmanMobile }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li v-if="toolsForm.enterpriseList.length === 0">
                    <div class="empty">
                      <svg-icon icon-class="empty" />
                      <p>暂无数据</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 企业检索工具条 start -->
          <!-- 车辆检索工具条 start -->
          <div class="tools-item car-item">
            <span
              class="tools-btn"
              :class="{ active: toolsFormModal.carOpen }"
              @click="openTools('carOpen', 'carListOpen')"
            >
              <img v-if="!toolsFormModal.carOpen" src="./images/bimIcon/car.png" />
              <img v-else src="./images/bimIcon/car-hover.png" />
            </span>
            <div class="tools-body" :class="{ open: toolsFormModal.carOpen }">
              <div class="tools-search">
                <el-input
                  v-model="toolsForm.carKey"
                  placeholder="请输入车牌号"
                  class="input-with-select"
                  @keyup.enter.native="openToolsList('carListOpen')"
                >
                  <el-button
                    slot="append"
                    type="text"
                    icon="el-icon-search"
                    @click="openToolsList('carListOpen')"
                  ></el-button>
                </el-input>
              </div>
              <div
                class="tools-list"
                :class="{
                  open: toolsFormModal.carOpen && toolsFormModal.carListOpen,
                  noData: toolsForm.carList.length === 0
                }"
              >
                <ul>
                  <li v-for="(item, i) in toolsForm.carList" :key="i">
                    <div class="box">
                      <div class="box-desc">
                        <p class="name-con">
                          <b class="name" @click="getDetailsCar(item.id)">{{ item.licensePlateNumber }}</b>
                        </p>
                        <p>
                          <label class="label">车辆类别：</label>
                          <span>{{ item.typeName }}</span>
                        </p>
                        <p>
                          <label class="label">车辆所属：</label>
                          <span>{{ $getLabel(carBelongType, item.ownershipFlag) }}</span>
                        </p>
                        <p>
                          <label class="label">个人/企业：</label>
                          <span>{{ item.ownershipDataName }}</span>
                        </p>
                        <p>
                          <label class="label">联系电话：</label>
                          <span>{{ item.mobile }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li v-if="toolsForm.carList.length === 0">
                    <div class="empty">
                      <svg-icon icon-class="empty" />
                      <p>暂无数据</p>
                    </div>
                  </li>
                </ul>
              </div>
              <ElDialog ref="carDetailsDialog" dialogTitle="车辆详情">
                <div class="dialog-info">
                  <el-form ref="form" label-width="140px">
                    <el-form-item label="车牌号" prop="licensePlateNumber">
                      <span>{{ dialogData.carInfo.licensePlateNumber || '--' }}</span>
                    </el-form-item>
                    <el-form-item label="车辆所属" prop="ownershipFlag">
                      <span>{{ $getLabel(carBelongType, dialogData.carInfo.ownershipFlag) || '--' }}</span>
                    </el-form-item>
                    <el-form-item label="个人/企业" prop="ownershipDataName">
                      <span>{{ dialogData.carInfo.ownershipDataName || '--' }}</span>
                    </el-form-item>
                    <el-form-item label="车辆类型" prop="type">
                      <span>{{ dialogData.carInfo.typeName || '--' }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="mobile">
                      <span>{{ dialogData.carInfo.mobile || '--' }}</span>
                    </el-form-item>
                    <el-form-item label="日常停放地点" prop="dailyParkingPlace">
                      <span>{{ dialogData.carInfo.dailyParkingPlace || '--' }}</span>
                    </el-form-item>
                    <el-form-item label-width="0" style="width: 100%" prop="pictureFileId">
                      <img
                        :key="dialogData.carInfo.pictureFileId"
                        :src="dialogData.carInfo.pictureFileId | imgUrl"
                        alt=""
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </ElDialog>
            </div>
          </div>
          <!-- 车辆检索工具条 end -->
          <!-- 图层工具条 start -->
          <div class="tools-item setting-item">
            <div class="tools-body" :class="{ open: toolsFormModal.settingOpen }">
              <div class="tools-list" :class="{ open: toolsFormModal.settingOpen }">
                <ul>
                  <li>
                    <div class="box">
                      <div class="box-title">图层</div>
                      <el-checkbox-group v-model="toolsForm.settingGridKey" @change="changeSettingGrid">
                        <el-checkbox :label="1">网格区域</el-checkbox>
                      </el-checkbox-group>
                      <el-checkbox-group v-model="toolsForm.settingKey" @change="queryGridLocation">
                        <el-checkbox :label="1">党组织</el-checkbox>
                        <el-checkbox :label="2">重点区域</el-checkbox>
                        <el-checkbox :label="3">企业分布</el-checkbox>
                        <!-- <el-checkbox :label="4">重点人员</el-checkbox> -->
                        <el-checkbox :label="5">物业组织</el-checkbox>
                        <el-checkbox :label="6">重要事件</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span
              class="tools-btn"
              :class="{ active: toolsForm.settingOpen }"
              @click="openTools('settingOpen', 'settingListOpen')"
            >
              <img v-if="!toolsForm.settingOpen" src="./images/bimIcon/setting.png" />
              <img v-else src="./images/bimIcon/setting-hover.png" />
            </span>
          </div>
          <!-- 图层工具条 start -->
        </template>
        <!-- 2D 工具条 start -->

        <!-- 3D 工具条 start -->
        <template v-if="bimType && bimIsRead">
          <!-- 人员检索工具条 start -->
          <div class="tools-item">
            <span
              class="tools-btn"
              :class="{ active: toolsFormModal.personnelOpen }"
              @click="openTools('personnelOpen', 'personnelListOpen')"
            >
              <img v-if="!toolsFormModal.personnelOpen" src="./images/bimIcon/personnel.png" />
              <img v-else src="./images/bimIcon/personnel-hover.png" />
            </span>
            <div class="tools-body" :class="{ open: toolsFormModal.personnelOpen }">
              <div class="tools-search">
                <el-input
                  v-model="toolsForm.personnelKey"
                  placeholder="请输入姓名/联系电话"
                  class="input-with-select"
                  @keyup.enter.native="openToolsList('personnelListOpen')"
                >
                  <el-button
                    slot="append"
                    type="text"
                    icon="el-icon-search"
                    @click="openToolsList('personnelListOpen')"
                  ></el-button>
                </el-input>
              </div>
              <div
                class="tools-list"
                :class="{
                  open: toolsFormModal.personnelOpen && toolsFormModal.personnelListOpen,
                  noData: toolsForm.personnelList.length === 0
                }"
              >
                <ul>
                  <li v-for="(item, i) in toolsForm.personnelList" :key="i">
                    <div class="box">
                      <div class="box-desc">
                        <p class="name-con" @click="residentMark(item)">
                          <b class="name">姓名：{{ item.name }}</b>
                          <img src="./images/bimIcon/location.png" />
                        </p>
                        <p>
                          <label class="label">性别：</label>
                          <span>{{ $getLabel(sexOptions, item.sex) }}</span>
                        </p>
                        <p>
                          <label class="label">联系电话：</label>
                          <span>{{ item.phone }}</span>
                        </p>
                        <p>
                          <label class="label">出生年月：</label>
                          <span>{{ item.birthday }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li v-if="toolsForm.personnelList.length === 0">
                    <div class="empty">
                      <svg-icon icon-class="empty" />
                      <p>暂无数据</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 人员检索工具条 start -->
          <!-- 区域检索工具条 start -->
          <div class="tools-item car-item">
            <span
              class="tools-btn"
              :class="{ active: toolsFormModal.regionOpen }"
              @click="openTools('regionOpen', 'regionListOpen')"
            >
              <img v-if="!toolsFormModal.regionOpen" src="./images/bimIcon/region.png" />
              <img v-else src="./images/bimIcon/region-hover.png" />
            </span>
            <div class="tools-body" :class="{ open: toolsFormModal.regionOpen }">
              <div class="tools-search">
                <el-input
                  v-model="toolsForm.regionKey"
                  placeholder="请输入区域名称"
                  class="input-with-select"
                  @keyup.enter.native="openToolsList('regionListOpen')"
                >
                  <el-button
                    slot="append"
                    type="text"
                    icon="el-icon-search"
                    @click="openToolsList('regionListOpen')"
                  ></el-button>
                </el-input>
              </div>
              <div
                class="tools-list"
                :class="{
                  open: toolsFormModal.regionOpen && toolsFormModal.regionListOpen,
                  noData: toolsForm.regionList.length === 0
                }"
              >
                <ul>
                  <li v-for="(items, i) in toolsForm.regionList" :key="i">
                    <div class="box-tree">
                      <div class="tree-item">
                        <span
                          class="btn-plus"
                          :class="{ active: items.isOpen }"
                          @click="items.isOpen = !items.isOpen"
                        ></span>
                        <span class="name">{{ items.regionName }}</span>
                      </div>
                      <div class="tree-item-sub" :class="{ active: items.isOpen }">
                        <p
                          v-for="(item, j) in items.formList"
                          :key="j"
                          class="tree-sub-title"
                          @click="getDetailsRoom(item)"
                        >
                          {{ item.buildingName }}
                          <img src="./images/bimIcon/location.png" />
                        </p>
                      </div>
                    </div>
                  </li>
                  <li v-if="toolsForm.regionList.length === 0">
                    <div class="empty">
                      <svg-icon icon-class="empty" />
                      <p>暂无数据</p>
                    </div>
                  </li>
                </ul>
              </div>
              <ElDialog
                ref="roomDetailsDialog"
                :dialogTitle="dialogData.roomInfo.regionName + ' - ' + dialogData.roomInfo.buildName"
              >
                <div class="dialog-info room-details">
                  <div class="totalCount">
                    总户数： <b style="margin-right: 60px">{{ dialogData.roomInfo.roomCount }}</b> 总人数：
                    <b>{{ dialogData.roomInfo.residentCount }}</b>
                    <div class="labels">
                      <span class="label">自住</span>
                      <span class="label label2">出租</span>
                      <span class="label label3">空置</span>
                      <span class="label label4">未配置</span>
                    </div>
                  </div>
                  <el-tabs v-model="dialogData.roomTabIndex" class="tabs">
                    <el-tab-pane
                      v-for="(items, i) in dialogData.roomInfo.unitList"
                      :key="i"
                      :label="items.name"
                      :name="`${i}`"
                    >
                      <div class="room-table">
                        <table>
                          <tr v-for="(item, j) in items.children" :key="j">
                            <td>
                              <span>{{ item.name }}</span>
                            </td>
                            <td v-for="(room, k) in item.children" :key="k">
                              <span :class="`status${room.status || 4}`" @click="getDetailsSpaceRoom(room)">{{
                                room.name
                              }}</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </ElDialog>
              <ElDialog ref="spaceRoomDetailsDialog" :dialogTitle="dialogData.spaceRoomInfo.roomName">
                <div class="dialog-info room-details">
                  <div class="totalCount">
                    面积： <b style="margin-right: 60px">{{ dialogData.spaceRoomInfo.area }} m²</b> 状态：
                    <b>{{ $getLabel(roomStatusOptions, dialogData.spaceRoomInfo.status) }}</b>
                  </div>
                  <Grid
                    v-if="dialogData.spaceRoomTabList"
                    ref="personInfoTotalTable"
                    :request="dialogData.spaceRoomTabList"
                    :showHeader="true"
                    :isPagination="false"
                    :highlightCurrentRow="highlightCurrentRow"
                    height="100%"
                  >
                    <vxe-table-column title="业主/居民" field="type" />
                    <vxe-table-column title="姓名" field="name" />
                  </Grid>
                </div>
              </ElDialog>
            </div>
          </div>
          <!-- 区域检索工具条 end -->
          <!-- 图层工具条 start -->
          <div class="tools-item setting-item">
            <div class="tools-body" :class="{ open: toolsFormModal.settingOpen3D }">
              <div class="tools-list" :class="{ open: toolsFormModal.settingOpen3D }">
                <ul>
                  <li>
                    <div class="box">
                      <div class="box-title">图层</div>
                      <el-checkbox-group v-model="toolsForm.setting3DKey" @change="changeSetting3D">
                        <el-checkbox
                          v-for="item in toolsForm.settingList3D"
                          :key="item.personType"
                          :label="item.personType"
                          >{{ item.personTypeName }}</el-checkbox
                        >
                      </el-checkbox-group>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span
              class="tools-btn"
              :class="{ active: toolsForm.settingOpen3D }"
              @click="openTools('settingOpen3D', 'settingListOpen3D')"
            >
              <img v-if="!toolsForm.settingOpen3D" src="./images/bimIcon/setting.png" />
              <img v-else src="./images/bimIcon/setting-hover.png" />
            </span>
          </div>
          <!-- 图层工具条 start -->
        </template>
        <!-- 3D 工具条 start -->

        <!-- 2D/3D切换 start -->
        <div class="tools-bimtype">
          <span :class="{ active: !bimType }" @click="bimType = 0">2D</span>
          <span :class="{ active: bimType }" @click="bimType = 1">3D</span>
        </div>
        <!-- 2D/3D切换 end -->
        <!-- 3D 人员详情 模态框 start -->
        <ElDialog ref="personnelDetailsDialog" dialogTitle="人员详情" popupWidth="600px">
          <div class="dialog-info personnel-details">
            <div class="focus-img">
              <el-image
                v-if="dialogData.personnelDetails.headImage"
                fit="contain"
                :src="getImgUrl(dialogData.personnelDetails.headImage)"
              />
              <!-- <el-image v-else fit="contain" src="/images/default-user.png" /> -->
              <el-avatar v-else :size="160" src="/images/default-user.png"></el-avatar>
            </div>
            <el-form ref="form" label-width="100px">
              <el-form-item label="姓名">
                {{ dialogData.personnelDetails.name }}
              </el-form-item>
              <el-form-item label="性别">
                {{ $getLabel(sexOptions, dialogData.personnelDetails.sex) }}
              </el-form-item>
              <el-form-item label="联系电话">
                {{ dialogData.personnelDetails.phone || '--' }}
              </el-form-item>
              <el-form-item label="出生年月">
                {{ dialogData.personnelDetails.birthday }}
              </el-form-item>
              <el-form-item label="民族">
                {{ dialogData.personnelDetails.nationCodeName }}
              </el-form-item>
            </el-form>
          </div>
        </ElDialog>
        <!-- 3D 人员详情 模态框 start -->
      </div>
      <OLMap
        v-show="!bimType"
        ref="olmap"
        multiple
        multipleEdit
        :multiplePoint.sync="mapData.multiplePoint"
        @mapShowDetails="mapShowDetails"
        @girdClick="girdClick"
      ></OLMap>
      <div class="bim-con">
        <BimView ref="bim" model-id="91BkekYo" @ready="bimReady" />
      </div>
    </div>
    <!-- 企业详情 模态框 start -->
    <ElDialog ref="enterpriseDetailsDialog" dialogTitle="企业详情">
      <el-tabs v-model="enterpriseDetailsIndex" class="bim-tabs">
        <el-tab-pane label="基本信息" name="0">
          <div class="dialog-info">
            <el-form ref="form" label-width="140px">
              <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
                {{ dialogData.enterpriseDetails.unifiedSocialCreditCode }}
              </el-form-item>
              <el-form-item label="企业名称" prop="name">
                {{ dialogData.enterpriseDetails.name }}
              </el-form-item>
              <el-form-item label="企业类型" prop="companyType">
                {{ dialogData.enterpriseDetails.companyTypeName }}
              </el-form-item>
              <el-form-item label="所属行业" prop="companyIndustry">
                {{ dialogData.enterpriseDetails.companyIndustryName }}
              </el-form-item>
              <el-form-item label="法定代表人" prop="legalPerson">
                {{ dialogData.enterpriseDetails.legalPerson }}
              </el-form-item>
              <el-form-item label="法定代表人手机号" prop="legalPersonMobile">
                {{ dialogData.enterpriseDetails.legalPersonMobile }}
              </el-form-item>
              <el-form-item label="联系人" prop="linkman">
                {{ dialogData.enterpriseDetails.linkman }}
              </el-form-item>
              <el-form-item label="联系人手机号" prop="linkmanMobile">
                {{ dialogData.enterpriseDetails.linkmanMobile }}
              </el-form-item>
              <el-form-item label="邮政编码:" prop="postalCode">
                {{ dialogData.enterpriseDetails.postalCode }}
              </el-form-item>
              <el-form-item label="曾用名" prop="usedName">
                {{ dialogData.enterpriseDetails.usedName || '-' }}</el-form-item
              >
              <el-form-item label="联系地址" style="width: 100%" prop="contactDetailedAddress">
                {{ dialogData.enterpriseDetails.contactProvince | pcaName }} -
                {{ dialogData.enterpriseDetails.contactCity | pcaName }} -
                {{ dialogData.enterpriseDetails.contactMunicipalDistrict | pcaName }} -
                {{ dialogData.enterpriseDetails.contactDetailedAddress }}
              </el-form-item>
              <el-form-item label="注册地址" style="width: 100%" prop="registeredDetailedAddress">
                {{ dialogData.enterpriseDetails.registeredProvince | pcaName }} -
                {{ dialogData.enterpriseDetails.registeredCity | pcaName }} -
                {{ dialogData.enterpriseDetails.registeredMunicipalDistrict | pcaName }} -
                {{ dialogData.enterpriseDetails.registeredDetailedAddress }}
              </el-form-item>
              <el-form-item label="员工数量" prop="workerNum">
                {{ dialogData.enterpriseDetails.workerNum }}</el-form-item
              >
              <el-form-item label="备注" style="width: 100%" prop="remark">
                {{ dialogData.enterpriseDetails.remark }}</el-form-item
              >
              <el-form-item label="经营范围" style="width: 100%" prop="businessScope">
                {{ dialogData.enterpriseDetails.businessScope }}
              </el-form-item>
              <el-form-item label="企业证件" prop="certificationPictureIds">
                <img :src="dialogData.enterpriseDetails.certificationPictureIds | imgUrl" />
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房间信息" name="1">
          <div v-if="dialogData.enterpriseDetailsRoomTable" class="dialog-info">
            <Grid
              ref="enterpriseDetailsRoomTable"
              :request="dialogData.enterpriseDetailsRoomTable"
              :highlightCurrentRow="highlightCurrentRow"
              :isPagination="false"
              height="100%"
            >
              <vxe-table-column title="所属网格" field="orgName" />
              <vxe-table-column title="所属区域" field="regionName" />
              <vxe-table-column title="详细地址" field="todo">
                <template #default="{ row }">
                  {{ row.buildName }}-{{ row.unitName }}-{{ row.floorName }}-{{ row.roomName || row.name }}</template
                >
              </vxe-table-column>
              <vxe-table-column title="租住状态" field="status" :formatter="$getLabelV(roomStatusOptions)" />
            </Grid>
          </div>
        </el-tab-pane>
        <el-tab-pane label="员工信息" name="2">
          <div v-if="enterpriseDetailsIndex === '2'" class="dialog-info">
            <Grid
              ref="enterpriseDetailsStaffTable"
              :request="dialogData.enterpriseDetailsStaffTable"
              :filterForm.sync="dialogData.enterpriseDetailsStaffForm"
              :highlightCurrentRow="highlightCurrentRow"
              height="100%"
            >
              <vxe-table-column title="姓名" field="name" />
              <vxe-table-column title="性别" field="sex" formatter="sex" />
              <vxe-table-column title="联系电话" width="120" field="phone" />
              <vxe-table-column title="身份证" width="120" field="identityCardNumber" />
              <vxe-table-column title="学历" field="educationCodeName" />
              <vxe-table-column title="住址" width="120" field="familyAddress" />
            </Grid>
          </div>
        </el-tab-pane>
      </el-tabs>
    </ElDialog>
    <!-- 企业详情 模态框 end -->

    <!-- 组织详情 模态框 start -->
    <ElDialog ref="ccpDetailsDialog" dialogTitle="组织详情">
      <div class="dialog-info">
        <Grid
          ref="ccpDetailsDialogTable"
          :request="dialogData.ccpDetailsDialogTable"
          :highlightCurrentRow="highlightCurrentRow"
          :filterForm.sync="dialogData.ccpDetailsDialogForm"
          height="100%"
        >
          <vxe-table-column title="姓名" field="realName" />
          <vxe-table-column title="性别" field="sex" formatter="sex" />
          <vxe-table-column title="身份证号" field="identityCardNumber" />
          <vxe-table-column title="联系电话" field="mobile" />
        </Grid>
      </div>
    </ElDialog>
    <!-- 组织详情 模态框 end -->

    <!-- 重点事件 模态框 start -->
    <ElDialog ref="incidentDetailsDialog" dialogTitle="重点事件">
      <div class="dialog-info">
        <el-form ref="form" label-width="140px">
          <el-form-item label="所属网格">
            {{ dialogData.incidentDetailsData.orgName }}
          </el-form-item>
          <el-form-item label="事件类型">
            {{ dialogData.incidentDetailsData.typeName }}
          </el-form-item>
          <el-form-item label="事件规模">
            {{ dialogData.incidentDetailsData.scaleName }}
          </el-form-item>
          <el-form-item label="发生时间">
            {{ dialogData.incidentDetailsData.occurrenceTime }}
          </el-form-item>
          <el-form-item label="事件状态">
            {{ $getLabel(eventStatus, dialogData.incidentDetailsData.status) }}
          </el-form-item>
          <el-form-item label="关联人员">
            {{ _.map(dialogData.incidentDetailsData.relevanceList, 'name').join(' ') }}
          </el-form-item>
          <el-form-item label="发生地点" style="width: 100%">
            {{ dialogData.incidentDetailsData.address }}
          </el-form-item>
          <el-form-item label="事件描述" style="width: 100%">
            {{ dialogData.incidentDetailsData.description }}
          </el-form-item>
          <el-form-item label="事件处理过程及结果" style="width: 100%">
            {{ dialogData.incidentDetailsData.result }}
          </el-form-item>
          <el-form-item label="附件" style="width: 100%">
            <FileList :ids="dialogData.incidentDetailsData.fileIds"></FileList>
          </el-form-item>
        </el-form>
      </div>
    </ElDialog>
    <!-- 重点事件 模态框 end -->

    <!-- 网格信息 模态框 start -->
    <ElDialog ref="homeDialog" dialogTitle="网格信息">
      <el-tabs v-model="dialogIndex" class="bim-tabs">
        <el-tab-pane label="基本信息" name="0">
          <div class="dialog-info">
            <div class="base-header">
              <span>网格名称：{{ dialogData.girdInfo.name }}</span>
              <span>所属上级：{{ dialogData.girdInfo.parentName }}</span>
              <span>网格面积：{{ dialogData.girdInfo.area }} ㎡</span>
            </div>
            <p>网格备注：{{ dialogData.girdInfo.remark }}</p>
            <div v-if="dialogData.girdInfoTable" class="dialog-table">
              <Grid
                ref="table"
                :request="dialogData.girdInfoTable"
                :showHeader="false"
                :isPagination="false"
                :highlightCurrentRow="highlightCurrentRow"
                height="100%"
              >
                <vxe-table-column title="标题" field="title" />
                <vxe-table-column title="姓名" field="name" />
                <vxe-table-column title="手机号" field="phone" />
              </Grid>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="人员信息" name="1">
          <div class="dialog-info">
            <div class="totalCount">
              居民总数：<b>{{ dialogData.personInfo.totalCount }}</b>
            </div>
            <div v-if="dialogData.personInfoTotalTable" class="dialog-table">
              <Grid
                ref="personInfoTotalTable"
                :request="dialogData.personInfoTotalTable"
                :isPagination="false"
                :highlightCurrentRow="highlightCurrentRow"
                height="100%"
              >
                <vxe-table-column title="人员类型" field="type" />
                <vxe-table-column title="数量" field="number" />
                <vxe-table-column title="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="text"
                      @click="showPersonDetails('personInfoDialog', 'personInfoDetailsTable', row.id)"
                      >查看详情</el-button
                    >
                  </template>
                </vxe-table-column>
              </Grid>
              <ElDialog ref="personInfoDialog" dialogTitle="人员详情">
                <div class="dialog-info">
                  <Grid
                    ref="personInfoDetailsTable"
                    :request="dialogData.registeredPopulationTable"
                    :filterForm.sync="dialogData.registeredPopulationForm"
                    :highlightCurrentRow="highlightCurrentRow"
                    height="100%"
                  >
                    <vxe-table-column title="姓名" field="name"></vxe-table-column>
                    <vxe-table-column title="性别" width="80" field="sex" formatter="sex"></vxe-table-column>
                    <vxe-table-column title="身份证号" field="identityCardNumber"></vxe-table-column>
                    <vxe-table-column title="联系电话" width="120" field="phone"></vxe-table-column>
                    <vxe-table-column
                      title="人口类型"
                      field="type"
                      width="120"
                      :formatter="({ cellValue }) => $getLabel(residentTypeOptions, cellValue - 0)"
                    ></vxe-table-column>
                    <vxe-table-column
                      title="人口状态"
                      width="100"
                      field="status"
                      :formatter="({ cellValue }) => $getLabel(residentStatusOptions, cellValue - 0)"
                    ></vxe-table-column>
                  </Grid>
                </div>
              </ElDialog>
            </div>
            <br />
            <div class="totalCount">
              <b>重点人员</b>
            </div>
            <div v-if="dialogData.personInfoTable" class="dialog-table">
              <Grid
                ref="personInfoTable"
                :request="dialogData.personInfoTable"
                :isPagination="false"
                :highlightCurrentRow="highlightCurrentRow"
                height="100%"
              >
                <vxe-table-column title="人口类别" field="personTypeName" />
                <vxe-table-column title="数量" field="count" />
                <vxe-table-column title="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="text"
                      @click="showKeyPersonDetails('keyPersonInfoDialog', 'keyPersonInfoDetailsTable', row.personType)"
                      >查看详情</el-button
                    >
                  </template>
                </vxe-table-column>
              </Grid>
              <ElDialog ref="keyPersonInfoDialog" dialogTitle="人员详情">
                <div class="dialog-info">
                  <Grid
                    ref="keyPersonInfoDetailsTable"
                    :request="dialogData.keyPersonInfoDetailsTable"
                    :filterForm.sync="dialogData.keyPersonInfoDetailsForm"
                    :highlightCurrentRow="highlightCurrentRow"
                    height="100%"
                  >
                    <vxe-table-column title="姓名" field="name"></vxe-table-column>
                    <vxe-table-column title="性别" width="80" field="sex" formatter="sex"></vxe-table-column>
                    <vxe-table-column title="身份证号" field="identityCardNumber"></vxe-table-column>
                    <vxe-table-column title="联系电话" width="120" field="phone"></vxe-table-column>
                    <vxe-table-column title="人口类别" field="personTypeName" width="120"></vxe-table-column>
                    <vxe-table-column
                      title="人口类型"
                      field="residentType"
                      width="120"
                      :formatter="({ cellValue }) => $getLabel(residentTypeOptions, cellValue - 0)"
                    ></vxe-table-column>
                    <vxe-table-column
                      title="人口状态"
                      width="100"
                      field="residentStatus"
                      :formatter="({ cellValue }) => $getLabel(residentStatusOptions, cellValue - 0)"
                    ></vxe-table-column>
                  </Grid>
                </div>
              </ElDialog>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房屋信息" name="2">
          <div class="dialog-info">
            <div class="totalCount">
              房屋总数：<b>{{ dialogData.houseInfo.totalCount }}</b>
            </div>
            <div v-if="dialogData.houseStatusTable" class="dialog-table">
              <Grid
                ref="houseStatusTable"
                :request="dialogData.houseStatusTable"
                :isPagination="false"
                :highlightCurrentRow="highlightCurrentRow"
                height="100%"
              >
                <vxe-table-column title="房屋状态" field="type" />
                <vxe-table-column title="数量" field="number" />
                <vxe-table-column title="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="text"
                      @click="
                        showHouseDetails(
                          'houseInfoDialog',
                          'houseInfoDetailsTable',
                          { status: row.key, type: null },
                          row.type
                        )
                      "
                      >查看详情</el-button
                    >
                  </template>
                </vxe-table-column>
              </Grid>
            </div>
            <br />
            <div v-if="dialogData.houseTypeTable" class="dialog-table">
              <Grid
                ref="houseTypeTable"
                :request="dialogData.houseTypeTable"
                :isPagination="false"
                :highlightCurrentRow="highlightCurrentRow"
                height="100%"
              >
                <vxe-table-column title="房屋类型" field="type" />
                <vxe-table-column title="数量" field="number" />
                <vxe-table-column title="操作">
                  <template slot-scope="{ row }">
                    <el-button
                      type="text"
                      @click="
                        showHouseDetails(
                          'houseInfoDialog',
                          'houseInfoDetailsTable',
                          { status: null, type: row.key },
                          row.type
                        )
                      "
                      >查看详情</el-button
                    >
                  </template>
                </vxe-table-column>
              </Grid>
            </div>
            <ElDialog ref="houseInfoDialog" dialogTitle="房屋详情">
              <div class="dialog-info">
                <div class="totalCount">
                  房屋状态：<b>{{ dialogData.houseInfoDetailsType }}</b>
                </div>
                <Grid
                  ref="houseInfoDetailsTable"
                  :request="dialogData.houseInfoDetailsTable"
                  :filterForm.sync="dialogData.houseInfoDetailsForm"
                  :highlightCurrentRow="highlightCurrentRow"
                  height="100%"
                >
                  <vxe-table-column title="所属区域" field="regionName" />
                  <vxe-table-column title="所属建筑" field="buildName" />
                  <vxe-table-column title="所属单元" field="unitName" />
                  <vxe-table-column title="所属楼层" field="floorName" />
                  <vxe-table-column title="房间号" field="name" />
                  <vxe-table-column title="业主信息" field="ownerList">
                    <template slot-scope="{ row }">
                      {{ _.map(row.ownerList, 'name').join(',') }}
                    </template>
                  </vxe-table-column>
                  <vxe-table-column title="居住信息" field="residentList">
                    <template slot-scope="{ row }">
                      {{ _.map(row.residentList, 'name').join(',') }}
                    </template>
                  </vxe-table-column>
                </Grid>
              </div>
            </ElDialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业信息" name="3">
          <div class="dialog-info">
            <Grid
              ref="enterpriseInfoTable"
              :request="dialogData.enterpriseInfoTable"
              :highlightCurrentRow="highlightCurrentRow"
              :filterForm.sync="dialogData.enterpriseInfoForm"
              height="100%"
            >
              <vxe-table-column title="企业名称" field="name" />
              <vxe-table-column title="所属行业" field="companyIndustryName" />
              <vxe-table-column title="法人" field="legalPerson" />
              <vxe-table-column title="员工数量" field="workerNum" />
              <vxe-table-column title="操作">
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    @click="showEnterpriseDetails('enterpriseDetailsDialog', 'enterpriseDetailsTable', row.id)"
                    >查看详情</el-button
                  >
                </template>
              </vxe-table-column>
            </Grid>
          </div>
        </el-tab-pane>
        <el-tab-pane label="重点区域" name="5">
          <div v-if="dialogData.KeyRegionInfoTable" class="dialog-info">
            <Grid
              ref="KeyRegionInfoTable"
              :request="dialogData.KeyRegionInfoTable"
              :highlightCurrentRow="highlightCurrentRow"
              :isPagination="false"
              height="100%"
            >
              <vxe-table-column title="区域类型" field="typeName" />
              <vxe-table-column title="区域数量" field="count" />
              <vxe-table-column title="操作">
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    @click="KeyRegionDetails('KeyRegionDetailsDialog', 'KeyRegionDetailsTable', row)"
                    >查看详情</el-button
                  >
                </template>
              </vxe-table-column>
            </Grid>
            <ElDialog ref="KeyRegionDetailsDialog" dialogTitle="重点区域详情">
              <div class="dialog-info">
                <div class="totalCount">
                  区域类型：<b>{{ dialogData.KeyRegionDetailsType }}</b>
                </div>
                <Grid
                  ref="KeyRegionDetailsTable"
                  :request="dialogData.KeyRegionDetailsTable"
                  :filterForm.sync="dialogData.KeyRegionDetailsForm"
                  :highlightCurrentRow="highlightCurrentRow"
                  height="100%"
                >
                  <vxe-table-column title="重点区域名称" field="name" />
                  <vxe-table-column title="区域负责人" field="principalName" />
                  <vxe-table-column title="联系电话" width="120" field="principalMobile" />
                  <vxe-table-column title="备注" field="remark" />
                </Grid>
              </div>
            </ElDialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </ElDialog>
    <!-- 网格信息 模态框 end -->
  </div>
</template>

<script>
import RouterScreen from './router'
import { mapGetters } from 'vuex'
import GirdApi from './api/gird'
import ElDialog from './components/ElDialog' // 大屏通用模态框
import { getResidentList } from '@/api/grid/resident'
import { residentStatusOptions, residentTypeOptions, roomStatusOptions, carBelongType } from '@/views/grid/lib/options'
import eventStatus from '@/views/govAffairs/lib/eventStatus'
import { sexOptions } from '@/lib/otions'
import BimView from '@/components/BBB/bim'
import { getImgUrl } from '@/plugins/axios'
export default {
  components: {
    BimView,
    ElDialog
  },
  data() {
    // 这里存放数据
    return {
      bimIsRead: false,
      getImgUrl,
      mapData: {
        color: '#ff0000',
        multiplePoint: []
      },
      routerList: RouterScreen.children,
      weatherInfo: {
        weatherPic: '',
        weather: '多云',
        temperature: '18°C'
      },
      timer: null,
      hms: '',
      ymd: '',
      mapVisible: false,
      sexOptions, // 性别
      residentTypeOptions, // 人口类型
      residentStatusOptions, // 人口状态
      roomStatusOptions, // 租住状态
      carBelongType, // 车辆所属
      selectWbsCode: '', // 当前选中网格
      highlightCurrentRow: false,
      bimType: 0, // 2D/3D切换
      eventStatus,
      toolsForm: {
        enterpriseKey: '',
        enterpriseList: [],
        carKey: '',
        carList: [],
        settingGridKey: [1],
        settingKey: [],
        settingList: [],
        personnelKey: '',
        personnelList: [],
        regionKey: '',
        regionList: [],
        setting3DKey: [],
        settingList3D: []
      },
      toolsFormModal: {
        enterpriseOpen: false,
        enterpriseListOpen: false,
        carOpen: false,
        carListOpen: false,
        settingOpen: false,
        settingListOpen: false,
        personnelOpen: false,
        personnelListOpen: false,
        regionOpen: false,
        regionListOpen: false,
        settingOpen3D: false,
        settingListOpen3D: false
      },
      // 模态框数据
      dialogData: {
        girdInfo: {},
        girdInfoTable: '',
        personInfo: {},
        personInfoTotalTable: '',
        personInfoTable: '',
        registeredPopulationIndex: '0',
        registeredPopulationForm: {
          type: '1'
        },
        registeredPopulationTable: getResidentList,
        // 重点人员详情
        keyPersonInfoDetailsForm: {
          personType: ''
        },
        keyPersonInfoDetailsTable: GirdApi.queryKeyPersonList,
        houseInfo: {},
        houseStatusTable: '',
        houseTypeTable: '',
        // 房屋详情
        houseInfoDetailsForm: {},
        houseInfoDetailsTable: GirdApi.queryRoomList,
        houseInfoDetailsType: '',
        // 企业信息
        enterpriseInfoForm: {},
        enterpriseInfoTable: GirdApi.queryGirdEnterpriseInfo,
        enterpriseDetails: {},
        enterpriseDetailsRoomTable: '',
        // 企业详情
        enterpriseDetailsStaffForm: {},
        enterpriseDetailsStaffTable: GirdApi.queryGirdEnterpriseStaff,
        // 重点区域详情
        KeyRegionDetailsType: '',
        KeyRegionDetailsForm: {},
        KeyRegionDetailsTable: GirdApi.queryKeyRegionList,
        // 车辆详情
        carInfo: {},
        // 筑详情
        roomTabIndex: '0',
        roomInfo: [],
        spaceRoomInfo: {},
        spaceRoomTabList: '',
        personnelDetails: {},
        // 党组织详情
        ccpDetailsDialogForm: {
          organizationId: ''
        },
        ccpDetailsDialogTable: GirdApi.queryPartyMemberManagementist,
        incidentDetailsData: {}
      },
      dialogDataBack: {},
      dialogIndex: '0',
      enterpriseDetailsIndex: '0',
      // 重点区域
      KeyRegionInfoTable: ''
    }
  },
  computed: {
    ...mapGetters(['avatar', 'name', 'userInfo']),
    key() {
      return this.$route.path
    },
    showTools() {
      const routeList = ['BigScreen', 'BigScreenHome', 'BigScreenCcp', 'BigScreenGovAffairs']
      return routeList.includes(this.$route.name)
    },
    routerName() {
      return this.$route.name
    }
  },
  watch: {
    routerName(val) {
      if (val === 'BigScreenCcp') {
        this.toolsForm.settingKey = [1]
      } else {
        this.toolsForm.settingKey = []
      }
      this.queryGridLocation()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  beforeDestroy() {},
  // 方法集合
  methods: {
    // 初始化
    init() {
      this.dialogDataBack = _.cloneDeep(this.dialogData)
      this.$store.dispatch('ccp/getStructTreeData')
      this.getweatherInfo()
      this.getGirdPlate()
      this.getTime()
      this.countDown()
    },
    // 企业搜索显示企业详情
    mapShowDetails({ el, key, tableKey, id }) {
      this[el](key, tableKey, id)
    },
    // 查看组织详情
    showCcpDetails(key, tableRef, id) {
      this.dialogData.ccpDetailsDialogForm.organizationId = id
      this.$refs[key].dialogVisible = true
      this.$refs[tableRef] && this.$refs[tableRef].refresh()
    },
    // 重点事件详情
    showIncidentDetails(key, tableRef, id) {
      this.getIncident(id)
      this.$refs[key].dialogVisible = true
    },
    // 获取重要事件详情
    async getIncident(id) {
      const result = await GirdApi.getIncident(id)
      const datas = result.data
      this.dialogData.incidentDetailsData = datas
    },
    // 三维模型是否加载完毕
    bimReady() {
      this.bimIsRead = true
    },
    // 打开或者关闭工具条
    openTools(searchKey, listKey) {
      // 关闭其他工具条
      for (const key in this.toolsFormModal) {
        if (key !== searchKey && key !== listKey) {
          this.toolsFormModal[key] = false
        }
      }
      const searchKeyStatus = !this.toolsFormModal[searchKey]
      this.toolsFormModal[searchKey] = searchKeyStatus
      this.toolsFormModal[listKey] = false

      if (searchKeyStatus && searchKey === 'settingOpen3D') {
        this.getKeyPersonLocation()
      }
    },
    // 打开或者关闭工具条搜索结果
    openToolsList(listKey) {
      if (listKey === 'enterpriseListOpen') {
        this.queryGirdEnterpriseInfo(listKey)
      }
      if (listKey === 'carListOpen') {
        this.queryCarList(listKey)
      }
      if (listKey === 'carListOpen') {
        this.queryCarList(listKey)
      }
      if (listKey === 'personnelListOpen') {
        this.queryResidentList(listKey)
      }
      if (listKey === 'regionListOpen') {
        this.getGridBuild(listKey)
      }
    },
    // 获取企业信息
    async queryGirdEnterpriseInfo(key) {
      const params = {
        page: 1,
        rows: 10,
        keyword: this.toolsForm.enterpriseKey
      }
      const result = await GirdApi.queryGirdEnterpriseInfo(params)
      const datas = result.data
      const list = datas.records || []
      this.toolsForm.enterpriseList = list
      this.toolsFormModal[key] = true
    },
    // 添加企业锚点
    addMarkerEnterprise(item) {
      const options = {
        id: `enterpriseLocation_${item.id}`,
        position: item.contactLocation ? item.contactLocation.split(',') : [],
        src: `/images/bimIcon/icon_enterpriseLocation.png`
      }
      this.$refs.olmap && this.$refs.olmap.addMarkerJump(options)
      // this.batchAddMarker([options])
    },
    // 批量添加锚点
    batchAddMarker(obj) {
      this.$refs.olmap && this.$refs.olmap.batchAddMarker(obj)
    },
    // 查询车辆列表
    async queryCarList(key) {
      const params = {
        page: 1,
        rows: 10,
        licensePlateNumber: this.toolsForm.carKey
      }
      const result = await GirdApi.queryCarList(params)
      const datas = result.data
      const list = datas.records || []
      this.toolsForm.carList = list
      this.toolsFormModal[key] = true
    },
    // 获取车辆详情
    async getDetailsCar(id) {
      const result = await GirdApi.getDetailsCar(id)
      const datas = result.data
      this.dialogData.carInfo = datas
      this.$refs.carDetailsDialog.dialogVisible = true
    },
    // 获取不同类型图层定位
    async queryGridLocation() {
      const result = await GirdApi.queryGridLocation({
        typeList: this.toolsForm.settingKey
      })
      const datas = result.data
      // 处理锚点函数
      const formatArray = (array, type) => {
        const list = []
        array.forEach(e => {
          if (!e.longitude || !e.latitude) {
            return
          }
          list.push({
            id: `${type}_${e.id}`,
            position: [e.longitude, e.latitude],
            src: `/images/bimIcon/icon_${type}.png`
          })
        })
        return list
      }
      // 党组织 锚点
      const spaceLocation = formatArray(datas.spaceLocation, 'spaceLocation')
      this.batchAddMarker({ spaceLocation })

      // 重点区域 锚点
      const keyRegionLocation = formatArray(datas.keyRegionLocation, 'keyRegionLocation')
      this.batchAddMarker({ keyRegionLocation })

      // 企业分布 锚点
      const enterpriseLocation = formatArray(datas.enterpriseLocation, 'enterpriseLocation')
      this.batchAddMarker({ enterpriseLocation })

      // 重点人员 锚点
      const keyPersonLocation = formatArray(datas.keyPersonLocation, 'keyPersonLocation')
      this.batchAddMarker({ keyPersonLocation })

      // 物业组织 锚点
      const propertyLocation = formatArray(datas.propertyLocation, 'propertyLocation')
      this.batchAddMarker({ propertyLocation })

      // 重要事件 锚点
      const incidentLocation = formatArray(datas.incidentLocation, 'incidentLocation')
      this.batchAddMarker({ incidentLocation })
    },
    // 根据姓名-联系电话获取居民列表
    async queryResidentList(key) {
      const result = await GirdApi.queryResidentList(this.toolsForm.personnelKey)
      const datas = result.data || []
      this.toolsForm.personnelList = datas
      this.toolsFormModal[key] = true
    },
    // 根据区域名称查询建筑列表
    async getGridBuild(key) {
      const result = await GirdApi.getGridBuild(this.toolsForm.regionKey)
      const datas = result.data || []
      datas.forEach(e => {
        e.isOpen = true
      })
      this.toolsForm.regionList = datas
      this.toolsFormModal[key] = true
    },
    // 建筑详情-房屋状态
    async getDetailsRoom(item) {
      const result = await GirdApi.getBuildRoom(item.buildingId)
      const datas = result.data
      this.dialogData.roomTabIndex = '0'
      this.dialogData.roomInfo = datas
      this.$refs.roomDetailsDialog.dialogVisible = true
    },
    // 获取房间详情
    async getDetailsSpaceRoom(item) {
      if (!item.status) {
        return
      }
      this.pickElement(item.componentIdList)
      this.dialogData.spaceRoomTabList = ''
      const result = await GirdApi.getDetailsSpaceRoom(item.id)
      const datas = result.data
      datas.roomName =
        datas.regionName + '-' + datas.buildName + '-' + datas.unitName + '-' + datas.floorName + '-' + datas.name
      this.dialogData.spaceRoomTabList = async () => {
        const records = []
        datas.ownerList.forEach(e => {
          records.push({
            type: '业主',
            name: e.name
          })
        })
        datas.residentList.forEach(e => {
          records.push({
            type: '居民',
            name: e.name
          })
        })
        return {
          records,
          total: records.length
        }
      }
      this.dialogData.spaceRoomInfo = datas
      this.$refs.spaceRoomDetailsDialog.dialogVisible = true
    },
    // 选中构件
    pickElement(guidArray) {
      if (!guidArray || guidArray.length === 0) {
        return
      }
      this.$refs.bim.pickElement(guidArray)
    },
    // 获取重点人员图层定位
    async getKeyPersonLocation() {
      const result = await GirdApi.getKeyPersonLocation()
      const datas = result.data
      this.toolsForm.settingList3D = datas
    },
    // 三维图层事件
    changeSetting3D(array) {
      // 清除锚点
      this.$refs.bim.clearMark()
      array.forEach(e => {
        const person = _.find(this.toolsForm.settingList3D, { personType: e })
        // console.log('三维图层事件', e, this.toolsForm.settingList3D, person)
        if (!person) {
          return
        }
        this.renderModelMark(person.childList)
      })
    },
    // 单个人员添加锚点
    residentMark(item) {
      // 清除锚点
      this.$refs.bim.clearMark()
      this.renderModelMark([item], 'getDetailsResident', true)
    },
    // 模型添加锚点
    renderModelMark(array, type = 'getDetailsKeyResident', isZoom = false) {
      console.log('模型添加锚点', array)
      array.forEach(e => {
        const eleAry = e.componentIdList && e.componentIdList.length > 0 ? e.componentIdList : ''
        const newEleArray = []
        if (!eleAry) {
          return
        }
        eleAry.forEach(f => {
          newEleArray.push(f[0])
        })
        console.log(111, isZoom, eleAry, newEleArray)
        if (isZoom) {
          // 选中构件
          this.pickElement(newEleArray)
        } else {
          // 清除选中
          this.$refs.bim.switchView()
          this.$refs.bim.setCameraPickData()
        }
        newEleArray.forEach(f => {
          this.$refs.bim.setMark({
            eleAry: [f], // 构件idAry
            imgSrc: '/images/bimIcon/icon_keyPersonLocation.png', // 图标路径
            size: 20, // 图标大小
            props: { id: e.id, type }, // 对应参数
            callBack: this.markClick
          })
        })
      })
    },
    // 锚点点击事件
    async markClick(id, props) {
      if (!props.type) {
        return
      }
      const result = await GirdApi[props.type](props.id)
      const datas = result.data
      this.dialogData.personnelDetails = datas
      this.$refs.personnelDetailsDialog.dialogVisible = true
      // console.log('锚点点击事件', id, props, datas)
    },
    // 获取当前天气
    async getweatherInfo() {
      const result = await GirdApi.getweatherInfo()
      const datas = result.data
      this.weatherInfo = datas
    },
    // 是否显示网格区域
    changeSettingGrid(array) {
      if (array.length > 0) {
        this.getGirdPlate()
      } else {
        this.mapData.multiplePoint = []
      }
    },
    // 网格板块信息集合
    async getGirdPlate() {
      const result = await GirdApi.getGirdPlate()
      const datas = result.data
      const multiplePoint = []
      datas.forEach(e => {
        if (e.centerPoint && e.points) {
          multiplePoint.push({
            id: `grid_${e.wbsCode}`,
            color: e.color,
            gridName: e.name,
            centerPoint: e.centerPoint ? e.centerPoint.split(',') : [],
            points: e.points ? e.points.split(',') : [],
            area: e.area
          })
        }
      })
      this.mapData.multiplePoint = multiplePoint
    },
    // 网格点击事件
    girdClick(wbsCode) {
      if (wbsCode) {
        this.initDialogData(wbsCode)
      }
      this.selectWbsCode = wbsCode
      this.dialogData.registeredPopulationForm.wbsCode = wbsCode
      this.dialogData.keyPersonInfoDetailsForm.wbsCode = wbsCode
      this.dialogData.houseInfoDetailsForm.wbsCode = wbsCode
      this.dialogData.enterpriseInfoForm.wbsCode = wbsCode
      this.dialogData.KeyRegionDetailsForm.wbsCode = wbsCode
      this.$refs.homeDialog.dialogVisible = !!wbsCode
    },
    // 初始化模态框数据
    initDialogData(wbsCode) {
      this.dialogData = _.cloneDeep(this.dialogDataBack)
      this.getGirdInfo(wbsCode)
      this.getGirdPersonInfo(wbsCode)
      this.getGirdRoomInfo(wbsCode)
      this.getKeyRegionInfo(wbsCode)
    },
    // 获取网格详情
    async getGirdInfo(wbsCode) {
      const result = await GirdApi.getGirdInfo(wbsCode)
      const datas = result.data
      this.dialogData.girdInfo = datas
      this.dialogData.girdInfoTable = async () => {
        const info = {
          records: [
            {
              title: '网格长',
              name: datas.master,
              phone: datas.masterMobile
            },
            {
              title: '网格管理员',
              name: datas.administrators,
              phone: datas.administratorsMobile
            },
            {
              title: '网格协管员',
              name: datas.trafficAssistant,
              phone: datas.trafficAssistantMobile
            },
            {
              title: '网格警务员',
              name: datas.policeOfficer,
              phone: datas.policeOfficerMobile
            },
            {
              title: '网格监督员',
              name: datas.supervisor,
              phone: datas.supervisorMobile
            }
          ],
          total: 5
        }
        return info
      }
    },
    // 获取人员信息
    async getGirdPersonInfo(wbsCode) {
      const result = await GirdApi.getGirdPersonInfo(wbsCode)
      const datas = result.data
      this.dialogData.personInfo = datas
      this.dialogData.personInfoTotalTable = async () => {
        const records = [
          {
            id: '1',
            type: '户籍人口',
            number: datas.registeredPopulationCount || 0
          },
          {
            id: '2',
            type: '流动人口',
            number: datas.migrantPopulationCount || 0
          }
        ]
        return {
          records,
          total: 2
        }
      }
      this.dialogData.personInfoTable = async () => {
        const records = datas.keyPersonInfo || []
        return {
          records,
          total: 2
        }
      }
    },
    // 查看人员详情
    showPersonDetails(key, tableRef, type) {
      this.dialogData.registeredPopulationForm.type = type
      this.$refs[key].dialogVisible = true
      this.$refs[tableRef] && this.$refs[tableRef].refresh()
    },
    // 查看重点人员详情
    showKeyPersonDetails(key, tableRef, personType) {
      this.dialogData.keyPersonInfoDetailsForm.personType = personType
      this.$refs[key].dialogVisible = true
      this.$refs[tableRef] && this.$refs[tableRef].refresh()
    },
    // 获取房屋信息
    async getGirdRoomInfo(wbsCode) {
      const result = await GirdApi.getGirdRoomInfo(wbsCode)
      const datas = result.data
      this.dialogData.houseInfo = datas
      this.dialogData.houseStatusTable = async () => {
        const records = [
          {
            key: 3,
            type: '自用',
            number: datas.liveCount || 0
          },
          {
            key: 2,
            type: '出租',
            number: datas.rentOutCount || 0
          },
          {
            key: 1,
            type: '空置',
            number: datas.vacancyCount || 0
          }
        ]
        return {
          records,
          total: 3
        }
      }
      this.dialogData.houseTypeTable = async () => {
        const records = [
          {
            key: 2,
            type: '商铺',
            number: datas.shopCount || 0
          },
          {
            key: 1,
            type: '住宅',
            number: datas.houseCount || 0
          },
          {
            key: 3,
            type: '其他',
            number: datas.otherCount || 0
          }
        ]
        return {
          records,
          total: 3
        }
      }
    },
    // 查看房屋详情
    showHouseDetails(key, tableRef, form, type) {
      this.dialogData.houseInfoDetailsForm.status = form.status
      this.dialogData.houseInfoDetailsForm.type = form.type
      this.dialogData.houseInfoDetailsType = type
      this.$refs[key].dialogVisible = true
      this.$refs[tableRef] && this.$refs[tableRef].refresh()
    },
    // 查看企业详情
    showEnterpriseDetails(key, tableRef, enterpriseId) {
      this.enterpriseDetailsIndex = '0'
      this.dialogData.enterpriseDetailsRoomTable = ''
      this.dialogData.enterpriseDetailsStaffForm.enterpriseId = enterpriseId
      this.getDetailsEnterprise(enterpriseId)
      this.$refs[key].dialogVisible = true
      this.$refs[tableRef] && this.$refs[tableRef].refresh()
    },
    // 获取企业详情
    async getDetailsEnterprise(enterpriseId) {
      const result = await GirdApi.getDetailsEnterprise(enterpriseId)
      const datas = result.data
      this.dialogData.enterpriseDetails = datas
      this.dialogData.enterpriseDetailsRoomTable = async () => {
        const records = datas.roomList || []
        return {
          records,
          total: records.length
        }
      }
    },
    // 获取重点区域
    async getKeyRegionInfo(wbsCode) {
      const result = await GirdApi.getKeyRegionInfo(wbsCode)
      const datas = result.data || []
      this.dialogData.KeyRegionInfoTable = async () => {
        return {
          records: datas,
          total: datas.length
        }
      }
    },
    // 查看重点区域详情
    KeyRegionDetails(key, tableRef, row) {
      this.dialogData.KeyRegionDetailsForm.type = row.type
      this.dialogData.KeyRegionDetailsType = row.typeName
      this.$refs[key].dialogVisible = true
      this.$refs[tableRef] && this.$refs[tableRef].refresh()
    },
    // 获取当前时间
    getTime() {
      const nowData = this.$utils.getDateAll(new Date(), 'dateTimeObject')
      this.hms = nowData.time
      this.ymd = nowData.data
    },
    // 倒计时
    countDown() {
      this.timer = setInterval(() => {
        this.getTime()
      }, 1000)
    },
    // 回首页
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
@import './bimTabs.scss';
</style>
