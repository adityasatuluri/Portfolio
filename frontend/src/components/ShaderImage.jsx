"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ShaderImage = ({ src, width = 600, height = 800 }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const planeMeshRef = useRef(null);
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 });
  const prevPosition = useRef({ x: 0.5, y: 0.5 });
  const aberrationIntensity = useRef(0.0);
  const easeFactor = useRef(0.02);

  // Vertex + Fragment shaders
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
  `;

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10);
    camera.position.z = 1;

    const texture = new THREE.TextureLoader().load(src);
    const shaderUniforms = {
      u_mouse: { value: new THREE.Vector2() },
      u_prevMouse: { value: new THREE.Vector2() },
      u_aberrationIntensity: { value: 0.0 },
      u_texture: { value: texture },
    };

    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader,
        fragmentShader,
      })
    );
    planeMeshRef.current = planeMesh;
    scene.add(planeMesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    containerRef.current.innerHTML = ""; // clear old canvas if re-render
    containerRef.current.appendChild(renderer.domElement);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      mousePosition.current.x +=
        (targetMousePosition.current.x - mousePosition.current.x) *
        easeFactor.current;
      mousePosition.current.y +=
        (targetMousePosition.current.y - mousePosition.current.y) *
        easeFactor.current;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.current.x,
        1.0 - mousePosition.current.y
      );
      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.current.x,
        1.0 - prevPosition.current.y
      );

      aberrationIntensity.current = Math.max(
        0.0,
        aberrationIntensity.current - 0.05
      );
      planeMesh.material.uniforms.u_aberrationIntensity.value =
        aberrationIntensity.current;

      renderer.render(scene, camera);
    }
    animate();

    // Mouse events
    const handleMouseMove = (event) => {
      easeFactor.current = 0.02;
      const rect = containerRef.current.getBoundingClientRect();
      prevPosition.current = { ...targetMousePosition.current };
      targetMousePosition.current.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.current.y = (event.clientY - rect.top) / rect.height;
      aberrationIntensity.current = 1;
    };

    const handleMouseEnter = (event) => {
      easeFactor.current = 0.02;
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current.x = targetMousePosition.current.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.current.y = targetMousePosition.current.y =
        (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      easeFactor.current = 0.05;
      targetMousePosition.current = { ...prevPosition.current };
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [src, width, height]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        borderRadius: "10px",
      }}
    />
  );
};

export default ShaderImage;
