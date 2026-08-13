import React, { useEffect, useRef } from 'react';

class FallingDrop {
  x: number = 0;
  y: number = 0;
  speed: number = 0;
  length: number = 0;
  opacity: number = 0;
  angle: number = 0.3; // slant angle to left

  constructor(width: number, height: number) {
    this.reset(width, height, true);
  }

  reset(width: number, height: number, randomY: boolean = false) {
    this.x = Math.random() * width * 1.5;
    this.y = randomY ? Math.random() * height : -100;
    this.speed = 25 + Math.random() * 20; 
    this.length = 30 + Math.random() * 40; 
    this.opacity = 0.05 + Math.random() * 0.15; // Very subtle falling lines
  }

  update(width: number, height: number) {
    this.y += this.speed;
    this.x -= this.speed * this.angle;

    if (this.y > height + 100 || this.x < -100) {
      this.reset(width, height);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const endX = this.x + this.length * this.angle;
    const endY = this.y - this.length;
    
    // Gradient creates a motion blur effect (opaque at head, transparent at tail)
    const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
    grad.addColorStop(0, `rgba(200, 230, 255, ${this.opacity})`);
    grad.addColorStop(1, 'rgba(200, 230, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}

class GlassDrop {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  opacity: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = 1 + Math.random() * 2;
    // 80% are static, 20% slide down slowly
    this.speedY = Math.random() < 0.2 ? (0.2 + Math.random() * 1.2) : 0;
    this.opacity = 0.2 + Math.random() * 0.5; // Very light
  }

  update(height: number) {
    if (this.speedY > 0) {
      this.y += this.speedY;
      if (this.y > height + 10) {
        this.y = -10;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Base droplet (semi-transparent)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 230, 255, ${this.opacity * 0.3})`;
    ctx.fill();
    
    // Highlight (simulates light reflection on the drop)
    ctx.beginPath();
    ctx.arc(this.x - this.radius * 0.25, this.y - this.radius * 0.25, this.radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
    ctx.fill();
  }
}

export function CanvasRainLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const fallingDrops: FallingDrop[] = Array.from({ length: 150 }, () => new FallingDrop(width, height));
    const glassDrops: GlassDrop[] = Array.from({ length: 200 }, () => new GlassDrop(width, height));
    
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw falling rain in background
      for (let i = 0; i < fallingDrops.length; i++) {
        fallingDrops[i].update(width, height);
        fallingDrops[i].draw(ctx);
      }
      
      // Draw static/sliding drops on the glass foreground
      for (let i = 0; i < glassDrops.length; i++) {
        glassDrops[i].update(height);
        glassDrops[i].draw(ctx);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
