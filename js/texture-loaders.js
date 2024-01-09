if(wh.ok) {
  wh.textures = {}
  wh.textures.baseUrl = location.origin
  wh.textures.callbacks = {}
  wh.textures.list = {}
  wh.textures.load = (url, as) => {
    wh.textures.list[as] = document.createElement('img')
    wh.textures.list[as].src = new URL(url, wh.textures.baseUrl).href
    wh.textures.list[as].onload = () => {
      wh.tetures.callbacks[as] = wh.tetures.callbacks[name] || []
      for(let i = wh.textures.callbacks[as].length - 1; i >= 0; i--) {
        wh.textures.callbacks[as][i]()
        delete wh.textures.callbacks[as][i]
      }
      delete wh.textures.callbacks[as]
    }
  }
  wh.textures.apply = (name, cb) => {
    if(name in wh.textures.list) return wh.textures.list[name]
    wh.textures.callbacks[name] = wh.textures.callbacks[name] || []
    wh.textures.callbacks[name].push(cb)
  }
}
