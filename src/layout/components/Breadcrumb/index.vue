<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <h1>{{ title }}</h1>
    <!-- <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group> -->
  </el-breadcrumb>
</template>

<script>
import defaultSettings from '@/settings'
import { compile } from 'path-to-regexp'
export default {
  data() {
    return {
      levelList: null,
      title: defaultSettings.title
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      return compile(path)(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 60px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.1rem;
  }
}
</style>
