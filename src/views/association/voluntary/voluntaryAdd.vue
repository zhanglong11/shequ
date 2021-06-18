<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="con-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="160px" class="form-con">
          <h2 class="title">基本信息</h2>
          <el-row>
            <el-col :md="24">
              <el-form-item label="组织logo：" prop="logoId">
                <UploadImage v-model="form.logoId" :limit="1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="8">
              <el-form-item label="组织名称：" prop="name">
                <el-input v-model="form.name" type="text" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="服务类型：" prop="serviceType">
                <Select v-model="form.serviceType" arg-group="serviceType" has-all />
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="组织宣言：" prop="declaration">
                <el-input v-model="form.declaration" type="textarea" :rows="3" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="8">
              <el-form-item label="负责人：" prop="leader">
                <el-input v-model="form.leader" type="text" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="form.phone" type="text" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="地址：" prop="place">
                <el-input v-model="form.place" type="textarea" :rows="2" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="组织介绍：" prop="introduce">
                <el-input v-model="form.introduce" type="textarea" :rows="4" maxlength="200" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="备注：">
                <el-input v-model="form.remark" type="text" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <h2 class="title">组织成员</h2>
          <el-row>
            <el-col :md="24">
              <el-form-item>
                <div class="add-btn">
                  <el-button class="add" @click="handleAddRowsNext()"><i class="el-icon-plus"></i>添加成员</el-button>
                </div>
                <vxe-table
                  ref="table"
                  :data="detailData"
                  border
                  stripe
                  show-overflow="tooltip"
                  :edit-config="{
                    trigger: 'click',
                    mode: 'row',
                    autoClear: false
                  }"
                  :edit-rules="personRules"
                >
                  <vxe-table-column field="name" title="姓名" min-width="180"></vxe-table-column>
                  <vxe-table-column
                    field="sex"
                    title="性别"
                    width="150"
                    :formatter="({ cellValue }) => ['其它', '男', '女'][cellValue]"
                  >
                  </vxe-table-column>
                  <vxe-table-column field="phone" title="手机号" width="180"></vxe-table-column>
                  <vxe-table-column field="identityCardNumber" title="身份证" width="180"></vxe-table-column>
                  <vxe-table-column title="操作" width="200">
                    <template #default="{ row, $rowIndex }">
                      <el-button class="no-padding" type="text" @click="deleteSituation($rowIndex)">删除</el-button>
                      <el-button class="no-padding" type="text" @click="checkSelectSituation(row.identityCardNumber)"
                        >查看详情</el-button
                      >
                    </template>
                  </vxe-table-column>
                </vxe-table>
                <div class="add-btn">
                  <span class="content">总人数：{{ detailData.length !== 0 ? detailData.length : 0 }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <SelectCommunityUserList
        v-if="selectDialogVisible"
        :visible.sync="selectDialogVisible"
        multiple
        :selectUserData="selectUserData"
        @input="getInput"
        @change="getChange"
      />
    </div>
    <div class="footer-button">
      <el-button size="lg" @click="$back">返回</el-button>
      <el-button v-promise-btn size="lg" type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import ruless from '@/utils/regular'
import SelectCommunityUserList from '../components/SelectCommunityUser'
export default {
  name: 'VoluntaryAdd',
  components: { SelectCommunityUserList },
  data() {
    return {
      id: '',
      statusList: [],
      selectDialogVisible: false,
      form: {
        type: 0 // 组织类型
      },
      table: {},
      members: [], // 成员数据
      rules: {
        logoId: [{ required: true, message: '必选' }],
        name: [{ required: true, message: '必填' }],
        serviceType: [{ required: true, message: '必选' }],
        declaration: [{ required: true, message: '必填' }],
        phone: [{ required: true, message: '请输入正确手机号格式', pattern: ruless.telephone }],
        leader: [{ required: true, message: '必填' }],
        place: [{ required: true, message: '必填' }],
        introduce: [{ required: true, message: '必填' }]
      },
      personRules: {},
      detailData: [],
      selectUserData: []
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.id = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      if (this.id) {
        Api.getOrganizationDetail(this.id).then(res => {
          this.form = res.data
          this.detailData = res.data.members === null ? [] : res.data.members
        })
      }
    },
    // 提交members
    async submit() {
      await this.$refs.form.validate()
      this.form.members = this.detailData.map(item => {
        const obj = {
          member: item.identityCardNumber,
          organizationId: item.id
        }
        return obj
      })

      this.id ? await Api.getOrganizationUpdate(this.form) : await Api.getOrganizationAdd(this.form)
      this.$message.success(`${this.id ? '修改' : '添加'}成功`)
      this.$back()
    },
    handleAddPerson() {},
    // 添加成员
    handleAddRowsNext() {
      this.selectUserData = this.detailData
      this.selectDialogVisible = true
    },
    // 所有人员身份id
    getInput(e) {
      // console.log(e)
    },
    // 选择的人员信息
    getChange(e) {
      const differenceArr = _.differenceBy(e, this.detailData, 'identityCardNumber')
      this.detailData = [...this.detailData, ...differenceArr]
      // this.familyDialogVisible = false
    },
    // 删除
    deleteSituation(index) {
      this.detailData.splice(index, 1)
    },
    // 查看详情
    checkSelectSituation(id) {
      this.$router.push({
        name: `GridResidentDetail`,
        params: { id }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  .con-form {
    max-width: 70%;
    padding-left: 60px;
    .title {
      margin-left: 40px;
      font-weight: bold;
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .add {
        color: #409eff;
        border: unset;
      }
      .add:hover {
        background: unset;
      }
    }
  }
}
</style>
