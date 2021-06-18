<template>
  <div class="container">
    <el-tabs v-model="activeTabName" type="card">
      <el-tab-pane name="1" label="基本信息">
        <el-form ref="form" label-width="140px" :rules="rules" :model="form">
          <h3>基本信息</h3>
          <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
            <el-input v-model="form.unifiedSocialCreditCode" :maxlength="50" />
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="企业类型" prop="companyType">
            <Select v-model="form.companyType" arg-group="companyType"> </Select>
          </el-form-item>
          <el-form-item label="所属行业" prop="companyIndustry">
            <Select v-model="form.companyIndustry" arg-group="companyIndustry"> </Select>
          </el-form-item>
          <el-form-item label="法定代表人" prop="legalPerson">
            <el-input v-model.trim="form.legalPerson" :maxlength="20" auto-complete="off" />
          </el-form-item>
          <el-form-item label="法定代表人手机号" prop="legalPersonMobile">
            <el-input v-model.trim="form.legalPersonMobile" :maxlength="11" auto-complete="off" />
          </el-form-item>
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model.trim="form.linkman" :maxlength="50" auto-complete="off" />
          </el-form-item>
          <el-form-item label="联系人手机号" prop="linkmanMobile">
            <el-input v-model.trim="form.linkmanMobile" :maxlength="11" auto-complete="off" />
          </el-form-item>
          <el-form-item label="邮政编码:" prop="postalCode">
            <el-input v-model.trim="form.postalCode" :maxlength="6" auto-complete="off" />
          </el-form-item>
          <el-form-item label="联系地址" style="width: 100%" prop="contactDetailedAddress">
            <InputAddress
              :name="form.name"
              :province.sync="form.contactProvince"
              :city.sync="form.contactCity"
              :district.sync="form.contactMunicipalDistrict"
              :address.sync="form.contactDetailedAddress"
              :location.sync="form.contactLocation"
            ></InputAddress>
          </el-form-item>
          <el-form-item label="注册地址" style="width: 100%" prop="registeredDetailedAddress">
            <InputAddress
              :name="form.name"
              :province.sync="form.registeredProvince"
              :city.sync="form.registeredCity"
              :district.sync="form.registeredMunicipalDistrict"
              :address.sync="form.registeredDetailedAddress"
              :location.sync="form.registeredLocation"
            ></InputAddress>
          </el-form-item>
          <el-form-item label="员工数量" prop="workerNum">
            <InputNumber v-model="form.workerNum" :min="0" :precision="0"></InputNumber
          ></el-form-item>
          <el-form-item label="曾用名" prop="usedName"> <el-input v-model="form.usedName"></el-input></el-form-item>
          <el-form-item label="备注" prop="remark"> <el-input v-model="form.remark"></el-input></el-form-item>
          <el-form-item label="经营范围" style="width: 100%" prop="businessScope">
            <el-input v-model="form.businessScope" type="textarea" :autosize="{ minRows: 3 }"></el-input>
          </el-form-item>
          <el-form-item label="企业证件" prop="certificationPictureIds">
            <UploadImage v-model="form.certificationPictureIds" is-only-button></UploadImage>
          </el-form-item>
          <h3>
            房间信息
            <el-button style="float: right" type="text" @click="linkRoomDialogVisible = true">+ 关联房间</el-button>
          </h3>
          <vxe-table auto-resize style="flex: 1" :data="form.roomList">
            <vxe-table-column title="所属网格" field="orgName"></vxe-table-column>
            <vxe-table-column title="所属区域" field="regionName"></vxe-table-column>
            <vxe-table-column title="详细地址" field="todo">
              <template #default="{ row }">
                {{ row.buildName }}-{{ row.unitName }}-{{ row.floorName }}-{{ row.roomName || row.name }}
              </template>
            </vxe-table-column>
            <vxe-table-column
              title="租住状态"
              field="status"
              :formatter="$getLabelV(roomStatusOptions)"
            ></vxe-table-column>
            <vxe-table-column title="操作" width="160">
              <template #default="{ row, rowIndex }">
                <el-button type="text" @click="form.roomList.splice(rowIndex, 1)">删除</el-button>
                <button-link type="text" :to="`/grid/room/${row.id || row.roomId}/detail`">查看详情</button-link>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="2" label="员工信息">
        <StaffList v-if="!!id" manage :enterpriseId="id"></StaffList>
        <div v-else style="height: 500px" class="empty">
          <svg-icon icon-class="empty" />
          <p>添加企业之后才可以管理员工</p>
        </div>
      </el-tab-pane>
    </el-tabs>
    <footer-button>
      <el-button size="large" @click="$back">取消</el-button>
      <el-button v-if="activeTabName === '1'" v-promise-btn size="large" type="primary" @click="submit">{{
        !!id ? '保存' : '创建'
      }}</el-button>
    </footer-button>
    <LinkRoom :visible.sync="linkRoomDialogVisible" @change="handleAddRoom"></LinkRoom>
  </div>
