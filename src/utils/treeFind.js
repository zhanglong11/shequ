export default function (treeData, fn) {
  let result = null
  c(treeData, null)
  function c(list, parent) {
    for (const item of list) {
      if (result) return false
      if (fn(item)) {
        if (parent) item.parent = parent
        result = item
      }
      if (item.children) {
        c(item.children, item)
      }
    }
  }
  return result
}
