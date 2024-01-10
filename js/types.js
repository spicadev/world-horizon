if(wh.ok) {
  wh.World = class World {
    constructor() {
      const entities = []
      Object.defineProperty(this, 'entities', {
        get: function() {
          return entities
        },
        set: function(v) { return v },
        enumerable: false
      })

      this.width = 900
      this.height = 100
    }
    
    set(x, y, entity) {
      if(!(entity instanceof wh.Entity)) {
        wh.error('Failed to set (' + x + ', ' + y + ') to', entity)
        return false
      }
      this.entities[this.getEntityIndex(x, y)] = entity
      return true
    }

    remove(x, y) {
      return this.set(x, y, null)
    }

    indexOf(x, y) {
      return y * this.width + x
    }
  }

  wh.Entity = class Entity {
    constructor() {
      this.x = 0
      this.y = 0
    }

    setX(x) {
      this.x = x
      return this
    }
    setY(y) {
      this.y = y
      return this
    }
  }
  wh.Sprite = class Sprite extends Entity {
    constructor(name) {
      super()
      this.sprite = null
      this.spriteLoaded = false
    }
    setSprite(name) {
      wh.sprites.apply(name, (sprite) => {
        this.sprite = sprite
        this.spriteLoaded = true
      })
    }
  }
  wh.Player = class Player extends Sprite {
    constructor() {
      super('player')
    }
    jump() {
      // TODO: Implement this
    }
  }
  wh.ENEMY_TEXTURES_LIST = [
    'orc', 'goblin', 'demonia', 'demon'
  ]
  wh.Enemy = class Enemy extends Sprite {
    constructor() {
      super(wh.ENEMY_TEXTURES_LIST[Math.floor(Math.random() * wh.ENEMY_TEXTURES_LIST.length)])
      // TODO: Genetate A.I.
    }
  }
  
}
