<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="common-card">
          <div class="common-card-title">
            <span class="title-content">基本信息</span>
            <span class="title-opt">
              <el-button type="text"></el-button>
            </span>
          </div>
          <div class="common-card-body">
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属网格" prop="orgId">
                  <SelectGridDepartment v-model="form.orgId"></SelectGridDepartment>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="重点区域名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="区域类型" prop="type">
                  <Select v-model="form.type" argGroup="areaType" has-all> </Select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="区域负责人" prop="principalName">
                  <el-input v-model="form.principalName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="principalMobile">
                  <el-input v-model="form.principalMobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="common-card">
          <div class="common-card-title">
            <span class="title-content">地图定位</span>
            <span class="title-opt">
              <el-button type="text"></el-button>
            </span>
          </div>
          <div class="common-card-body">
            <MapPoint
              :gridInfo="gridInfo"
              :name.sync="form.name"
              :markerPosition.sync="form.location"
              edit
              style="height: 500px"
            ></MapPoint>
          </div>
        </div>
      </el-form>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
      <el-button v-promise-btn type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getOrganizationById } from '@/api/grid/department'
import Api from '../api'
import SelectGridDepartment from '@/views/grid/components/SelectGridDepartment'
import anyRule from '@/lib/anyRule'
import MapPoint from '../component/MapPoint'
export default {
  name: 'CompositeGovernAreaAdd',
  components: { SelectGridDepartment, MapPoint },
  data() {
    return {
      id: this.$route.params.id || '',
      form: { location: '' },
      rules: {
        orgId: [{ required: true, message: '必选' }],
        name: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必选' }],
        principalMobile: [{ pattern: anyRule.mobile, message: '不合法' }]
      },
      gridInfo: {}
    }
  },
  watch: {
    'form.orgId': {
      immediate: true,
      handler(val) {
        if (!val) {
          return
        }
        this.getGridDetail()
      }
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  mounted() {},
  methods: {
    async getGridDetail() {
      const res = await getOrganizationById(this.form.orgId)
      this.gridInfo = { ...res.data } || {}
    },
    async getDetail() {
      const res = await Api.getAreaDetail(this.id)
      this.form = { ...res.data }
    },
    async submit() {
      await this.$refs.form.validate()
      if (!this.id) {
        await Api.addArea(this.form)
        this.$message.success('创建成功')
      } else {
        await Api.updateArea(this.form)
        this.$message.success('修改成功')
      }
      this.$back()
    }
  }
}
</script>

<style scoped lang="scss"></style>
