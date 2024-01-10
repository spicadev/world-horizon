if(wh.ok) {
  wh.scene = {
    pause: false,
    lastFrameTime: 0,
    delta: 0
  }
  wh.world = new wh.World()
  function loop(timeNow) {
    requestAnimationFrame(loop)

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

  requestAnimationFrame(loop)
}
