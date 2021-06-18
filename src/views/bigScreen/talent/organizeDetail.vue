<template>
  <div class="container">
    <div class="con-main">
      <div class="goBack" @click="goBack">
        <img src="../images/goBack.png" alt="" />
        <div>返回</div>
      </div>
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
          <div style="text-align: right; margin-bottom: 10px">总人数：{{ form.members ? form.members.length : 0 }}</div>
          <vxe-table :data="form.members" size="mini">
            <vxe-table-column title="姓名" show-overflow field="name"> </vxe-table-column>
            <vxe-table-column title="性别" field="sex" :formatter="({ cellValue }) => ['其它', '男', '女'][cellValue]">
            </vxe-table-column>
            <vxe-table-column title="手机号" show-overflow field="phone"> </vxe-table-column>
            <vxe-table-column title="身份证" show-overflow field="identityCardNumber"> </vxe-table-column>
          </vxe-table>
        </section>
      </div>
      <!-- <h2 class="title">发起的活动</h2>
        <div class="desc">
          <section>
            <div style="text-align: right">活动数：{{ form.activities ? form.activities.length : 0 }}</div>
            <vxe-table :data="form.activities" size="mini">
              <vxe-table-column title="活动名称" show-overflow field="name"> </vxe-table-column>
              <vxe-table-column title="活动地点" show-overflow field="site"> </vxe-table-column>
              <vxe-table-column title="活动类型" field="typeName"> </vxe-table-column>
              <vxe-table-column title="活动开始时间" show-overflow field="activityBeginTime"> </vxe-table-column>
              <vxe-table-column title="活动结束时间" show-overflow field="activityEndTime"> </vxe-table-column>
            </vxe-table>
          </section>
        </div> -->
    </div>
  </div>
</template>
<script>
import Api from '../api/talent'
export default {
  name: 'CommunityDetail',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      dataList: {},
      activityList: {},
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
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
.con-main {
  position: relative;
  .goBack {
    width: 50px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #ff5544;
  }
  .title {
    font-weight: bold;
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
