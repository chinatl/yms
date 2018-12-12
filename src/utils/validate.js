export function validatePhone(value) {
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|196|199|(147))\d{8}$/;
    return reg.test(value)
}
export function validateIdCard(value) {
    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return reg.test(value)
}
export function validateMob(value) {
    // const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/
    // const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
    // const reg = /((d{3,4})|d{3,4}-)?d{7,8}(-d{3})*/
    const reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
    return reg.test(value)
}