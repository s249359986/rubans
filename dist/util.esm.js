/*!
 * util.js v1.0.0
 * by ruban
 */
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
    var reg = new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key) + '\\s*\\=\\s*([^;]*).*$)|^.*$');
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
    return new RegExp('(?:^|;\\s*)' + encodeURIComponent(key) + '\\s*\\=').test(document.cookie);
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

    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
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
function setCookie(sKey, sValue) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$vEnd = _ref.vEnd,
        vEnd = _ref$vEnd === undefined ? '' : _ref$vEnd,
        _ref$sPath = _ref.sPath,
        sPath = _ref$sPath === undefined ? '' : _ref$sPath,
        _ref$sDomain = _ref.sDomain,
        sDomain = _ref$sDomain === undefined ? '' : _ref$sDomain,
        _ref$bSecure = _ref.bSecure,
        bSecure = _ref$bSecure === undefined ? '' : _ref$bSecure;

    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
        return false;
    }
    var sExpires = '';
    if (vEnd) {
        switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; expires=' + new Date(vEnd * 1e3 + Date.now()).toUTCString();
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
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
    return true;
}

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
function getStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';

    if (key === '') {
        return null;
    }
    var store = _getStorage(type),
        _val = store.getItem(key),
        res = void 0;

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
function setStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'local';

    if (key === '') {
        return;
    }
    var store = _getStorage(type),
        _val = void 0;

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
function removeStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';

    if (key === '') {
        return;
    }
    var store = _getStorage(type);
    store.removeItem(key);
}
/**
 * 清除指定的本地存储类型中的所有记录
 * 
 * @memberof Storage
 * @param {string} [type='local'] 
 * @returns {undefined} 无返回值 
 */
function clearStorage() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'local';

    var store = _getStorage(type);
    store.clear();
}

function _getStorage() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'local';

    if (type !== 'local') {
        return sessionStorage;
    }
    return localStorage;
}

/**
 * 关于一些常用检验类
 * @namespace validator
 */
/**
 * 
 * 手机号码校验
 * @memberof validator
 * @param {Number} val 传入Number类型
 * @returns {Boolean} 返回为布尔值
 */
function bPhone(val) {
    return (/^1[3456789]\d{9}$/.test(val)
    );
}

/**
 * 
 * 座机校验
 * @memberof validator
 * @param {Number} val 传入Number类型
 * @returns {Boolean} 返回为布尔值
 */
function bTel(val) {
    return (/^0\d{2,3}-?\d{7,8}$/.test(val)
    );
}
/**
 * 
 * 邮箱校验
 * @memberof validator
 * @param {any} val 可以传入任何类型
 * @returns {Boolean} 返回为布尔值
 */
