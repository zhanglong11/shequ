<template>
  <div class="container">
    <CommunityTree v-model="filterForm.wbsCode" class="scroll-beauty aside"></CommunityTree>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.name" placeholder="请输入商户名称" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="filterForm.unifiedSocialCreditCode"
              placeholder="请输入统一社会信用代码"
              style="width: 184px"
            />
          </el-form-item>
          <el-form-item>
            <el-input v-model="filterForm.legalPerson" placeholder="请输入法人" />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="$hasPower('BusinessInfoAdd')" type="primary" plain icon="el-icon-plus" @click="handleAdd"
              >新建</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" :filter-form.sync="filterForm" :request="request">
        <vxe-table-column title="商户名称" field="name" show-overflow></vxe-table-column>
        <vxe-table-column title="统一社会信用代码" field="unifiedSocialCreditCode" show-overflow></vxe-table-column>
        <vxe-table-column title="法人" field="legalPerson" show-overflow></vxe-table-column>
        <vxe-table-column title="类型" field="typeName" show-overflow></vxe-table-column>
        <vxe-table-column title="地址" field="address" show-overflow></vxe-table-column>
        <vxe-table-column title="电话" field="phone" show-overflow></vxe-table-column>
        <vxe-table-column title="营业时间" field="openTime" show-overflow></vxe-table-column>
        <vxe-table-column title="备注" field="remark" show-overflow></vxe-table-column>
        <vxe-table-column title="操作" width="200">
          <template #default="{ row }">
            <el-button v-if="$hasPower('BusinessInfoEdit')" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-if="$hasPower('BusinessInfoDetail')" type="primary" @click="handleDetail(row)"
              >查看详情</el-button
            >
            <el-button v-if="$hasPower('BusinessInfoDelete')" type="danger" @click="handleRemove(row)">删除</el-button>
          </template>
        </vxe-table-column>
      </Grid>
    </div>
  </div>
</template>

<script>
import Api from '@/api/handyService'
export default {
  data() {
    return {
      filterForm: {
        wbsCode: '',
        name: '',
        unifiedSocialCreditCode: '',
        legalPerson: ''
      },
      request(body) {
        return Api.getMerchantList(body)
      }
    }
  },
  watch: {
    'filterForm.wbsCode': 'refresh'
  },
  // 方法集合
  methods: {
    // 刷新列表
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 新建
    handleAdd() {
      this.$router.push({ name: 'BusinessInfoAdd' })
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({ name: 'BusinessInfoEdit', params: { id: row.id } })
    },
    // 详情
    handleDetail(row) {
      this.$router.push({ name: 'BusinessInfoDetail', params: { id: row.id } })
    },
    // 删除
    handleRemove(row) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.deleteMerchant([row.id]).then(res => {
            this.$message.success('操作成功')
            this.refresh()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;

  .aside {
    flex: 0 0 300px;
    border-right: 1px solid #eee;
    margin-right: 15px;
    padding-right: 15px;
  }

  .main-content {
    flex: 1;
    overflow: auto;
  }
}
</style>
