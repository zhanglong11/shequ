<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: calc(100vh - 164px)">
      <el-tab-pane label="个人信息">
        <PersonalInfo />
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <UpdatePassword />
      </el-tab-pane>
      <el-tab-pane label="我的积分">
        <MyIntegral />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PersonalInfo from './personalInfo'
import UpdatePassword from './updatePassword'
import MyIntegral from './myIntegral'
export default {
  components: { PersonalInfo, UpdatePassword, MyIntegral },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
