<template>
  <el-dialog
    title="详情"
    :close-on-click-modal="false"
    width="500px"
    class="beauty bg-border"
    :visible="visible"
    @close="close"
  >
    <div>
      <DetailItem label="时间" labelWidth="120" :value="info.time"></DetailItem>
      <DetailItem label="地点" labelWidth="120" :value="info.address"></DetailItem>
      <DetailItem label="方式" labelWidth="120" :value="info.way"></DetailItem>
      <DetailItem label="记录内容" labelWidth="120" :value="info.content"></DetailItem>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'ManageDetailDialog',
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
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    userName() {
      return this.$store.state.user.name
    }
  },
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
