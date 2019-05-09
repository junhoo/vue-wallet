import { CryptoJS } from '@/assets/js/aes.js'

function encodeAesString (data, key, iv) {
  var _key = CryptoJS.enc.Utf8.parse(key)
  var _iv = CryptoJS.enc.Utf8.parse(iv)
  var encrypted = CryptoJS.AES.encrypt(data, _key,
    {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return encrypted.toString()
}

function decodeAesString (encrypted, key, iv) {
  var _key = CryptoJS.enc.Utf8.parse(key)
  var _iv = CryptoJS.enc.Utf8.parse(iv)
  var decrypted = CryptoJS.AES.decrypt(encrypted, _key,
    {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export default {
  encodeAesString,
  decodeAesString
}
