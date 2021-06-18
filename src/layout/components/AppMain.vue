<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!-- <keep-alive :include="cachedViews">
      <router-view v-if="cachedViews.includes(key)" :key="key" />
    </keep-alive>-->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  width: 100%;
  position: relative;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
