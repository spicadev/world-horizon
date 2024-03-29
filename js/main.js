if(wh.ok) {
  wh.scene = {
    pause: false,
    lastFrameTime: 0,
    delta: 0,
    background: '#000000',
    start: function start() {
      return requestAnimationFrame(loop)
    }
  }
  wh.world = new World()
  wh.sprites.load('https://previews.123rf.com/images/aoc61/aoc612304/aoc61230400336/202104881-landscape-inside-a-glass-sphere-the-generative.jpg', 'test')
  function loop(timeNow) {
    if(!wh.scene.pause) requestAnimationFrame(loop)

    wh.scene.delta = (timeNow - wh.scene.lastFrameTime) / 1000
    wh.scene.lastFrameTime = timeNow

    wh.ctx.clearRect(0, 0, wh.canvas.width, wh.canvas.height)
    for(let i = wh.world.entities.length - 1; i >= 0; i--) {
      const entity = wh.world.entities[i]
      if(entity.spriteLoaded) {
        wh.drawImage(entity.x, entity.y, entity.sprite)
      }
    }
  }
  wh.world.set(10, 0, new Sprite('test'))

  wh.scene.start()
}
