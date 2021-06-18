<template>
  <div class="container has-footer">
    <div class="inner-wrapper">
      <div class="con-main">
        <h2 class="title">基本信息</h2>
        <div class="desc">
          <el-row>
            <el-col :span="8">
              <span class="label-desc">投票主题：</span>
              <span>{{ form.voteTheme }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">发起投票时间：</span>
              <span>{{ form.voteBeginTime }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">投票截止时间：</span>
              <span> {{ dayjs(form.voteEndTime).format('YYYY-MM-DD HH:mm') }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="label-desc">投票状态：</span>
              <span>{{ $getLabel(status, form.status) }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">允许多选：</span>
              <span> {{ $getLabel(statusList, form.multiple) }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">匿名投票：</span>
              <span> {{ $getLabel(statusList, form.anonymity) }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="label-desc">创建人：</span>
              <span>{{ form.creatorName }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label-desc">参与人：</span>
              <span>{{ form.participationCount ? form.participationCount : '无' }}</span>
            </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <span class="label-desc">投票选项：</span>
              <span>{{ form.resultList ? form.resultList.map(e => e.optionName).toString() : '无' }}</span>
            </el-col>
          </el-row>
        </div>
        <h2 class="title">投票结果</h2>
        <div class="desc">
          <section>
            <vxe-table :data="form.resultList" size="mini" :cell-style="cellStyle">
              <vxe-table-column title="投票选项" field="optionName">
                <template #default="{ row }">
                  <i v-if="row.num === max" class="icon1"></i>
                  {{ row.optionName }}
                </template>
              </vxe-table-column>
              <vxe-table-column title="投票数" field="num"> </vxe-table-column>
              <vxe-table-column v-if="!form.anonymity" title="投票人" field="personList">
                <template #default="{ row }">
                  {{ row.personList ? row.personList.toString() : '' }}
                </template>
              </vxe-table-column>
            </vxe-table>
          </section>
        </div>
      </div>
    </div>
    <div class="footer-button">
      <el-button size="lg" @click="close">返回</el-button>
    </div>
  </div>
</template>
<script>
import Api from '../api'
export default {
  name: 'VoteDetail',
  components: {},
  data() {
    return {
      max: [],
      id: this.$route.query.id,
      form: {
        resultList: []
      },
      dataList: {},
      activityList: {},
      statusList: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      status: [
        { value: 0, label: '已结束' },
        { value: 1, label: '投票中' }
      ]
    }
  },
  created() {
    if (this.id) {
      Api.getinformVoteDetail(this.id).then(res => {
        this.form = res.data
        this.max = this.form.resultList.map(item => {
          return item.num
        })

        // console.log(this.max.every(item => item === this.max[0]))
        this.max = this.max.every(item => item === this.max[0]) ? '' : Math.max(...this.max)
      })
    }
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      if (this.form.resultList.length < 3) return
      if (row.seq === 1) {
        return `background-color: rgba(47, 150, 136, 1) !important;fontSize: 16px; color: #777777;color: #fff`
      }
    },
    close() {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
.icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
.icon1 {
  display: inline-block;
  width: 22px;
  height: 22px;
  vertical-align: middle;
  background: url(~@/assets/images/xingxing.png);
}
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
