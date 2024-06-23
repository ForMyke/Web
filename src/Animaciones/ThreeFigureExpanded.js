import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeFigureExpanded = ({ color }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      5.8,
      400
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.BufferGeometry();
    const numParticles = 1500;
    const positions = new Float32Array(numParticles * 3);

    for (let i = 0; i < numParticles * 3; i += 3) {
      positions[i] = (Math.random() * 2 - 1) * 5;
      positions[i + 1] = (Math.random() * 2 - 1) * 5;
      positions[i + 2] = (Math.random() * 2 - 1) * 5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color, size: 0.06 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.003;
      particles.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    rendererRef.current = renderer;
    cameraRef.current = camera;
    particlesRef.current = particles;

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden", // Oculta el desplazamiento
      }}
    />
  );
};

export default ThreeFigureExpanded;
