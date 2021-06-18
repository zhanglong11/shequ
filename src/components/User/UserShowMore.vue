<template>
  <span v-if="userList.length > 3">
    <template v-if="!showMore">
      {{ userList.slice(0, 3).join(',') }}
      等
      {{ userList.length }}
      人
    </template>
    <template v-else>
      {{ value }}
    </template>
    <i class="el-icon-d-arrow-right" :class="{ showMore }" @click="showMore = !showMore"></i>
  </span>
  <span v-else>
    {{ value }}
  </span>
</template>

<script>
export default {
  name: 'UserShowMore',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showMore: false
    }
  },
  computed: {
    userList() {
      return this.value.split(',')
    }
  },
  created() {},
  mounted() {},
  methods: {
    refresh() {}
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.el-icon-d-arrow-right {
  color: #ec3f4f;
  font-weight: bold;
  font-size: 18px;
  transform: rotate(90deg);
  position: relative;
  top: 2px;
  transition: transform 0.3s;
  &.showMore {
    transform: rotate(270deg);
  }
}
.showMore {
}
</style>
