import _ from 'lodash'

/**
 *
 * @param {Array} treeList
 * @param {String} [parentKey]
 * @param {String} [key]
 * @returns {Array}
 */
export default function (treeList, parentKey = 'pid', key = 'id') {
  treeList = _.cloneDeep(treeList)
  const result = []
  c(treeList)
  function c(list, parent) {
    _.forEach(list, (item, index) => {
      item[parentKey] = null
      result.push(_.assign(item, { [parentKey]: _.get(parent, key) }))
      if (item.children) c(item.children, item)
    })
  }
  result.forEach(e => _.unset(e, 'children'))
  return result
}
