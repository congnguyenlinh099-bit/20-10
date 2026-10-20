// Canvas Particle Engine for Floating Petals and Confetti Bursts
class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.isRunning = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  addPetal() {
    if (this.particles.length > 40) return;
    this.particles.push({
      x: Math.random() * this.width,
      y: -20,
      size: Math.random() * 8 + 6,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 2 - 1,
      color: Math.random() > 0.4 ? 'rgba(253, 164, 175, 0.7)' : 'rgba(244, 63, 94, 0.65)',
      type: 'petal'
    });
  }

  burst(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const velocity = Math.random() * 6 + 2;
      this.particles.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        size: Math.random() * 6 + 4,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        gravity: 0.15,
        alpha: 1,
        life: 1,
        color: ['#e11d48', '#f59e0b', '#ec4899', '#fda4af'][Math.floor(Math.random() * 4)],
        type: 'burst'
      });
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  animate() {
    if (!this.isRunning || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (Math.random() < 0.1) {
      this.addPetal();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.type === 'petal') {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
        p.rotation += p.rotSpeed;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        if (p.y > this.height + 20) {
          this.particles.splice(i, 1);
        }
      } else if (p.type === 'burst') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= 0.02;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(p.life, 0);
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

export const particleEngine = new ParticleEngine('particle-canvas');
