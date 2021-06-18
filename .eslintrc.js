module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  globals: {
    _: true,
    dayjs: true,
    AMap: true,
    WebGISApp: true
  },
  extends: ['standard', 'plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 0,
    'vue/custom-event-name-casing': 0,
    'vue/no-mutating-props': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
