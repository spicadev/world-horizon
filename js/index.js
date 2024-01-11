let ok = true
if(typeof Window !== 'function' && !(window instanceof Window)) {
  ok = false
  console.error('Failed to load World Horizon: Context is not window')
}

Object.defineProperty(window, 'wh', {
  value: {},
  configurable: false,
  writable: false,
  enumerable: false
})

wh.ok = ok
if(ok) {
  wh.canvas = document.getElementById('wh-canvas')
  wh.ctx = wh.canvas.getContext('2d')
  wh.isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints
  wh.playerState = {
    move: false, // false | 'left' | 'right'
    jump: false
  }
  let isLooping = false
  function loop() {
    isLooping = true
    let str = 0
    if(wh.keyPressed.a) str--
    if(wh.keyPressed.s) str++
    wh.playerState.move = str === 1 ? 'right' : (str === 0 ? false : 'left')
    if(wh.keyPressed[wh.keyPressed.a || wh.keyPressed.s]) setTimeout(loop, 150)
    else isLooping = false
  }
  if(wh.isTouchScreen) {
    // TODO: Joystick
  } else {
    wh.keyPressed = {}
    window.addEventListener('keydown', (e) => {
      wh.keyPressed[e.key.toLowerCase()] = true
      if(!isLooping) loop()
    }, true)
    window.addEventListener('keyuo', (e) => {
      wh.keyPressed[e.key.toLowerCase()] = false
    }, true)
  }

  wh.DEBUG = true
  wh.log = function(...args) {
    if(wh.DEBUG) console.log(...args)
  }
  wh.error = function(...args) {
    if(wh.DEBUG) console.error(...args)
  }
}
