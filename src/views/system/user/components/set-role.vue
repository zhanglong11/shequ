<!--/**
任务名称：2689/ 基础服务-用户管理（react->vue）迁移
开发人员：李建敏
日期：2020-3月-25日
任务类型：1.全新代码
**/-->
<template>
  <el-dialog width="520px" title="角色设置" :visible="visible" @close="close">
    <el-form :model="form" label-position="top">
      <template v-for="e in list">
        <el-form-item v-if="e.children" :key="e.id" :label="e.name">
          <el-checkbox-group v-model="roleIdList">
            <el-checkbox v-for="f in e.children" :key="f.id" :label="f.id">{{ f.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>
    </el-form>
    <footer slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </footer>
  </el-dialog>
</template>
<script>
export default {
  name: 'SetRole',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 接收的参数
  props: {
    // 用户ID
    id: {
      type: String,
      default: null
    },
    // 是否可见
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    // 这里存放数据
    return {
      form: {}, // 关联员工表单
      list: [],
      roleIdList: [] // 已有权限列表
    }
  },
  created() {
    this.axios.system.post('cim6d/system/permission/role/tree', { serviceCode: 'base2020' }).then(res => {
      this.list = res.data
    })
    this.axios.system.get('cim6d/system/permission/user/role/query/' + this.id).then(res => {
      if (!res.data) {
        return
      }
      this.roleIdList = res.data.roleIdList
    })
  },
  methods: {
    // 提交
    submit() {
      this.axios.system.post('cim6d/system/permission/user/role/bind/' + this.id, this.roleIdList).then(res => {
        this.$message.success('设置成功')
        this.$parent.refresh()
        this.close()
      })
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less">
.el-form {
  .el-form-item {
    margin-bottom: 0;
    /deep/ .el-form-item__label {
      padding: 0;
    }
  }
}
</style>
