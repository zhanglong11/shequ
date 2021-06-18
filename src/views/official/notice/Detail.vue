<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="common-card">
        <div class="common-card-title">
          <span class="title-content"></span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row type="flex">
            <el-col>
              <DetailItem label="公告标题" labelWidth="120">
                <div class="notice-title">
                  {{ info.title }}
                </div></DetailItem
              >
            </el-col>
            <el-col>
              <DetailItem label="发布部门" labelWidth="80" :value="info.parentName"></DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="公告类型" labelWidth="80">
                {{ info.typeName }}
              </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="发布时间" labelWidth="80">
                {{ dayjs(info.topTime).format('YYYY-MM-DD HH:mm:00') }}
              </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="创建人" labelWidth="80" :value="info.creatorName"></DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="创建时间" labelWidth="80" :value="info.createTime"> </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="发布状态" labelWidth="80">
                {{ $getLabel(statusFb, info.status) }}
              </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="是否置顶" labelWidth="120">
                {{ $getLabel(topFlagList, info.topFlag) }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="接收人" labelWidth="120">
                {{ info.recipientName ? info.recipientName.toString() : '' }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="封面图片" labelWidth="120">
                <ImgList :fileIds="info.surfacePlot" />
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="公告内容" labelWidth="120">
                <div v-html="info.content"></div>
                <!-- <Editor v-model="info.content" disabled></Editor> -->
              </DetailItem>
            </el-col>
          </el-row>
          <DetailItem label="公告标签" labelWidth="120">
            <el-col>
              <el-tag
                v-for="item of info.label ? info.label.split(',') : []"
                :key="item"
                style="margin: 0 5px"
                size="mini"
                >{{ item }}</el-tag
              >
            </el-col>
          </DetailItem>
          <el-row>
            <el-col>
              <DetailItem label="核对人员" labelWidth="120" :value="info.checkPersonName"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="核对结果" labelWidth="120">
                {{ $getLabel(cheResult, info.status) }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="说明" labelWidth="120" :value="info.checkOpinion"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="核对时间" labelWidth="120" :value="info.checkTime"> </DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button type="primary" @click="codeDialogVisible = true">二维码预览</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </div>
    <QRcodeDialog v-if="codeDialogVisible" :id="id" :visible.sync="codeDialogVisible"></QRcodeDialog>
  </div>
</template>

<script>
import Api from '../api'
import QRcodeDialog from '@/views/epidemicControl/components/notice/CommonNoticeDetail/components/QRcodeDialog'
import { topFlagList, statusFb, noticeTypeList, cheResult } from '../lib/optionsList'
export default {
  name: 'NoticeDetail',
  components: { QRcodeDialog },
  props: {},
  data() {
    return {
      topFlagList,
      statusFb,
      noticeTypeList,
      cheResult,
      id: this.$route.params.id || '',
      codeDialogVisible: false,
      info: {}
    }
  },
  watch: {},
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await Api.getinformDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>

<style scoped lang="less">
// @import url('@/views/epidemicControl/components/style/index.less');
.notice-title {
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
