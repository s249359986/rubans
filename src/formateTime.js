
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
function getYMD (str, slice = '-', err = '') {
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
function getSeparator (stamp, slice = '-') {
    var time = new Date(stamp);
    var month = time.getMonth() + 1;
    month = month > 9 ? month : ('0' + month);
    var day = time.getDate();
    day = day > 9 ? day : ('0' + day);
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
function getTMin (date, slice = ':', err = '暂无') {
    if (!date) return err;
    date = new Date(date);
    var hour = date.getHours();
    var min = date.getMinutes();
    return `${hour > 9 ? hour : '0' + hour}${slice}${min > 9 ? min : '0' + min}`;
}
/**
 * 
 *  获取时间差值
 * @memberof formateTime
 * @param {String} d1 时间值
 * @returns {string} 时间差值
 */
function getDur (d1) {
    var dateBegin = new Date(d1.replace(/-/g, '/'));//将-转化为/，使用new Date,如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateEnd = new Date();
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    var leave1=dateDiff%(24*3600*1000);    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000));//计算出小时数
    //计算相差分钟数
    var leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
    //计算相差秒数
    var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000);
    console.log(' 相差 '+dayDiff+'天 '+hours+'小时 '+minutes+' 分钟'+seconds+' 秒');
    console.log(dateDiff+'时间差的毫秒数',dayDiff+'计算出相差天数',leave1+'计算天数后剩余的毫秒数'
        ,hours+'计算出小时数',minutes+'计算相差分钟数',seconds+'计算相差秒数');
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
function getRemoveSec (str, slice = '-', err = '暂无') {
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
function getStampMore () {
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
function bLeapYear(year){
    if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){
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
    var year = date.getFullYear();//获取年份
    var mouth = date.getMonth() + 1;//获取当前月份
    var days;//定义当月的天数；
    if (mouth == 2) {//当月份为二月时，根据闰年还是非闰年判断天数
        days = year % 4 == 0 ? 29 : 28;
    }
    else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        days = 31; //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    }
    else {
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
function bToday(str){
    var d = new Date(str.replace(/-/g,'/'));
    var todaysDate = new Date();
    if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
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
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+'-'+m+'-'+d;
}

/* 
* 取当前月份开始, 前n个月的数组
* @memberof formateTime
* @param {number}  n 一共展示几个月 ,eg: 2
* @param {String}  month 从哪个月开始,默认当前时间 eg: '2019-02-05'
* @returns {Array} 返回值为数组
*/
function getPreviousMonth(n, currmonth) {
    let currentDate;
    if (currmonth) {
        currentDate = new Date(currmonth);
    } else {
        currentDate = new Date();
    }
    let nextYear = currentDate.getFullYear();
    let nextMonth = currentDate.getMonth() + 1;
    let result = [];
    let times = n;

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
export { getYMD, getSeparator, getTMin, getDur, getRemoveSec, getStampMore, bLeapYear, getDays, bToday, getDateStr, getPreviousMonth};