if(wh.ok) {
  const tl = {}
  tl.baseUrl = location.origin
  tl.callbacks = {}
  tl.list = {}
  tl.load = (url, as) => {
    tl.list[as] = document.createElement('img')
    tl.list[as].src = new URL(url, tl.baseUrl).href
    tl.list[as].onload = () => {
      wf.log('Load ' + tl.list[as].src + ' as ' + as)
      tl.callbacks[as] = tl.callbacks[as] || []
      for(let i = tl.callbacks[as].length - 1; i >= 0; i--) {
        tl.callbacks[as][i]()
      }
    }
  }
  tl.apply = (name, cb) => {
    if(name in tl.list) return tl.list[name]
    tl.callbacks[name] = tl.callbacks[name] || []
    tl.callbacks[name].push(cb)
  }
  wh.sprites = tl
}
