<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="common-card">
        <div class="common-card-body">
          <el-row>
            <el-col>
              <DetailItem label="标题" labelWidth="120">
                {{ info.title }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="封面图片" labelWidth="120">
                <ImgList :fileIds="info.surfacePic" />
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="内容" labelWidth="120">
                <div v-html="info.content"></div>
                <!-- <Editor v-model="info.content" disabled></Editor> -->
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="视频" labelWidth="120">
                <!-- <FileList :ids="info.video" /> -->
                <VedioList :ids="info.video" />
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="是否置顶" labelWidth="120">
                {{ $getLabel(topFlagList, info.topFlag) }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="创建人" labelWidth="120" :value="info.creatorName"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="创建时间" labelWidth="120">
                {{ dayjs(info.createTime).format('YYYY-MM-DD HH:mm') }}
              </DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <DetailItem label="状态" labelWidth="120">
                {{ $getLabel(statusType, info.status) }}
              </DetailItem>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button v-if="$hasPower('TalentEdit')" type="primary" @click="handelUpdate">编辑</el-button>
      <el-button v-if="$hasPower('HandlelShow') && info.status === 0" type="primary" @click="handlelPublic"
        >显示</el-button
      >
      <el-button v-if="$hasPower('HandlelCancel') && info.status === 1" type="primary" @click="handlelPublic"
        >隐藏</el-button
      >
      <template v-if="[1].includes(info.status)">
        <el-button v-if="$hasPower('HasToTopSet') && info.topFlag === 0" type="primary" @click="handleToTop"
          >置顶</el-button
        >
        <el-button v-if="$hasPower('HasToTopSet') && info.topFlag === 1" type="primary" @click="handleToTop"
          >取消置顶</el-button
        >
      </template>
      <el-button v-if="$hasPower('TalentDelete')" type="primary" @click="handelDelete">删除</el-button>
      <el-button @click="$back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import VedioList from './vedioList'
export default {
  name: 'TalentDetail',
  components: { VedioList },
  props: {},
  data() {
    return {
      id: this.$route.params.id || '',
      codeDialogVisible: false,
      info: {},
      statusType: [
        {
          label: '已隐藏',
          value: 0,
          color: '#BFBFBF'
        },
        {
          label: '已显示',
          value: 1,
          color: '#00A854'
        }
      ],
      topFlagList: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
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
      const res = await Api.getcommunityDetail(this.id)
      this.info = { ...res.data }
    },
    // 显示
    async handlelPublic() {
      await Api.getcommunityUpdate({ id: this.id, status: +!this.info.status })
      this.$message.success('操作成功!')
      await this.getDetail()
    },
    // 置顶/取消置顶操作
    async handleToTop() {
      await Api.getcommunityUpdate({ id: this.id, topFlag: +!this.info.topFlag })
      this.$message.success('操作成功!')
      await this.getDetail()
    },
    handelUpdate() {
      this.$router.push({
        name: `TalentEdit`,
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
          Api.getcommunityDelete([this.id]).then(res => {
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
