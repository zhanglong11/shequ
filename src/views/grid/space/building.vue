<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="95px">
      <h3>基本信息</h3>
      <el-form-item label="所属区域" prop="regionId">
        <SelectRegion v-model="form.regionId" :orgId.sync="form.orgId"></SelectRegion>
      </el-form-item>
      <el-form-item label="建筑名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="建筑类别" prop="category">
        <Select v-model="form.category" :disabled="!!id" :options="buildingsTypeOptions"></Select>
      </el-form-item>
      <el-form-item label="建筑地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="物业名称" prop="propertyName">
        <el-input v-model="form.propertyName"></el-input>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item label="附件" prop="fileId">
        <Upload v-model="form.fileId"></Upload>
      </el-form-item>
      <template v-if="!form.id">
        <h3>空间信息</h3>
        <el-form-item v-if="form.category === 1" style="margin-right: 66.6%" prop="unitCount" label="单元总数">
          <InputNumber v-model="form.unitCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="form.category === 1" prop="residenceFloorsCount" label="住宅层数">
          <InputNumber v-model="form.residenceFloorsCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item
          v-if="form.category === 1"
          style="margin-right: 33.3%"
          prop="residenceRoomCount"
          label="每层房间数"
        >
          <InputNumber v-model="form.residenceRoomCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="form.category === 1" prop="podiumFloorsCount" label="裙楼层数">
          <InputNumber v-model="form.podiumFloorsCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="form.category === 1" style="margin-right: 33.3%" prop="podiumRoomCount" label="每层房间数">
          <InputNumber v-model="form.podiumRoomCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="form.category !== 1" prop="generalFloorsCount" label="楼层数">
          <InputNumber v-model="form.generalFloorsCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="form.category !== 1" style="margin-right: 33.3%" prop="generalRoomCount" label="每层房间数">
          <InputNumber v-model="form.generalRoomCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="[1, 2].includes(form.category)" prop="undergroundFloorsCount" label="地下层数">
          <InputNumber v-model="form.undergroundFloorsCount" :min="0"></InputNumber>
        </el-form-item>
        <el-form-item v-if="[1, 2].includes(form.category)" prop="undergroundRoomCount" label="每层房间数">
          <InputNumber v-model="form.undergroundRoomCount" :min="0"></InputNumber>
        </el-form-item>
      </template>
      <footer-button>
        <el-button v-promise-btn size="large" type="primary" @click="submit">{{ !!id ? '保存' : '创建' }}</el-button>
        <el-button size="large" @click="$back">取消</el-button>
      </footer-button>
    </el-form>
  </div>
</template>

<script>
import SelectRegion from '../components/SelectRegion'
import { buildingsTypeOptions } from '../lib/options'
import { createBuild, getBuildingById, updateRegionOrBuilding } from '@/api/grid/region'

export default {
  name: 'GridBuilding',
  components: { SelectRegion },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        category: 1
      },
      list: [],
      rules: {
        regionId: [{ required: true, message: '必填' }],
        name: [{ required: true, message: '必填' }],
        category: [{ required: true, message: '必填' }],
        address: [{ required: true, message: '必填' }],
        unitCount: [{ required: true, message: '必填' }],
        residenceFloorsCount: [{ required: true, message: '必填' }],
        residenceRoomCount: [{ required: true, message: '必填' }],
        generalFloorsCount: [{ required: true, message: '必填' }],
        generalRoomCount: [{ required: true, message: '必填' }]
      },
      buildingsTypeOptions
    }
  },
  computed: {},
  created() {
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getBuildingById(this.id).then(res => {
        this.form = res.data
      })
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await createBuild(this.form)
        this.$message.success('创建成功')
      } else {
        await updateRegionOrBuilding(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
      await this.$store.dispatch('tagsView/delView', this.$route)
      await this.$store.dispatch('grid/getStructTreeData')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 33.3%;
    padding-right: 15px;
  }
}
</style>
