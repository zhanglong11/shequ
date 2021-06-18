<template>
  <div class="container">
    <div class="integralcount">
      <ul class="countList">
        <li>
          <span>{{ count.addSumScore }}</span>
          <p>累计新增总积分</p>
        </li>
        <li>
          <span>{{ count.addSumScoreByMonth }}</span>
          <p>当月新增总积分</p>
        </li>
        <li>
          <span>{{ count.addSumScoreByDay }}</span>
          <p>当日新增总积分</p>
        </li>
        <li>
          <span>{{ count.conversionScore }}</span>
          <p>累计兑换总积分</p>
        </li>
        <li>
          <span>{{ count.conversionScoreByMonth }}</span>
          <p>当月兑换总积分</p>
        </li>
        <li>
          <span>{{ count.conversionScoreByDay }}</span>
          <p>当日兑换总积分</p>
        </li>
        <li>
          <span>{{ count.surplusScore }}</span>
          <p>累计剩余总积分</p>
        </li>
      </ul>
    </div>
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.nameOrPhone" placeholder="姓名/手机号"></el-input>
        </el-form-item>
        <el-form-item label="人员属性">
          <Select v-model="filterForm.personAttribute" :options="userAttributesList" has-all> </Select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('AddOtherScore')" type="primary" icon="el-icon-plus" @click="handleAdd()">
            积分调整
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="xTable" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="姓名" field="name">
        <template #default="{ row }">
          <i v-if="row.totalScore == max3[0]" class="icon1"></i>
          <i v-else-if="row.totalScore == max3[1]" class="icon2"></i>
          <i v-else-if="row.totalScore == max3[2]" class="icon3"></i>
          <i v-else class="icon"></i>
          {{ row.name }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="手机号" field="phone"></vxe-table-column>
      <vxe-table-column title="人员属性" field="personAttribute">
        <template #default="{ row }">
          {{ row.personAttribute == 1 ? '党员' : '非党员' }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="当前积分" field="totalScore" sortable></vxe-table-column>
      <vxe-table-column title="累计兑换数" field="convertCount"></vxe-table-column>
      <vxe-table-column title="累计兑换礼品扣除积分" field="consumeScore"></vxe-table-column>
      <vxe-table-column title="操作" width="160px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('HandleDetail')" type="primary" @click="handleDetail(row)">查看详情</el-button>
          <!-- <el-button type="danger" @click="handleRemove(row.id)">删除</el-button> -->
        </template>
      </vxe-table-column>
    </Grid>
    <AddRank
      v-if="editDialogVisible"
      :info="form"
      :title="editDialogTitle"
      :visible.sync="editDialogVisible"
      @submit="handleSubmit"
    ></AddRank>
  </div>
</template>

<script>
import AddRank from './components/addRank'
import { userAttributesList } from '../lib/options'
import { admin } from '@/plugins/axios'
import { addOtherScore } from '../api/pointsBand.js'
export default {
  name: 'Rank',
  components: { AddRank },
  data() {
    return {
      count: {},
      filterForm: {},
      form: {},
      max3: [],
      userAttributesList,
      tableData: [],
      editDialogVisible: false,
      activeId: null,
      request(body) {
        console.log(body)
        return admin.post('bankGiftManagement/scoreRankingList', body)
      }
    }
  },
  created() {},
  mounted() {
    this.getScoreRanking()
    this.getSumScore()
  },
  methods: {
    handleAdd() {
      this.editDialogVisible = true
      this.form = { addOrSubtract: 1 }
      this.editDialogTitle = '新增积分'
    },
    handleDetail(row) {
      console.log(row)
      this.$router.push({
        name: 'RankDetail',
        params: {
          identityCardNumber: row.identityCardNumber
        }
      })
    },
    // 添加/编辑提交
    async handleSubmit(data) {
      // data.id ? await updateBankGift(data) : await addOtherScore(data)
      await addOtherScore(data)
      this.$message.success('操作成功!')
      this.editDialogVisible = false
      this.getScoreRanking()
      await this.refresh()
    },
    async getSumScore() {
      admin.get('bankGiftManagement/getSumScore').then(res => {
        console.log(res)
        this.count = res.data
      })
    },
    // 获取积分排名 获取前三名
    async getScoreRanking() {
      const parpam = {
        page: 1,
        rows: 100
      }
      admin.post('bankGiftManagement/scoreRankingList', parpam).then(res => {
        const score = []
        res.data.records.map(item => {
          score.push(item.totalScore)
          this.max3 = score.sort((a, b) => b - a).slice(0, 3)
          return this.max3
        })
      })
    },
    // 重置
    reset() {
      this.$refs.xTable.reset()
    },
    // 刷新表
    refresh() {
      this.$refs.xTable.refresh()
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
  width: 32px;
  height: 32px;
  vertical-align: middle;
  background: url(~@/assets/images/1.png);
}
.icon2 {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  background: url(~@/assets/images/2.png);
}
.icon3 {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  background: url(~@/assets/images/3.png);
}
.integralcount {
  border: 1px solid #dbdbdb;
  padding: 15px 10px;
  margin-bottom: 15px;
  .countList {
    margin-bottom: 0;
    text-align: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    li {
      width: 100%;
      border-right: 1px solid #bdbdbd;
      &:last-child {
        border: 0;
      }
      span {
        color: #333;
      }
      p {
        margin-bottom: 0;
        line-height: 30px;
      }
    }
  }
}
</style>
