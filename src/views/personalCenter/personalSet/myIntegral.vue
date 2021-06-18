<template>
  <div class="my-integral">
    <h3>我的积分</h3>
    <div class="point-text">
      <svg class="icon" aria-hidden="true"><use xlink:href="#v-icon-points"></use></svg>
      <div class="num">当前积分：1200</div>
    </div>
    <h3>积分记录</h3>
    <div class="point-record">
      <el-tabs>
        <el-tab-pane label="党建活动积分记录">
          <Grid ref="ccpTable" :request="ccpRequest" :highlightCurrentRow="false">
            <vxe-table-column title="任务名称" field="name"></vxe-table-column>
            <vxe-table-column title="任务类别"></vxe-table-column>
            <vxe-table-column title="时间"></vxe-table-column>
            <vxe-table-column title="积分值"></vxe-table-column>
          </Grid>
        </el-tab-pane>
        <el-tab-pane label="社区活动积分记录">
          <Grid ref="areaTable" :request="areaRequest" :highlightCurrentRow="false">
            <vxe-table-column title="活动名称" field="name"></vxe-table-column>
            <vxe-table-column title="活动类别"></vxe-table-column>
            <vxe-table-column title="时间"></vxe-table-column>
            <vxe-table-column title="积分值"></vxe-table-column>
          </Grid>
        </el-tab-pane>
      </el-tabs>
    </div>
    <h3>积分兑换记录</h3>
    <div class="conversion-record">
      <vxe-table :data="records" auto-resize>
        <vxe-table-column title="兑换订单编号" field="code"></vxe-table-column>
        <vxe-table-column title="兑换商品"></vxe-table-column>
        <vxe-table-column title="兑换数量"></vxe-table-column>
        <vxe-table-column title="订单提交时间"></vxe-table-column>
        <vxe-table-column title="扣除积分"></vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ccpRequest(body) {
        return new Promise((resolve, reject) => {
          resolve({
            data: {
              total: 3,
              records: [
                { id: 1, name: '任务名称1' },
                { id: 2, name: '任务名称2' },
                { id: 3, name: '任务名称3' }
              ]
            }
          })
        })
      },
      areaRequest(body) {
        return new Promise((resolve, reject) => {
          resolve({
            data: {
              total: 3,
              records: [
                { id: 1, name: '活动名称1' },
                { id: 2, name: '活动名称2' },
                { id: 3, name: '活动名称3' }
              ]
            }
          })
        })
      },
      records: [
        { id: 1, code: 'DH20210305001' },
        { id: 2, code: 'DH20210305002' },
        { id: 3, code: 'DH20210305003' }
      ]
    }
  },
  methods: {
    // 刷新列表
    refresh() {
      this.$refs.ccpTable.refresh()
      this.$refs.areaTable.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}
.my-integral {
  height: calc(100vh - 164px);
  overflow: auto;

  .point-text {
    margin-left: 20px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .num {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .point-record {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    /deep/ .el-tabs__active-bar {
      width: 112px !important;
    }
  }

  .conversion-record {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
