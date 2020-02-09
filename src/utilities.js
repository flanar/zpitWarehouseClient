export const isEmptyObject = object => Object.keys(object).length === 0 && object.constructor === Object

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export const isEmail = email => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)

// /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #=+()^?&])[A-Za-z\d$@$!%* #=+()^?&]{3,}$/
export const containLowerUpperNumber = string => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%* #+=()^?&]{3,}$/.test(string)