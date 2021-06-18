<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.giftName" placeholder="礼品名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <Select v-model="filterForm.status" :options="giftStatusList" has-all> </Select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('AddGift')" type="primary" icon="el-icon-plus" @click="handleAdd">
            新建
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :request="request" :filter-form.sync="filterForm">
      <vxe-table-column title="礼品名称" field="giftName"></vxe-table-column>
      <vxe-table-column title="库存量" field="inventory"></vxe-table-column>
      <vxe-table-column title="兑换积分" field="convertScore"></vxe-table-column>
      <vxe-table-column title="状态" field="status">
        <template #default="{ row }">
          {{ row.status == 0 ? '上架' : '下架' }}
        </template>
      </vxe-table-column>
      <vxe-table-column title="商品描述" field="describe"></vxe-table-column>
      <vxe-table-column title="操作" width="260px" fixed="right">
        <template #default="{ row }">
          <el-button v-if="$hasPower('EditGift')" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button v-if="$hasPower('OnAndOffShelf')" type="primary" @click="toggleStatus(row)">
            {{ row.status == 0 ? '下架' : '上架' }}
          </el-button>
          <button-link v-if="$hasPower('GiftDetail')" type="primary" :to="'giftManage/' + row.id">查看详情</button-link>
          <el-button v-if="$hasPower('DeleteGift')" type="danger" @click="handleRemove(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </Grid>
    <Edit v-if="editDialogVisible" :info="form" :visible.sync="editDialogVisible" @submit="handleSubmit"></Edit>
  </div>
</template>

<script>
import { giftStatusList } from '../lib/options'
import { deleteBandGift, updateBankGift, addBandGift } from '../api/pointsBand.js'
import Edit from './components/Edit'
import { admin } from '@/plugins/axios'
export default {
  name: 'GiftManage',
  components: { Edit },
  data() {
    return {
      filterForm: {
        giftName: '',
        status: null
      },
      form: {},
      giftStatusList,
      editDialogVisible: false,
      activeId: null,
      request(body) {
        console.log(body)
        return admin.post('bankGiftManagement/list', body)
      }
    }
  },
  watch: {
    // 监听书筛选输入框的变化
    filterText(val) {
      this.$refs.table.filter(val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    handleAdd() {
      this.activeId = null
      this.form = { status: 0 }
      this.editDialogVisible = true
    },
    // 编辑礼品
    handleEdit(row) {
      this.form = { ...row }
      console.log('55')
      console.log(row)
      this.editDialogVisible = true
    },
    // 上下架
    async toggleStatus(row) {
      if (row.status !== 0) {
        row.status = 0
        const params = Object.assign(row, row.status)
        await updateBankGift(params)
        this.$message.success('上架成功!')
      } else {
        const params = Object.assign(row, (row.status = 1))
        await updateBankGift(params)
        this.$message.success('下架成功!')
      }
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    handleViewDetail(row) {},
    // 添加/编辑提交
    async handleSubmit(data) {
      data.id ? await updateBankGift(data) : await addBandGift(data)
      this.$message.success('操作成功!')
      this.editDialogVisible = false
      await this.refresh()
    },
    // 删除礼品
    async handleRemove(row) {
      await this.$confirm('确认删除礼品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          deleteBandGift(row.id)
          this.$message.success('删除成功')
          this.refresh()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
