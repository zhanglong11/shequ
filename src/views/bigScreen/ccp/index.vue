<template>
  <div>
    <div class="left">
      <!-- 党组织情况 start -->
      <BigCard class="party-organ-card" overflow :icon="require('../images/title/title1.png')" title="党组织情况">
        <div class="ccp-tree">
          <div class="tree-card">
            <ul>
              <li>
                <div class="box">
                  <!-- <div class="focus-img">
                    <img src="../images/ccp/icon1.png" />
                  </div>-->
                  <div class="desc">
                    <p class="desc-btn">党组织数</p>
                    <b class="number">{{ ccpData.organizationNum }}</b>
                  </div>
                </div>
              </li>
              <li>
                <div class="box">
                  <!-- <div class="focus-img">
                    <img src="../images/ccp/icon2.png" />
                  </div>-->
                  <div class="desc">
                    <p class="desc-btn">党员总数</p>
                    <b class="number">{{ ccpData.memberNum }}</b>
                  </div>
                </div>
              </li>
              <li>
                <div class="box">
                  <div class="desc">
                    <p class="desc-btn">申请入党</p>
                    <b class="number">{{ ccpData.applyForNum }}</b>
                  </div>
                </div>
              </li>
              <li>
                <div class="box">
                  <!-- <div class="focus-img">
                     <img src="../images/ccp/icon3.png" />
                   </div>-->
                  <div class="desc">
                    <p class="desc-btn">积极分子</p>
                    <b class="number">{{ ccpData.activistNum }}</b>
                  </div>
                </div>
              </li>
              <li>
                <div class="box">
                  <div class="desc">
                    <p class="desc-btn">发展对象</p>
                    <b class="number">{{ ccpData.developObjectNum }}</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Tree
            v-if="treeData.length"
            defaultExpandAll
            :show-icon="false"
            :replace-fields="replaceFields"
            show-line
            :treeData="treeData"
            @select="selectTree"
          >
          </Tree>
        </div>
      </BigCard>
      <!-- 党组织情况 end -->

      <!-- 党建积分排名TOP10 start -->
      <BigCard overflow :icon="require('../images/title/title9.png')" title="党建积分排名TOP10">
        <div v-for="(item, index) in ccpData.scoreList" :key="index" class="integral-ranking">
          <div v-if="index < 3" class="rowNo">
            <img :src="require(`../images/handyService/top-${index + 1}.png`)" alt="" />
          </div>
          <div v-else class="rowNo">NO.{{ index + 1 }}</div>
          <div class="ranking-name">
            <el-tooltip class="item" effect="dark" :content="item.name" placement="bottom">
              <span>{{ item.name }}</span>
            </el-tooltip>
          </div>
          <div class="ranking-sex">{{ item.sex | sex }}</div>
          <div class="ranking-phone">{{ item.organizationName }}</div>
          <div class="ranking-integral">{{ item.totalScore }}</div>
        </div>
      </BigCard>
      <!-- 党建积分排名TOP10 end -->
    </div>
    <div class="right">
      <!-- 党建宣传学习 start -->
      <BigCard class="party-study-card" :icon="require('../images/title/title2.png')" title="党建宣传学习">
        <div class="party-study">
          <div class="sub-card">
            <ul>
              <li>
                <div class="box">
                  <div class="focus-img">
                    <img src="../images/ccp/icon4.png" />
                  </div>
                  <div class="desc">
                    <b class="number">{{ ccpData.partyNotificationNum }}</b>
                    <p class="desc-btn" @click="handleCheckPropaganda">党建宣传</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="box">
                  <div class="focus-img">
                    <img src="../images/ccp/icon5.png" />
                  </div>
                  <div class="desc">
                    <b class="number">{{ ccpData.partyStudyNum }}</b>
                    <p class="desc-btn" @click="handleCheckStudy">党员学习</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-title">
            <div
              class="sub-tab"
              :class="{ isActive: activeSubTab === 'propaganda' }"
              @click="activeSubTab = 'propaganda'"
            >
              党建宣传
            </div>
            <div class="sub-tab" :class="{ isActive: activeSubTab === 'study' }" @click="activeSubTab = 'study'">
              党员学习
            </div>
          </div>
          <div v-if="activeSubTab === 'propaganda'" class="personnel-item">
            <div class="title">党建宣传</div>
            <EchartsPie
              v-if="complaintPieData.length > 0"
              id="complaintPie"
              key="propaganda"
              :dataList="complaintPieData"
            />
          </div>
          <div v-if="activeSubTab === 'study'" class="personnel-item">
            <div class="title">党员学习</div>
            <EchartsPie
              v-if="suggestionsPieData.length > 0"
              id="suggestionsPie"
              key="study"
              :dataList="suggestionsPieData"
            />
          </div>
        </div>
      </BigCard>
      <!-- 党建宣传学习 end -->
      <!-- 党建活动与会议 start -->
      <BigCard :icon="require('../images/title/title7.png')" title="党建活动与会议">
        <div class="party-study">
          <div class="sub-card">
            <ul>
              <li>
                <div class="box">
                  <div class="focus-img">
                    <img src="../images/ccp/icon6.png" />
                  </div>
                  <div class="desc">
                    <b class="number">{{ ccpData.partyActivityNum }}</b>
                    <p class="desc-btn" @click="handleCheckActivity">党建活动</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="box">
                  <div class="focus-img">
                    <img src="../images/ccp/icon7.png" />
                  </div>
                  <div class="desc">
                    <b class="number">{{ ccpData.partyMeetingNum }}</b>
                    <p class="desc-btn" @click="handleCheckMeeting">党建会议</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <EchartsPies v-if="partyPieData.length > 0" id="partyPie" :dataList="partyPieData" />
        </div>
      </BigCard>
      <!-- 党建活动与会议 end -->
      <!--党建宣传 start-->
      <ElDialog ref="propagandaDialog" dialogTitle="党建宣传">
        <div class="dialog-table">
          <div class="tooltips">
            <el-form inline>
              <el-form-item>
                <el-input v-model="dialogData.propagandaForm.title" placeholder="公告标题"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <Select v-model="dialogData.propagandaForm.type" arg-group="ccpNotificationType" has-all> </Select>
              </el-form-item>
              <el-form-item>
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
                  <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </div>
          <Grid
            ref="propagandaTable"
            :request="dialogData.propagandaList"
            :filter-form.sync="dialogData.propagandaForm"
            :showHeader="true"
            :isPagination="false"
            :highlightCurrentRow="true"
            :showOverflow="false"
            height="100%"
          >
            <vxe-table-column title="公告标题" field="title" min-width="200"></vxe-table-column>
            <vxe-table-column title="公告类型" field="typeName" width="120"></vxe-table-column>
            <vxe-table-column title="公告标签" field="label" min-width="150">
              <template #default="{ row }">
                <div v-if="row.label" class="tag-wrap">
                  <el-tag v-for="item of row.label.split(',')" :key="item" size="mini">{{ item }}</el-tag>
                </div>
                <div v-else>-</div>
              </template>
            </vxe-table-column>
            <vxe-table-column title="发布党组织" field="parentName" width="150"></vxe-table-column>
            <vxe-table-column title="操作" field="opts" width="100">
              <template #default="{ row }">
                <el-button type="text" @click="handlePropagandaDetail(row)">查看详情</el-button>
              </template>
            </vxe-table-column>
          </Grid>
        </div>
      </ElDialog>
      <ElDialog ref="propagandaDetailDialog" dialogTitle="党建宣传详情">
        <div class="dialog-info">
          <el-form ref="form" label-width="100px" class="col3">
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
              <img :src="dialogData.propagandaDetail.surfacePlot | imgUrl" />
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
      <!--党建宣传 end-->
      <!--党建学习 start-->
      <ElDialog ref="studyDialog" dialogTitle="党员学习">
        <div class="dialog-table">
          <div class="tooltips">
            <el-form inline>
              <el-form-item>
                <el-input v-model="dialogData.studyForm.title" placeholder="标题"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <Select v-model="dialogData.studyForm.type" has-all arg-group="ccpStudyType"></Select>
              </el-form-item>
              <el-form-item>
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="refreshStudy">查询</el-button>
                  <el-button icon="el-icon-refresh-left" @click="resetStudy">重置</el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </div>
          <Grid
            ref="studyTable"
            :request="dialogData.studyList"
            :filter-form.sync="dialogData.studyForm"
            :showHeader="true"
            :isPagination="false"
            :highlightCurrentRow="true"
            height="100%"
          >
            <vxe-table-column title="标题" field="title" min-width="200"></vxe-table-column>
            <vxe-table-column title="类型" field="typeName" width="120"></vxe-table-column>
            <vxe-table-column title="创建时间" field="createTime" width="180"></vxe-table-column>
            <vxe-table-column title="操作" field="opts" width="100">
              <template #default="{ row }">
                <el-button type="text" @click="handleStudyDetail(row)">查看详情</el-button>
              </template>
            </vxe-table-column>
          </Grid>
        </div>
      </ElDialog>
      <ElDialog ref="studyDetailDialog" dialogTitle="党员学习详情">
        <el-tabs v-model="studyDialogIndex" class="bim-tabs">
          <el-tab-pane label="详情" name="0">
            <div class="dialog-info">
              <el-form ref="form" label-width="100px" class="col3">
                <el-form-item label="公告标题">
                  <div class="ellipsis">{{ dialogData.studyDetail.title }}</div>
                </el-form-item>
                <el-form-item label="公告类型">
                  {{ dialogData.studyDetail.typeName }}
                </el-form-item>
                <el-form-item label="创建人">
                  {{ dialogData.studyDetail.creatorName }}
                </el-form-item>
                <el-form-item label="创建时间">
                  {{ dialogData.studyDetail.createTime }}
                </el-form-item>
                <el-form-item label="发布状态">
                  {{ $getLabel(studyPublishOptions, dialogData.studyDetail.publishFlag) }}
                </el-form-item>
                <el-form-item label="发布时间">
                  {{ dialogData.studyDetail.publishTime }}
                </el-form-item>
                <el-form-item label="接收人" style="width: 100%">
                  {{ dialogData.studyDetail.recipientName && dialogData.studyDetail.recipientName.join(',') }}
                </el-form-item>
                <el-form-item label="公告内容" style="width: 100%">
                  <div v-html="dialogData.studyDetail.content"></div>
                </el-form-item>
                <el-form-item label="附件">
                  <FileList :ids="dialogData.studyDetail.fileIds"></FileList>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学习记录" name="1">
            <div class="dialog-info">
              <Grid
                ref="studyRecordTable"
                :key="'studyRecordTable' + studyId"
                :request="dialogData.studyRecordList"
                :filter-form.sync="dialogData.studyRecordForm"
                :showHeader="true"
                :isPagination="false"
                :highlightCurrentRow="true"
                height="100%"
              >
                <vxe-table-column title="姓名" field="realName"></vxe-table-column>
                <vxe-table-column title="性别" field="sex" formatter="sex"></vxe-table-column>
                <vxe-table-column title="手机号" field="mobile"></vxe-table-column>
                <vxe-table-column title="身份证号" field="identityCardNumber"></vxe-table-column>
                <vxe-table-column title="学习时间" field="learningTime"></vxe-table-column>
                <vxe-table-column title="本次学习时长" field="duration"> </vxe-table-column>
              </Grid>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学习心得" name="2">
            <div class="dialog-info">
              <div class="tooltips">
                <el-form ref="contentForm" inline>
                  <el-form-item>
                    <el-input v-model="q" placeholder="姓名/内容"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-right: 30px">
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="computedSummarizeListList.length > 0">
                <div v-for="(item, index) in computedSummarizeListList" :key="'ccl' + index" class="main-desc">
                  <div class="item">
                    <span class="el-icon-user"></span>
                    <span v-html="item.realName"></span>
                    <span style="margin-left: 15px">{{ item.createTime | ymdhm }}</span>
                  </div>
                  <p v-html="item.summarize"></p>
                  <p>
                    <el-form-item label="附件" label-width="100">
                      <FileList :ids="item.fileIds"></FileList>
                    </el-form-item>
                  </p>
                </div>
              </div>
              <div v-else>
                <p style="text-align: center; margin-top: 10%; font-size: 16px">-暂无数据-</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </ElDialog>
      <!--党建学习 end-->
      <!--党建活动 start-->
      <ElDialog ref="activityDialog" dialogTitle="党建活动">
        <div class="dialog-table">
          <div class="tooltips">
            <el-form inline>
              <el-form-item>
                <el-input v-model="dialogData.activityForm.name" placeholder="活动名称"></el-input>
              </el-form-item>
              <el-form-item label="活动类型">
                <Select v-model="dialogData.activityForm.type" arg-group="ccpActivityType" has-all />
              </el-form-item>
              <el-form-item>
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="refreshActivity">查询</el-button>
                  <el-button icon="el-icon-refresh-left" @click="resetActivity">重置</el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </div>
          <Grid
            ref="activityTable"
            :request="dialogData.activityList"
            :filter-form.sync="dialogData.activityForm"
            :showHeader="true"
            :isPagination="true"
            :highlightCurrentRow="true"
            height="100%"
          >
            <vxe-table-column title="活动名称" field="name"></vxe-table-column>
            <vxe-table-column title="活动地点" field="site"></vxe-table-column>
            <vxe-table-column title="活动类型" field="typeName"> </vxe-table-column>
            <vxe-table-column title="活动状态" field="status">
              <template #default="{ row }">
                {{ $getLabel(statusList, row.status) }}
              </template>
            </vxe-table-column>
            <vxe-table-column title="活动开始时间" field="activityBeginTime" formatter="ymdhm"></vxe-table-column>
            <vxe-table-column title="活动结束时间" field="activityEndTime" formatter="ymdhm"></vxe-table-column>
            <vxe-table-column title="发起组织" field="organizationName"></vxe-table-column>
            <vxe-table-column title="操作" field="opts" width="100">
              <template #default="{ row }">
                <el-button type="text" @click="handleActivityDetail(row)">查看详情</el-button>
              </template>
            </vxe-table-column>
          </Grid>
        </div>
      </ElDialog>
      <ElDialog ref="activityDetailDialog" dialogTitle="党建活动详情">
        <el-tabs v-model="activityDialogIndex" class="bim-tabs">
          <el-tab-pane label="详情" name="0">
            <div class="dialog-info">
              <el-row :gutter="4">
                <el-col :span="24">
                  <el-col :span="16">
                    <span>活动名称：</span>
                    <span>{{ dialogData.activityDetail.name }}</span>
                  </el-col>
                  <el-col :span="8">
                    <el-tag size="mini">{{ $getLabel(statusList, dialogData.activityDetail.status) }}</el-tag>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">活动内容：</span>
                  <span>{{ dialogData.activityDetail.content }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">活动地点：</span>
                  <span>{{ dialogData.activityDetail.site }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">活动类型：</span>
                  <span>{{ dialogData.activityDetail.typeName }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">活动时间：</span>
                  <span
                    >{{ dialogData.activityDetail.activityBeginTime | ymdhm }}~{{
                      dialogData.activityDetail.activityEndTime | ymdhm
                    }}</span
                  >
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">报名时间：</span>
                  <span
                    >{{ dialogData.activityDetail.applyBeginTime | ymdhm }}~{{
                      dialogData.activityDetail.applyEndTime | ymdhm
                    }}</span
                  >
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">发起组织：</span>
                  <span>{{ dialogData.activityDetail.organizationName }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">参与党员：</span>
                  <UserShowMore :value="dialogData.activityDetail.firstParticipantName"></UserShowMore>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">参与积极分子：</span>
                  <UserShowMore :value="dialogData.activityDetail.secondParticipantName"></UserShowMore>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">附件：</span>
                  <span style="display: inline-block; vertical-align: top"
                    ><FileList :ids="dialogData.activityDetail.fileIds"
                  /></span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">活动积分：</span>
                  <span>{{ dialogData.activityDetail.score }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">创建人：</span>
                  <span>{{ dialogData.activityDetail.creatorName }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">创建时间：</span>
                  <span>{{ dialogData.activityDetail.createTime }}</span>
                </el-col>
                <el-col :span="24">
                  <h2 class="title">活动总结</h2>
                  <span class="desc-label">活动总结：</span>
                  <span>
                    {{ dialogData.activityDetail.activitySummarize }}
                  </span>
                </el-col>
                <el-col :span="24">
                  <span class="desc-label">附件：</span>
                  <span style="display: inline-block"
                    ><FileList :ids="dialogData.activityDetail.activitySummarizeFile"
                  /></span>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="报名及签到" name="1">
            <div class="dialog-table">
              <div class="tooltips">
                <el-form inline>
                  <el-form-item>
                    <el-input v-model="dialogData.activitySignForm.userName" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button-group>
                      <el-button type="primary" icon="el-icon-search" @click="refreshActivitySign">查询</el-button>
                      <el-button icon="el-icon-refresh-left" @click="resetActivitySign">重置</el-button>
                    </el-button-group>
                  </el-form-item>
                </el-form>
              </div>
              <Grid
                ref="activitySignTable"
                :request="dialogData.activitySignList"
                :filter-form.sync="dialogData.activitySignForm"
                :showHeader="true"
                :isPagination="false"
                :highlightCurrentRow="true"
                height="100%"
              >
                <vxe-table-column title="姓名" field="userName" width="180"></vxe-table-column>
                <vxe-table-column title="报名时间" field="createTime"></vxe-table-column>
                <vxe-table-column title="签到时间" field="signInTime"></vxe-table-column>
              </Grid>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学习心得" name="2">
            <div class="dialog-info">
              <div class="tooltips">
                <el-form ref="contentForm" inline>
                  <el-form-item>
                    <el-input v-model="dialogData.activitySummarizeForm.userName" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-right: 30px">
                    <el-button-group>
                      <el-button type="primary" icon="el-icon-search" @click="refreshActivitySummarize">查询</el-button>
                      <el-button icon="el-icon-refresh-left" @click="resetActivitySummarize">重置</el-button>
                    </el-button-group>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="dialogData.activitySummarizeList.length > 0">
                <div v-for="(item, index) in dialogData.activitySummarizeList" :key="'asl' + index" class="main-desc">
                  <div class="item">
                    <span>图片</span>
                    <span>{{ item.userName }}</span>
                    <span>{{ item.updateTime }}</span>
                  </div>
                  <p>
                    {{ item.content }}
                  </p>
                  <el-form-item label="附件" label-width="100">
                    <FileList :ids="item.fileIds"></FileList>
                  </el-form-item>
                </div>
              </div>
              <div v-else>
                <p style="text-align: center; margin-top: 10%; font-size: 16px">-暂无数据-</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </ElDialog>
      <!--党建活动 end-->
      <!--党建会议 start-->
      <ElDialog ref="meetingDialog" dialogTitle="党建会议" popupWidth="1200px">
        <div class="dialog-table">
          <div class="tooltips">
            <el-form inline>
              <el-form-item>
                <el-input v-model="dialogData.meetingForm.meetingSubject" placeholder="会议主题"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="dialogData.meetingForm.keyword" placeholder="会议室名称"></el-input>
              </el-form-item>
              <el-form-item label="会议状态：">
                <Select v-model="dialogData.meetingForm.status" :options="meetingStatusList" has-all />
              </el-form-item>
              <el-form-item>
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="refreshMeeting">查询</el-button>
                  <el-button icon="el-icon-refresh-left" @click="resetMeeting">重置</el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </div>
          <Grid
            ref="meetingTable"
            :request="dialogData.meetingList"
            :filter-form.sync="dialogData.meetingForm"
            :showHeader="true"
            :isPagination="true"
            :highlightCurrentRow="true"
            height="100%"
          >
            <vxe-table-column title="会议主题" field="meetingSubject"></vxe-table-column>
            <vxe-table-column title="会议室名称" field="meetingAddress">
              <template #default="{ row }"> {{ row.meetingAddress }} </template>
            </vxe-table-column>
            <vxe-table-column title="会议开始时间" field="startTime"></vxe-table-column>
            <vxe-table-column title="会议结束时间" field="endTime"></vxe-table-column>
            <vxe-table-column field="status" title="会议状态">
              <template #default="{ row }">
                {{ $getLabel(meetingStatusList, row.status) }}
              </template>
            </vxe-table-column>
            <vxe-table-column title="发起人" field="initiatorName"></vxe-table-column>
            <vxe-table-column title="创建时间" field="createTime"></vxe-table-column>
            <vxe-table-column title="创建人" field="creatorName"></vxe-table-column>
            <vxe-table-column title="操作" field="opts" width="100">
              <template #default="{ row }">
                <el-button type="text" @click="handleMeetingDetail(row)">查看详情</el-button>
              </template>
            </vxe-table-column>
          </Grid>
        </div>
      </ElDialog>
      <ElDialog ref="meetingDetailDialog" dialogTitle="党建会议详情">
        <el-tabs v-model="meetingDialogIndex" class="bim-tabs">
          <el-tab-pane label="会议详情" name="0">
            <div class="dialog-info">
              <el-form label-width="120px">
                <div class="detail-model">
                  <el-row :gutter="4">
                    <el-col :span="24">
                      <span class="desc-label">会议主题：</span>
                      <span>{{ dialogData.meetingDetail.meetingSubject }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">会议室：</span>
                      <span>{{ dialogData.meetingDetail.meetingAddress }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">发起人：</span>
                      <span>{{
                        dialogData.meetingDetail.initiatorName ? dialogData.meetingDetail.initiatorName.join(',') : ''
                      }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">参会党员：</span>
                      <span
                        ><UserShowMore
                          :value="
                            dialogData.meetingDetail.participantName
                              ? dialogData.meetingDetail.participantName.join(',')
                              : ''
                          "
                      /></span>
                      <!-- <span>{{ form.participantName ? form.participantName.join(',') : '' }}</span> -->
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">参会积极分子：</span>
                      <span
                        ><UserShowMore
                          :value="
                            dialogData.meetingDetail.activistName ? dialogData.meetingDetail.activistName.join(',') : ''
                          "
                      /></span>
                      <!-- <span>{{ form.activistName ? form.activistName.join(',') : '' }}</span> -->
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">会议时间：</span>
                      <span
                        >{{
                          dialogData.meetingDetail.startTime
                            ? dayjs(dialogData.meetingDetail.startTime).format('YYYY-MM-DD HH:mm')
                            : ''
                        }}~{{
                          dialogData.meetingDetail.endTime
                            ? dayjs(dialogData.meetingDetail.endTime).format('YYYY-MM-DD HH:mm')
                            : ''
                        }}</span
                      >
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">会议状态：</span>
                      <span>{{ $getLabel(statusList, dialogData.meetingDetail.status) }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">创建人：</span>
                      <span>{{ dialogData.meetingDetail.creatorName }}</span>
                    </el-col>
                    <el-col :span="24">
                      <span class="desc-label">创建时间：</span>
                      <span>{{
                        dialogData.meetingDetail.createTime
                          ? dayjs(dialogData.meetingDetail.createTime).format('YYYY-MM-DD HH:mm')
                          : ''
                      }}</span>
                    </el-col>
                    <div v-if="[2].includes(dialogData.meetingDetail.status)">
                      <el-col :span="24">
                        <span class="desc-label">会议纪要：</span>
                        <span>{{ dialogData.meetingDetail.summary }}</span>
                      </el-col>
                      <el-col :span="24">
                        <span class="desc-label">附件：</span>
                        <span style="display: inline-block; vertical-align: top">
                          <FileList :ids="dialogData.meetingDetail.fileIds" />
                        </span>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="会议签到" name="1" lazy>
            <div class="dialog-table">
              <div class="tooltips">
                <el-form inline>
                  <el-form-item>
                    <el-input v-model="dialogData.meetingSignForm.userName" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button-group>
                      <el-button type="primary" icon="el-icon-search" @click="refreshMeetingSign">查询</el-button>
                      <el-button icon="el-icon-refresh-left" @click="resetMeetingSign">重置</el-button>
                    </el-button-group>
                  </el-form-item>
                </el-form>
              </div>
              <Grid
                ref="meetingSignTable"
                :key="'meetingSignTable' + meetingId"
                :request="dialogData.meetingSignList"
                :filter-form.sync="dialogData.meetingSignForm"
                :showHeader="true"
                :isPagination="false"
                :highlightCurrentRow="true"
                height="100%"
              >
                <vxe-table-column title="姓名" field="userName" width="180"></vxe-table-column>
                <vxe-table-column title="报名时间" field="createTime"></vxe-table-column>
                <vxe-table-column title="签到时间" field="signInTime"></vxe-table-column>
              </Grid>
            </div>
          </el-tab-pane>
        </el-tabs>
      </ElDialog>
      <!--党建会议 end-->
    </div>
  </div>
</template>

<script>
import BigCard from '../components/BigCard' // 卡片
import EchartsPie from '../components/EchartsPie' // 环形图
import EchartsPies from '../components/EchartsPie_s' // 南丁格尔玫瑰图
import { Tree } from 'ant-design-vue'
import ElDialog from '../components/ElDialog' // 大屏通用模态框
import Api from '../api/ccp'
import noticePublicStatusList from '@/lib/noticePublicStatusList'
import studyPublishOptions from '@/lib/studyPublishOptions'
import meetingStatusList from '@/lib/meetingStatusList'
import Fuse from 'fuse.js'
import { highlight } from '@/utils/fuseHighlight'
import { statusList } from '@/views/association/lib/optionsList'
import treeForEach from '@/utils/treeForEach'
export default {
  components: {
    Tree,
    BigCard,
    EchartsPie,
    EchartsPies,
    ElDialog
  },
  data() {
    // 这里存放数据
    return {
      noticePublicStatusList,
      studyPublishOptions,
      statusList,
      meetingStatusList,
      replaceFields: {
        key: 'id',
        value: 'id'
      },
      expandedKeys: [],
      ccpData: {},
      complaintPieData: [], // 党建宣传图表数据
      suggestionsPieData: [], // 党员学习图表数据
      partyPieData: [], // 党建活动与会议图表数据
      // 模态框数据
      studyId: '', // 学习记录id
      activityId: '', // 党建活动id
      meetingId: '', // 党建会议id
      dialogData: {
        propagandaList: Api.getPropagandaList,
        propagandaForm: {},
        propagandaDetail: {},
        studyList: Api.getStudyList,
        studyForm: {},
        studyDetail: {},
        studyRecordList: body => Api.getStudyRecordList({ ...body, studyId: this.studyId }),
        studyRecordForm: {},
        studySummarizeList: [],
        activityList: Api.getActivityList,
        activityForm: {},
        activityDetail: {},
        activitySignList: body => Api.getActivitySign({ ...body, id: this.activityId }),
        activitySignForm: {},
        activitySummarizeList: [],
        activitySummarizeForm: {},
        meetingList: Api.getMeetingList,
        meetingForm: {},
        meetingDetail: {},
        meetingSignList: async body => {
          const res = await Api.getMeetingSign({ ...body, id: this.meetingId })
          return {
            records: res.data,
            total: res.data.length
          }
        },
        meetingSignForm: {}
      },
      dialogDataBack: {},
      studyDialogIndex: '0',
      q: '',
      fuse: null,
      activeSubTab: 'propaganda', // 右边党建展示的饼状图
      activityDialogIndex: '0',
      meetingDialogIndex: '0'
    }
  },
  computed: {
    treeData() {
      const treeData = _.cloneDeep(this.$store.state.ccp.structTreeData)
      if (treeData[0]) treeData[0].disabled = this.edit
      treeForEach(treeData, item => {
        item.title = `${item.title}(${item.count})`
      })
      return treeData
    },
    computedSummarizeListList() {
      if (!this.q) {
        return this.dialogData.studySummarizeList
      } else {
        return highlight(this.fuse.search(this.q))
      }
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
      this.selectPartyModule()
    },
    refresh() {
      this.$refs.propagandaTable.refresh()
    },
    // 重置
    reset() {
      this.$refs.propagandaTable.reset()
    },
    refreshStudy() {
      this.$refs.studyTable.refresh()
    },
    // 重置
    resetStudy() {
      this.$refs.studyTable.reset()
    },
    refreshActivity() {
      this.$refs.activityTable.refresh()
    },
    resetActivity() {
      this.$refs.activityTable.reset()
    },
    refreshActivitySign() {
      this.$refs.activitySignTable.refresh()
    },
    resetActivitySign() {
      this.$refs.activitySignTable.reset()
    },
    resetActivitySummarize() {
      this.dialogData.activitySummarizeForm.userName = ''
      this.searchActivitySummarize()
    },
    refreshActivitySummarize() {
      this.searchActivitySummarize()
    },
    refreshMeeting() {
      this.$refs.meetingTable.refresh()
    },
    resetMeeting() {
      this.$refs.meetingTable.reset()
    },
    refreshMeetingSign() {
      this.$refs.meetingSignTable.refresh()
    },
    resetMeetingSign() {
      this.$refs.meetingSignTable.reset()
    },
    // 智慧党建模块
    async selectPartyModule() {
      const params = {
        parentType: ''
      }
      const result = await Api.selectPartyModule(params)
      const datas = result.data
      this.ccpData = datas
      // 处理党建宣传图表数据
      const complaintPieData = []
      for (const key in datas.partyNotificationMap) {
        complaintPieData.push({
          name: key,
          value: datas.partyNotificationMap[key]
        })
      }
      this.complaintPieData = complaintPieData
      // 处理党员学习图表数据
      const suggestionsPieData = []
      for (const key in datas.partyStudyMap) {
        suggestionsPieData.push({
          name: key,
          value: datas.partyStudyMap[key]
        })
      }
      this.suggestionsPieData = suggestionsPieData
      // 处理党建活动与会议图表数据
      const partyPieData = []
      for (const key in datas.partyActivityMap) {
        partyPieData.push({
          name: key,
          value: datas.partyActivityMap[key]
        })
      }
      this.partyPieData = partyPieData
    },
    // 选择树
    selectTree([id]) {
      console.log(111, id)
    },
    handleCheckPropaganda() {
      this.$refs.propagandaDialog.dialogVisible = true
    },
    handleCheckStudy() {
      this.$refs.studyDialog.dialogVisible = true
    },
    async handlePropagandaDetail(row) {
      this.$refs.propagandaDetailDialog.dialogVisible = true
      const res = await Api.getPropagandaDetail(row.id)
      this.dialogData.propagandaDetail = res.data || {}
    },
    async handleStudyDetail(row) {
      this.studyId = row.id
      this.studyDialogIndex = '0'
      this.$refs.studyDetailDialog.dialogVisible = true
      const res = await Api.getStudyDetail(row.id)
      this.dialogData.studyDetail = res.data || {}
      const res1 = await Api.summarizeList({ studyId: this.studyId })
      this.dialogData.studySummarizeList = res1.data || []
      this.fuse = new Fuse(this.dialogData.studySummarizeList, {
        keys: ['summarize', 'realName'],
        threshold: '0.7',
        includeMatches: true
      })
    },
    // 党建活动点击
    handleCheckActivity() {
      this.$refs.activityDialog.dialogVisible = true
    },
    // 活动详情
    async handleActivityDetail(row) {
      this.activityId = row.id
      this.activityDialogIndex = '0'
      this.$refs.activityDetailDialog.dialogVisible = true
      const res = await Api.getActivityDetail(row.id)
      this.dialogData.activityDetail = res.data || {}
      await this.searchActivitySummarize()
    },
    // 查询活动学习心得
    async searchActivitySummarize() {
      const res = await Api.activitySummarizeList({ ...this.dialogData.activitySummarizeForm, id: this.activityId })
      this.dialogData.activitySummarizeList = res.data || []
    },
    handleCheckMeeting() {
      this.$refs.meetingDialog.dialogVisible = true
    },
    // 党建会议详情
    async handleMeetingDetail(row) {
      this.meetingId = row.id
      this.meetingDialogIndex = '0'
      this.$refs.meetingDetailDialog.dialogVisible = true
      const res = await Api.getMeetingDetail(row.id)
      this.dialogData.meetingDetail = res.data || {}
      /* const res1 = await Api.getMeetingSignList({ meetingId: this.meetingId })
      this.dialogData.studySummarizeList = res1.data || [] */
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
@import './ccp.scss';
@import '../bimTabs.scss';
.tag-wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  ::v-deep .el-tag {
    margin: 5px;
  }
}
.dialog-info {
  display: flex;
  flex-direction: column;
  max-height: calc(50vh);
  overflow-y: auto;
  overflow-x: hidden;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      display: inline-block;
      color: #333;
      ::v-deep .el-form-item__label {
        color: #878787;
      }
    }
    &.col3 {
      .el-form-item {
        width: 33%;
      }
    }
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main-desc {
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  padding: 10px 0;
  .el-icon-user {
    width: 25px;
    height: 25px;
  }
}
.sub-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  user-select: none;
  .sub-tab {
    position: relative;
    font-size: 14px;
    color: #757575;
    &:hover {
      cursor: pointer;
    }
    &:first-child {
      margin-right: 40px;
    }
    &.isActive {
      font-size: 16px;
      font-weight: bolder;
      color: #3d3d3d;
      &:before {
        content: '';
        position: absolute;
        bottom: -5px;
        width: 30px;
        height: 4px;
        left: 50%;
        background-color: red;
        border-radius: 2px;
        transform: translateX(-15px);
      }
    }
  }
}
.el-col {
  margin-bottom: 25px;
}
.title {
  /*border-top: 1px dashed;*/
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
}
.main-desc {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.desc-label {
  font-size: 16px;
  color: #999;
}
.party-study {
  .desc-btn {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
