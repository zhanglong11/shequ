<template>
  <div class="wrapper" :style="{ width: _.isNaN(width) ? width : width + 'px' }">
    <el-tag
      v-for="(item, index) of valueArr"
      :key="'tag' + index"
      style="margin: 0 5px"
      size="mini"
      :style="{
        color: tabColor[index % tabColor.length].font,
        backgroundColor: tabColor[index % tabColor.length].background,
        borderColor: tabColor[index % tabColor.length].border
      }"
      hit
      closable
      @close="closeTag(index)"
      >{{ item }}
    </el-tag>
    <el-input v-model="currentInput" placeholder="请输入标签,按回车确认" @keyup.enter.native="keyUp"></el-input>
  </div>
</template>

<script>
export default {
  name: 'InputTag',
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: 500
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentInput: '',
      valueArr: [],
      tabColor: [
        { border: '#91d5ff', background: '#e6f7ff', font: '#1890FF' },
        { border: '#87e8de', background: '#e6fffb', font: '#13C2C2' },
        { border: '#b7eb8f', background: '#f6ffed', font: '#52C41A' },
        { border: '#d3adf7', background: '#f9f0ff', font: '#722ED1' }
      ]
    }
  },
  computed: {},
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value) {
          this.valueArr = this.value.split(',')
        }
      }
    }
  },
  created() {},
  methods: {
    keyUp() {
      if (!this.currentInput) return
      this.valueArr.push(this.currentInput)
      this.$emit('input', this.valueArr.join(','))
      this.currentInput = ''
    },
    closeTag(index) {
      this.valueArr.splice(index, 1)
      this.$emit('input', this.valueArr.join(','))
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
  /deep/ .el-input {
    flex: 1;
    min-width: 150px;
    .el-input__inner {
      padding: 0 5px;
      border: none;
      &:hover {
        border: none;
      }
      &:focus {
        border: none;
      }
    }
  }
}
</style>
