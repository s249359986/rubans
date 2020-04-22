/**
 * 关于本地存储的使用方法
 * @namespace Storage
 */

/**
 * 获取本地存储中 指定的key值对应的value值， 默认是从localStorage中取
 * 
 * @memberof Storage
 * @param {string} [key=''] 指定的key值
 * @param {string} [type='local'] 指定的本地存储类型 
 * @returns {string|Object} 返回对应的key值的value 
 */
function getStorage(key = '', type = 'local') {
    if (key === '') {
        return null;
    }
    let store = _getStorage(type),
        _val = store.getItem(key),
        res;

    try {
        res = JSON.parse(_val);
    } catch (error) {
        res = _val;
    }
    return res;
}
/**
 * 在指定类型的本地存储中添加新的记录
 * 
 * @memberof Storage
 * @param {string} [key=''] 新添加的记录的key值
 * @param {string} [val=''] 新添加的记录的value值
 * @param {string} [type='local'] 指定的本地存储类型
 * @returns {undefined} 无返回值
 */
function setStorage(key = '', val = '', type = 'local') {
    if (key === '') {
        return;
    }
    let store = _getStorage(type),
        _val;

    if (typeof val === 'string' || typeof val === 'number') {
        _val = val;
    } else {
        _val = JSON.stringify(val);
    }
    store.setItem(key, _val);
}
/**
 * 移除指定的本地存储类型中的 指定的key记录
 * 
 * @memberof Storage
 * @param {string} [key=''] 要移除的记录的key值
 * @param {string} [type='local'] 要移除的本地存储类型
 * @returns {undefined} 无返回值
 */
function removeStorage(key = '', type = 'local') {
    if (key === '') {
        return;
    }
    let store = _getStorage(type);
    store.removeItem(key);
}
/**
 * 清除指定的本地存储类型中的所有记录
 * 
 * @memberof Storage
 * @param {string} [type='local'] 
 * @returns {undefined} 无返回值 
 */
function clearStorage(type = 'local') {
    let store = _getStorage(type);
    store.clear();
}

function _getStorage(type = 'local') {
    if (type !== 'local') {
        return sessionStorage;
    }
    return localStorage;
}

export { getStorage, setStorage, removeStorage, clearStorage };
