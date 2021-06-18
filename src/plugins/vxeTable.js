import Vue from 'vue'
import 'vxe-table/lib/style.min.css'
import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import Grid from '@/components/Grid'
import { sexOptions } from '@/lib/otions'
import { getLabel } from '@/main'
VXETable.use(VXETablePluginElement)

Vue.prototype.XEUtils = XEUtils

VXETable.setup({
  table: {
    size: 'small',
    stripe: true,
    align: 'center',
    border: true,
    resizable: true,
    checkboxConfig: {
      trigger: 'cell'
    },
    showHeaderOverflow: false
  }
})
VXETable.formats.mixin({
  ymd({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
  },
  ymdhm({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm')
  },
  ymdhms({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
  },
  mdhm({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'MM-dd HH:mm')
  },
  yy({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'yyyy')
  },
  MM({ cellValue }) {
    return XEUtils.toDateString(cellValue, 'MM')
  },
  sex({ cellValue }) {
    return getLabel(sexOptions, cellValue)
  }
})
Vue.use(VXETable)
Vue.component(Grid.name, Grid)