</template>

<script>
import pca from '@/lib/pca'
import { createEnterprise, getEnterpriseById, updateEnterprise } from '@/api/grid/company'
import anyRule from '@/lib/anyRule'
import InputAddress from '../components/InputAddress'
import { getRoomById } from '@/api/grid/space'
import LinkRoom from '../components/LinkRoom.vue'
import { roomStatusOptions } from '../lib/options'
import StaffList from './components/StaffList'

export default {
  name: 'GridCompany',
  components: { InputAddress, LinkRoom, StaffList },
  data() {
    return {
      id: this.$route.params.id,
      activeTabName: this.$route.query.activeTabName || '1',
      form: {
        roomList: []
      },
      rules: {
        unifiedSocialCreditCode: [{ required: true, message: '必填' }],
        name: [
          { required: true, message: '必填' },
          {
            pattern: anyRule.nickName,
            message: '支持字母、数字、汉字、（）、()',
            trigger: 'blur'
          }
        ],
        companyType: [{ required: true, message: '必填' }],
        companyIndustry: [{ required: true, message: '必填' }],
        legalPerson: [{ required: true, message: '必填' }],
        legalPersonMobile: [
          { required: true, message: '必填' },
          {
            pattern: anyRule.mobile,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ],
        linkman: [{ required: true, message: '必填' }],
        linkmanMobile: [
          { required: true, message: '必填' },
          {
            pattern: anyRule.mobile,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ],
        postalCode: [{ required: true, message: '必填' }],
        contactDetailedAddress: [{ required: true, message: '必填' }],
        registeredDetailedAddress: [{ required: true, message: '必填' }],
        workerNum: [{ required: true, message: '必填' }],
        certificationPictureIds: [{ required: true, message: '必填' }]
      },
      addressList: pca,
      roomStatusOptions,
      linkRoomDialogVisible: false
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
    },
    async submit() {
      console.log(this.form)
      await this.$refs.form.validate()
      const form = _.clone(this.form)
      form.roomIdList = form.roomList.map(item => item.id || item.roomId)
      if (!this.id) {
        const { data: id } = await createEnterprise(form)
        this.$message.success('创建成功')
        await this.$router.push({
          name: 'GridCompanyEdit',
          params: { id },
          query: {
            activeTabName: '2'
          }
        })
      } else {
        await updateEnterprise(form)
        this.$message.success('修改成功')
        await this.$back()
      }
      await this.$store.dispatch('tagsView/delView', this.$route)
    },
    // 选择联系地址
    handleContactAddressChange(val) {
      this.form.contactProvince = val[0]
      this.form.contactCity = val[1]
      this.form.contactMunicipalDistrict = val[2]
    },
    // 选择注册地址
    handleRegisterAddressChange(val) {
      this.form.registeredProvince = val[0]
      this.form.registeredCity = val[1]
      this.form.registeredMunicipalDistrict = val[2]
    },
    async handleAddRoom(room) {
      if (_.find(this.form.roomList, { roomId: room.id })) {
        this.$message.error('已添加过该房间')
      } else {
        room = await getRoomById(room.id).then(res => res.data)
        room.roomId = room.id
        this.form.roomList.push(room)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-top: 10px;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .el-form-item {
    width: 33.3%;
    padding-right: 20px;
  }
}
</style>
