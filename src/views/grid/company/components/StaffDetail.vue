<template>
  <el-dialog title="员工详情" width="500px" class="beauty" :visible="visible" @close="close">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <span>{{ form.name }}</span>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        {{ form.sex | sex }}
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        {{ form.phone }}
      </el-form-item>
      <el-form-item label="身份证" prop="identityCardNumber">
        {{ form.identityCardNumber }}
      </el-form-item>
      <el-form-item label="学历" prop="educationCode">
        {{ form.educationCodeName }}
      </el-form-item>
      <el-form-item label="住址" prop="familyAddress">
        {{ form.familyAddress }}
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="$emit('update:visible', false)">我知道了</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import { getStaffById } from '@/api/grid/companyStaff'
export default {
  name: 'StaffDetail',
  components: {},
  props: {
    id: {
      type: String,
      default: null
    },
    enterpriseId: {
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
      form: {},
      defaultForm: {}
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) this.refresh()
    }
  },
  created() {
    this.defaultForm = _.cloneDeep(this.form)
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    async refresh() {
      getStaffById(this.id).then(res => {
        this.form = res.data
      })
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
