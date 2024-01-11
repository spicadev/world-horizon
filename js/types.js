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
      } else if(entity.world != this) {
        wh.log(entity, 'world is not', this, ' changing!')
        entity.world = this
        return false
      }
      this.entities[this.indexOf(x, y)] = entity
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
      let x = 0, y = 0, world = null
      Object.defineProperties(this, {
        x: {
          get: function() {
            return x
          },
          set: function(v) {
            x = v
            if(world != null) world.set(x, y, this)
            return x
          },
          enumerable: true
        },
        y: {
          get: function() {
            return y
          },
          set: function(v) {
            y = v
            if(world != null) world.set(x, y, this)
            return y
          },
          enumerable: true
        },
        world: {
          get: function() {
            return world
          },
          set: function(v) {
            world = v
            world.set(x, y, this)
            return world
          },
          enumerable: false
        }
      })
    }
  }
  wh.Sprite = class Sprite extends wh.Entity {
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
  wh.Player = class Player extends wh.Sprite {
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
  wh.Enemy = class Enemy extends wh.Sprite {
    constructor() {
      super(wh.ENEMY_TEXTURES_LIST[Math.floor(Math.random() * wh.ENEMY_TEXTURES_LIST.length)])
      // TODO: Genetate A.I.
    }
  }
  
}
