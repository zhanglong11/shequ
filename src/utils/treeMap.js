import _ from 'lodash'

/**
 *
 * @param {Array} treeList 树形列表
 * @param {Function} fn  处理函数
 * @param {String} [childrenKey='children'] 子级key
 * @returns {Array}
 */
export default function (treeList = [], fn, childrenKey = 'children') {
  if (!_.isFunction(fn)) {
    throw new Error('fn 必须是函数')
  }
  function c(list, parent) {
    return list.map((child, index) => ({
      ...(_.isArray(child[childrenKey]) ? { [childrenKey]: c(child[childrenKey], parent) } : {}),
      ...fn(child, parent, index)
    }))
  }
  return c(_.cloneDeep(treeList))
}
