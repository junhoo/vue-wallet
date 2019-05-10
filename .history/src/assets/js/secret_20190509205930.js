import CryptoJS from '@/assets/js/aes.js'

// 加密密钥16位
const key = '37962202945339491692654053117998'
// 加密向量16位
const iv = '0798736492443041'
export function encrypt (data) {
  const _key = CryptoJS.enc.Utf8.parse(key)
  console.log(_key)
  const _iv = CryptoJS.enc.Utf8.parse(iv)
  console.log(_iv)
  const _obj = {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }
  const encrypted = CryptoJS.AES.encrypt(data, _key, _obj)
  return encrypted.toString()
}

export function decrypt (encrypted) {
  const _key = CryptoJS.enc.Utf8.parse(key)
  const _iv = CryptoJS.enc.Utf8.parse(iv)
  const _obj = {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }
  const decrypted = CryptoJS.AES.decrypt(encrypted, _key, _obj)
  return decrypted.toString(CryptoJS.enc.Utf8)
}
