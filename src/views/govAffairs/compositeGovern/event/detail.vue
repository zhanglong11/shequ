<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="common-card">
        <div class="common-card-title">
          <span class="title-content">基本信息</span>
          <span class="title-opt">
            <el-button type="text"></el-button>
          </span>
        </div>
        <div class="common-card-body">
          <el-row>
            <el-col :span="8">
              <DetailItem label="所属网格" labelWidth="150" :value="info.orgName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="事件类型" labelWidth="150" :value="info.typeName"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="事件规模" labelWidth="150" :value="info.scaleName"></DetailItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <DetailItem label="发生时间" labelWidth="150" :value="info.occurrenceTime"></DetailItem>
            </el-col>
            <el-col :span="8">
              <DetailItem label="事件状态" labelWidth="150">{{ $getLabel(eventStatus, info.status) }}</DetailItem>
            </el-col>
          </el-row>
          <DetailItem label="事件描述" labelWidth="150" :value="info.description"></DetailItem>
          <DetailItem label="事件处理过程及结果" labelWidth="150" :value="info.result"></DetailItem>
          <DetailItem label="附件" labelWidth="150"><FileList :ids="info.fileIds"></FileList></DetailItem>
          <DetailItem label="关联人员" labelWidth="150">
            <div class="tag-wrapper">
              <el-tag
                v-for="(item, index) of info.relevanceList"
                :key="'tag' + index"
                style="margin: 0 5px"
                size="mini"
                @click="handleTagClick(item)"
                >{{ item.name }}
              </el-tag>
            </div>
          </DetailItem>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>
<script>
import Api from '../api'
import eventStatus from '../../lib/eventStatus'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'CompositeGovernEventDetail',
  components: {},
  data() {
    // 这里存放数据
    return {
      id: this.$route.params.id || '',
      eventStatus,
      info: { relevanceList: [] }
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async getDetail() {
      const res = await Api.getEventDetail(this.id)
      this.info = { ...res.data }
    },
    handleTagClick(item) {
      console.log(item)
      this.$router.push({
        name: 'GridResidentDetail',
        params: {
          id: item.identityCardNumber
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tag-wrapper {
  /deep/.el-tag {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
