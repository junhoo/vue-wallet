const master = {
  user: 'http://user.service.19zf.in',
  order: 'http://order.service.19zf.in',
  wallet: 'http://wallet.service.19zf.in',
  socket: 'http://push.service.19zf.in/api/websocket/getUrl'
}

const dev = {
  user: 'http://user.service.168mi.cn',
  order: 'http://order.service.168mi.cn',
  wallet: 'http://wallet.service.168mi.cn',
  socket: 'http://push.service.168mi.cn/api/websocket/getUrl'
  // 19线上
  // user: 'http://user.service.19zf.in',
  // order: 'http://order.service.19zf.in',
  // wallet: 'http://wallet.service.19zf.in',
  // socket: 'http://push.service.19zf.in/api/websocket/getUrl'
  // qm线上
  // user: 'http://user.service.qmjtpl.com',
  // order: 'http://order.service.qmjtpl.com',
  // wallet: 'http://wallet.service.qmjtpl.com',
  // socket: 'http://push.service.qmjtpl.com/api/websocket/getUrl'
}

module.exports = { master, dev }