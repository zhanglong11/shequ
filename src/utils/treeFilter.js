import { toTree, toFlat } from '@/utils'

export default function (flatList, fn, key = 'id', sort) {
  const treeData = toTree(flatList)
  const flatData = toFlat(treeData)
  const dict = _.keyBy(flatData, key)
  const allowItemList = flatData.filter(e => fn(e, dict[e.pid]))
  const result = _.chain(allowItemList)
    .map(e => e.ancestorIds)
    .flatten()
    .union()
    .map(id => dict[id])
    .concat(allowItemList)
    .compact()
    .unionBy(key)
    .value()
  return toTree(result, 'pid', sort)
}
