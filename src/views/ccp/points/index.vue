<template>
  <div class="container">
    <Aside @change="handleChange"></Aside>
    <div class="main-content">
      <div class="tooltips">
        <el-form inline>
          <el-form-item>
            <el-input v-model="filterForm.name" placeholder="党员/积极分子姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <Select v-model="filterForm.distinguish" has-all :options="typeOptions" placeholder="类型"></Select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button icon="el-icon-refresh-left" @click="$refs.table.reset()">重置</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="$hasPower('CcpPointsSetting')"
              type="primary"
              plain
              icon="el-icon-s-tools"
              @click="visible = true"
              >积分设置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Grid ref="table" :request="request" :filter-form.sync="filterForm">
        <vxe-table-column title="党组织名称" field="organizationName"></vxe-table-column>
        <vxe-table-column title="姓名" field="realName"></vxe-table-column>
        <vxe-table-column title="性别" field="sex" formatter="sex"></vxe-table-column>
        <vxe-table-column title="手机号" field="mobile"></vxe-table-column>
        <vxe-table-column title="身份证" field="identityCardNumber"></vxe-table-column>
        <vxe-table-column title="当前积分" field="score" sortable></vxe-table-column>
        <vxe-table-column title="类型" field="distinguish" :formatter="$getLabelV(typeOptions)"></vxe-table-column>
        <vxe-table-column v-if="$hasPower('CcpPointsDetail')" title="操作" width="100px">
          <template #default="{ row }">
            <button-link
              v-if="row.distinguish === 1"
              type="primary"
              :to="'member/' + row.identityCardNumber + '/detail'"
              >查看详情</button-link
            >
            <button-link
              v-else-if="row.distinguish === 2"
              type="primary"
              :to="'activeMember/' + row.identityCardNumber + '/detail'"
              >查看详情</button-link
            >
          </template>
        </vxe-table-column>
      </Grid>
    </div>
    <Settings :visible.sync="visible"></Settings>
  </div>
</template>

<script>
import Aside from '../components/Aside'
import { getPartyScoreList } from '@/api/ccp/points'
import Settings from './components/Settings'

export default {
  name: 'CcpDepartment',
  components: { Aside, Settings },
  data() {
    return {
      activeId: null,
      filterForm: {},
      request: getPartyScoreList,
      visible: false,
      typeOptions: [
        {
          label: '党员',
          value: 1
        },
        {
          label: '积极分子',
          value: 2
        }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    handleChange(id) {
      this.filterForm.organizationId = id
      this.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.container {
  display: flex;
}
.aside {
  width: 300px;
  border-right: 1px solid #eee;
  margin-right: 15px;
  padding-right: 15px;
}
.main-content {
  flex: 1;
}
</style>