// pattern 来源于https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function bMail(val) {
    var re = /^(([^<>()\[\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val.toLowerCase());
}

/**
 * 
 * Func: 验证IP,规则：（1~255）.（0~255）.（0~255）.（0~255）
 * @memberof validator
 * @param {any} val 规则：（1~255）.（0~255）.（0~255）.（0~255）为IP
 * @returns {Boolean} 返回为布尔值
 */
function bIP(val) {
    return (/^([1-9]|[1-9]\d|1\d\d|2[0-5][0-5]).((\d|[1-9]\d|1\d\d|2[0-5][0-5]).){2}(\d|[1-9]\d|1\d\d|2[0-5][0-5])$/.test(val)
    );
}

/**
 * 
 * 身份证验证 30个字符
 * @memberof validator
 * @param {any} str 30个字符的身份证验证
 * @returns {Boolean} 返回为布尔值
 */
function bIdCard(str) {
    var reg = new RegExp('^\\d{17}(\\d|x)$', 'i');
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 
 * 校验登录名,只能输入5-20个以字母开头、可带数字、“_”、“.”的字串 
 * @memberof validator
 * @param {String} str 校验登录名字
 * @returns {Boolean} 返回为布尔值
 */
function bRegisterUserName(str) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!patrn.exec(str)) {
        return false;
    }
    return true;
}

/**
 * 
 * 验证姓名，只支持20个汉字
 * @memberof validator
 * @param {String} str 传入字符串
 * @param {Number} min 类型为Number的最小值
 * @param {Number} max 类型为Number的最大值
 * @returns {Boolean} 返回为布尔值
 */
function bName(str, min, max) {
    var reg = new RegExp('^[\\u4e00-\\u9fa5]{' + min + ',' + max + '}$', 'g');
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * 验证车牌号
 * @memberof validator
 * @param {String} str 传入值应为String类型
 * @returns {Boolean} 返回为布尔值
 */
function bCarNum(str) {
    // let reg = new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z[A-Za-z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1}$', 'gi')
    var reg = /(^[\u4e00-\u9fa5]{1}[A-Za-z_0-9]{6}$)|(^[\u4e00-\u9fa5]{1}[0-9]{7}$)/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 
 * 验证密码 6-14位字符
 * @memberof validator
 * @param {String} str 验证码为6-14位字符的校验
 * @returns {Boolean} 返回为布尔值
 */
function bPwd(str) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(str)) return false;
    return true;
}

/**
 * 关于设备 相关信息获取方法
 * @namespace Platform
 */

/**
 * 获取当前ua信息
 * @memberof Platform
 * @returns 当前ua信息
 */
function _getUA() {
    return navigator.userAgent.toLowerCase();
}
/**
 * 判断当前系统是否是IOS系统
 * @memberof Platform
 * @returns {Boolean} ios 系统返回true，否则返回 false
 */
function biOS() {
    return (/ipad|iphone|ipod/.test(_getUA())
    );
}
/**
 * 判断当前系统是否是Android系统
 * @memberof Platform
 * @returns {Boolean} Android 系统返回true，否则返回 false
 */
function bAndroid() {
    return (/android/.test(_getUA())
    );
}

/**
 * 判断当前设备是否是移动端，包含android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini
 * @memberof Platform
 * @returns {Boolean} 是上述移动端 返回true，否则返回 false
 */
function bMobile() {
    return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(_getUA())
    );
}

/**
 * 判断当前设备是否iphoneX、iphoneXS
 * @memberof Platform
 * @returns {Boolean} 是iphoneX 返回true，否则返回 false
 */
function bIphoneX() {
    return (/iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812
    );
}

/**
 * 判断当前设备是否iphoneXSMax
 * @memberof Platform
 * @returns {Boolean} 是iphoneX 返回true，否则返回 false
 */
function bIphoneXSMax() {
    return (/iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896
    );
}

/**
 * 判断当前设备是否iPhoneXR
 * @memberof Platform
 * @returns {Boolean} 是iphoneX 返回true，否则返回 false
 */
function bIPhoneXR() {
    return (/iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896
    );
}

/**
 * 判断当前设备是否是PC
 * @memberof Platform
 * @returns {Boolean} 是PC则返回 true， 否则返回false
 */
function bPC() {
    return !bMobile();
}
/**
 * 判断当前是否是 微信环境
 * @memberof Platform
 * @returns {Boolean} 是微信环境返回 true 否则返回false
 */
