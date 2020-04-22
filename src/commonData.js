
/**
 * 关于一些常用类型判断的相关方法
 * @namespace commonData
 */
var hasOwnProp = Object.prototype.hasOwnProperty;
/**
 * 
 * 判断undefined
 * @memberof commonData
 * @param {any} tmp 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bUndefined (tmp) {
    return typeof tmp === 'undefined';
}
/**
 * 
 *  判断判断null
 * @memberof commonData
 * @param {any} tmp 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bNull (tmp) {
    return  tmp === null;
}
/**
 * 判断判断NaN
 * @memberof commonData
* @param {any} tmp 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bNaN (tmp) {
    return tmp !== tmp;
}
/**
* 判断数据类型为数值型number
* @memberof commonData
* @param {any} val 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bNumber(val){
    return typeof val === 'number' && isFinite(val);
}
/**
* 判断数据类型为布尔型（boolean）
* @memberof commonData
* @param {any} val 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bBooleanType(val) {
    return typeof val ==='boolean';
}
/**
* 判断数据类型为字符串(String)
* @memberof commonData
* @param {any} val 传入任意值
 * @returns {Boolean} 返回为布尔值
*/
function bStringType(val) {
    return typeof val === 'string';
}

/**
* 判断是对象
* @memberof commonData
* @param {any} obj 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bPlainObject (obj) {
    return !!obj
    && typeof obj === 'object'
    && obj.toString() === '[object Object]'
    && obj.constructor === Object;
}
/**
* 判断是否是空对象
* @memberof commonData
* @param {any} obj 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bEmptyObject (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
/**
* 判断arr是否是Array
* @memberof commonData
*  @param {any} arr 传入任意值
*  @returns {Boolean} 返回为布尔值
*/
function bArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
/**
* 判断obj是否是类数组
* @memberof commonData
* @param {any} obj 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bArrayLike (obj) {
    if (obj &&                                // obj b not null, undefined, etc.
        typeof obj === 'object' &&            // obj b an object
        isFinite(obj.length) &&               // obj.length b a finite number
        obj.length >= 0 &&                    // obj.length b non-negative
        obj.length===Math.floor(obj.length) &&  // obj.length b an integer
        obj.length < 4294967296)              // obj.length < 2^32
        return true;                        // Then obj b array-like
    else
        return false;    
}
/**
* 判断fn是否是Function
* @memberof commonData
*  @param {any} fn 传入任意值
*  @returns {Boolean} 返回为布尔值
*/
function bFunction (fn) {
    return '[object Function]' === Object.prototype.toString.call(fn);
}

/**
 * 
 * 判断是否是Window
 * @memberof commonData
 * @param {any} obj 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bWindow (obj) {
    return obj != null && obj == obj.window;
}
/**
 * 
 * 判断是否是文档类型
 * @memberof commonData
 * @param {any} obj 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bDocument (obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
}

/**
 * 
 * 获取元素节点名称
 * @memberof commonData
 * @param {any} elem 传入任意值
 * @param {any} name 传入任意值
 * @returns {String} 节点名称
 */
function getNodeName (elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
}

/**
 * 
 * 遍利节点
 * @memberof commonData
 * @param {Object} obj 对象
 * @param {Function} fn 函数
 * @param {String} context 内容文本
 * @returns {String} 所有节点
 */
function getEach (obj, fn, context) {
    for (var key in obj) {
        if (hasOwnProp.call(obj, key)) {
            //inx,element
            fn.call(context || this, key, obj[key]);
        }
    }
}

/**
 * 
 * 清除字符串空格
 * @memberof commonData
 * @param {String} text 传入值为字符串
 * @returns {String} 无空格的字符串
 */
function getTrim (text) {
    var reg = /(^\s*)|(\s*$)/g;
    return text == null ?
        '' :
        ( text + '' ).replace(reg, '');
}

/**
 * 指定时间内唤起APP
 * @memberof commonOther
 * @param {String} schema 传入值为字符串类型
 * @param {Number} timeOut 传入值为数字类型
 * @returns {Object} Promise 对象，通过 .then/.catch 对唤起成功或失败的状态进行下一步操作。
 */
function callApp( schema, timeOut = 2000 ){
    let p = new Promise((resolve, reject)=>{
      location.href = schema || '';
      let timer = setTimeout(()=>{
        reject();
      },timeOut)
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          clearTimeout(timer);
          resolve();
        }
      })
    })
    return p
}

export {bUndefined, bNull, bNaN, bNumber, bBooleanType, bStringType, bPlainObject, bEmptyObject, bArray, bArrayLike, bFunction, bWindow, bDocument, getNodeName, getEach, getTrim, callApp};