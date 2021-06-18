<template>
  <div class="container">
    <div class="tooltips">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filterForm.complainer" placeholder="请输入投诉人" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.obj" placeholder="请输入商户" />
        </el-form-item>
        <el-form-item label="投诉类型">
          <el-select v-model="filterForm.type" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(complainTypeItem, index) in complainTypeList"
              :key="index"
              :label="complainTypeItem.argText"
              :value="complainTypeItem.argCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单据状态">
          <el-select v-model="filterForm.status" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option label="待指派" value="0"></el-option>
            <el-option label="待处理" value="1"></el-option>
            <el-option label="已处理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <Grid ref="table" :filter-form.sync="filterForm" :request="request">
      <vxe-table-column title="投诉单号" field="code"></vxe-table-column>
      <vxe-table-column title="投诉商户" show-overflow field="objName"></vxe-table-column>
      <vxe-table-column title="投诉类型" show-overflow field="typeName"></vxe-table-column>
      <vxe-table-column title="投诉内容" show-overflow field="content"></vxe-table-column>
      <vxe-table-column title="投诉人" show-overflow field="complainerName"></vxe-table-column>
      <vxe-table-column title="投诉时间" show-overflow field="createTime"></vxe-table-column>
      <vxe-table-column title="单据状态" show-overflow>
        <template #default="{ row }">
          <span v-if="row.status === '0'">待指派</span>
          <span v-else-if="row.status === '1'">待处理</span>
          <span v-else-if="row.status === '2'">已处理</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="是否申诉">
        <template #default="{ row }">
          <span v-if="row.status === '2'">{{ row.appealFlag ? '是' : '否' }}</span>
          <span v-else>-</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="申诉处理结果" show-overflow>
        <template #default="{ row }">
          <span v-if="row.appealFlag === 1">{{
            row.appealResult === null ? '-' : row.appealResult ? '申诉成功' : '申诉失败'
          }}</span>
          <span v-else>-</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="200" align="left">
        <template #default="{ row }">
          <el-button
            v-if="$hasPower('BusinessComplaintDesignate') && row.status === '0'"
            type="primary"
            @click="handleDesignate(row)"
            >指派</el-button
          >
          <el-button
            v-if="$hasPower('BusinessComplaintResult') && row.status === '1'"
            type="primary"
            @click="handleResult(row)"
            >填写处理结果</el-button
          >
          <el-button
            v-if="$hasPower('BusinessComplaintAppeal') && row.appealFlag === 1 && row.appealResult === null"
            type="primary"
            @click="handleAppeal(row)"
            >申诉处理</el-button
          >
          <el-button v-if="$hasPower('BusinessComplaintDetail')" type="info" @click="handleDetail(row)"
            >查看详情</el-button
          >
        </template>
      </vxe-table-column>
    </Grid>

    <!-- 指派处理人模态框组件 start -->
    <ModalDesignate v-if="visibleDesignate" :visible.sync="visibleDesignate" :item="item" @refresh="refresh" />
    <!-- 指派处理人模态框组件 end -->

    <!-- 填写处理结果模态框组件 start -->
    <ModalResult v-if="visibleResult" :visible.sync="visibleResult" :item="item" @refresh="refresh" />
    <!-- 填写处理结果模态框组件 end -->

    <!-- 申诉处理模态框组件 start -->
    <ModalAppeal v-if="visibleAppeal" :visible.sync="visibleAppeal" :item="item" @refresh="refresh" />
    <!-- 申诉处理模态框组件 end -->
  </div>
</template>

<script>
import Api from '@/api/handyService'
import ModalDesignate from './ModalDesignate'
import ModalResult from './ModalResult'
import ModalAppeal from './ModalAppeal'
import { getGroupArgByArgGroup } from '@/api/system/args'
export default {
  components: { ModalDesignate, ModalResult, ModalAppeal },
  data() {
    return {
      filterForm: {
        module: 1, // 所属模块：1、商户投诉 2、物业投诉
        complainer: '',
        obj: '',
        type: undefined,
        status: undefined
      },
      request(body) {
        return Api.getMerchantComplainList(body)
      },
      visibleDesignate: false,
      visibleResult: false,
      visibleAppeal: false,
      item: {},
      complainTypeList: []
    }
  },
  mounted() {
    // 投诉类型(商户)下拉框数据填充
    getGroupArgByArgGroup('merchantComplainType').then(res => {
      // console.log(res)
      if (res.data && res.data.length) {
        this.complainTypeList = res.data
      }
    })
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
    // 指派
    handleDesignate(row) {
      this.visibleDesignate = true
      this.item = row
    },
    // 填写处理结果
    handleResult(row) {
      this.visibleResult = true
      this.item = row
    },
    // 申诉处理
    handleAppeal(row) {
      this.visibleAppeal = true
      this.item = row
    },
    // 投诉申诉详情
    handleDetail(row) {
      this.$router.push({ name: 'BusinessComplaintDetail', params: { id: row.id } })
    }
  }
}
</script>

<style lang="less" scoped></style>
