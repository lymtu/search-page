/**
 * @description: 根据传入的 Key ,返回数据
 * @param {string} key - 键
 * @param {boolean} isConvertType - 是否将数据由 `string` 转化为 `JSON`，默认为 `true`
 */
function getLocalStorage(key, isConvertType = true) {
    if (!key) {
        return false
    }
    const data = window.localStorage.getItem(key)
    if (isConvertType) {
        return JSON.parse(data)
    }
    return data
}

/**
 * @description: 根据传入的 `key` 储存 `value`
 * @param {string} key - 键
 * @param {*} value - 值
 * @param {boolean} isConvertType - 是否将 `value` 由 `JSON` 转化为 `string` , 默认为 `true`
 */
function setLocalStorage(key, value, isConvertType = true) {
    if (!value) {
        return false
    }
    if (isConvertType) {
        window.localStorage.setItem(key, JSON.stringify(value))
        return false
    }
    window.localStorage.setItem(key, value)
}