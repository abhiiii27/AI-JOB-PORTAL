import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeGlobeNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 250;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Object groups
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Create the rotating glowing globe (neural network)
    const globeRadius = 90;
    const nodeCount = 180;
    const globePositions = new Float32Array(nodeCount * 3);
    const globePoints: THREE.Vector3[] = [];

    // Fibonacci sphere algorithm to distribute nodes evenly over a sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < nodeCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);

      globePositions[i * 3] = x;
      globePositions[i * 3 + 1] = y;
      globePositions[i * 3 + 2] = z;

      globePoints.push(new THREE.Vector3(x, y, z));
    }

    // Creating Globe Nodes Geometry
    const globeGeometry = new THREE.BufferGeometry();
    globeGeometry.setAttribute('position', new THREE.BufferAttribute(globePositions, 3));

    // Colors mapping (cyan glow and purple mix)
    const colors = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      // Alternating teal and purple glows
      if (i % 2 === 0) {
        colors[i * 3] = 0.0;    // Red
        colors[i * 3 + 1] = 0.83; // Green (#00D4FF)
        colors[i * 3 + 2] = 1.0;  // Blue
      } else {
        colors[i * 3] = 0.48;   // Red (#7B2FFF)
        colors[i * 3 + 1] = 0.18; // Green
        colors[i * 3 + 2] = 1.0;  // Blue
      }
    }
    globeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create custom Canvas Texture for particles (perfect circles)
    const createCircleTexture = () => {
      const size = 16;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 250, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    // Material for Globe Nodes
    const globeMaterial = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const globePointsMesh = new THREE.Points(globeGeometry, globeMaterial);
    worldGroup.add(globePointsMesh);

    // Creating Neural network connections (edges between closer nodes)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const linePositions: number[] = [];
    // Only connect points within a threshold to form a network
    const connectionDistance = 45;
    for (let i = 0; i < globePoints.length; i++) {
      for (let j = i + 1; j < globePoints.length; j++) {
        const dist = globePoints[i].distanceTo(globePoints[j]);
        if (dist < connectionDistance) {
          linePositions.push(globePoints[i].x, globePoints[i].y, globePoints[i].z);
          linePositions.push(globePoints[j].x, globePoints[j].y, globePoints[j].z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(linesMesh);

    // 5. Floating background particle field
    const bgParticleCount = 300;
    const bgPositions = new Float32Array(bgParticleCount * 3);
    const bgColors = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount; i++) {
      // Spread them in a wild 3D space
      bgPositions[i * 3] = (Math.random() - 0.5) * 600;
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 600;

      // Cyan or purple mix
      if (Math.random() > 0.5) {
        bgColors[i * 3] = 0.0;    // Electric Blue
        bgColors[i * 3 + 1] = 0.83; 
        bgColors[i * 3 + 2] = 1.0;  
      } else {
        bgColors[i * 3] = 0.48;   // Neon Violet
        bgColors[i * 3 + 1] = 0.18;
        bgColors[i * 3 + 2] = 1.0; 
      }
    }

    const bgGeometry = new THREE.BufferGeometry();
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    bgGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));

    const bgMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const bgPointsMesh = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgPointsMesh);

    // 6. Interactive Mouse Movement variables (Parallax)
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize between -1 and 1
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Watch Container Resizes
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 8. Animation/Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow constant base rotation
      worldGroup.rotation.y = elapsedTime * 0.1;
      worldGroup.rotation.x = elapsedTime * 0.05;

      // Drifting background particles
      bgPointsMesh.rotation.y = elapsedTime * 0.015;
      bgPointsMesh.rotation.z = elapsedTime * 0.005;

      // Apply mouse smooth parallax interpolation (lerping)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Parallax rotation adjustments
      worldGroup.position.x = currentX * 40;
      worldGroup.position.y = -currentY * 40;

      // Subtle scaling breathe effect
      const breathe = Math.sin(elapsedTime * 1.5) * 0.03 + 1.0;
      worldGroup.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      
      // Memory cleanup
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      globeGeometry.dispose();
      globeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="three-canvas-container"
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
}
