import React, { useEffect, useRef, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  theme?: 'light' | 'dark';
  density?: number; // Particles per 10000 pixels
  maxSpeed?: number;
  connectParticles?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  theme = 'dark',
  density = 0.7,
  maxSpeed = 0.2,
  connectParticles = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef<{ x: number, y: number } | null>(null);
  
  // Define theme-specific particle colors
  const particleColors = useMemo(() => ({
    light: ['rgba(104, 109, 224, 0.5)', 'rgba(72, 52, 212, 0.5)', 'rgba(142, 68, 173, 0.5)'],
    dark: ['rgba(255, 255, 255, 0.5)', 'rgba(222, 222, 255, 0.5)', 'rgba(190, 220, 255, 0.5)']
  }), []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      // Calculate particle count based on screen size and density
      const particleCount = Math.floor((canvas.width * canvas.height) / (10000 / density));
      
      const colors = particleColors[theme];
      
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * maxSpeed,
          speedY: (Math.random() - 0.5) * maxSpeed,
          opacity: Math.random() * 0.5 + 0.3,
          color
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseLeave = () => {
      mousePosition.current = null;
    };

    const connectNearbyParticles = (p1: Particle, p2: Particle) => {
      // Calculate distance between particles
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Maximum distance for connection
      const maxDistance = canvas.width * 0.07; 
      
      if (distance < maxDistance) {
        // Create gradient line based on distance
        const opacity = 1 - (distance / maxDistance);
        ctx.beginPath();
        ctx.strokeStyle = theme === 'dark' ? 
          `rgba(255, 255, 255, ${opacity * 0.15})` : 
          `rgba(75, 0, 130, ${opacity * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap particles around the screen
        if (particle.x < 0) particle.x = canvas.width;
        else if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        else if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect to nearby particles if enabled
        if (connectParticles) {
          for (let i = index + 1; i < particles.current.length; i++) {
            connectNearbyParticles(particle, particles.current[i]);
          }
        }
        
        // Connect to mouse position if available
        if (mousePosition.current) {
          const dx = particle.x - mousePosition.current.x;
          const dy = particle.y - mousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = canvas.width * 0.1;
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = theme === 'dark' ? 
              `rgba(255, 255, 255, ${opacity * 0.3})` : 
              `rgba(75, 0, 130, ${opacity * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mousePosition.current.x, mousePosition.current.y);
            ctx.stroke();
            
            // Slightly push particles away from mouse
            const force = 0.1 * opacity;
            particle.speedX += dx * force * 0.01;
            particle.speedY += dy * force * 0.01;
            
            // Limit max speed
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed * 1.5) {
              const ratio = (maxSpeed * 1.5) / currentSpeed;
              particle.speedX *= ratio;
              particle.speedY *= ratio;
            }
          }
        }
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [theme, density, maxSpeed, connectParticles, particleColors]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 transition-opacity duration-1000"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground;