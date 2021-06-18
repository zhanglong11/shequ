<template>
  <el-dialog :title="(id ? '编辑' : '新建') + '区域'" width="500px" :visible="visible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="所属网格" prop="orgId">
        <SelectGridDepartment v-model="form.orgId"></SelectGridDepartment>
      </el-form-item>
      <el-form-item label="区域名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button v-promise-btn type="primary" @click="submit">{{ id ? '保存' : '创建' }}</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import { createRegion, updateRegionOrBuilding } from '@/api/grid/region'
import SelectGridDepartment from '../../components/SelectGridDepartment'
export default {
  name: 'EditRegion',
  components: { SelectGridDepartment },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    region: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {},
      defaultForm: {},
      rules: {
        orgId: [{ required: true, message: '必填' }],
        name: [{ required: true, message: '必填' }]
      }
    }
  },
  computed: {
    id() {
      return this.form.id
    }
  },
  watch: {
    visible(val) {
      if (val && this.region) {
        this.form = this.region
      }
    }
  },
  created() {
    this.defaultForm = _.cloneDeep(this.form)
  },
  mounted() {},
  methods: {
    async submit() {
      await this.$refs.form.validate()
      this.id ? await updateRegionOrBuilding(this.form) : await createRegion(this.form)
      this.$message.success('操作成功')
      this.close()
      this.$emit('change')
    },
    close() {
      this.$refs.form.resetFields()
      this.form = _.cloneDeep(this.defaultForm)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
