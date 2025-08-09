// src/components/InteractiveBackground.jsx
"use client";

import React, { useEffect, useRef, useState } from 'react';

// Define the number of particles for the circuit-like animation.
const NUM_PARTICLES = 40; // Optimized for better performance
// Define the distance for connecting particles.
const CONNECT_DISTANCE = 170; 
const PARTICLE_SPEED = 1.2; // Adjusted for a noticeable but smooth movement
const GRID_SPACING = 30; // Spacing for the background grid lines

// Define a Particle class to manage each animated dot on the canvas.
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
    this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
  }

  // Method to update the particle's position.
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off the edges of the canvas.
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  // Method to draw the particle on the canvas with a glowing effect.
  draw(ctx) {
    // Draw the main particle dot
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00FFFF'; // A bright cyan color for the "circuits"
    ctx.fill();

    // Add a glowing effect around the particle
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00FFFF';
  }
}

// The main InteractiveBackground component.
const InteractiveBackground = () => {
  // A ref to hold the canvas element.
  const canvasRef = useRef(null);
  // A ref to hold the custom cursor div element.
  const cursorRef = useRef(null);
  // Use a ref to store particles to prevent re-renders in the animation loop.
  const particlesRef = useRef([]);
  // Use a ref to store the cursor's position for interactivity.
  const mouseRef = useRef({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection
  
  // Function to draw the background grid, giving the PCB effect
  const drawGrid = (ctx, canvas) => {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)'; // Very faint cyan for the grid
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += GRID_SPACING) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += GRID_SPACING) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
  };

  // useEffect hook to handle the canvas setup and animation loop.
  // The empty dependency array ensures this effect runs only once on mount.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cursor = cursorRef.current;

    // Set canvas dimensions to match the window size.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768); // Detect mobile screen size
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles only once.
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => new Particle(canvas));
    }

    // Event listener to update the mouse position in a ref and move the cursor div.
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // The animation loop function.
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the background grid first.
      drawGrid(ctx, canvas);
      
      // Reset the shadow blur for a clean canvas.
      ctx.shadowBlur = 0;

      // Connect nearby particles with lines.
      // We use the mouseRef.current to get the latest mouse position.
      const allPoints = [...particlesRef.current, mouseRef.current];

      for (let i = 0; i < allPoints.length; i++) {
        for (let j = i + 1; j < allPoints.length; j++) {
          const p1 = allPoints[i];
          const p2 = allPoints[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Draw lines with a glowing effect to simulate circuits.
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.8 - distance / CONNECT_DISTANCE})`;
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#00FFFF';
            ctx.stroke();
          }
        }
      }

      // Draw and update each particle.
      particlesRef.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Clean up event listeners when the component unmounts.
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty dependency array ensures this effect runs only once.

  // Component to render the canvas element and the custom cursor.
  return (
    <div>
      <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10"></canvas>
      {!isMobile && <div ref={cursorRef} id="custom-cursor"></div>}
    </div>
  );
};

export default InteractiveBackground;
