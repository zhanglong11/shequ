<template>
  <el-dialog title="新建参数" width="500px" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="参数名称" prop="argText">
        <el-input v-model="form.argText"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">创建</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { createSystemArg } from '@/api/system/args'

export default {
  name: 'Edit',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    id: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    },
    argGroup: {
      type: String,
      default: null
    }
  },
  data() {
    // 这里存放数据
    return {
      form: {},
      rules: {
        argText: [{ required: true, message: '必填' }]
      }
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) this.refresh()
    }
  },

  created() {
    this.initForm = _.cloneDeep(this.form)
  },

  mounted() {},

  methods: {
    submit: async function () {
      await this.$refs.form.validate()
      await createSystemArg({ argGroup: this.argGroup, ...this.form })
      this.$message.success('创建成功')
      this.$emit('change')
      this.close()
    },
    // 关闭弹窗
    close() {
      this.$refs.form.resetFields()
      this.form = _.cloneDeep(this.initForm)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="less"></style>
