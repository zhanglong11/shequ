<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-tabs v-model="activeName" :before-leave="handleChangeTab" @tab-click="handleClickTab">
        <el-tab-pane label="人员信息" name="first">
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
                  <el-form-item label="照片" prop="headImage">
                    <div>
                      <!--<div class="avatar-wrap">
                        <el-avatar :size="100" :src="form.headImage" />
                        <i id="pick-avatar" class="el-icon-edit-outline" />
                      </div>
                      <avatar-cropper
                        trigger="#pick-avatar"
                        :upload-headers="{ 'x-access-token': $store.state.user.token }"
                        :upload-url="`/wisdom-community-file/file/commonFile/uploadImage`"
                        :output-options="{ width: 200, height: 200 }"
                        @uploaded="handleUploaded"
                      />-->
                      <el-avatar
                        v-if="form.headImage"
                        shape="square"
                        style="width: 100px; height: 100px"
                        :src="form.headImage | imgUrl"
                      ></el-avatar>
                      <el-avatar v-else shape="square" style="width: 100px; height: 100px"></el-avatar>
                    </div>
                  </el-form-item>
                  <!--<el-form-item label="照片" prop="file">
                    <Upload v-model="form.file"></Upload>
                  </el-form-item>-->
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名" prop="name">
                      <el-autocomplete
                        v-model="form.name"
                        style="width: 100%"
                        :fetch-suggestions="(queryString, cb) => querySearchAsync(queryString, cb, 'name')"
                        placeholder="请输入姓名/身份证/联系电话"
                        @select="handleSelect"
                      ></el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份证号" prop="identityCardNumber">
                      <el-autocomplete
                        v-model="form.identityCardNumber"
                        disabled
                        style="width: 100%"
                        :fetch-suggestions="querySearchAsync"
                        @select="handleSelect"
                      ></el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model="form.phone" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="性别" prop="sex">
                      <Select v-model="form.sex" :options="sexList" disabled placeholder=""> </Select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="籍贯" prop="nativePlace">
                      <el-input v-model="form.nativePlace" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族" prop="name">
                      <el-input v-model="form.nationCodeName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="出生年月" prop="birthday">
                      <el-input v-model="form.birthday" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="家庭住址" prop="familyAddress">
                      <el-input v-model="form.familyAddress" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="工作单位" prop="workCompany">
                      <el-input v-model="form.workCompany" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="人口类型">
                      <Select v-model="form.type" :options="residentType" disabled placeholder=""> </Select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="户籍性质">
                      <Select v-model="form.status" :options="personStatus" disabled placeholder=""> </Select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="婚姻状况" prop="maritalStatus">
                      <Select v-model="form.maritalStatus" :options="maritalList" disabled placeholder=""> </Select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <el-input v-model="form.educationCodeName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注">
                      <el-input v-model="form.remark" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="common-card">
              <div class="common-card-title">
                <span class="title-content">其他信息</span>
                <span class="title-opt">
                  <el-button type="text"></el-button>
                </span>
              </div>
              <div class="common-card-body">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="宗教信仰" prop="religious">
                      <el-input v-model="form.religious"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="健康状况" prop="health">
                      <el-input v-model="form.health"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="common-card">
              <div class="common-card-title">
                <span class="title-content">综治信息</span>
                <span class="title-opt">
                  <el-button type="text"></el-button>
                </span>
              </div>
              <div class="common-card-body">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="人员类别" prop="personType">
                      <Select v-model="form.personType" :argGroup="personAttribution + '_personType'"> </Select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="关注级别" prop="attentionLevel">
                      <Select v-model="form.attentionLevel" argGroup="attentionLevel"> </Select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="帮护人员" prop="protectPersonName">
                      <el-input v-model="form.protectPersonName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="帮护人员电话" prop="protectPersonMobile">
                      <el-input v-model="form.protectPersonMobile"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="common-card mt10">
              <div class="common-card-title">
                <span class="title-content">家庭成员</span>
                <span class="title-opt">
                  <el-button type="text" icon="el-icon-plus" @click="addFamily">添加家庭成员</el-button>
                </span>
              </div>
              <div class="common-card-body">
                <vxe-table
                  ref="familyTable"
                  :data="familyTableData"
                  border
                  stripe
                  :edit-config="{
                    trigger: 'click',
                    mode: 'row',
                    autoClear: false
                  }"
                  :edit-rules="familyValidRules"
                >
                  <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                  <vxe-table-column field="name" title="姓名" width="120"></vxe-table-column>
                  <vxe-table-column title="性别" field="sex" width="80">
                    <template #default="{ row }">
                      {{ $getLabel(sexList, row.sex) }}
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="phone" title="手机号" min-width="150"></vxe-table-column>
                  <vxe-table-column field="identityCardNumber" title="身份证" min-width="180"></vxe-table-column>
                  <vxe-table-column title="操作" width="180">
                    <template #default="{ row, $rowIndex }">
                      <el-button class="no-padding" type="text" @click="deleteFamily($rowIndex)">删除</el-button>
                      <el-button class="no-padding" type="text" @click="checkSelectFamily(row)">查看详情</el-button>
                    </template>
                  </vxe-table-column>
                </vxe-table>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="情况记录" name="second" lazy>
          <div class="common-card mt10">
            <div class="common-card-title">
              <span class="title-content">情况记录</span>
              <span class="title-opt">
                <el-button type="text" icon="el-icon-plus" @click="addSituation">添加记录</el-button>
              </span>
            </div>
            <div class="common-card-body">
              <Grid
                ref="situationTable"
                :request="getSituationList"
                :filter-form.sync="situationFilterForm"
                border
                stripe
                show-overflow="tooltip"
              >
                <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                <vxe-table-column field="content" title="记录内容" min-width="180"></vxe-table-column>
                <vxe-table-column field="creatorName" title="记录人" width="150"></vxe-table-column>
                <vxe-table-column field="createTime" title="记录时间" width="180" formatter="ymd"></vxe-table-column>
                <vxe-table-column title="操作" width="200">
                  <template #default="{ row, $rowIndex }">
                    <el-button class="no-padding" type="text" @click="editSelectSituation(row, $rowIndex)"
                      >编辑</el-button
                    >
                    <el-button class="no-padding" type="text" @click="deleteSituation(row)">删除</el-button>
                    <el-button class="no-padding" type="text" @click="checkSelectSituation(row)">查看详情</el-button>
                  </template>
                </vxe-table-column>
              </Grid>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理记录" name="third" lazy>
          <div class="common-card mt10">
            <div class="common-card-title">
              <span class="title-content">管理记录</span>
              <span class="title-opt">
                <el-button type="text" icon="el-icon-plus" @click="addManage">添加记录</el-button>
              </span>
            </div>
            <div class="common-card-body">
              <Grid
                ref="manageTable"
                :request="getManageList"
                :filter-form.sync="manageFilterForm"
                border
                stripe
                show-overflow="tooltip"
              >
                <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                <vxe-table-column field="createTime" title="时间" width="150" formatter="ymd"> </vxe-table-column>
                <vxe-table-column field="address" title="地点" min-width="150"></vxe-table-column>
                <vxe-table-column field="way" title="方式" width="150"></vxe-table-column>
                <vxe-table-column field="content" title="记录内容" min-width="180"></vxe-table-column>
                <vxe-table-column field="creatorName" title="记录人" width="120"></vxe-table-column>
                <vxe-table-column field="time" title="记录时间" width="150" formatter="ymd"></vxe-table-column>
                <vxe-table-column title="操作" width="200">
                  <template #default="{ row, $rowIndex }">
                    <el-button class="no-padding" type="text" @click="editSelectManage(row, $rowIndex)">编辑</el-button>
                    <el-button class="no-padding" type="text" @click="deleteManage(row)">删除</el-button>
                    <el-button class="no-padding" type="text" @click="checkSelectManage(row)">查看详情</el-button>
                  </template>
                </vxe-table-column>
              </Grid>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--情况记录弹窗-->
      <AddSituationDialog
        v-if="situationDialogVisible"
        :info="selectSituation"
        :visible.sync="situationDialogVisible"
        @submit="handleSubmitSituation"
      ></AddSituationDialog>
      <!--情况记录详情-->
      <SituationDetailDialog
        v-if="situationDetailDialogVisible"
        :info="selectSituation"
        :visible.sync="situationDetailDialogVisible"
      >
      </SituationDetailDialog>
      <!--管理记录-->
      <AddManageDialog
        v-if="manageDialogVisible"
        :info="selectManage"
        :visible.sync="manageDialogVisible"
        @submit="handleSubmitManage"
      ></AddManageDialog>
      <!--管理记录详情-->
      <ManageDetailDialog
        v-if="manageDetailDialogVisible"
        :info="selectManage"
        :visible.sync="manageDetailDialogVisible"
      >
      </ManageDetailDialog>
      <!--家庭成员-->
      <AddFamilyDialog
        v-if="familyDialogVisible"
        :info="selectFamily"
        :visible.sync="familyDialogVisible"
        :selectData="familyTableData"
        @submit="handleSubmitFamily"
      ></AddFamilyDialog>
      <!--家庭成员详情-->
      <FamilyDetailDialog
        v-if="familyDetailDialogVisible"
        :info="selectFamily"
        :visible.sync="familyDetailDialogVisible"
      >
      </FamilyDetailDialog>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
      <el-button v-promise-btn type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import { sexList, maritalList, residentType, personStatus } from '../../lib'
