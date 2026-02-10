import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaEnvelope } from 'react-icons/fa';
import './Hero.css';

// Particle class for the ASCII art effect
class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  character: string;
  density: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number, color: string, character: string) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = 3;
    this.character = character;
    this.density = Math.random() * 30 + 1;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.font = `${this.size * 2.5}px 'Fira Code', monospace`;
    ctx.fillText(this.character, this.x, this.y);
  }

  update(mouse: { x: number | null; y: number | null; radius: number }) {
    // Calculate distance from mouse
    const dx = mouse.x !== null ? mouse.x - this.x : 0;
    const dy = mouse.y !== null ? mouse.y - this.y : 0;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;

    // Max distance for mouse effect
    const maxDistance = mouse.radius;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius && mouse.x !== null && mouse.y !== null) {
      // Scatter particles away from mouse
      this.vx -= directionX * 0.5;
      this.vy -= directionY * 0.5;
    }

    // Return to original position with easing
    this.vx += (this.originX - this.x) * 0.05;
    this.vy += (this.originY - this.y) * 0.05;

    // Apply friction
    this.vx *= 0.9;
    this.vy *= 0.9;

    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }
}

const Hero = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: null as number | null, y: null as number | null, radius: 100 });
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const loadImage = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      // Try to load profile image, fallback to a generated pattern
      img.src = '/profile.jpg';
      
      img.onload = () => {
        setIsImageLoaded(true);
        createParticles(img);
      };

      img.onerror = () => {
        // Create fallback pattern if no image
        createFallbackPattern();
      };
    };

    const createParticles = (img: HTMLImageElement) => {
      if (!canvas || !ctx) return;

      particlesRef.current = [];
      
      // Create temporary canvas to read image data
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      const maxSize = Math.min(canvas.width, canvas.height) * 0.85;
      const aspectRatio = img.width / img.height;
      
      let drawWidth, drawHeight;
      if (aspectRatio > 1) {
        drawWidth = maxSize;
        drawHeight = maxSize / aspectRatio;
      } else {
        drawHeight = maxSize;
        drawWidth = maxSize * aspectRatio;
      }

      tempCanvas.width = drawWidth;
      tempCanvas.height = drawHeight;
      
      tempCtx.drawImage(img, 0, 0, drawWidth, drawHeight);
      
      const imageData = tempCtx.getImageData(0, 0, drawWidth, drawHeight);
      const data = imageData.data;

      // Characters from dense to sparse for inverted effect (dark areas = dense chars)
      const characters = ['@', '#', 'W', '%', '8', '&', '*', '+', '=', '-', ':', '.', ' '];
      const gap = 5; // Space between particles - smaller = more detail
      
      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

      // Brightness threshold to filter out white/light background
      const brightnessThreshold = 220; // Pixels brighter than this are considered background

      for (let y = 0; y < drawHeight; y += gap) {
        for (let x = 0; x < drawWidth; x += gap) {
          const index = (Math.floor(y) * Math.floor(drawWidth) + Math.floor(x)) * 4;
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const alpha = data[index + 3];

          const brightness = (red + green + blue) / 3;

          // Only render pixels that are NOT the white background (darker pixels = person)
          if (alpha > 128 && brightness < brightnessThreshold) {
            // Invert: darker pixels get denser characters
            const invertedBrightness = 255 - brightness;
            const charIndex = Math.floor((invertedBrightness / 255) * (characters.length - 2));
            const character = characters[Math.min(charIndex, characters.length - 2)];
            
            // Use a blue tone based on rgb(53, 182, 230)
            const colorIntensity = (255 - brightness) / 255;
            const r = Math.round(33 + colorIntensity * 20); // 33-53
            const g = Math.round(132 + colorIntensity * 50); // 132-182
            const b = Math.round(180 + colorIntensity * 50); // 180-230
            const color = `rgb(${r}, ${g}, ${b})`;

            particlesRef.current.push(
              new Particle(x + offsetX, y + offsetY, color, character)
            );
          }
        }
      }
      
      setIsImageLoaded(true);
    };

    const createFallbackPattern = () => {
      if (!canvas) return;
      
      particlesRef.current = [];
      const characters = ['@', '#', '*', '+', '=', '-', ':', '.', '▓', '░'];
      
      // Create a silhouette-like pattern
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.35;
      
      for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
        for (let r = 20; r < maxRadius; r += 6) {
          // Create head and shoulders shape
          let radius = r;

          // Head (top circle)
          if (angle > Math.PI * 0.25 && angle < Math.PI * 0.75) {
            radius = r * (1 - (angle - Math.PI * 0.5) * 0.3);
          }

          // Shoulders (wider at bottom)
          if (angle > Math.PI * 0.75 || angle < Math.PI * 0.25) {
            radius = r * 1.2;
          }

          const x = centerX + Math.cos(angle) * radius * 0.8;
          const y = centerY + Math.sin(angle) * radius - maxRadius * 0.3;

          const brightness = 150 + Math.random() * 100;
          // Blue fallback color based on rgb(53, 182, 230)
          const colorIntensity = (brightness - 150) / 100; // 0-1
          const rCol = Math.round(33 + colorIntensity * 20); // 33-53
          const gCol = Math.round(132 + colorIntensity * 50); // 132-182
          const bCol = Math.round(180 + colorIntensity * 50); // 180-230
          const color = `rgb(${rCol}, ${gCol}, ${bCol})`;
          const char = characters[Math.floor(Math.random() * characters.length)];

          particlesRef.current.push(new Particle(x, y, color, char));
        }
      }
      
      setIsImageLoaded(true);
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current);
        particle.draw(ctx);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleResize = () => {
      initCanvas();
      loadImage();
    };

    initCanvas();
    loadImage();
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const codeLines = [
    { type: 'comment', text: t('hero.welcomeComment') },
    { type: 'comment', text: t('hero.exploreComment') },
    { type: 'empty', text: '' },
    { type: 'keyword', prefix: 'const ', name: 'developer', operator: ' = ', value: '"Muhamed Jaber"' },
    { type: 'keyword', prefix: 'const ', name: 'role', operator: ' = ', value: `"${t('hero.role')}"` },
    { type: 'empty', text: '' },
    { type: 'comment', text: t('hero.githubComment') },
    { type: 'link', prefix: 'const ', name: 'github', operator: ' = ', value: '"https://github.com/HamudiJ99"', isLink: true },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        {/* Left Side - Code Introduction */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-code-block code-font">
            <div className="code-header">
              <span className="code-dot red"></span>
              <span className="code-dot yellow"></span>
              <span className="code-dot green"></span>
              <span className="code-filename">hello.tsx</span>
            </div>
            
            <div className="code-content">
              <p className="code-greeting">{t('hero.greeting')}</p>
              
              <h1 className="hero-name">
                Muhamed Jaber
              </h1>
              
              <p className="hero-role">
                <span className="code-symbol">&gt;</span> {t('hero.role')}
              </p>
              
              <div className="hero-code-lines">
                {codeLines.map((line, index) => (
                  <motion.div 
                    key={index}
                    className="code-line"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {line.type === 'comment' && (
                      <span className="code-comment">{line.text}</span>
                    )}
                    {line.type === 'empty' && <br />}
                    {line.type === 'keyword' && (
                      <>
                        <span className="code-keyword">{line.prefix}</span>
                        <span className="code-variable">{line.name}</span>
                        <span className="code-operator">{line.operator}</span>
                        <span className="code-string">{line.value}</span>
                      </>
                    )}
                    {line.type === 'link' && (
                      <>
                        <span className="code-keyword">{line.prefix}</span>
                        <span className="code-variable">{line.name}</span>
                        <span className="code-operator">{line.operator}</span>
                        <a 
                          href="https://github.com/HamudiJ99" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="code-link"
                        >
                          {line.value}
                        </a>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <a href="#contact" className="btn btn-outline">
                  <FaEnvelope /> {t('hero.ctaButton')}
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Interactive ASCII Art */}
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="ascii-container">
            <canvas 
              ref={canvasRef} 
              className={`ascii-canvas ${isImageLoaded ? 'loaded' : ''}`}
            />
            <div className="ascii-glow"></div>
            <p className="ascii-hint">{t('hero.asciiHint')}</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="scroll-line"></div>
        <span>{t('hero.scrollHint')}</span>
      </motion.div>
    </section>
  );
};

export default Hero;