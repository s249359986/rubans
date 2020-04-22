/**
 * 关于url 和 app信息 相关信息获取方法
 * @namespace URL
 */

/**
 * 获取传入的url或当前url中，指定查询字符串对应的值
 * 
 * @memberof URL
 * @param {string} key 指定的url，非必传，不传默认按照当前url
 * @returns {string} 指定查询字符串对应的value值
 */
function getUrlParam(key) {
    let url = window.location.href;
    let startIndex = url.indexOf('?');
    let params = {};
    if (startIndex > -1) {
        let str = url.substring(startIndex + 1);
        let arr = str.split('&');
        for (let i = 0; i < arr.length; i++) {
            let kv = arr[i].split('=');
            if (kv[1].indexOf('#') > -1) {
                kv[1] = kv[1].substring(0, kv[1].indexOf('#'));
            }
            params[kv[0]] = kv[1];
        }
    }
    return params[key];
}

/**
 * 兼容了url前后都有?，获取传入的url或当前url中，指定查询字符串对应的值
 * 
 * @memberof URL
 * @param {string} args 参数
 * @returns {string} 指定查询字符串对应的value值
 */
function getUrlAllParam(...args) {
    if (args.length === 0) return undefined
    const url = decodeURIComponent(window.location.href)
    // 兼容用户端与司机端参数key不一致的问题
    const reg = args.length === 1
      ? new RegExp(`[&?]${args[0]}=([^&%#]+)`)
      : new RegExp(`[&?](?:${args.join('|')})=([^&%#]+)`)
    
    const matchArray = url.match(reg)
    
    return matchArray === null ? undefined : matchArray[1]
}

/**
 * 获取指定的url或者当前url中， 所有查询字符串值的集合
 * 
 * @memberof URL
 * @param {any} str 指定的url字符串
 * @returns  {Array} url中所有查询字符串值的集合
 */

function getParams(str) {
    let queryString = str || window.location.search || '';
    let keyValPairs = [];
    let params = {};
    queryString = queryString.replace(/.*?\?/, '');

    if (queryString.length) {
        keyValPairs = queryString.split('&');
        for (let pairNum in keyValPairs) {
            let key = keyValPairs[pairNum].split('=')[0];
            if (!key.length) continue;
            if (typeof params[key] === 'undefined') params[key] = [];
            params[key].push(keyValPairs[pairNum].split('=')[1]);
        }
    }
    return params;
}
/**
 * 获取公共参数（app信息）
 * 
 * @memberof URL
 * @param {string} key 需要获取的查询字符串键名
 * @returns {string} app信息中key对应的value值
 */
function getUaParams (key) {
    let ua = navigator.userAgent;
    //  ua += 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_2 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A421 58app cdvsupport 58appbundleid(com.58SuYun.SuYunDriver) 58appversion(3.2) realVersion/3.2 version/5.2.0 imei/7FF330CD-051C-47C5-9D6F-6F54E274B174 mobileVersion/11.0.2 mobileBoard/iPhone manufacturer/Apple channel/AppStore appType/2 appName/58SuYunDriverIOS'
    let uaArr = ua.split(' ');
    for (let i = 0; i < uaArr.length; i++) {
        if (uaArr[i].indexOf('/') > -1) {
            let uaItem = uaArr[i].split('/');
            if (uaItem[0] === key) {
                return uaItem[1];
            }
        }
    }
}
export { getUrlParam, getParams, getUaParams, getUrlAllParam};

