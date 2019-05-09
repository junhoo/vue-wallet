const master = {
  user: 'http://user.service.19zf.in/',
  order: 'http://order.service.19zf.in/',
  wallet: 'http://wallet.service.19zf.in/',
  socket: 'http://push.service.168mi.cn/api/websocket/getUrl'
}

const dev = {
  // user: 'http://user.service.19zf.in/',
  // order: 'http://order.service.19zf.in/',
  // wallet: 'http://wallet.service.19zf.in/'
  user: 'http://user.service.168mi.cn',
  order: 'http://order.service.168mi.cn',
  wallet: 'http://wallet.service.168mi.cn',
  socket: 'http://push.service.168mi.cn/api/websocket/getUrl'
}

module.exports = { master, dev }