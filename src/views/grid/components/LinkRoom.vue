<template>
  <el-dialog title="关联房间" width="600px" class="beauty" :visible="visible" @close="close">
    <CommunityTree :disabled-item-method="disabledItemMethod" @change="handleChange"></CommunityTree>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" :disabled="!form" @click="submit">关联</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'LinkRoom',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: null
    }
  },
  methods: {
    handleChange(room) {
      this.form = room
    },
    submit() {
      this.$emit('change', this.form)
      this.close()
    },

    close() {
      this.$emit('update:visible', false)
    },
    disabledItemMethod(item) {
      return item.type !== 6
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
