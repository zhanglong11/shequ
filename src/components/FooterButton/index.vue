<template>
  <Affix class="affix" :offset-bottom="0">
    <div class="footer-button-component">
      <slot></slot>
    </div>
  </Affix>
</template>

<script>
import { Affix } from 'ant-design-vue'
export default {
  name: 'FooterButton',
  components: { Affix },
  data() {
    return {}
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
.affix {
  width: 100%;
  margin-top: 15px;
  ::v-deep .ant-affix {
    border-top: 1px solid #eee;
  }
}
.footer-button-component {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
}
</style>
