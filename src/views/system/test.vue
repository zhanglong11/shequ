<template>
  <div class="container">
    <vxe-table
      row-id="id"
      :tree-config="{ children: 'children', expandAll: true, reserve: true }"
      :data="computedRoutes"
    >
      <vxe-table-column field="meta.title" width="200" title="名称" tree-node></vxe-table-column>
      <vxe-table-column field="name" width="200" title="name"></vxe-table-column>
      <vxe-table-column field="pid" width="200" title="pid"></vxe-table-column>
      <vxe-table-column title="创建菜单" width="150">
        <template #default="{ row }">
          <el-button v-if="!row.exists" @click="createMenu(row)">创建</el-button>
          <el-button v-else>已存在</el-button>
        </template>
      </vxe-table-column>
      <vxe-table-column title="action">
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <el-button @click="handleCustom">自定义</el-button>
        </template>
        <template #default="{ row }">
          <el-checkbox-group v-model="row.actions">
            <el-checkbox
              v-for="item in defaultActions"
              :key="item.key"
              :label="item.key"
              @change="val => functionChange(row, item.key, val)"
              >{{ item.title }}</el-checkbox
            >
          </el-checkbox-group>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog
      class="beauty"
      title="自定义action"
      :visible.sync="customDialogVisible"
      width="600px"
      @close="handleClose"
    >
      <vxe-table :data="cloneDefaultActions">
        <vxe-table-column title="权限名称">
          <template #default="{ row }">
            <el-input v-model="row.title"></el-input>
          </template>
        </vxe-table-column>
        <vxe-table-column title="key">
          <template #default="{ row }">
            <el-input v-model="row.key"></el-input>
          </template>
        </vxe-table-column>
        <vxe-table-column>
          <template #default="{ rowIndex }">
            <el-button @click="cloneDefaultActions.splice(rowIndex, 1)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-button tye="primary" style="margin-top: 10px" @click="cloneDefaultActions.push({})">添加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { routes } from '@/router'
import { treeFilter, treeForEach } from '@/utils'
import toFlat from '@/utils/toFlat'
import { createPower, getPowerListAll, removePowerById } from '@/api/system/power'

const list = _.cloneDeep(routes)
treeForEach(list, (item, parent) => {
  item.path = parent?.path ?? '' + item.path
  item.id = item.name || item.path
  item.pid = parent?.id ?? '0'
})
export default {
  name: 'Test',
  components: {},
  data() {
    return {
      routes: treeFilter(toFlat(list), item => !item.hidden),
      powerList: [],
      defaultActions: localStorage.getItem('customPowerAction')
        ? JSON.parse(localStorage.getItem('customPowerAction'))
        : [
            { key: 'Create', title: '新建' },
            { key: 'Update', title: '编辑' },
            { key: 'Remove', title: '删除' }
          ],
      cloneDefaultActions: [],
      customDialogVisible: false
    }
  },
  computed: {
    computedRoutes() {
      const routes = _.cloneDeep(this.routes)
      treeForEach(routes, item => {
        item.exists = false
        const exists = _.find(this.powerList, { powerKey: item.name })
        if (exists) {
          item.exists = true
        }
        item.actions = []
        for (const action of this.defaultActions) {
          if (_.find(this.powerList, { powerKey: item.name + action.key })) {
            item.actions.push(action.key)
          }
        }
      })
      return routes
    }
  },
  watch: {
    defaultActions: {
      deep: true,
      handler(val) {
        localStorage.setItem('customPowerAction', JSON.stringify(val))
      }
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      getPowerListAll().then(res => {
        this.powerList = toFlat(res.data)
      })
    },
    async createMenu(row) {
      await createPower({
        type: row.pid ? 2 : 1,
        parentId: row.pid || 'main',
        powerKey: row.name,
        powerName: row.meta.title
      })
      this.$message.success('操作成功')
      await this.refresh()
    },
    async functionChange(row, actionName, val) {
      if (val) {
        await createPower({
          type: 3,
          parentId: row.name,
          powerKey: row.name + actionName,
          powerName: _.find(this.defaultActions, { key: actionName }).title
        })
      } else {
        await removePowerById(row.name + actionName)
      }
      this.$message.success('操作成功')
      await this.refresh()
    },
    handleCustom() {
      this.cloneDefaultActions = _.cloneDeep(this.defaultActions)
      this.customDialogVisible = true
    },
    handleClose() {
      this.defaultActions = _.cloneDeep(this.cloneDefaultActions)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>
