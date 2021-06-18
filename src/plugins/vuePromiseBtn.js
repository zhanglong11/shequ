import Vue from 'vue'
import VuePromiseBtn from 'vue-promise-btn'
Vue.use(VuePromiseBtn, {
  btnLoadingClass: 'is-loading',
  loader: `<i class="el-icon-loading"></i>`,
  autoHideSpinnerWrapper: true
})
