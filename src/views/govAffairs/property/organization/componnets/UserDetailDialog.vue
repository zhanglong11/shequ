<template>
  <el-dialog
    title="员工详情"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <DetailItem label="姓名" labelWidth="120" :value="info.name"></DetailItem>
      <DetailItem label="性别" labelWidth="120">{{ info.sex === 0 ? '女' : '男' }}</DetailItem>
      <DetailItem label="联系电话" labelWidth="120" :value="info.phone"></DetailItem>
      <DetailItem label="身份证" labelWidth="120">{{ info.idCardNumber || '-' }}</DetailItem>
      <DetailItem label="岗位" labelWidth="120" :value="info.position"></DetailItem>
      <DetailItem label="备注" labelWidth="120" :value="info.remark"></DetailItem>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserDetailDialog',
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
