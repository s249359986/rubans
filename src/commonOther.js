
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
    let s=String(str);
    return s.length+(s.match(/[^\x00-\xff]/g) ||'').length;//加上匹配到的全角字符长度
}

/**
 * 生成一个小于或等于 n（n>=0） 的随机正整数
 * @memberof commonOther
 * @param {Number} n 传入值为数字类型或者字符串类型
 * @returns {Number} 随机整数
 */
function getRandom(n) {
    if (n<0) {
        return;
    }
    let today = new Date();
    let seed = today.getTime();
    function rnd (){
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0); 
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
    let l = money.split('.')[0].split('').reverse()
        , r = money.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',': '');
    }
    return t.split('').reverse().join('') + '.' + r;
}
export { getRealStringLenth, getRandom, formatMoney };
