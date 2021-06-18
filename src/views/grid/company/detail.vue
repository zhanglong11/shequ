<template>
  <div class="container">
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <el-form ref="form" label-width="140px" :model="form">
          <h3>基本信息</h3>
          <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
            {{ form.unifiedSocialCreditCode }}
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            {{ form.name }}
          </el-form-item>
          <el-form-item label="企业类型" prop="companyType">
            {{ form.companyTypeName }}
          </el-form-item>
          <el-form-item label="所属行业" prop="companyIndustry">
            {{ form.companyIndustryName }}
          </el-form-item>
          <el-form-item label="法定代表人" prop="legalPerson">
            {{ form.legalPerson }}
          </el-form-item>
          <el-form-item label="法定代表人手机号" prop="legalPersonMobile">
            {{ form.legalPersonMobile }}
          </el-form-item>
          <el-form-item label="联系人" prop="linkman">
            {{ form.linkman }}
          </el-form-item>
          <el-form-item label="联系人手机号" prop="linkmanMobile">
            {{ form.linkmanMobile }}
          </el-form-item>
          <el-form-item label="邮政编码:" prop="postalCode">
            {{ form.postalCode }}
          </el-form-item>
          <el-form-item label="联系地址" style="width: 100%" prop="contactDetailedAddress">
            {{ form.contactProvince | pcaName }} - {{ form.contactCity | pcaName }} -
            {{ form.contactMunicipalDistrict | pcaName }} -
            {{ form.contactDetailedAddress }}
          </el-form-item>
          <el-form-item label="注册地址" style="width: 100%" prop="registeredDetailedAddress">
            {{ form.registeredProvince | pcaName }} - {{ form.registeredCity | pcaName }} -
            {{ form.registeredMunicipalDistrict | pcaName }} -
            {{ form.registeredDetailedAddress }}
          </el-form-item>
          <el-form-item label="员工数量" prop="workerNum"> {{ form.workerNum }}</el-form-item>
          <el-form-item label="曾用名" prop="usedName"> {{ form.usedName }}</el-form-item>
          <el-form-item label="备注" prop="remark"> {{ form.remark }}</el-form-item>
          <el-form-item label="经营范围" style="width: 100%" prop="businessScope">
            {{ form.businessScope }}
          </el-form-item>
          <el-form-item label="企业证件" prop="certificationPictureIds">
            <img :src="form.certificationPictureIds | imgUrl" />
          </el-form-item>
          <h3>房间信息</h3>
          <vxe-table style="flex: 1" :data="form.roomList">
            <vxe-table-column title="所属网格" field="orgName"></vxe-table-column>
            <vxe-table-column title="所属区域" field="regionName"></vxe-table-column>
            <vxe-table-column title="详细地址" field="todo">
              <template #default="{ row }">
                {{ row.buildName }}-{{ row.unitName }}-{{ row.floorName }}-{{ row.roomName || row.name }}</template
              >
            </vxe-table-column>
            <vxe-table-column
              title="租住状态"
              field="status"
              :formatter="$getLabelV(roomStatusOptions)"
            ></vxe-table-column>
            <vxe-table-column title="操作" width="160">
              <template #default="{ row }">
                <button-link type="text" :to="`/grid/room/${row.id || row.roomId}/detail`">查看详情</button-link>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="员工信息">
        <StaffList v-if="!!id" :enterpriseId="id"></StaffList>
      </el-tab-pane>
    </el-tabs>
    <footer-button>
      <el-button @click="$back">返回</el-button>
    </footer-button>
  </div>
</template>

<script>
import { getEnterpriseById } from '@/api/grid/company'
import { roomStatusOptions } from '../lib/options'
import StaffList from './components/StaffList'
export default {
  name: 'GridCompanyDetail',
  components: { StaffList },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        roomList: []
      },
      roomStatusOptions
    }
  },
  created() {
    this.id && this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getEnterpriseById(this.id).then(res => {
        this.form = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-form {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  .el-form-item {
    width: 33.3%;
    padding-right: 20px;
  }
}
</style>
