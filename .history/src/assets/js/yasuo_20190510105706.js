// 压缩图片
export function compress (img) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  // let initSize = img.src.length
  let width = img.width
  let height = img.height
  canvas.width = width
  canvas.height = height
  // 铺底色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, width, height)

  // 进行最小压缩
  let ndata = canvas.toDataURL('image/jpeg', 0.1)
  return ndata
}

// base64转blob
export function convertBase64UrlToBlob (urlData) {
  var bytes = atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
  var ab = new ArrayBuffer(bytes.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/png' })
}