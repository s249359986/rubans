

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
    return /ipad|iphone|ipod/.test(_getUA());
}
/**
 * 判断当前系统是否是Android系统
 * @memberof Platform
 * @returns {Boolean} Android 系统返回true，否则返回 false
 */
function bAndroid() {
    return /android/.test(_getUA());
}

/**
 * 判断当前设备是否是移动端，包含android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini
 * @memberof Platform
 * @returns {Boolean} 是上述移动端 返回true，否则返回 false
 */
function bMobile() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
        _getUA()
    );
}

/**
 * 判断当前设备是否iphoneX、iphoneXS
 * @memberof Platform
 * @returns {Boolean} 是iphoneX 返回true，否则返回 false
 */
function bIphoneX() {
    return /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
}

/**
 * 判断当前设备是否iphoneXSMax
 * @memberof Platform
 * @returns {Boolean} 是iphoneX 返回true，否则返回 false
 */
function bIphoneXSMax() {
    return /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
}

/**
 * 判断当前设备是否iPhoneXR
 * @memberof Platform
 * @returns {Boolean} 是iphoneX 返回true，否则返回 false
 */
function bIPhoneXR() {
    return /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
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
    return /micromessenger/.test(_getUA());
}


export {
    biOS,
    bAndroid,
    bMobile,
    bIphoneX,
    bIphoneXSMax,
    bIPhoneXR,
    bPC,
    bWechat    
};