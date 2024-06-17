import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeFigure = ({ color }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 10; // Ajustar para ver toda la "X"

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(600, 600); // Tamaño del canvas aumentado
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Crear geometría de puntos para la "X" en 3D
    const material = new THREE.PointsMaterial({ color, size: 0.05 });

    // Crear puntos para la "X" en 3D
    const points = [];
    const numPoints = 5000; // Número de puntos en cada línea
    const xWidth = 3; // Ancho de la "X"
    const yHeight = 3; // Altura de la "X"
    const zDepth = 3; // Profundidad de la "X"
    for (let i = 0; i < numPoints; i++) {
      const t = (i / (numPoints - 1)) * 2 - 1;
      points.push(
        new THREE.Vector3(
          t * xWidth,
          t * yHeight,
          Math.sin(t * Math.PI) * zDepth
        )
      );
      points.push(
        new THREE.Vector3(
          -t * xWidth,
          t * yHeight,
          Math.sin(t * Math.PI) * zDepth
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const originalPositions = geometry.attributes.position.array.slice();

    let expanded = false;

    const expandParticles = () => {
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] *= Math.random() * 4 + 1;
        positions[i + 1] *= Math.random() * 4 + 1;
        positions[i + 2] *= Math.random() * 4 + 1;
      }
      geometry.attributes.position.needsUpdate = true;
    };

    const contractParticles = () => {
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i++) {
        positions[i] = originalPositions[i];
      }
      geometry.attributes.position.needsUpdate = true;
    };

    const handleClick = () => {
      if (expanded) {
        contractParticles();
      } else {
        expandParticles();
      }
      expanded = !expanded;
    };

    if (mountRef.current) {
      mountRef.current.addEventListener("mousedown", handleClick);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.01;
      particles.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener("mousedown", handleClick);
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  return <div ref={mountRef} style={{ position: "relative" }} />;
};

export default ThreeFigure;
