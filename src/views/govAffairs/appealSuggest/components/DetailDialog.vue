<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <DetailItem label="涉及部门" labelWidth="120" :value="info.involveDepartment"></DetailItem>
      <DetailItem label="解决意见或措施" labelWidth="120" :value="info.solution"></DetailItem>
      <DetailItem label="附件" labelWidth="120"><ImgList :file-ids="info.fileId"></ImgList></DetailItem>
      <DetailItem label="处理时间" labelWidth="120" :value="info.solutionTime"></DetailItem>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import Api from '../api'
export default {
  name: 'DetailDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '详情'
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'appeal'
    }
  },
  data() {
    return {
      info: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const res = this.type === 'appeal' ? await Api.getAppealDetail(this.id) : await Api.getSuggestDetail(this.id)
      this.info = res.data
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less"></style>
