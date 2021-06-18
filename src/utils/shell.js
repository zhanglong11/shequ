export default function (name, alive = true) {
  return {
    name,
    template: alive
      ? `<keep-alive><router-view class="${name}-main"></router-view></keep-alive>`
      : `<router-view  class="${name}-main"></router-view>`
  }
}
