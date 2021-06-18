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
import anyRule from '@/lib/anyRule.js'
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
  data() {
    return {
      age: '',
      sex: '保密',
      search: {}
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (!queryString) {
        const empty = []
        cb(empty)
      } else {
        if (anyRule.intNumber.test(queryString)) {
          this.search = { mobile: queryString }
        } else {
          console.log('name')
          this.search = { name: queryString }
        }
      }
      getCommonPersonLibraryList(this.search).then(res => {
        res.data.records.forEach(e => {
          if (e.birthday) {
            const birthdays = new Date(e.birthday.replace(/-/g, '/'))
            const d = new Date()
            this.age =
              d.getFullYear() -
              birthdays.getFullYear() -
              (d.getMonth() < birthdays.getMonth() ||
              (d.getMonth() === birthdays.getMonth() && d.getDate() < birthdays.getDate())
                ? 1
                : 0)
          }
          console.log(e)
          if (e.sex === 1) {
            this.sex = ' 男 '
          } else {
            this.sex = ' 女 '
          }
          e.mobile = e.mobile || e.phone
          e.label = e[this.field] + e.mobile
          e.value = e[this.field] + this.sex + e.mobile + ' ' + this.age + '岁'
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
