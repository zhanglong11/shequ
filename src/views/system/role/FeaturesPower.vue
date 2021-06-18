<template>
  <div>
    <el-card v-if="sourcePower.length > 0" class="parend-card">
      <div class="tree-roll">
        <TreeCard
          v-if="!isLoading"
          ref="treeCard"
          :data="sourcePower"
          :all-data="sourcePower"
          :role-id="roleId"
          :power-list-role="powerListRole"
          @change="changePower"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import TreeCard from '../components/tree-card'
import { getPowerListByRoleId } from '@/api/system/role'
export default {
  name: 'FeaturesPower',
  components: {
    TreeCard
  },
  props: {
    roleId: {
      type: [String, Number],
      default: ''
    },
    sourcePower: {
      type: Array,
      default: () => []
    }
  },
  data() {
    // 这里存放数据
    return {
      powerListRole: [], // 已分配的权限
      isLoading: false // 保存按钮loading
    }
  },
  computed: {
    // 公司信息
    companyInfo() {
      return this.$store.state.system.companyInfo
    }
  },
  watch: {
    roleId: {
      immediate: true,
      handler() {
        this.init()
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    // 初始化
    init() {
      if (this.roleId) {
        this.getPowerListRole()
      }
    },
    // 获取角色已分配权限
    async getPowerListRole() {
      this.isLoading = true
      const { data } = await getPowerListByRoleId(this.roleId)
      this.powerListRole = data
      await this.$nextTick()
      this.isLoading = false
    },
    // 权限改变
    changePower({ currentCheckedNodes }) {
      this.$emit('handleSelectChange', currentCheckedNodes)
    }
  }
}
</script>
<style lang="less" scoped>
@line: #e5e5e5;
//@import url(); 引入公共css类
/deep/.checkbox-tree {
  .no-icon {
    display: none;
  }
}
.main-card-header {
  display: flex;
  align-items: center;
  .el-checkbox {
    margin-right: 10px;
  }
}
</style>
