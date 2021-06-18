<template>
  <el-dialog title="新增" width="1400px" class="beauty bg-border" :visible="visible" @close="close">
    <div v-show="step === 1">
      <div class="content">
        <EleTree :selectTreeId.sync="selectTreeId" :selected.sync="selectTreeItem"> </EleTree>
        <div class="right">
          <div class="right-top">
            <el-form inline>
              <el-form-item>
                <el-input
                  v-model="filterForm.keyword"
                  style="width: 200px"
                  placeholder="姓名/身份证号/电话号"
                  class="form-item"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <Select v-model="filterForm.sex" :options="sexList" has-all class="form-item"> </Select>
              </el-form-item>
              <el-form-item label="人口类型">
                <Select v-model="filterForm.type" :options="residentType" has-all class="form-item"> </Select>
              </el-form-item>
              <el-form-item label="户籍性质">
                <Select v-model="filterForm.status" :options="personStatus" has-all class="form-item"> </Select>
              </el-form-item>
              <el-form-item style="margin-right: 30px">
                <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
                <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right-content scroll-beauty">
            <Grid
              ref="table"
              :sortConfig="sortConfig"
              :request="request"
              row-id="identityCardNumber"
              :filter-form.sync="filterForm"
              :checkbox-config="{ trigger: 'cell', checkRowKeys: totalSelectRowIds, reserve: true }"
              @sort-change="handleSortChange"
              @checkbox-change="handleCheck"
              @checkbox-all="handleCheckAll"
            >
              <vxe-table-column type="checkbox" :resizable="false" width="40" align="center"> </vxe-table-column>
              <vxe-table-column title="姓名" field="name" width="120"></vxe-table-column>
              <vxe-table-column title="性别" field="sex" width="80">
                <template #default="{ row }">
                  {{ $getLabel(sexList, row.sex) }}
                </template>
              </vxe-table-column>
              <vxe-table-column title="身份证号" field="identityCardNumber" min-width="180"></vxe-table-column>
              <vxe-table-column title="联系电话" field="phone" width="120"></vxe-table-column>
              <vxe-table-column title="人口类型" field="type" width="140">
                <template #default="{ row }">
                  {{ $getLabel(residentType, row.type) }}
                </template>
              </vxe-table-column>
              <vxe-table-column title="户籍性质" field="status" width="140">
                <template #default="{ row }">
                  {{ $getLabel(personStatus, row.status) }}
                </template>
              </vxe-table-column>
              <vxe-table-column
                title="创建时间"
                field="createTime"
                sortable
                width="180"
                formatter="ymdhms"
              ></vxe-table-column>
              <vxe-table-column title="创建人" field="creatorName" width="120"></vxe-table-column>
            </Grid>
          </div>
        </div>
      </div>
    </div>
    <div v-show="step === 2" class="next">
      <p>已选择</p>
      <vxe-table
        ref="xTable"
        :data="totalSelectRows"
        border
        resizable
        auto-resize
        stripe
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
        <vxe-table-column type="seq" title="序号" width="100"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" width="180"></vxe-table-column>
        <vxe-table-column field="sex" title="性别" width="200" formatter="sex"></vxe-table-column>
        <vxe-table-column title="身份证号" field="identityCardNumber" min-width="250"></vxe-table-column>
        <vxe-table-column field="phone" title="手机号" min-width="240"></vxe-table-column>
        <vxe-table-column field="vaccinationStatus" title="接种状态" width="200" :edit-render="{}">
          <template #edit="{ row }">
            <Select v-model="row.vaccinationStatus" :options="vaccinationStatus" placeholder="接种状态"></Select>
          </template>
          <template #default="{ row }">
            <Select v-model="row.vaccinationStatus" :options="vaccinationStatus" placeholder="接种状态"></Select>
            <!--{{ $getLabel(vaccinationStatus, row.vaccinationStatus) }}-->
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button v-if="step === 1" type="primary" @click="step = 2">下一步</el-button>
      <template v-if="step === 2">
        <el-button type="primary" @click="step = 1">上一步</el-button>
        <el-button v-promise-btn type="primary" @click="submit">提交</el-button>
      </template>
    </footer>
  </el-dialog>
</template>

<script>
import Api from '@/views/epidemicControl/components/api'
import { sexList, residentType, personStatus } from '@/views/epidemicControl/components/lib'
import EleTree from '@/views/epidemicControl/components/person/CommonPersonAdd/components/EleTree'
import { vaccinationStatus } from '../lib'
export default {
  name: 'AddVaccinationDialog',
  components: { EleTree },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      default: () => {}
    },
    selectData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      step: 1,
      sexList,
      residentType,
      personStatus,
      vaccinationStatus,
      sortConfig: {
        remote: true
      },
      request: Api.person.getListByRoomId,
      selectTreeId: '',
      selectTreeItem: {},
      filterForm: { wbsCode: '' },
      totalSelectRows: [...this.selectData]
    }
  },
  computed: {
    totalSelectRowIds() {
      return this.totalSelectRows.map(item => item.identityCardNumber)
    }
  },
  watch: {
    selectTreeItem: {
      immediate: false,
      deep: true,
      handler() {
        this.filterForm.wbsCode = this.selectTreeItem.wbsCode
        this.refresh()
      }
    }
  },
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    // 重置
    reset() {
      this.$refs.table.reset()
    },
    // 排序改变
    handleSortChange({ order, property }) {
      const isDesc = order === 'desc' ? '-' : ''
      this.filterForm.sort = isDesc + property
      this.refresh()
    },
    // 复选框选择事件
    async handleCheck({ checked, row }) {
      if (checked) {
        this.totalSelectRows.push({ ...row, vaccinationStatus: 0 })
      } else {
        this.totalSelectRows = this.totalSelectRows.filter(item => item.identityCardNumber !== row.identityCardNumber)
      }
    },
    handleCheckAll({ checked, records, reserves }) {
      const calcRecords = _.map(records, item => {
        return {
          ...item,
          vaccinationStatus: 0
        }
      })
      const calcReserves = _.map(reserves, item => {
        return {
          ...item,
          vaccinationStatus: 0
        }
      })
      if (checked) {
        this.totalSelectRows = _.uniqBy([...this.totalSelectRows, ...calcRecords], 'identityCardNumber')
      } else {
        this.totalSelectRows = _.uniqBy([...this.totalSelectRows, ...calcReserves], 'identityCardNumber')
      }
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      if (!this.totalSelectRows.length) {
        this.$message.info('请最少选择一个')
        return false
      }
      this.$emit('submit', this.totalSelectRows)
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .el-tree {
  .el-tree-node {
    &.is-current {
      > .el-tree-node__content {
        background-color: #3dbbee;
        color: #fff;
        .el-tree-node__expand-icon {
          &:not(.is-leaf) {
            color: #fff;
          }
        }
      }
    }
  }
}
/deep/ .el-dialog {
  .el-dialog__body {
    padding: 0;
    overflow: hidden;
  }
}
.content {
  padding: 10px;
  display: flex;
  max-height: calc(90vh - 150px);
  overflow: hidden;
  .right {
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .right {
    flex: 1;
    margin-left: 10px;
    overflow: hidden;
    .right-top {
      flex: 0 0 20px;
      .form-item {
        width: 120px;
      }
    }
    .right-content {
      margin-top: 10px;
      flex: 1;
      overflow: auto;
    }
  }
}
.next {
  padding: 10px 20px;
}
</style>
