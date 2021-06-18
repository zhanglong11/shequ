<template>
  <div class="container">
    <Aside edit @change="handleChange"></Aside>
    <div class="main-content">
      <el-form ref="form" :rules="rules" :model="form" label-width="110px">
        <h3>基本信息</h3>
        <el-form-item label="党组织名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级单位" prop="pid">
          <SelectCcpDepartment v-model="form.pid" :disabled-keys="form.id ? [form.id] : null"></SelectCcpDepartment>
        </el-form-item>
        <el-form-item label="党组织地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="党组织负责人" prop="principal">
          <el-input v-model="form.principal"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="width: 100%">
          <h3>地图定位</h3>
          <AddPoint :lng.sync="form.longitude" :lat.sync="form.latitude" :address.sync="form.address"></AddPoint>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button v-if="form.id && $hasPower('CcpDepartmentCreate')" v-promise-btn type="primary" @click="submit"
          >保存</el-button
        >
        <el-button v-else-if="$hasPower('CcpDepartmentUpdate')" v-promise-btn type="primary" @click="submit"
          >创建</el-button
        >
        <el-button v-if="form.id && $hasPower('CcpDepartmentRemove')" v-promise-btn type="danger" @click="remove"
          >删除</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Aside from '../components/Aside'
import {
  addAndSave,
  getPartyOrganizationalManagementById,
  removePartyOrganizationalManagementById
} from '@/api/ccp/department'
import SelectCcpDepartment from '../components/SelectCcpDepartment'
import AddPoint from './AddPoint'

export default {
  name: 'CcpDepartment',
  components: { Aside, SelectCcpDepartment, AddPoint },
  data() {
    return {
      activeId: null,
      form: {},
      rules: {
        name: [{ required: true, message: '必填' }],
        pid: [{ required: true, message: '必填' }]
      }
    }
  },
  watch: {
    activeId(val) {
      if (val) this.refresh()
      else {
        this.form = _.cloneDeep(this.initForm)
        this.$refs.form.resetFields()
      }
    }
  },
  created() {
    this.initForm = _.cloneDeep(this.form)
  },
  mounted() {},
  methods: {
    refresh() {
      getPartyOrganizationalManagementById(this.activeId).then(res => {
        this.form = res.data
      })
    },
    handleChange(id) {
      this.activeId = id
    },
    async submit() {
      await this.$refs.form.validate()
      await addAndSave(this.form)
      this.$message.success(this.form.id ? '修改成功' : '创建成功')
      await this.$store.dispatch('ccp/getStructTreeData')
    },
    async remove() {
      await this.$remove(this.form)
      await removePartyOrganizationalManagementById(this.form.id)
      this.$message.success('删除成功')
      this.activeId = null
      await this.$store.dispatch('ccp/getStructTreeData')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  display: flex;
}
.aside {
  width: 300px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
}
.main-content {
  flex: 1;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.3%;
      padding-right: 15px;
    }
  }
}
</style>
