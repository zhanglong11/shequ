import Vue from 'vue'
import VueIconfont from 'vue-iconfont'

Vue.use(VueIconfont, [
  // 定义 v-svg-icon 组件以使用 SVG 图标
  {
    tag: 'v-svg-icon',
    prefix: 'v-icon',
    type: 'svg',
    component: {
      beforeRender(h, ctx) {
        ctx.data.staticClass += ' v-svg-icon '
      }
    }
  }
])
