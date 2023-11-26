function isObject(item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null
}

exports.walkObject = function walkObject(root) {
  function walk(obj) {
    const result = Object.keys(obj).reduce((t, key) => {
      // Value is an array, call walk on each item in the array
      if (Array.isArray(obj[key])) {
        t += obj[key].join(';')
        return t
      }

      if (isObject(obj[key])) {
        t += `'${key}': ${walk(obj[key])},`
        return t
      }

      let val = obj[key]

      if (!Number.isNaN(Number(val))) {
        val = `px(${val})`
      } else if (val.startsWith('#')) {
        val = '0x' + val.slice(1)
      } else {
        val = `'${val}'`
      }

      t += `'${key}': ${val},`
      return t
    }, '')

    return '{' + result + '}'
  }

  return walk(root)
}
