<template>
  <div class="fast-nav">
    <template v-if="listDataRead">
      <div v-for="oneItem in listData" :key="oneItem.id" class="fast-list">
        <div class="title">{{ oneItem.powerName }}</div>
        <div class="fast-menu">
          <!-- 二级导航 start -->
          <template v-for="twoItem in oneItem.children">
            <el-button
              v-if="!twoItem.children || twoItem.children.length === 0"
              :key="twoItem.id"
              type="primary"
              plain
              size="mini"
              @click="toDetails(twoItem)"
              >{{ twoItem.powerName }}</el-button
            >
            <template v-else>
              <div :key="twoItem.id" class="sub-title">
                {{ twoItem.powerName }}
              </div>
              <!-- 三级导航 start -->
              <template v-for="threeItem in twoItem.children">
                <el-button :key="threeItem.id" type="primary" plain size="mini" @click="toDetails(threeItem)">{{
                  threeItem.powerName
                }}</el-button>
              </template>
            </template>
          </template>
        </div>
      </div>
    </template>
    <el-dialog
      width="650px"
      top="10vh"
      class="beauty"
      title="添加快捷导航"
      append-to-body
      :visible="visible"
      @close="closeModal"
    >
      <div class="fast-tree">
        <el-tree
          ref="refTree"
          :data="treeData"
          :default-checked-keys="selectPowerIds"
          node-key="id"
          :props="defaultProps"
          show-checkbox
          check-on-click-node
          default-expand-all
          @check="changeCheck"
        ></el-tree>
      </div>
      <footer slot="footer">
        <el-button @click="closeModal">取消</el-button>
        <el-button v-promise-btn type="primary" @click="saveNavigation">确认</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import homeApi from '../api'
import { treeFilter } from '@/utils'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      treeData: [],
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'powerName'
      },
      formData: {
        powerIds: []
      },
      selectPowerIds: [],
      listDataRead: false,
      listData: []
    }
  },
  watch: {
    visible() {
      this.$nextTick(() => {
        this.$refs.refTree.setCheckedKeys(this.selectPowerIds)
      })
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.querySystemPowerTree()
    this.queryNavigationList()
  },
  // 方法集合
  methods: {
    // 获取所有快捷导航
    async queryNavigationList() {
      this.listDataRead = false
      const result = await homeApi.queryNavigationList({})
      const datas = result.data
      if (!datas) {
        return
      }
      this.selectPowerIds = datas.idList || []
      const powerList = datas.powerList || []
      this.listData = powerList[0].children.length > 0 ? powerList[0].children : []
      this.listDataRead = true
    },
    // 获取所有权限
    async querySystemPowerTree() {
      const result = await homeApi.querySystemPowerTree({})
      const datas = result.data || []
      const list = datas
      const pastList = ['ProjectOA']
      // 过滤掉菜单数据
      const formatArray = array => {
        array.forEach(e => {
          if (this.$hasPower(e.powerKey)) {
            if (e.children && e.children.length > 0) {
              if (e.children[0].type === 3 || pastList.includes(e.id)) {
                e.children = []
              }
              formatArray(e.children)
            }
          } else {
            e.children = []
          }
        })
      }
      formatArray(list)
      const newList = treeFilter(
        list,
        e => {
          return this.$hasPower(e.powerKey)
        },
        'id'
      )
      this.treeData = newList
    },
    // 选择权限
    changeCheck(e, data) {
      this.formData.powerIds = [...data.checkedKeys, ...data.halfCheckedKeys]
    },
    // 保存快捷导航
    async saveNavigation() {
      if (this.formData.powerIds.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择要添加的导航!'
        })
        return
      }
      await homeApi.saveNavigation(this.formData)
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
      this.queryNavigationList()
      this.closeModal()
    },
    // 跳转详情
    toDetails(item) {
      this.$router.push({
        name: item.powerKey
      })
    },
    // 取消
    closeModal() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin';
@import '~@/styles/variables';
.fast-tree {
  height: calc(50vh);
  overflow-y: auto;
  @include scrollBar;
}
.fast-nav {
  height: 100%;
  overflow-y: auto;
  @include scrollBar;
}
.fast-list {
  .title,
  .sub-title {
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:before {
      content: '';
      width: 3px;
      height: 15px;
      background: $btnPrimaryColor;
      border-radius: 3px;
      margin-right: 10px;
    }
  }
  .sub-title {
    font-size: 14px;
    padding-bottom: 5px;
    margin: 0 5px 10px;
    border-bottom: 1px #eee solid;
    &:before {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px $btnPrimaryColor solid;
      background: none;
      opacity: 0.7;
    }
  }
  .fast-menu {
    margin-bottom: 5px;
    ::v-deep .el-button {
      margin: 0 5px 10px;
    }
  }
}
</style>
