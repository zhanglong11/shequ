<template>
  <el-dialog
    :title="(data._XID ? '编辑' : '新建') + '发展日志'"
    width="500px"
    class="beauty"
    :visible="visible"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="事项说明" prop="explain">
        <el-input v-model="form.explain" type="textarea" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
      <el-form-item label="事项时间" prop="matterDate">
        <el-date-picker v-model="form.matterDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="附件">
        <Upload v-model="form.fileIds" is-only-button></Upload>
      </el-form-item>
      <!-- <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>-->
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ data._XID ? '保存' : '创建' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'EventLogEdit',
  components: {},
  props: {
    data: {
      type: Object,
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
        explain: null,
        matterDate: null,
        ...this.data
      },
      rules: {
        explain: [{ required: true, message: '必填' }],
        matterDate: [{ required: true, message: '必填' }]
      }
    }
  },
  /* watch: {
    visible(val) {
      if (val) this.form = this.data
    }
  }, */
  created() {},
  mounted() {},
  methods: {
    async submit() {
      await this.$refs.form.validate()
      this.$emit('change', _.cloneDeep(this.form))
      this.close()
    },
    close() {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
