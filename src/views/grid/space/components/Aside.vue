<template>
  <div class="aside">
    <el-input v-model="q" placeholder="请输入" suffix-icon="el-icon-search"></el-input>
    <el-dropdown style="width: 100%; margin-top: 10px" trigger="click">
      <el-button v-if="$hasPower('GripSpaceEdit')" style="width: 100%" type="primary" icon="el-icon-plus">
        新增
      </el-button>
      <el-dropdown-menu v-if="$hasPower('GripSpaceEdit')" slot="dropdown">
        <el-dropdown-item @click.native="visible = true"> 新增区域 </el-dropdown-item>
        <el-dropdown-item> <router-link to="building/new">新增建筑</router-link> </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <Tree
      v-if="treeData.length && defaultExpandedKeys"
      class="scroll-beauty"
      :defaultSelectedKeys="[value]"
      :defaultExpandAll="false"
      :defaultExpandedKeys.sync="defaultExpandedKeys"
      :show-icon="false"
      :replace-fields="replaceFields"
      show-line
      :treeData="treeData"
      @select="handleSelect"
    >
    </Tree>
    <ul class="statistics">
      <li>
        <span class="label">自住数：</span>
        <div class="icon" style="background-color: #99cc00"></div>
        <div class="count">{{ statistics.liveCount }}</div>
      </li>
      <li>
        <span class="label">出租数：</span>
        <div class="icon" style="background-color: #faad14"></div>
        <div class="count">{{ statistics.rentOutCount }}</div>
      </li>
      <li>
        <span class="label">空置数：</span>
        <div class="icon" style="background-color: #cccccc"></div>
        <div class="count">{{ statistics.vacancyCount }}</div>
      </li>
      <!--<li>
        <span class="label">商铺数：</span>
        <div class="icon" style="background-color: #009688"></div>
        <div class="count">{{ statistics.shopCount }}</div>
      </li>-->
    </ul>
    <EditRegion :visible.sync="visible" :region="activeItem" @change="refresh"></EditRegion>
  </div>
</template>

<script>
import { Tree } from 'ant-design-vue'
import EditRegion from './EditRegion'
import { textSearch, treeFilter, treeForEach } from '@/utils'
import { removeRegionOrBuildingById } from '@/api/grid/region'
import { getSpaceRoomCount } from '@/api/grid/space'
export default {
  name: 'Aside',
  components: { Tree, EditRegion },
  props: {
    value: {
      type: String,
      default: null
    },
    countChange: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      q: '',
      visible: false,
      replaceFields: {
        key: 'id'
      },
      activeItem: null,
      statistics: {},
      defaultExpandedKeys: ['5ee40daba4fd4f639b11505bbf3a2391']
    }
  },
  computed: {
    treeData() {
      let treeData = _.cloneDeep(this.$store.state.grid.communityTreeData)
      let isFirst = false
      const openIds = []
      if (treeData[0]) treeData[0].disabled = true
      if (this.q) {
        treeData = treeFilter(treeData, item => textSearch(item.name, this.q))
      }
      treeForEach(treeData, (item, parent) => {
        item.title = item.name
        if (item.type > 2) {
          item.buildingId = item.type === 3 ? item.id : parent.buildingId
        } else {
          item.disabled = true
        }
        if (item.type === 2 && this.$hasPower('GripSpaceEdit')) {
          item.title = (
            <p class="custom-tree-node">
              <span>{item.title}</span>
              <i class="el-icon-edit" onClick={() => this.handleEdit(item)}></i>
              <i class="el-icon-delete" onClick={() => this.handleRemove(item)}></i>
            </p>
          )
        }
        if (item.type === 1) {
          openIds.push(item.id)
          this.defaultExpandedKeys = openIds
        }
        if (item.type === 4 && !isFirst) {
          openIds.push(item.id)
          this.defaultExpandedKeys = openIds
          isFirst = true
        }
      })
      return treeData
    }
  },
  watch: {
    countChange() {
      if (this.countChange) {
        this.refresh()
      }
    }
  },
  created() {
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      this.$store.dispatch('grid/getStructTreeData')
      getSpaceRoomCount().then(res => {
        this.statistics = res.data
      })
    },
    handleSelect([id], { selected, node }) {
      this.$emit('input', id)
      if (selected) {
        this.$emit('change', node.dataRef)
      }
    },
    async handleEdit(item) {
      this.activeItem = { name: item.name, id: item.id, orgId: item.parentId }
      this.visible = true
    },
    async handleRemove(item) {
      await this.$remove(item)
      await removeRegionOrBuildingById(item.id)
      this.$message.success('删除成功')
      this.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
</style>

<style lang="scss">
@import '~@/styles/variables.scss';
.aside {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .ant-tree {
    flex: 1;
    overflow: auto;
    margin-top: 7px;
    > li:first-child {
      padding-top: 0;
    }
    > list:last-child {
      padding-bottom: 0;
    }
  }
  .statistics {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
    margin-top: 10px;
    li {
      width: 50%;
      display: flex;
      align-items: center;
      .icon {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .count {
        font-weight: bold;
      }
    }
  }
}
.custom-tree-node {
  > span {
    margin-right: 15px;
  }
  > i:last-child {
    margin-left: 4px;
  }
  > i {
    color: #0009;
    cursor: pointer;
    padding: 3px;
    &:hover {
      color: $menuActiveText;
    }
  }
}
</style>
