<template>
  <div class="top-nav-wrapper">
    <div id="tags-view-container" class="tags-view-container">
      <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
        <router-link
          v-for="tag in visitedViews"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="tags-view-item"
          @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <span
            v-if="!isAffix(tag) && visitedViews.length > 1"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </router-link>
      </scroll-pane>
      <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
        <li @click="refreshSelectedTag(selectedTag)">刷新</li>
        <li v-if="!isAffix(selectedTag) && visitedViews.length > 1" @click="closeSelectedTag(selectedTag)">关闭</li>
        <li v-if="visitedViews.length > 1" @click="closeOthersTags">关闭其他</li>
        <li v-if="visitedViews.length > 1" @click="closeAllTags(selectedTag)">关闭所有</li>
      </ul>
    </div>
    <div class="close-label">
      <el-dropdown @command="closeLabel">
        <span class="close-label-text">关闭标签</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="visitedViews.length === 1" command="current">关闭当前标签</el-dropdown-item>
          <el-dropdown-item :disabled="visitedViews.length === 1" command="other">关闭其它标签</el-dropdown-item>
          <el-dropdown-item :disabled="visitedViews.length === 1" command="all">关闭所有标签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import { routes } from '@/router'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      // todo 这里现在没有加路由权限验证
      routes
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        if (this.$route.path === fullPath) {
          this.$router.replace({
            path: '/refresh',
            query: {
              t: Date.now() + ''
            }
          })
        } else {
          this.$nextTick(() => {
            this.$router.replace({
              path: fullPath
            })
          })
        }
      })
    },
    closeSelectedTag(view) {
      console.log(1111, view)
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      if (this.selectedTag.fullPath !== this.$route.path) {
        this.$router.push(this.selectedTag)
      }
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY - 45
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    closeLabel(e) {
      // console.log(e)
      this.selectedTag = this.visitedViews.filter(item => item.fullPath === this.$route.path)[0]
      if (e === 'current') {
        this.closeSelectedTag(this.selectedTag)
      } else if (e === 'other') {
        this.closeOthersTags()
      } else if (e === 'all') {
        this.closeAllTags(this.selectedTag)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-nav-wrapper {
  display: flex;
  justify-content: space-between;
  background: #f0f2f5;
  .close-label {
    width: 100px;
    padding: 15px 0;
    .close-label-text {
      display: inline-block;
      color: #dd3322;
      font-weight: bold;
      border: solid 1px #dd3322;
      background: #fff;
      padding: 0 16px;
      font-size: 12px;
      cursor: pointer;
      height: 26px;
      line-height: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }
}
.tags-view-container {
  width: calc(100vw - 210px - 130px);
  background: #f0f2f5;
  padding: 15px 0;
  margin: 0px 15px;
  .tags-view-wrapper {
    .tags-view-item {
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 24px;
      border: 1px solid #d8dce5;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      color: #495060;
      background: #fff;
      padding: 0 4px 0 8px;
      font-size: 12px;
      /*margin-left: 10px;*/
      margin-right: 10px;
      display: inline-flex;
      align-items: center;
      transition: all 0.3s;

      ::v-deep .el-icon-close {
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        &:before {
          display: block;
        }
        &:hover {
          transform: rotate(360deg) scale(1.3);
        }
      }
      &:first-of-type {
        /*margin-left: 15px;*/
      }
      &:last-of-type {
        /*margin-right: 15px;*/
        margin-right: 0px;
      }
      &.active {
        color: #dd3322;
        font-weight: bold;
        border-color: #dd3322;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
