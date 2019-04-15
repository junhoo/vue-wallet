const master = {
  user: '',
  order: '',
  wallet: ''
}

const dev = {
  user: 'http://user.service.168mi.cn',
  order: 'http://order.service.168mi.cn',
  wallet: 'http://wallet.service.168mi.cn',
  socket: 'http://push.service.168mi.cn/api/websocket/getUrl'
}

module.exports = { master, dev }