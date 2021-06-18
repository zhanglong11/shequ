<template>
  <div class="container-margin">
    <el-card>
      <el-tabs v-model="tabIndex" @tab-click="clickTab">
        <el-tab-pane label="登录日志" name="first"><LoginLog /></el-tab-pane>
        <el-tab-pane lazy label="操作日志" name="second"><HandleLog v-if="tabIndex === 'second'" /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import LoginLog from './components/LoginLog'
import HandleLog from './components/HandleLog'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'Log',
  components: {
    LoginLog,
    HandleLog
  },
  data() {
    // 这里存放数据
    return {
      tabIndex: 'first'
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    clickTab(e) {}
  }
}
</script>
