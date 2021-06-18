<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="党建活动积分记录" name="first">
        <h3>
          <span>共{{ voscore }}积分</span>
        </h3>
        <VoList :identityCardNumber="identityCardNumber"></VoList>
      </el-tab-pane>
      <el-tab-pane lazy label="社群活动积分记录" name="second">
        <h3>
          <span>共{{ associatiscore }}积分</span>
        </h3>
        <AssociationList :identityCardNumber="identityCardNumber"></AssociationList>
      </el-tab-pane>

      <el-tab-pane lazy label="其他积分记录" name="third">
        <h3>
          <span> 增加{{ otherscoreAdd }}积分 </span>
          <span> 减少{{ otherscoreSubtract }}积分 </span>
        </h3>
        <OtherScoreList :identityCardNumber="identityCardNumber"></OtherScoreList>
      </el-tab-pane>
      <el-tab-pane lazy label="积分扣除记录" name="fourth">
        <h3>
          <span>共{{ voscore }}积分</span>
        </h3>
        <DeductScoreList :identityCardNumber="identityCardNumber"></DeductScoreList>
      </el-tab-pane>
    </el-tabs>
    <div class="btn-con">
      <el-button @click="$back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getAllDeductScoreList } from '../api/pointsBand.js'
import VoList from './components/voList'
import AssociationList from './components/associationList'
import OtherScoreList from './components/otherScoreList'
import DeductScoreList from './components/deductScoreList'
export default {
  name: 'RankDetail',
  components: { VoList, AssociationList, OtherScoreList, DeductScoreList },
  data() {
    return {
      activeName: 'first',
      identityCardNumber: this.$route.params.identityCardNumber || '',
      voscore: 0,
      deductscore: 0,
      otherscoreAdd: 0,
      otherscoreSubtract: 0,
      associatiscore: 0
    }
  },
  mounted() {
    this.getDeductScoreList(this.identityCardNumber)
  },
  methods: {
    // 获取积分详情
    async getDeductScoreList(id) {
      console.log(this.identityCardNumber)
      await getAllDeductScoreList(id).then(res => {
        console.log(res.data)
        const total = res.data
        this.otherscoreAdd = total.otherScoreByAdd
        this.otherscoreSubtract = total.otherScoreBySubtract
        this.voscore = total.partyScore
        this.deductscore = total.deductScore
        this.associatiscore = total.associationScore
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
<style lang="less" scoped>
.btn-con {
  margin-top: 18px;
  text-align: center;
}

h3 {
  display: block;
  overflow: hidden;
  line-height: 30px;
  span {
    float: right;
    margin-left: 15px;
  }
}
</style>
