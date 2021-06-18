<template>
  <el-dialog title="新建" width="600px" class="beauty bg-border" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="form.time"
          style="width: 100%"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="地点" prop="address">
        <el-input v-model="form.address" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="方式" prop="way">
        <el-input v-model="form.way" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="记录内容" prop="content">
        <el-input v-model="form.content" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ _.isEmpty(info) ? '新建' : '修改' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddManageDialog',
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
    return {
      form: { time: this.dayjs().format('YYYY-MM-DD'), ...this.info },
      rules: {
        time: [{ required: true, message: '必选' }],
        address: [{ required: true, message: '必填' }],
        way: [{ required: true, message: '必填' }],
        content: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  watch: {},
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      await this.$refs.form.validate()
      this.$emit('submit', this.form)
    }
  }
}
</script>
<style scoped lang="less"></style>
