// import html2canvas from 'html2canvas'
//
// savecanvas () {
//   let canvas = document.querySelector('.canvas')
//   let that = this
//   html2canvas(canvas, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
//     let type = 'png'
//     let imgData = canvas.toDataURL(type)
//     // 照片格式处理
//     let _fixType = function (type) {
//       type = type.toLowerCase().replace(/jpg/i, 'jpeg')
//       let r = type.match(/png|jpeg|bmp|gif/)[0]
//       return 'image/' + r
//     }
//     imgData = imgData.replace(_fixType(type), 'image/octet-stream')
//     let filename = '保存的图片' + '.' + type
//     that.saveFile(imgData, filename)
//   })
// },

// saveFile (data, filename) {
//   let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
//   save_link.href = data
//   save_link.download = filename

//   let event = document.createEvent('MouseEvents')
//   event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
//   save_link.dispatchEvent(event)
// },

// 图片转换格式的方法 直接使用就好  不需要知道为什么
// dataURLToBlob (dataurl) {
//   let arr = dataurl.split(',')
//   let mime = arr[0].match(/:(.*?)/)[1]
//   let bstr = atob(arr[1])
//   let n = bstr.length
//   let u8arr = new Uint8Array(n)
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n)
//   }
//   return new Blob([u8arr], { type: mime })
// },
// /*
//   保存图片
//   1 id名 2 名称
// */
// saveImage (divText, imgText) {
//   let canvasID = this.$refs[divText]
//   let that = this
//   let a = document.createElement('a')
//   html2canvas(canvasID).then(canvas => {
//     let dom = document.body.appendChild(canvas)
//     dom.style.display = 'none'
//     a.style.display = 'none'
//     document.body.removeChild(dom)
//     let blob = that.dataURLToBlob(dom.toDataURL('image/png'))
//     a.setAttribute('href', URL.createObjectURL(blob))
//     // 这块是保存图片操作 可以设置保存的图片的信息
//     a.setAttribute('download', imgText + '.png')
//     document.body.appendChild(a)
//     a.click()
//     URL.revokeObjectURL(blob)
//     document.body.removeChild(a)
//   })
// },
// savecanvas () {
//   let canvas = document.querySelector('.canvas')
//   let that = this
//   html2canvas(canvas, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
//     let type = 'png'
//     let imgData = canvas.toDataURL(type)
//     // 照片格式处理
//     let _fixType = function (type) {
//       type = type.toLowerCase().replace(/jpg/i, 'jpeg')
//       let r = type.match(/png|jpeg|bmp|gif/)[0]
//       return 'image/' + r
//     }
//     imgData = imgData.replace(_fixType(type), 'image/octet-stream')
//     let filename = '保存的图片' + '.' + type
//     that.saveFile(imgData, filename)
//   })
// }