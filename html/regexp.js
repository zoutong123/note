```
/**
 * 手机号验证
 */
var isPhone = function(phone) {
    return /^((17[0-9])|(14[0-9])|(13[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/.test(phone);
};
/**
 * 邮箱验证
 */
var isEmail = function(email) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
};
/**
 * 匹配正整数
 */
var isInt = function(num) {
    return /^[1-9]\d*$/.test(num);
}
/**
 * 匹配金额
 */
var isMoney = function(text) {
    return /^[0-9]+(.[0-9]{1,2})?$/.test(text) && (text != 0);
}
/**
 * 密码验证,6~16位数字字母
 */
var isPwd = function(pwd) {
    return /^[0-9A-Za-z]{6,16}$/.test(pwd);
}
/**
 * 验证码验证,6位数字
 */
var isCaptcha = function(captcha) {
    return /^[0-9]{4}$/.test(captcha);
}
//验证身份证号
var isIdCard = function(text) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text);
}
//验证银行卡号
var isBankCard = function(text) {
    return /^(\d{16}|\d{19})$/.test(text);
}
//验证小时分钟
var isHourMinuse = function(text) {
    return /^(([0-1]\d)|(2[0-4])):[0-5]\d$/.test(text);
}
```
