<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="95px">
      <h3>基本信息</h3>
      <el-form-item label="所属" prop="floorId">
        <SelectCommunityFloor v-model="form.floorId" :disabled="!!form.floorId"></SelectCommunityFloor>
      </el-form-item>
      <el-form-item label="房间类型" prop="type">
        <Select v-model="form.type" :options="roomTypeOptions"></Select>
      </el-form-item>
      <el-form-item label="房间状态" prop="status">
        <Select v-model="form.status" :options="roomStatusOptions"></Select>
      </el-form-item>
      <el-form-item label="房间号" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="建筑面积" prop="area">
        <InputNumber v-model="form.area" unit="m²"></InputNumber>
      </el-form-item>
      <h3>
        <span>业主信息</span>
        <SelectCommunityUser multiple @change="handleOwnerChange">
          <a>+ 关联业主信息</a>
        </SelectCommunityUser>
      </h3>
      <vxe-table :data="form.ownerList">
        <vxe-table-column field="name" title="姓名"></vxe-table-column>
        <vxe-table-column field="sex" title="性别" formatter="sex"></vxe-table-column>
        <vxe-table-column field="phone" title="手机号"></vxe-table-column>
        <vxe-table-column field="identityCardNumber" title="身份证"></vxe-table-column>
        <vxe-table-column title="操作">
          <template #default="{ row, rowIndex }">
            <el-button type="text" @click="form.ownerList.splice(rowIndex, 1)">删除</el-button>
            <button-link type="text" :to="'/grid/resident/' + row.identityCardNumber + '/detail'">查看详情</button-link>
          </template>
        </vxe-table-column>
      </vxe-table>
      <h3 style="margin-top: 15px">
        <span>居住信息</span>
        <SelectCommunityUser
          :value="_.map(form.residentList, 'identityCardNumber').join(',')"
          multiple
          @change="handleResidentChange"
        >
          <a>+ 关联居住人口</a>
        </SelectCommunityUser>
      </h3>
      <vxe-table :data="form.residentList">
        <vxe-table-column field="name" title="姓名"></vxe-table-column>
        <vxe-table-column field="sex" title="性别" formatter="sex"></vxe-table-column>
        <vxe-table-column field="phone" title="手机号"></vxe-table-column>
        <vxe-table-column field="identityCardNumber" title="身份证"></vxe-table-column>
        <vxe-table-column title="与业主关系">
          <template #default="{ row }">
            <Select v-model="row.ownersRelationship" arg-group="ownersRelationship"></Select>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作">
          <template #default="{ row, rowIndex }">
            <el-button type="text" @click="form.residentList.splice(rowIndex, 1)">删除</el-button>
            <button-link type="text" :to="'/grid/resident/' + row.identityCardNumber + '/detail'">查看详情</button-link>
          </template>
        </vxe-table-column>
      </vxe-table>

      <footer-button>
        <el-button v-promise-btn type="primary" @click="submit">{{ !!id ? '保存' : '创建' }}</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import { buildingsTypeOptions, roomStatusOptions, roomTypeOptions } from '../../lib/options'
import { createRoom, getRoomById, updateRoom } from '@/api/grid/space'
import upsertMany from 'upsert-many'

export default {
  name: 'GridRoom',
  components: {},
  data() {
    return {
      floorId: this.$route.query.floorId,
      id: this.$route.params.id,
      form: {
        floorId: this.$route.query.floorId,
        ownerList: [],
        residentList: []
      },
      list: [],
      rules: {
        floorId: [{ required: true, message: '必填' }],
        status: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必填' }],
        name: [{ required: true, message: '必填' }],
        area: [{ required: true, message: '必填' }]
      },
      buildingsTypeOptions,
      roomStatusOptions,
      roomTypeOptions
    }
  },
  computed: {},
  created() {
    if (this.id) {
      this.refresh()
    }
  },
  mounted() {},
  methods: {
    refresh() {
      getRoomById(this.id).then(res => {
        this.form = res.data
      })
    },
    handleOwnerChange(record) {
      upsertMany(this.form.ownerList, record, 'identityCardNumber')
    },
    handleResidentChange(record) {
      upsertMany(this.form.residentList, record, 'identityCardNumber')
    },
    async submit() {
      await this.$refs.form.validate()
      for (const item of this.form.residentList) {
        if (!item.ownersRelationship) {
          this.$message.error('与业主关系必填')
          return false
        }
      }
      const form = _.cloneDeep(this.form)
      form.ownerIdentityCardNumberList = _.map(form.ownerList, 'identityCardNumber')
      form.residentList = form.residentList.map(item => _.pick(item, ['identityCardNumber', 'ownersRelationship']))
      if (!this.id) {
        await createRoom(form)
        this.$message.success('创建成功')
      } else {
        await updateRoom(form)
        this.$message.success('修改成功')
      }
      await this.$store.dispatch('tagsView/delView', this.$route)
      this.$back()
    },
    async handleCancel() {
      await this.$store.dispatch('tagsView/delView', this.$route)
      this.$back()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 50%;
    padding-right: 15px;
  }
  .vxe-table {
    width: 100%;
  }
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      font-size: 14px;
    }
    ::v-deep .el-dialog {
      font-weight: normal;
    }
  }
}
</style>
