import xss from 'xss'
export const highlight = (fuseSearchResult, highlightClassName = 'highlight') => {
  const set = (obj, path, value) => {
    const pathValue = path.split('.')
    let i

    for (i = 0; i < pathValue.length - 1; i++) {
      obj = obj[pathValue[i]]
    }

    obj[pathValue[i]] = value
  }

  const generateHighlightedText = (inputText, regions) => {
    let content = ''
    let nextUnHighlightedRegionStartingIndex = 0

    regions.forEach(region => {
      const lastRegionNextIndex = region[1] + 1

      content += [
        inputText.substring(nextUnHighlightedRegionStartingIndex, region[0]),
        `<span class="${highlightClassName}">`,
        inputText.substring(region[0], lastRegionNextIndex),
        '</span>'
      ].join('')

      nextUnHighlightedRegionStartingIndex = lastRegionNextIndex
    })

    content += inputText.substring(nextUnHighlightedRegionStartingIndex)
    return xss(content, {
      whiteList: {
        span: ['class']
      }
    })
  }

  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem = { ...item }

      matches.forEach(match => {
        set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices))
      })

      return highlightedItem
    })
}
