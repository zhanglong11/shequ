<template>
  <el-dialog title="指派处理人" :visible="visible" width="680px" @close="handleCancel">
    <div class="designate-con">
      <div class="left">
        <div>选择</div>
        <div class="panel-l">
          <el-input v-model="filterText" placeholder="请输入" />
          <div class="el-tree-con">
            <el-tree
              ref="tree"
              :data="treeData"
              node-key="id"
              default-expand-all
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              show-checkbox
              :props="{
                children: 'children',
                label: 'dataName'
              }"
              @check-change="handleCheckChange"
              @check="handleCheck"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span class="label"
                  ><i :class="data.organType === 2 ? 'el-icon-user' : 'el-icon-goods'"></i>{{ node.label }}</span
                >
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="right">
        <div>已选</div>
        <div class="panel-r">
          <div v-for="(user, index) in checkedUsers" :key="index" class="user-item">
            <div class="item-left">
              <div class="img">
                <img v-if="user.headImage" :src="user.headImage" />
              </div>
              <div class="name">{{ user.dataName }}</div>
            </div>
            <i class="item-right el-icon-close" @click="handleRemove(user)"></i>
          </div>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="handleEnter">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '@/api/handyService'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      checkedUsers: [],
      repeatUserNode: [],
      btnLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    // 渲染左侧树
    Api.getSystemOrganizationTree().then(res => {
      // console.log(res)
      if (res.data && res.data.length) {
        this.treeData = res.data
      }
    })
  },
  methods: {
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true
      return data.dataName.indexOf(value) !== -1
    },
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
      this.$refs.tree.setCheckedKeys([])
      this.filterText = ''
      this.treeData = []
      this.checkedUsers = []
      this.repeatUserNode = []
    },
    // 确定
    handleEnter() {
      console.log(this.item)
      console.log(this.checkedUsers)
      if (this.checkedUsers.length) {
        const params = {
          id: this.item.id,
          dealMan: ''
        }
        for (let i = 0; i < this.checkedUsers.length; i++) {
          params.dealMan = ',' + this.checkedUsers[i].dataUnicode + params.dealMan
        }
        params.dealMan = params.dealMan.substr(1)
        this.btnLoading = true
        Api.merchantComplainAssign(params).then(
          res => {
            this.$message.success('操作成功')
            this.handleCancel()
            this.$emit('refresh')
            this.btnLoading = false
          },
          err => {
            console.log(err)
            this.btnLoading = false
          }
        )
      } else {
        this.$message.error('请选择指派人，再做该操作')
      }
    },
    // 节点勾选
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data.label + '***checked:' + checked + '***indeterminate:' + indeterminate)
    },
    // 节点勾选
    handleCheck(data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) {
      // console.log(data, checkedNodes)
      this.repeatUserNode = checkedNodes.filter(item => item.organType === 2) // 获取人员节点(包含重复的人员)
      let uniqUserNodes = _.uniqBy(this.repeatUserNode, 'dataUnicode') // 去除重复人员
      uniqUserNodes = _.sortBy(uniqUserNodes, ['dataUnicode'])
      // console.log(uniqUserNodes)
      this.checkedUsers = []
      for (let i = 0; i < uniqUserNodes.length; i++) {
        this.checkedUsers.push(uniqUserNodes[i])
      }
    },
    // 删除
    handleRemove(user) {
      // 右侧用户删除
      let index = null
      for (let i = 0; i < this.checkedUsers.length; i++) {
        if (user.dataUnicode === this.checkedUsers[i].dataUnicode) {
          index = i
        }
      }
      this.checkedUsers.splice(index, 1)

      // 刷新左侧勾选状态
      const checkedKeys = []
      for (let i = 0; i < this.repeatUserNode.length; i++) {
        if (this.repeatUserNode[i].dataUnicode !== user.dataUnicode) {
          checkedKeys.push(this.repeatUserNode[i].id)
        }
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(checkedKeys) // 取消左侧勾选的用户
      })

      // 移除取消勾选的用户节点
      for (let i = this.repeatUserNode.length - 1; i >= 0; i--) {
        if (this.repeatUserNode[i].dataUnicode === user.dataUnicode) {
          this.repeatUserNode.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
.designate-con {
  display: flex;
  .left {
    flex: 0 0 50%;
    padding-right: 10px;
  }
  .right {
    flex: 0 0 50%;
    padding-left: 10px;
  }
  .panel-l,
  .panel-r {
    margin-top: 10px;
    border: solid 1px #e5e5e5;
    border-radius: 6px;
    height: 400px;
    padding: 10px;
    overflow: auto;
  }
  .panel-l {
    .el-tree-con {
      margin-top: 10px;
      height: 336px;
      width: 288px;
      overflow: auto;
    }
  }
  .panel-r {
    padding: 5px;
  }
  /deep/ .custom-tree-node {
    .label {
      i {
        margin-right: 6px;
        color: #8ddffa;
      }
    }
  }

  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    .item-left {
      display: flex;
      align-items: center;
      .img {
        width: 30px;
        height: 30px;
        background: #f4f5f5;
        margin-right: 10px;
        font-size: 0px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .item-right {
      padding: 5px;
      cursor: pointer;
    }
  }
}
</style>
