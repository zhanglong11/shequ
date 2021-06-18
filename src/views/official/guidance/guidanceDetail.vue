<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="common-card">
        <div class="common-card-body">
          <el-row type="flex">
            <el-col>
              <DetailItem label="标题" labelWidth="80">
                {{ info.title }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col>
              <DetailItem label="类型" labelWidth="80">
                {{ info.typeName }}
              </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="发布时间" labelWidth="80">
                {{ info.issueTime ? dayjs(info.issueTime).format('YYYY-MM-DD HH:mm') : '' }}
              </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="创建人" labelWidth="80" :value="info.creatorName"></DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="创建时间" labelWidth="80">
                {{ dayjs(info.createTime).format('YYYY-MM-DD HH:mm') }}
              </DetailItem>
            </el-col>
            <el-col>
              <DetailItem label="发布状态" labelWidth="80">
                {{ $getLabel(statusType, info.status) }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col>
              <DetailItem label="内容" labelWidth="80">
                <div v-html="info.content"></div>
                <!-- <Editor v-model="info.content" disabled></Editor> -->
              </DetailItem>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col>
              <DetailItem label="是否置顶" labelWidth="80">
                {{ $getLabel(topFlagList, info.topFlag) }}
              </DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button type="primary" @click="codeDialogVisible = true">二维码预览</el-button>
      <template v-if="[0].includes(info.status)">
        <el-button v-if="$hasPower('GuidanceEdit')" type="primary" @click="handelUpdate">编辑</el-button>
        <el-button v-if="$hasPower('GuidancePublic')" type="primary" @click="handlelPublic">发布</el-button>
      </template>
      <template v-if="[1].includes(info.status)">
        <el-button v-if="$hasPower('HandlelPublic')" type="primary" @click="handleCancelPublic">取消发布</el-button>
        <el-button v-if="$hasPower('HandleToTop') && info.topFlag === 0" type="primary" @click="handleToTop"
          >置顶</el-button
        >
        <el-button v-if="$hasPower('HandleToTop') && info.topFlag === 1" type="primary" @click="handleToTop"
          >取消置顶</el-button
        >
      </template>
      <el-button v-if="$hasPower('GuidanceDelete')" type="primary" plain @click="handelDelete">删除</el-button>
      <el-button @click="$back()">返回</el-button>
    </div>
    <QRcodeDialog
      v-if="codeDialogVisible"
      :id="id"
      :visible.sync="codeDialogVisible"
      type="thePublicGuide"
      title="办事指南"
    ></QRcodeDialog>
  </div>
</template>

<script>
import Api from '../api'
import QRcodeDialog from '@/views/epidemicControl/components/notice/CommonNoticeDetail/components/QRcodeDialog'
export default {
  name: 'GuidanceDetail',
  components: { QRcodeDialog },
  props: {},
  data() {
    return {
      id: this.$route.params.id || '',
      codeDialogVisible: false,
      info: {},
      statusType: [
        {
          label: '未发布',
          value: 0,
          color: '#BFBFBF'
        },
        {
          label: '已发布',
          value: 1,
          color: '#00A854'
        }
      ],
      topFlagList: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ]
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
      const res = await Api.getthePublicGuideDetail(this.id)
      this.info = { ...res.data }
    },
    // 发布
    async handlelPublic() {
      const res = await this.$confirm('是否确认发布?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.getthePublicGuidePublic({ id: this.id, status: 1 })
        this.$message.success('发布成功!')
        await this.getDetail()
      }
    },
    // 取消发布
    async handleCancelPublic() {
      const res = await this.$confirm('是否取消发布?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        this.$message.info('操作已取消!')
      })
      if (res) {
        await Api.getthePublicGuidePublic({ id: this.id, status: 0 })
        this.$message.success('取消发布成功!')
        await this.getDetail()
      }
    },
    // 置顶/取消置顶操作
    async handleToTop() {
      await Api.getthePublicGuideSet({ id: this.id, topFlag: +!this.info.topFlag })
      this.$message.success('操作成功!')
      await this.getDetail()
    },
    handelUpdate() {
      this.$router.push({
        name: `GuidanceEdit`,
        params: { id: this.id }
      })
    },
    handelDelete() {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.getthePublicGuideDelete(this.id).then(res => {
            if (res.code === 200) {
              this.$message.info('删除成功')
              this.$router.back()
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
.notice-title {
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
