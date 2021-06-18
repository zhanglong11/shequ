<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="con-main">
        <h2 class="title">基本信息</h2>
        <div class="desc">
          <el-row :gutter="8">
            <el-col :span="12">
              <span class="label-desc">组织logo：</span>
              <span class="avatar-wrap">
                <!-- {{ form.logoId }} -->
                <ImgList :fileIds="form.logoId" />
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="label-desc">组织名称：</span>
              <span>{{ form.name }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">服务类型：</span>
              <span>{{ form.serviceTypeName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">组织宣言：</span>
              <span>{{ form.declaration }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="label-desc">负责人：</span>
              <span>{{ form.leader }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">手机号：</span>
              <span>{{ form.phone }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">地点：</span>
              <span>{{ form.place }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <span class="label-desc">组织介绍：</span>
              <span>{{ form.introduce }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <span class="label-desc">备注：</span>
              <span>{{ form.remark }}</span>
            </el-col>
          </el-row>
        </div>
        <h2 class="title">组织成员</h2>
        <div class="desc">
          <section>
            <div style="text-align: right">总人数：{{ form.members ? form.members.length : 0 }}</div>
            <vxe-table :data="form.members" size="mini">
              <vxe-table-column title="姓名" show-overflow field="name"> </vxe-table-column>
              <vxe-table-column
                title="性别"
                field="sex"
                :formatter="({ cellValue }) => ['其它', '男', '女'][cellValue]"
              >
              </vxe-table-column>
              <vxe-table-column title="手机号" show-overflow field="phone"> </vxe-table-column>
              <vxe-table-column title="身份证" show-overflow field="identityCardNumber"> </vxe-table-column>
              <vxe-table-column title="操作">
                <template #default="{ row }">
                  <el-button type="text" @click="handleDetail(row.identityCardNumber)">查看详情</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
          </section>
        </div>
        <h2 class="title">发起的活动</h2>
        <div class="desc">
          <section>
            <div style="text-align: right">活动数：{{ form.activities ? form.activities.length : 0 }}</div>
            <vxe-table :data="form.activities" size="mini">
              <vxe-table-column title="活动名称" show-overflow field="name"> </vxe-table-column>
              <vxe-table-column title="活动地点" show-overflow field="site"> </vxe-table-column>
              <vxe-table-column title="活动类型" field="typeName"> </vxe-table-column>
              <!-- <vxe-table-column title="活动状态" field="name"> </vxe-table-column> -->
              <vxe-table-column title="活动开始时间" show-overflow field="activityBeginTime"> </vxe-table-column>
              <vxe-table-column title="活动结束时间" show-overflow field="activityEndTime"> </vxe-table-column>
              <vxe-table-column title="操作">
                <template #default="{ row }">
                  <el-button type="text" @click="handleActivityDetail(row.id)">查看详情</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
          </section>
        </div>
      </div>

      <UnityDetail v-if="detailDialogVisible" :id="detailId" :visible.sync="detailDialogVisible" />
    </div>
    <div class="footer-button">
      <el-button size="lg" @click="close">返回</el-button>
    </div>
  </div>
</template>
<script>
import UnityDetail from '../components/detail'
import Api from '../api'
export default {
  name: 'CommunityDetail',
  components: { UnityDetail },
  data() {
    return {
      id: this.$route.query.id,
      form: {},
      dataList: {},
      activityList: {},
      detailDialogVisible: false,
      detailId: ''
    }
  },
  created() {
    if (this.id) {
      Api.getOrganizationDetail(this.id).then(res => {
        this.form = res.data
      })
    }
  },
  methods: {
    handleDetail(id) {
      this.$router.push({
        name: `GridResidentDetail`,
        params: { id }
      })
    },
    handleActivityDetail(id) {
      this.detailId = id
      this.detailDialogVisible = true
    },
    close() {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
.con-main {
  padding-left: 100px;
  max-width: 70%;
  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .desc {
    padding-left: 50px;
    .label-desc {
      color: #999;
    }
  }
}
.el-col {
  margin-bottom: 25px;
  font-size: 16px;
}
.avatar-wrap {
  display: inline-block;
  vertical-align: middle;
}
</style>
