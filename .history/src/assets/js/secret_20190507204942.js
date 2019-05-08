import CryptoJS from '@/assets/js/aes.js'

export function encrypt (data, key, iv) {encrypt
  var _key = CryptoJS.enc.Utf8.parse(key)
  var _iv = CryptoJS.enc.Utf8.parse(iv)
  var _obj = {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }
  var encrypted = CryptoJS.AES.encrypt(data, _key, _obj)
  return encrypted.toString()
}

export function decrypt (encrypted, key, iv) {
  var _key = CryptoJS.enc.Utf8.parse(key)
  var _iv = CryptoJS.enc.Utf8.parse(iv)
  var _obj = {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }
  var decrypted = CryptoJS.AES.decrypt(encrypted, _key, _obj)
  return decrypted.toString(CryptoJS.enc.Utf8)
}
