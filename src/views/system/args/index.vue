<template>
  <div class="container-margin">
    <Aside @change="handleActiveArgGroupChange"></Aside>
    <el-card class="main-content">
      <header slot="header" class="card-header">
        <h2 v-html="activeArgGroup.argText"></h2>
        <span v-html="activeArgGroup.argCode"></span>
      </header>
      <div class="tooltips">
        <el-button v-if="$hasPower('ArgAdd')" type="primary" :disabled="!activeArgGroup.argCode" @click="visible = true"
          >新建参数</el-button
        >
      </div>
      <vxe-table :data="list">
        <vxe-table-column title="参数名称" field="argText"></vxe-table-column>
        <vxe-table-column title="参数code" field="argCode"></vxe-table-column>
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <el-button v-if="$hasPower('ArgsEdit') && row.argSource === 2" type="text" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button v-if="$hasPower('ArgsRemove') && row.argSource === 2" type="text" @click="handleRemove(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-card>
    <Edit :visible.sync="visible" :arg-group="activeArgGroup.argGroup" @change="refresh"></Edit>
  </div>
</template>
<script>
import Aside from './components/Aside'
import { getGroupArgByArgGroup, removeSystemArgById, updateSystemArg } from '@/api/system/args'
import Edit from './components/Edit'
export default {
  components: { Aside, Edit },
  data() {
    return {
      activeArgGroup: {},
      list: [],
      visible: false
    }
  },
  watch: {
    activeArgGroup: 'refresh'
  },
  methods: {
    refresh() {
      getGroupArgByArgGroup(this.activeArgGroup.argGroup).then(res => {
        this.list = res.data
      })
    },
    handleActiveArgGroupChange(data) {
      this.activeArgGroup = data
    },
    handleEdit(row) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '必填',
        inputPattern: /\S+/,
        inputValue: row.argText
      })
        .then(({ value }) => {
          return updateSystemArg({
            id: row.id,
            argText: value
          })
        })
        .then(() => {
          this.$message.success('修改成功')
          this.refresh()
        })
    },
    async handleRemove(row) {
      await this.$remove([row], 'argText')
      await removeSystemArgById(row.id)
      this.$message.success('删除成功')
      this.refresh()
    }
  }
}
</script>
<style lang="less" scoped>
.container-margin {
  display: flex;
  max-height: calc(100vh - 128px);
  aside {
    width: 300px;
    background-color: #fff;
    margin-right: 15px;
    max-height: 100%;
  }
  .main-content {
    flex: 1;
    .card-header {
      display: flex;
      align-items: center;
      h2 {
        margin-right: 15px;
        margin-bottom: 0;
      }
    }
  }
  .vxe-table {
    max-height: calc(100vh - 190px);
    background-color: red;
    overflow: auto;
  }
}
</style>
