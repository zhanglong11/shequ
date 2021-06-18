import { MessageBox, Message } from 'element-ui'

/**
 *
 * @param list 集合、也可以是单条记录
 * @param {Object} [options]
 * @param {String} [options.name]
 * @param {String} [options.action]
 * @returns {Promise}
 */
export default (list, options) => {
  options = _.assign({ name: 'name', action: '删除' }, options)
  if (_.isObject(list)) list = [list]
  const { name, action } = options
  if (!list.length) {
    Message.info('您当前没有选中')
    return Promise.reject(new Error('您当前没有选中'))
  }

  const nameList = list
    .filter(r => r[name] || r.realName || r.title || r.label)
    .map(r => r[name] || r.realName || r.title || r.label)
    .map(text => `<span style='color:red;padding:4px;'>${text}</span>`)

  const msg =
    nameList.length > 3
      ? `<p>确定${action}${nameList}等${nameList.length}项吗？</>`
      : nameList.length
      ? `<p>确定${action}${nameList}吗？</>`
      : `确定${action}吗`

  return MessageBox.confirm(msg, '提示', { dangerouslyUseHTMLString: true, type: 'warning' })
}
