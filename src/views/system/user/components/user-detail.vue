<template>
  <div>
    <el-dialog
      title="查看人员"
      :visible="visible"
      top="10vh"
      width="800px"
      append-to-body
      @close="$emit('update:visible', false)"
    >
      <div class="detail">
        <h2>基本信息</h2>
        <section>
          <ul v-if="form" class="base">
            <li class="avatar">
              <span>头像：</span>
              <el-avatar :size="100" :src="form.headImage">
                <img src="/img/avatar.png" />
              </el-avatar>
            </li>
            <li>
              <span>姓名：</span><span>{{ form.realName }}</span>
            </li>
            <li>
              <span>用户名：</span><span>{{ form.loginName }}</span>
            </li>
            <li>
              <span>性别：</span><span>{{ ['保密', '男', '女'][form.sex] }}</span>
            </li>
            <li>
              <span>手机：</span><span>{{ form.mobile }}</span>
            </li>
            <li>
              <span>角色：</span>
              <span>
                <el-tag v-for="e in form.roleTexts" :key="e">{{ e }}</el-tag>
              </span>
            </li>
            <li>
              <span>职位：</span><span>{{ form.position }}</span>
            </li>
            <li>
              <span>生日：</span><span>{{ form.birthday }}</span>
            </li>
            <li>
              <span>邮箱：</span><span>{{ form.email }}</span>
            </li>
            <li>
              <span>QQ：</span><span>{{ form.qqNumber }}</span>
            </li>
            <li>
              <span>身份证号：</span><span>{{ form.identityCardNumber }}</span>
            </li>
            <li>
              <span>入职时间：</span><span>{{ form.entryDate }}</span>
            </li>
            <li>
              <span>微信：</span><span>{{ form.wechatNumber }}</span>
            </li>
            <li>
              <span>备注：</span><span>{{ form.remark }}</span>
            </li>
            <li>
              <span>就业日期：</span><span>{{ form.jobDate | ymd }}</span>
            </li>
          </ul>
        </section>
        <h2>部门信息</h2>
        <section>
          <vxe-table :data="form.departmentList" size="mini">
            <vxe-table-column title="所属部门" field="departmentName">
              <template #default="{ row }">
                <span>{{ row.departmentName }}</span>
                <el-tag v-show="row.principalFlag" style="margin-left: 15px; width: 40px; position: absolute"
                  >主管</el-tag
                >
              </template>
            </vxe-table-column>
            <vxe-table-column title="操作">
              <template #default="{ row }">
                <el-button type="text" @click="removeFromDepartmentByUserId(row)">移出此部门</el-button>
                <el-button v-if="!row.principalFlag" type="text" @click="setPrincipalByUserId(row)">设置主管</el-button>
                <el-button v-else type="text" @click="cancelPrincipalByUserId(row)">取消主管</el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from '../../../../api/system/departmentUser'

export default {
  name: 'FormAddUserDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: ''
    }
  },
  computed: {
    isAdd() {
      return !this.id
    }
  },
  watch: {
    visible(val) {
      if (val && this.id) this.refresh()
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    async refresh(id) {
      const res = await Api.getUserInfo(id || this.id)
      const datas = res.data
      this.form = datas
    },
    // 刷新父级
    parentRefresh() {
      this.$parent.refresh()
    },
    // 移出此部门
    removeFromDepartmentByUserId(row) {
      console.log(111, this.form.departmentList)
      const departmentList = this.form.departmentList
      if (departmentList.length === 1) {
        this.$message.error('用户部门不能为空！')
        return
      }
      this.$msgbox({
        title: '提示',
        message: '确定要移出此部门？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        customClass: 'reset-password-dialog'
      }).then(() => {
        this.axios.system.post('/cim6d/system/deleteUserDepartment/' + row.departmentId, [this.form.id]).then(res => {
          this.refresh()
          this.parentRefresh()
        })
      })
    },
    // 设置主管
    setPrincipalByUserId(row) {
      this.$msgbox({
        title: '提示',
        message: '确定要设置主管？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        customClass: 'reset-password-dialog'
      }).then(() => {
        this.axios.system
          .post(`/cim6d/system/department/setPrincipal`, {
            id: row.departmentId,
            principalIds: [this.form.id]
          })
          .then(res => {
            this.refresh()
            this.parentRefresh()
          })
      })
    },
    // 取消主管
    cancelPrincipalByUserId(row) {
      this.$msgbox({
        title: '提示',
        message: '确定要取消主管？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        customClass: 'reset-password-dialog'
      }).then(() => {
        this.axios.system
          .post(`/cim6d/system/department/cancelPrincipal`, {
            id: row.departmentId,
            principalIds: [this.form.id]
          })
          .then(res => {
            this.refresh()
            this.parentRefresh()
          })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  h2 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 15px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 50%;
      margin: 10px 0;
      display: flex;
      align-items: flex-start;

      &.avatar {
        width: 100%;
      }

      > span:first-child {
        width: 120px;
        text-align: right;
      }
    }
  }
}
</style>
