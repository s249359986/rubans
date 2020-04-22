/**
 * 关于本地存储cookie 相关信息获取方法
 * @namespace Cookie
 */

/**
 * 根据 name 获取对应的 cookie 值。
 * @memberof Cookie
 * @param {string} key key为想要获取的cookie名字
 * @returns {String} 对应的 cookie 值
 */
function getCookie(key) {
    if (!key) {
        return null;
    }
    let reg = new RegExp(
        '(?:(?:^|.*;)\\s*' +
            encodeURIComponent(key) +
            '\\s*\\=\\s*([^;]*).*$)|^.*$'
    );
    return decodeURIComponent(document.cookie.replace(reg, '$1')) || null;
}
/**
 * 
 * 查询名为 name 的 cookie 是否存在。
 * @memberof Cookie
 * @param {string} 需要查询的cookie 
 * @returns {Boolean} 是否存在名为 name 的 cookie
 */
function hasCookie(key) {
    if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
        return false;
    }
    return new RegExp('(?:^|;\\s*)' + encodeURIComponent(key) + '\\s*\\=').test(
        document.cookie
    );
}
/**
 * 
 * 移除名为 name 的 cookie。
 * @memberof Cookie
 * @param {string} key cookie名
 * @param {string} path 路径
 * @param {string} domain domain值
 * @returns (undefined): 无
 */
function removeCookie(key, path, domain) {
    if (!hasCookie(key)) {
        return false;
    }

    document.cookie =
        encodeURIComponent(key) +
        '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
        (domain ? '; domain=' + domain : '') +
        (path ? '; path=' + path : '');
    return true;
}
/**
 * 
 * 设置 cookie。
 * @memberof Cookie
 * @param {String} sKey 设置cookie名
 * @param {String} sValue 设置cookie值
 * @param {Object} [{ vEnd = '', sPath = '', sDomain = '', bSecure = '' }={}] 传入值为对象
 * @returns Date
 */
function setCookie(
    sKey,
    sValue,
    { vEnd = '', sPath = '', sDomain = '', bSecure = '' } = {}
) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
        return false;
    }
    var sExpires = '';
    if (vEnd) {
        switch (vEnd.constructor) {
        case Number:
            sExpires =
                    vEnd === Infinity
                        ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                        : '; expires=' +
                          new Date(vEnd * 1e3 + Date.now()).toUTCString();
            /*
          Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
          version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
          the end parameter might not work as expected. A possible solution might be to convert the the
          relative time to an absolute time. For instance, replacing the previous line with:
          */
            /*
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
          */
            break;
        case String:
            sExpires = '; expires=' + vEnd;
            break;
        case Date:
            sExpires = '; expires=' + vEnd.toUTCString();
            break;
        }
    }
    document.cookie =
        encodeURIComponent(sKey) +
        '=' +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? '; domain=' + sDomain : '') +
        (sPath ? '; path=' + sPath : '') +
        (bSecure ? '; secure' : '');
    return true;
}
export { getCookie, hasCookie, removeCookie, setCookie };
