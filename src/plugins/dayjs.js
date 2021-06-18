import Vue from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
Vue.prototype.dayjs = dayjs
window.dayjs = dayjs
