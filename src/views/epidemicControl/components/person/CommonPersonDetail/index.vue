<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="人员信息" name="first">
          <div class="common-card">
            <div class="common-card-title">
              <span class="title-content">基本信息</span>
              <span class="title-opt">
                <el-button type="text"></el-button>
              </span>
            </div>
            <div class="common-card-body">
              <el-row>
                <DetailItem label="照片" labelWidth="120">
                  <el-image style="width: 100px; height: 100px" :src="info.headImage | imgUrl"> </el-image>
                </DetailItem>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <DetailItem label="姓名" labelWidth="120" :value="info.name"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="证件号码" labelWidth="120" :value="info.identityCardNumber"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="联系电话" labelWidth="120" :value="info.phone"></DetailItem>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <DetailItem label="性别" labelWidth="120">{{ $getLabel(sexList, info.sex) }}</DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="籍贯" labelWidth="120" :value="info.nativePlace"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="民族" labelWidth="120" :value="info.nationCodeName"></DetailItem>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <DetailItem label="出生年月" labelWidth="120" :value="info.birthday"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="家庭住址" labelWidth="120" :value="info.familyAddress"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="工作单位" labelWidth="120" :value="info.workCompany"></DetailItem>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <DetailItem label="婚姻状况" labelWidth="120">{{
                    $getLabel(maritalList, info.maritalStatus)
                  }}</DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="学历" labelWidth="120" :value="info.educationCodeName"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="备注" labelWidth="120" :value="info.remark"></DetailItem>
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
                  <DetailItem label="宗教信仰" labelWidth="120" :value="info.religious"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="健康状况" labelWidth="120" :value="info.health"></DetailItem>
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
                  <DetailItem label="人员类型" labelWidth="120" :value="info.personTypeName"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="关注级别" labelWidth="120" :value="info.attentionLevelName"></DetailItem>
                </el-col>
                <el-col :span="8">
                  <DetailItem label="帮护人员" labelWidth="120" :value="info.protectPersonName"></DetailItem>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <DetailItem label="帮户人员电话" labelWidth="120" :value="info.protectPersonMobile"></DetailItem>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="common-card mt10">
            <div class="common-card-title">
              <span class="title-content">家庭成员</span>
              <span class="title-opt"> </span>
            </div>
            <div class="common-card-body">
              <vxe-table ref="familyTable" :data="info.familyList" border stripe>
                <vxe-table-column type="seq" title="序号" width="80"></vxe-table-column>
                <vxe-table-column field="name" title="姓名" width="150"></vxe-table-column>
                <vxe-table-column field="sex" title="性别" width="150">
                  <template #default="{ row }">
                    {{ $getLabel(sexList, row.sex) }}
                  </template>
                </vxe-table-column>
                <vxe-table-column field="phone" title="手机号" min-width="150"></vxe-table-column>
                <vxe-table-column field="identityCardNumber" title="身份证" min-width="180"></vxe-table-column>
              </vxe-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="情况记录" name="second" lazy>
          <div class="common-card mt10">
            <div class="common-card-title">
              <span class="title-content">情况记录</span>
              <span class="title-opt"> </span>
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
              </Grid>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理记录" name="third" lazy>
          <div class="common-card mt10">
            <div class="common-card-title">
              <span class="title-content">管理记录</span>
              <span class="title-opt"> </span>
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
              </Grid>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer-button">
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import { sexList, maritalList } from '../../lib'
export default {
  name: 'CommonPerson',
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
      id: this.$route.params.id || '',
      sexList,
      maritalList,
      info: { situationList: [], manageList: [], familyList: [] },
      situationFilterForm: { keyPersonId: this.$route.params.id },
      getSituationList: Api.person.getSituationList,
      manageFilterForm: { keyPersonId: this.$route.params.id },
      getManageList: Api.person.getManageList
    }
  },
  watch: {},
  created() {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await Api.person.getDetailById(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>

<style scoped lang="less"></style>
