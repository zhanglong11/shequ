<template>
  <el-autocomplete
    :value="value"
    v-bind="$attrs"
    :fetch-suggestions="querySearchAsync"
    @input="handleInput"
    @select="handleUserSelect"
  ></el-autocomplete>
</template>

<script>
import { getCommonPersonLibraryList } from '@/api/user'
export default {
  name: 'AutoCompleteUser',
  props: {
    value: {
      type: String
    },
    field: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (!queryString) {
        const empty = []
        cb(empty)
      } else
        getCommonPersonLibraryList({ [this.field]: queryString }).then(res => {
          res.data.records.forEach(e => {
            e.mobile = e.mobile || e.phone
            e.label = e[this.field]
            e.value = e[this.field]
            e.realName = e.realName || e.name
          })
          cb(res.data.records)
        })
    },
    handleUserSelect(item) {
      this.$emit('change', _.omit(item, 'id'))
    },
    handleInput(value) {
      this.$emit('input', value.replace(/ \d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/, ''))
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-autocomplete {
  width: 100%;
}
</style>
