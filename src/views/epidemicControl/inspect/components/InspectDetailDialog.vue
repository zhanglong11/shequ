<template>
  <el-dialog
    title="详情"
    :close-on-click-modal="false"
    width="600px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <DetailItem label="巡查时间" labelWidth="120" :value="info.patrolTime"></DetailItem>
      <DetailItem label="巡查项目" labelWidth="120" :value="info.patrolProject"></DetailItem>
      <DetailItem label="检查内容" labelWidth="120" :value="info.patrolContent"></DetailItem>
      <DetailItem label="巡查对象" labelWidth="120" :value="info.patrolApplication"></DetailItem>
      <DetailItem label="执行情况" labelWidth="120" :value="info.executiveCondition"></DetailItem>
      <DetailItem label="存在问题记录" labelWidth="120" :value="info.problemRecord"></DetailItem>
      <DetailItem label="整改建议" labelWidth="120" :value="info.recommendations"></DetailItem>
      <DetailItem label="现场人员" labelWidth="120" :value="info.fieldForce"></DetailItem>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'InspectDetailDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less"></style>
