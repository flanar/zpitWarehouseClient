import jwtDecode from 'jwt-decode'

import { isValid, toDate, isBefore, differenceInMilliseconds, fromUnixTime } from "date-fns"

export const getAccessToken = () => localStorage.getItem("accessToken")
export const getRefreshToken = () => localStorage.getItem("refreshToken")

export const setLocalStorageTokens = tokens => {
    if (tokens.accessToken)
        localStorage.setItem("accessToken", tokens.accessToken)
    if (tokens.refreshToken)
        localStorage.setItem("refreshToken", tokens.refreshToken)
}

export const removeLocalStorageTokens = () =>  {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

export const decodeJWT = token => token && jwtDecode(token)
  
export const getTimeDiff =  exp => exp ? differenceInMilliseconds(fromUnixTime(Number(exp)), new Date()) : false
  
export const checkTokenValidity = token => {
    try {
        if(!token) return false
        const expToken = decodeJWT(token).exp
        const expMoment = toDate(expToken * 1000)
        if(isValid(expMoment)) return isBefore(new Date(), expMoment)
        return true
    } catch (e) {
        return false
    }
}
  
export const isValidAccessToken = () => checkTokenValidity(getAccessToken())
  
//   export async function initializationUserAuthentication() {
//     if (checkTokenValidity(getAccessToken())) {
//       const data = {
//         accessToken: getAccessToken(),
//         refreshToken: getRefreshToken()
//       };
//       return await store.dispatch("auth/authorize", data);
//     } else {
//       if (checkTokenValidity(getRefreshToken())) {
//         return await store
//           .dispatch("auth/refreshToken")
//           .then(() => {
//             return Promise.resolve();
//           })
//           .catch(e => {
//             return Promise.reject(e);
//           });
//       }
//     }
//   }