/* ==========================================
   FALLING LEAVES CANVAS PARTICLE SIMULATION
   ========================================== */

export class LeafCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 28;
    this.animId = null;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.initParticles();
    this.startAnimation();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomY = false) {
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -30,
      size: 10 + Math.random() * 16,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: -0.3 + Math.random() * 0.6,
      oscillationSpeed: 0.01 + Math.random() * 0.02,
      oscillationAmplitude: 15 + Math.random() * 25,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.4 + Math.random() * 0.5,
      color: Math.random() > 0.4 ? '#8DA432' : '#EDE383' // Apple Green or Flax
    };
  }

  drawLeaf(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);
    this.ctx.globalAlpha = p.opacity;

    // Organic Leaf Shape
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size);
    this.ctx.quadraticCurveTo(p.size * 0.7, -p.size * 0.3, 0, p.size);
    this.ctx.quadraticCurveTo(-p.size * 0.7, -p.size * 0.3, 0, -p.size);
    this.ctx.fillStyle = p.color;
    this.ctx.fill();

    // Central Stem Line
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size);
    this.ctx.lineTo(0, p.size * 0.9);
    this.ctx.strokeStyle = '#365004';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * p.oscillationSpeed) * 0.5 + p.speedX;
      p.angle += p.rotationSpeed;

      // Reset when falling below window bottom
      if (p.y > this.canvas.height + 30) {
        Object.assign(p, this.createParticle(false));
      }

      this.drawLeaf(p);
    }

    this.animId = requestAnimationFrame(() => this.update());
  }

  startAnimation() {
    if (!this.animId) {
      this.update();
    }
  }

  stopAnimation() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}