function bWechat() {
    return (/micromessenger/.test(_getUA())
    );
}

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
    var url = window.location.href;
    var startIndex = url.indexOf('?');
    var params = {};
    if (startIndex > -1) {
        var str = url.substring(startIndex + 1);
        var arr = str.split('&');
        for (var i = 0; i < arr.length; i++) {
            var kv = arr[i].split('=');
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
function getUrlAllParam() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (args.length === 0) return undefined;
    var url = decodeURIComponent(window.location.href);
    // 兼容用户端与司机端参数key不一致的问题
    var reg = args.length === 1 ? new RegExp('[&?]' + args[0] + '=([^&%#]+)') : new RegExp('[&?](?:' + args.join('|') + ')=([^&%#]+)');

    var matchArray = url.match(reg);

    return matchArray === null ? undefined : matchArray[1];
}

/**
 * 获取指定的url或者当前url中， 所有查询字符串值的集合
 * 
 * @memberof URL
 * @param {any} str 指定的url字符串
 * @returns  {Array} url中所有查询字符串值的集合
 */

function getParams(str) {
    var queryString = str || window.location.search || '';
    var keyValPairs = [];
    var params = {};
    queryString = queryString.replace(/.*?\?/, '');

    if (queryString.length) {
        keyValPairs = queryString.split('&');
        for (var pairNum in keyValPairs) {
            var key = keyValPairs[pairNum].split('=')[0];
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
function getUaParams(key) {
    var ua = navigator.userAgent;
    //  ua += 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0_2 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A421 58app cdvsupport 58appbundleid(com.58SuYun.SuYunDriver) 58appversion(3.2) realVersion/3.2 version/5.2.0 imei/7FF330CD-051C-47C5-9D6F-6F54E274B174 mobileVersion/11.0.2 mobileBoard/iPhone manufacturer/Apple channel/AppStore appType/2 appName/58SuYunDriverIOS'
    var uaArr = ua.split(' ');
    for (var i = 0; i < uaArr.length; i++) {
        if (uaArr[i].indexOf('/') > -1) {
            var uaItem = uaArr[i].split('/');
            if (uaItem[0] === key) {
                return uaItem[1];
            }
        }
    }
}

/** 
 * 关于时间以及时间戳的转化形式
 * @namespace formateTime
*/
/**
 * 
 * 将字符串时间转为时间戳 yyyy-mm-dd
 * @memberof formateTime
 * @param {string} str 第一个参数为字符串类型
 * @param {string} [slice='-'] 固定已-分隔符分割
 * @param {string} [err=''] 返回err
 * @returns {string} 时间转为时间戳 yyyy-mm-dd
 */
function getYMD(str) {
    var slice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
    var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var arr = str.split(slice);
    if (arr.length !== 3) return err;
    return +new Date(Number(arr[0]), Number(arr[1] - 1), Number(arr[2]));
}
/**
 * 
 * 将时间戳（Date对象）转化为字符串时间，第二个参数为分隔符，默认为-
 * @memberof formateTime
 * @param {string} stamp 时间戳形式
 * @param {string} [slice='-'] 
 * @returns {string} 将时间戳（Date对象）转化为字符串时间，第二个参数为分隔符，默认为-
 */
function getSeparator(stamp) {
    var slice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    var time = new Date(stamp);
    var month = time.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    var day = time.getDate();
    day = day > 9 ? day : '0' + day;
    return time.getFullYear() + slice + month + slice + day;
}
/**
 * 
 * 获取时间xx:xx
 * @memberof formateTime
 * @param {string} date 日期
 * @param {string} [slice=':'] 以:分隔符分割
 * @param {string} [err='暂无'] 返回err信息
 * @returns {string} 时间xx:xx
 */
function getTMin(date) {
    var slice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';
    var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '暂无';

    if (!date) return err;
    date = new Date(date);
    var hour = date.getHours();
    var min = date.getMinutes();
    return '' + (hour > 9 ? hour : '0' + hour) + slice + (min > 9 ? min : '0' + min);
}
/**
 * 
 *  获取时间差值
 * @memberof formateTime
 * @param {String} d1 时间值
 * @returns {string} 时间差值
 */
function getDur(d1) {
    var dateBegin = new Date(d1.replace(/-/g, '/')); //将-转化为/，使用new Date,如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateEnd = new Date();
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    console.log(' 相差 ' + dayDiff + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒');
    console.log(dateDiff + '时间差的毫秒数', dayDiff + '计算出相差天数', leave1 + '计算天数后剩余的毫秒数', hours + '计算出小时数', minutes + '计算相差分钟数', seconds + '计算相差秒数');
}

/**
 * 
 * 将字符串时间转为时间戳 yyyy-mm-dd hh:mm
 * @memberof formateTime
 * @param {string} str 字符串
 * @param {string} [slice='-'] 固定分割符-分割
 * @param {string} [err='暂无'] 返回err
 * @returns {string} 时间戳 yyyy-mm-dd hh:mm
 */
function getRemoveSec(str) {
    var slice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
    var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '暂无';

    var arr = str.split(slice);
    var dateArr = arr[0].split('-');
    var timeArr = arr[1].split(':');
    if (dateArr.length !== 3) return err;
    return +new Date(Number(dateArr[0]), Number(dateArr[1] - 1), Number(dateArr[2]), Number(timeArr[0]), Number(timeArr[1]));
}
/**
 * 将字符串时间转为时间戳 yyyy-mm-dd hh:mm：ss
 * @memberof formateTime
 * @returns {string} 将字符串时间转为时间戳 yyyy-mm-dd hh:mm：ss
 */
function getStampMore() {
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1 + '').padStart(2, '0'); // es6字符串补全功能padStart，2位0补全y
    var day = (date.getDate() + '').padStart(2, '0');
    var hour = (date.getHours() + '').padStart(2, '0');
    var minute = (date.getMinutes() + '').padStart(2, '0');
    var second = (date.getSeconds() + '').padStart(2, '0');
    var result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    // result = encodeURI(result)
    return result;
}
/**
 * 
 * 判断是否是闰年
 * @memberof formateTime
 * @param {any} year 传入年份 eg：2018
 * @returns {Boolean} 返回布尔类型的true或者false
 */
function bLeapYear(year) {
    if (year % 4 == 0 && year % 100 != 0 || year % 100 == 0 && year % 400 == 0) {
        return true;
    }
    return false;
}

/**
 * 
 * 获取当月份天数
 * @memberof formateTime
 * @returns {Number} 获取当月份天数
 */
function getDays() {
    //构造当前日期对象
    var date = new Date();
    var year = date.getFullYear(); //获取年份
    var mouth = date.getMonth() + 1; //获取当前月份
    var days; //定义当月的天数；
    if (mouth == 2) {
        //当月份为二月时，根据闰年还是非闰年判断天数
        days = year % 4 == 0 ? 29 : 28;
    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        days = 31; //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    } else {
        days = 30; //其他月份，天数为：30.
    }
    return days;
}
/**
 * 
 * 判断是否今天
 * @memberof formateTime
 * @param {any} str 出入要判断的值
 * @returns {Boolean} 返回为布尔值
 */
function bToday(str) {
    var d = new Date(str.replace(/-/g, '/'));
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 
 * 获取某天的日期
 * 前天:GetDateStr(-2)
 * 昨天：GetDateStr(-1)
 * 今天：GetDateStr(0)
 * 明天：GetDateStr(1)
 * 后天：GetDateStr(2)
 * 大后天：GetDateStr(3)
 * @memberof formateTime
 * @param {Number} AddDayCount Number类型的数字，eg: 前天 -2
 * @returns {Number} 某天的日期
 */
function getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + '-' + m + '-' + d;
}

/* 
* 取当前月份开始, 前n个月的数组
* @memberof formateTime
* @param {number}  n 一共展示几个月 ,eg: 2
* @param {String}  month 从哪个月开始,默认当前时间 eg: '2019-02-05'
* @returns {Array} 返回值为数组
*/
function getPreviousMonth(n, currmonth) {
    var currentDate = void 0;
    if (currmonth) {
        currentDate = new Date(currmonth);
    } else {
        currentDate = new Date();
    }
    var nextYear = currentDate.getFullYear();
    var nextMonth = currentDate.getMonth() + 1;
    var result = [];
    var times = n;

    while (times > 0) {
        result.push(nextYear + '-' + (nextMonth < 10 ? '0' + nextMonth : nextMonth));
        if (nextMonth === 1) {
            nextMonth = 12;
            nextYear--;
        } else {
            nextMonth--;
        }
        times--;
    }
    return result;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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
function bUndefined(tmp) {
    return typeof tmp === 'undefined';
}
/**
 * 
 *  判断判断null
 * @memberof commonData
 * @param {any} tmp 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bNull(tmp) {
    return tmp === null;
}
/**
 * 判断判断NaN
 * @memberof commonData
* @param {any} tmp 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bNaN(tmp) {
    return tmp !== tmp;
}
/**
* 判断数据类型为数值型number
* @memberof commonData
* @param {any} val 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bNumber(val) {
    return typeof val === 'number' && isFinite(val);
}
/**
* 判断数据类型为布尔型（boolean）
* @memberof commonData
* @param {any} val 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bBooleanType(val) {
    return typeof val === 'boolean';
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
function bPlainObject(obj) {
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.toString() === '[object Object]' && obj.constructor === Object;
}
/**
* 判断是否是空对象
* @memberof commonData
* @param {any} obj 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bEmptyObject(obj) {
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
function bArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
/**
* 判断obj是否是类数组
* @memberof commonData
* @param {any} obj 传入任意值
* @returns {Boolean} 返回为布尔值
*/
function bArrayLike(obj) {
    if (obj && // obj b not null, undefined, etc.
    (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && // obj b an object
    isFinite(obj.length) && // obj.length b a finite number
    obj.length >= 0 && // obj.length b non-negative
    obj.length === Math.floor(obj.length) && // obj.length b an integer
    obj.length < 4294967296) // obj.length < 2^32
        return true; // Then obj b array-like
    else return false;
}
/**
* 判断fn是否是Function
* @memberof commonData
*  @param {any} fn 传入任意值
*  @returns {Boolean} 返回为布尔值
*/
function bFunction(fn) {
    return '[object Function]' === Object.prototype.toString.call(fn);
}

/**
 * 
 * 判断是否是Window
 * @memberof commonData
 * @param {any} obj 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bWindow(obj) {
    return obj != null && obj == obj.window;
}
/**
 * 
 * 判断是否是文档类型
 * @memberof commonData
 * @param {any} obj 传入任意值
 * @returns {Boolean} 返回为布尔值
 */
function bDocument(obj) {
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
function getNodeName(elem, name) {
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
function getEach(obj, fn, context) {
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
function getTrim(text) {
    var reg = /(^\s*)|(\s*$)/g;
    return text == null ? '' : (text + '').replace(reg, '');
}

/**
 * 指定时间内唤起APP
 * @memberof commonOther
 * @param {String} schema 传入值为字符串类型
 * @param {Number} timeOut 传入值为数字类型
 * @returns {Object} Promise 对象，通过 .then/.catch 对唤起成功或失败的状态进行下一步操作。
 */
function callApp(schema) {
    var timeOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

    var p = new Promise(function (resolve, reject) {
        location.href = schema || '';
        var timer = setTimeout(function () {
            reject();
        }, timeOut);
        window.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                clearTimeout(timer);
                resolve();
            }
        });
    });
    return p;
}

/** 
 * 一些常用的其他方法
 * @namespace commonOther
*/
/**
 * 获得真实字符长度 中文两个字节，英文一个字节
 * @memberof commonOther
 * @param {Number|String} str 传入值为数字类型或者字符串类型
 * @returns {Number} 字符串长度
 */
function getRealStringLenth(str) {
    var s = String(str);
    return s.length + (s.match(/[^\x00-\xff]/g) || '').length; //加上匹配到的全角字符长度
}

/**
 * 生成一个小于或等于 n（n>=0） 的随机正整数
 * @memberof commonOther
 * @param {Number} n 传入值为数字类型或者字符串类型
 * @returns {Number} 随机整数
 */
function getRandom(n) {
    if (n < 0) {
        return;
    }
    var today = new Date();
    var seed = today.getTime();
    function rnd() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280.0;
    }
    return Math.ceil(rnd() * n);
}

/**
 * @description   格式化金额
 * @memberof commonOther
 * @export
 * @param {any} money  12345.673
 * @param {any} n  保留小数位数
 * @returns {Number} 12,345.67
 */
function formatMoney(money, n) {
    n = n > 0 && n <= 20 ? n : 2;
    money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    var l = money.split('.')[0].split('').reverse(),
        r = money.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
}

export { getCookie, hasCookie, removeCookie, setCookie, getStorage, setStorage, removeStorage, clearStorage, bPhone, bIP, bMail, bTel, bIdCard, bRegisterUserName, bName, bCarNum, bPwd, biOS, bAndroid, bMobile, bIphoneX, bIphoneXSMax, bIPhoneXR, bPC, bWechat, getUrlParam, getParams, getUaParams, getUrlAllParam, getYMD, getSeparator, getTMin, getDur, getRemoveSec, getStampMore, bLeapYear, getDays, bToday, getDateStr, getPreviousMonth, bUndefined, bNull, bNaN, bNumber, bBooleanType, bStringType, bPlainObject, bEmptyObject, bArray, bArrayLike, bFunction, bWindow, bDocument, getNodeName, getEach, getTrim, callApp, getRealStringLenth, getRandom, formatMoney };
//# sourceMappingURL=util.esm.js.map
