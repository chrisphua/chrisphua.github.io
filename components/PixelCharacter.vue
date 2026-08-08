<template>
  <div class="relative w-full" style="height: 220px;">
    <canvas ref="pixelCanvas" class="block w-full h-full"></canvas>
    <div class="absolute top-2 right-2 text-terminal-green text-xs font-mono">
      SCORE: {{ score }}
    </div>
    <div v-if="gameOver" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div class="text-center">
        <div class="text-terminal-amber text-xl font-bold mb-2">GAME OVER</div>
        <div class="text-terminal-text text-sm mb-4">Score: {{ score }}</div>
        <button @click="restartGame" class="px-4 py-2 bg-terminal-surface border border-terminal-border text-terminal-green hover:border-terminal-green transition text-sm">
          $ restart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      frame: 0,
      animationId: null,
      score: 0,
      gameOver: false,
      gameSpeed: 4,
      baseGameSpeed: 4,
      speedIncrement: 0.2,
      maxSpeed: 12,
      jumpVelocity: -13,
      gravity: 0.7,
      groundY: 180,
      character: {
        x: 80,
        y: 0,
        width: 48,
        height: 48,
        vy: 0,
        isGrounded: false,
        isJumping: false
      },
      obstacles: [],
      obstacleTimer: 0,
      obstacleInterval: 90,
      minObstacleInterval: 40,
      keys: { jump: false }
    }
  },
  mounted() {
    this.character.y = this.groundY - this.character.height
    this.startAnimation()
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationId)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    handleKeyDown(e) {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        if (this.gameOver) {
          this.restartGame()
        } else {
          this.keys.jump = true
        }
      }
    },
    handleKeyUp(e) {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.keys.jump = false
      }
    },
    restartGame() {
      this.score = 0
      this.gameOver = false
      this.gameSpeed = this.baseGameSpeed
      this.obstacleInterval = 90
      this.obstacles = []
      this.obstacleTimer = 0
      this.character.y = this.groundY - this.character.height
      this.character.vy = 0
      this.character.isGrounded = true
      this.character.isJumping = false
    },
    startAnimation() {
      const canvas = this.$refs.pixelCanvas
      const ctx = canvas.getContext('2d')
      canvas.width = 640
      canvas.height = 220

      const loop = () => {
        if (!this.gameOver) {
          this.update()
        }
        this.draw(ctx)
        this.animationId = requestAnimationFrame(loop)
      }
      this.animationId = requestAnimationFrame(loop)
    },
    update() {
      this.frame++

      if (this.keys.jump && this.character.isGrounded) {
        this.character.vy = this.jumpVelocity
        this.character.isGrounded = false
        this.character.isJumping = true
      }

      this.character.vy += this.gravity
      this.character.y += this.character.vy

      if (this.character.y + this.character.height >= this.groundY) {
        this.character.y = this.groundY - this.character.height
        this.character.vy = 0
        this.character.isGrounded = true
        this.character.isJumping = false
      }

      this.obstacleTimer++
      if (this.obstacleTimer >= this.obstacleInterval) {
        this.obstacleTimer = 0
        this.obstacles.push({
          x: 640,
          y: this.groundY - 40,
          width: 24,
          height: 40,
          passed: false
        })
      }

      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obs = this.obstacles[i]
        obs.x -= this.gameSpeed

        if (!obs.passed && obs.x + obs.width < this.character.x) {
          obs.passed = true
          this.score++
          if (this.obstacleInterval > this.minObstacleInterval) {
            this.obstacleInterval -= 1
          }
          if (this.gameSpeed < this.maxSpeed) {
            this.gameSpeed += this.speedIncrement
          }
        }

        if (obs.x + obs.width < 0) {
          this.obstacles.splice(i, 1)
        }
      }

      for (const obs of this.obstacles) {
        if (
          this.character.x < obs.x + obs.width &&
          this.character.x + this.character.width > obs.x &&
          this.character.y < obs.y + obs.height &&
          this.character.y + this.character.height > obs.y
        ) {
          this.gameOver = true
        }
      }
    },
    draw(ctx) {
      const canvas = this.$refs.pixelCanvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0C0C0C'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#1A1A1A'
      ctx.fillRect(0, this.groundY, canvas.width, 4)
      ctx.fillStyle = '#2A2A2A'
      ctx.fillRect(0, this.groundY + 4, canvas.width, canvas.height - this.groundY - 4)

      for (const obs of this.obstacles) {
        ctx.fillStyle = '#F87171'
        ctx.fillRect(Math.floor(obs.x), Math.floor(obs.y), obs.width, obs.height)
        ctx.fillStyle = '#FCA5A5'
        ctx.fillRect(Math.floor(obs.x) + 4, Math.floor(obs.y) + 4, obs.width - 8, obs.height - 8)
      }

      const bobY = this.character.isGrounded && this.character.vy === 0 ? Math.sin(this.frame * 0.3) * 1 : 0
      const walkOffset = this.character.isGrounded && this.character.vy === 0 ? Math.floor(this.frame / 8) % 2 : 0

      const pixels = [
        { x: 24, y: 4 + bobY, color: '#1C1917' },
        { x: 28, y: 4 + bobY, color: '#1C1917' },
        { x: 32, y: 4 + bobY, color: '#1C1917' },
        { x: 36, y: 4 + bobY, color: '#1C1917' },
        { x: 20, y: 8 + bobY, color: '#1C1917' },
        { x: 24, y: 8 + bobY, color: '#1C1917' },
        { x: 28, y: 8 + bobY, color: '#1C1917' },
        { x: 32, y: 8 + bobY, color: '#1C1917' },
        { x: 36, y: 8 + bobY, color: '#1C1917' },
        { x: 40, y: 8 + bobY, color: '#1C1917' },
        { x: 20, y: 12 + bobY, color: '#FBBF24' },
        { x: 24, y: 12 + bobY, color: '#FBBF24' },
        { x: 28, y: 12 + bobY, color: '#FBBF24' },
        { x: 32, y: 12 + bobY, color: '#FBBF24' },
        { x: 36, y: 12 + bobY, color: '#FBBF24' },
        { x: 40, y: 12 + bobY, color: '#FBBF24' },
        { x: 16, y: 16 + bobY, color: '#1C1917' },
        { x: 20, y: 16 + bobY, color: '#FBBF24' },
        { x: 24, y: 16 + bobY, color: '#FBBF24' },
        { x: 28, y: 16 + bobY, color: '#FBBF24' },
        { x: 32, y: 16 + bobY, color: '#FBBF24' },
        { x: 36, y: 16 + bobY, color: '#FBBF24' },
        { x: 40, y: 16 + bobY, color: '#FBBF24' },
        { x: 44, y: 16 + bobY, color: '#FBBF24' },
        { x: 16, y: 20 + bobY, color: '#FBBF24' },
        { x: 20, y: 20 + bobY, color: '#FBBF24' },
        { x: 24, y: 20 + bobY, color: '#0C0C0C' },
        { x: 28, y: 20 + bobY, color: '#0C0C0C' },
        { x: 32, y: 20 + bobY, color: '#0C0C0C' },
        { x: 36, y: 20 + bobY, color: '#0C0C0C' },
        { x: 40, y: 20 + bobY, color: '#FBBF24' },
        { x: 44, y: 20 + bobY, color: '#FBBF24' },
        { x: 16, y: 24 + bobY, color: '#FBBF24' },
        { x: 20, y: 24 + bobY, color: '#FBBF24' },
        { x: 24, y: 24 + bobY, color: '#FBBF24' },
        { x: 28, y: 24 + bobY, color: '#FBBF24' },
        { x: 32, y: 24 + bobY, color: '#FBBF24' },
        { x: 36, y: 24 + bobY, color: '#FBBF24' },
        { x: 40, y: 24 + bobY, color: '#FBBF24' },
        { x: 44, y: 24 + bobY, color: '#FBBF24' },
        { x: 20, y: 28 + bobY, color: '#FBBF24' },
        { x: 24, y: 28 + bobY, color: '#FBBF24' },
        { x: 28, y: 28 + bobY, color: '#FBBF24' },
        { x: 32, y: 28 + bobY, color: '#FBBF24' },
        { x: 36, y: 28 + bobY, color: '#FBBF24' },
        { x: 40, y: 28 + bobY, color: '#FBBF24' },
        { x: 24, y: 32 + bobY, color: '#4ADE80' },
        { x: 28, y: 32 + bobY, color: '#4ADE80' },
        { x: 32, y: 32 + bobY, color: '#4ADE80' },
        { x: 36, y: 32 + bobY, color: '#4ADE80' },
        { x: 24, y: 36 + bobY, color: '#4ADE80' },
        { x: 28, y: 36 + bobY, color: '#4ADE80' },
        { x: 32, y: 36 + bobY, color: '#4ADE80' },
        { x: 36, y: 36 + bobY, color: '#4ADE80' },
        { x: 24, y: 40 + bobY, color: '#4ADE80' },
        { x: 28, y: 40 + bobY, color: '#4ADE80' },
        { x: 32, y: 40 + bobY, color: '#4ADE80' },
        { x: 36, y: 40 + bobY, color: '#4ADE80' },
        { x: 24, y: 44 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 28, y: 44 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 32, y: 44 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 36, y: 44 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 20, y: 48 + bobY - walkOffset * 4, color: '#3B82F6' },
        { x: 24, y: 48 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 28, y: 48 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 32, y: 48 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 36, y: 48 + bobY + walkOffset * 4, color: '#3B82F6' },
        { x: 40, y: 48 + bobY - walkOffset * 4, color: '#3B82F6' },
      ]

      ctx.save()
      ctx.translate(Math.floor(this.character.x), Math.floor(this.character.y))
      for (const p of pixels) {
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, 4, 4)
      }
      ctx.restore()
    }
  }
}
</script>
