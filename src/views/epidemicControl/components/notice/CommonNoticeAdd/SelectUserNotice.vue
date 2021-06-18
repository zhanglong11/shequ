<template>
  <div>
    <div class="wrapper" :style="{ width: _.isNaN(width) ? width : width + 'px' }" @click="selectVisible = true">
      <el-tag
        v-for="(item, index) of userArr"
        :key="'tag' + index"
        style="margin: 0 5px"
        size="mini"
        closable
        @close="closeTag(index)"
        >{{ item.name }}
      </el-tag>
    </div>
    <SelectTreeTable
      v-if="selectVisible"
      :visible.sync="selectVisible"
      :selected="userArr"
      @submit="handleSubmit"
    ></SelectTreeTable>
  </div>
</template>

<script>
import SelectTreeTable from './SelectTreeTable'
export default {
  name: 'SelectUserNotice',
  components: { SelectTreeTable },
  props: {
    width: {
      type: [Number, String],
      default: 500
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectVisible: false,
      userArr: []
    }
  },
  computed: {},
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value) {
          this.userArr = _.zipWith(this.value.split(','), this.name.split(','), function (id, name) {
            return {
              identityCardNumber: id,
              name: name
            }
          })
        }
      }
    }
  },
  created() {},
  methods: {
    handleSubmit(data) {
      this.userArr = data.map(item => {
        return {
          identityCardNumber: item.identityCardNumber,
          name: item.name
        }
      })
      const valueArr = this.userArr.map(i => i.identityCardNumber) || []
      const nameArr = this.userArr.map(i => i.name) || []
      this.$emit('input', valueArr.join(','))
      this.$emit('update:name', nameArr.join(','))
      this.selectVisible = false
    },
    closeTag(index) {
      this.userArr.splice(index, 1)
      const valueArr = this.userArr.map(i => i.identityCardNumber) || []
      const nameArr = this.userArr.map(i => i.name) || []
      this.$emit('input', valueArr.join(','))
      this.$emit('update:name', nameArr.join(','))
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  border: 1px #c0c4cc solid;
  border-radius: 5px;
  min-height: 30px;
  /deep/.el-tag {
    margin: 5px !important;
  }
}
</style>
