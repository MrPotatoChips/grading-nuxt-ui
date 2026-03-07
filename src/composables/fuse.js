import FUSEJS from 'fuse.js'

const fuseFilter = (search = '', searchableOptions = [], config = {}) => {
  const defaultConfig = {
    keys: [],
    shouldSort: true,
    threshold: 0.1
  }

  const fuse = new FUSEJS(
    searchableOptions,
    Object.assign(defaultConfig, config)
  )

  if (search && String(search).length >= 1) {
    return fuse.search(search).map(
      ({ item }) => item
    )
  }

  return searchableOptions
}

export {
  fuseFilter
}
