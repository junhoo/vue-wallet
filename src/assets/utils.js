import crypto from 'crypto'

// const KEY = '123456'
// const IV = 'no0nsJ6u6g6wBEjrQQIbng=='

// function getAesString (data, key, iv) { // 加密
//   var keyHash = CryptoJS.MD5(key).toString()
//   var _key = CryptoJS.enc.Utf8.parse(keyHash)
//   var _iv = CryptoJS.enc.Utf8.parse(iv)
//   var encrypted = CryptoJS.AES.encrypt(data, _key,
//     {
//       iv: _iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     })
//   return encrypted.toString() // 返回的是base64格式的密文
// }

// function getDAesString (encrypted, key, iv) { // 解密
//   var keyHash = CryptoJS.MD5(key).toString()
//   var _key = CryptoJS.enc.Utf8.parse(keyHash)
//   var _iv = CryptoJS.enc.Utf8.parse(iv)
//   var decrypted = CryptoJS.AES.decrypt(encrypted, _key,
//     {
//       iv: _iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     })
//   return decrypted.toString(CryptoJS.enc.Utf8)
// }

// export function getEn (data) { // 加密
//   var encrypted = getAesString(data, KEY, IV)
//   return encrypted
// }

// export function getDe (data) { // 解密
//   return getDAesString(data, KEY, IV)
// }

// 解密
// export function decrypt (arg, val) {
//   var crypted = new Buffer(arg, 'base64').toString('binary')
//   var decipher = crypto.createDecipheriv('aes-128-cbc', val, '6518768505165481')
//   var decoded = decipher.update(crypted, 'binary', 'utf8')
//   decoded += decipher.final('utf8')
//   var data = JSON.parse(decoded)
//   return data
// }


// // 加密
// export function encrypt(arg, val) {
//   var data = JSON.stringify(arg)
//   var cipher = crypto.createCipheriv('aes-128-cbc', val, '6518768505165481')
//   var crypted = cipher.update(data, 'utf8', 'binary')
//   crypted += cipher.final('binary')
//   crypted = new Buffer(crypted, 'binary').toString('base64')
//   return crypted
// }

