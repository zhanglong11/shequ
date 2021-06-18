<template>
  <el-dialog title="积分设置" width="700px" :visible="visible" @close="close">
    <vxe-table :data="form.list">
      <vxe-table-column width="300" title="积分任务" field="taskName"></vxe-table-column>
      <vxe-table-column title="分值设置">
        <template #default="{ row }">
          <InputNumber v-model="row.scoreSet" :min="0"></InputNumber>
        </template>
      </vxe-table-column>
      <vxe-table-column title="每日上限">
        <template #default="{ row }">
          <InputNumber v-model="row.everydayUpper" :min="0"></InputNumber>
        </template>
      </vxe-table-column>
    </vxe-table>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">保存</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { getScoreSet, scoreSet } from '@/api/ccp/points'
export default {
  name: 'CcpPointsSettings',
  components: {},
  props: {
    id: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        list: []
      }
    }
  },
  watch: {
    visible(val) {
      if (val) this.refresh()
    }
  },
  methods: {
    async refresh() {
      this.form.list = await getScoreSet().then(res => res.data)
    },
    async submit() {
      await scoreSet(this.form)
      this.$message.success('设置成功')
      this.close()
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
