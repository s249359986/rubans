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
    return /^1[3456789]\d{9}$/.test(val);
}

/**
 * 
 * 座机校验
 * @memberof validator
 * @param {Number} val 传入Number类型
 * @returns {Boolean} 返回为布尔值
 */
function bTel(val) {
    return /^0\d{2,3}-?\d{7,8}$/.test(val);
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
    let re = /^(([^<>()\[\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    return /^([1-9]|[1-9]\d|1\d\d|2[0-5][0-5]).((\d|[1-9]\d|1\d\d|2[0-5][0-5]).){2}(\d|[1-9]\d|1\d\d|2[0-5][0-5])$/.test(
        val
    );
}


/**
 * 
 * 身份证验证 30个字符
 * @memberof validator
 * @param {any} str 30个字符的身份证验证
 * @returns {Boolean} 返回为布尔值
 */
function bIdCard (str) {
    let reg = new RegExp('^\\d{17}(\\d|x)$', 'i');
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
function bRegisterUserName (str) {  
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!patrn.exec(str)){
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
function bName (str, min, max) {
    let reg = new RegExp('^[\\u4e00-\\u9fa5]{' + min + ',' + max + '}$', 'g');
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
function bCarNum (str) {
    // let reg = new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z[A-Za-z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1}$', 'gi')
    let reg = /(^[\u4e00-\u9fa5]{1}[A-Za-z_0-9]{6}$)|(^[\u4e00-\u9fa5]{1}[0-9]{7}$)/;
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
function bPwd (str) {
    var patrn=/^(\w){6,20}$/;    
    if (!patrn.exec(str)) return false;
    return true;  
}
export { bPhone, bIP, bMail, bTel, bIdCard, bRegisterUserName, bName, bCarNum, bPwd};