import AddSituationDialog from './components/AddSituationDialog'
import SituationDetailDialog from './components/SituationDetailDialog'
import AddManageDialog from './components/AddManageDialog'
import ManageDetailDialog from './components/ManageDetailDialog'
import AddFamilyDialog from './components/AddFamilyDialog'
import FamilyDetailDialog from './components/FamilyDetailDialog'
import anyRule from '@/lib/anyRule'
export default {
  name: 'CommonPersonAdd',
  components: {
    AddSituationDialog,
    SituationDetailDialog,
    AddManageDialog,
    ManageDetailDialog,
    AddFamilyDialog,
    FamilyDetailDialog
  },
  props: {
    /* 模块 */
    model: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: 'first',
      timeout: null,
      remoteList: [],
      runProcess: process.env.VUE_APP_BASE_API,
      id: this.$route.params.id || '',
      sexList,
      maritalList,
      residentType,
      personStatus,
      form: { headImage: '', identityCardNumber: '', id: '' },
      rules: {
        identityCardNumber: [
          { required: true, message: '必填' },
          { pattern: anyRule.identityNumber, message: '不合法' }
        ],
        religious: [{ required: true, message: '必填' }],
        health: [{ required: true, message: '必填' }],
        personType: [{ required: true, message: '必选' }],
        attentionLevel: [{ required: true, message: '必选' }],
        protectPersonName: [{ required: true, message: '必填' }],
        protectPersonMobile: [
          { required: true, message: '必填' },
          { pattern: anyRule.mobile, message: '不合法' }
        ]
      },
      situationFilterForm: { keyPersonId: this.$route.params.id || '' },
      getSituationList: Api.person.getSituationList,
      manageFilterForm: { keyPersonId: this.$route.params.id || '' },
      getManageList: Api.person.getManageList,
      situationDialogVisible: false,
      selectSituation: {},
      selectSituationIndex: null,
      situationDetailDialogVisible: false,
      manageDialogVisible: false,
      selectManage: {},
      selectManageIndex: null,
      manageDetailDialogVisible: false,
      familyTableData: [], // 家庭成员表格
      familyValidRules: {},
      familyDialogVisible: false,
      selectFamily: {},
      selectFamilyIndex: null,
      familyDetailDialogVisible: false
    }
  },
  computed: {
    personAttribution() {
      return this.$getModelType(this.model)
    }
  },
  watch: {},
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    querySearchAsync(queryString, cb, name) {
      clearTimeout(this.timeout)
      let results = []
      if (!queryString) {
        cb(results)
        // return results
      } else {
        this.timeout = setTimeout(async () => {
          const res = await Api.person.getRemoteList({ keyword: queryString })
          results =
            (res.data.records &&
              res.data.records.map(item => {
                delete item.id
                return {
                  value: item.name,
                  ...item
                }
              })) ||
            []
          cb(results)
        }, 300)
      }
    },
    async handleSelect(item) {
      const res = await Api.person.getRemotePersonDetail(item.identityCardNumber)
      delete res.data.id
      console.log(res.data)
      this.form = { ...this.form, ...res.data }
    },
    // 获取详情
    async getDetail() {
      const res = await Api.person.getDetailById(this.id)
      this.form = { ...res.data }
      this.familyTableData = res.data.familyList || []
    },
    // 头像上传
    handleUploaded(res) {
      this.form.headImage = res.data
    },
    handleClickTab(tab, event) {},
    handleChangeTab(activeName, oldActiveName) {
      if (oldActiveName === 'first') {
        if (!this.form.id) {
          this.$message.warning('请先提交人员基本信息')
          return false
        }
      }
    },
    refreshSituation() {
      this.$refs.situationTable.refresh()
    },
    // 添加情况
    addSituation() {
      this.selectSituation = {}
      this.selectSituationIndex = null
      this.situationDialogVisible = true
    },
    // 编辑情况
    editSelectSituation(row, index) {
      this.selectSituation = { ...row }
      this.selectSituationIndex = index
      this.situationDialogVisible = true
    },
    // 删除情况
    async deleteSituation(row) {
      await Api.person.deleteSituation(row.id)
      this.$message.success('删除成功')
      await this.refreshSituation()
    },
    // 详情情况
    checkSelectSituation(row) {
      this.selectSituation = { ...row }
      this.situationDetailDialogVisible = true
    },
    // 情况记录弹窗提交回调
    async handleSubmitSituation(data) {
      if (this.selectSituationIndex !== null) {
        await Api.person.updateSituation({ ...data })
        this.$message.success('修改成功')
      } else {
        await Api.person.addSituation({ ...data, keyPersonId: this.id || this.form.keyPersonId })
        this.$message.success('添加成功')
      }
      this.situationDialogVisible = false
      await this.refreshSituation()
    },
    refreshManage() {
      this.$refs.manageTable.refresh()
    },
    // 添加管理记录
    addManage() {
      this.selectManage = {}
      this.selectManageIndex = null
      this.manageDialogVisible = true
    },
    // 编辑管理记录
    editSelectManage(row, index) {
      this.selectManage = { ...row }
      this.selectManageIndex = index
      this.manageDialogVisible = true
    },
    // 删除管理记录
    async deleteManage(row) {
      await Api.person.deleteManage(row.id)
      this.$message.success('删除成功')
      await this.refreshManage()
    },
    // 查看管理记录
    checkSelectManage(row) {
      this.selectManage = { ...row }
      this.manageDetailDialogVisible = true
    },
    // 管理记录弹窗提交回调
    async handleSubmitManage(data) {
      if (this.selectManageIndex !== null) {
        await Api.person.updateManage({ ...data })
        this.$message.success('修改成功')
      } else {
        await Api.person.addManage({ ...data, keyPersonId: this.id || this.form.keyPersonId })
        this.$message.success('添加成功')
      }
      this.manageDialogVisible = false
      await this.refreshManage()
    },
    // 添加家庭成员
    addFamily() {
      this.selectFamily = {}
      this.selectFamilyIndex = null
      this.familyDialogVisible = true
    },
    // 删除家庭成员
    deleteFamily(index) {
      this.familyTableData.splice(index, 1)
    },
    // 查看家庭成员
    checkSelectFamily(row) {
      this.$router.push({
        name: 'GridResidentDetail',
        params: {
          id: row.identityCardNumber
        }
      })
      /* this.selectFamily = { ...row }
      this.familyDetailDialogVisible = true */
    },
    handleSubmitFamily(data) {
      // 去重
      /* const differenceArr = _.differenceBy(data, this.familyTableData, 'identityCardNumber')
      this.familyTableData = [...this.familyTableData, ...differenceArr] */
      this.familyTableData = [...data]
      this.familyDialogVisible = false
    },
    // 提交或修改
    async handleSubmit() {
      if (this.activeName === 'first') {
        await this.$refs.form.validate()
        const familyIdentityCardNumberList = this.familyTableData.map(item => item.identityCardNumber) || []
        const params = {
          ...this.form,
          familyIdentityCardNumberList: familyIdentityCardNumberList,
          personAttribution: this.personAttribution
        }
        const res = this.id ? await Api.person.update(params) : await Api.person.add(params)
        this.$message.success(`${this.id ? '修改' : '添加'}成功`)
        if (!this.id) {
          this.form.id = res.data
          this.form.keyPersonId = res.data
          this.situationFilterForm.keyPersonId = res.data
          this.manageFilterForm.keyPersonId = res.data
        }
        this.$back()
      } else {
        this.$back()
      }
    }
  }
}
</script>
<style scoped lang="less">
/*.avatar-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  #pick-avatar {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    height: 25px;
    color: #fff;
    text-align: center;
    line-height: 25px;
  }
}*/
</style>
