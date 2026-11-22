import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * CoffeeTransformation - High-end Three.js scene featuring:
 * 1. Realistic roasted coffee bean with central fissure, organic curve & specular sheen.
 * 2. Elegant matte ceramic coffee cup with saucer, handle, and rich espresso crema liquid.
 * 3. Dynamic volumetric rising steam particles.
 * 4. Ambient floating roast/ember particles.
 * 5. Cinematic multi-point lighting (key warm spotlight, rim light, ambient fill).
 * 6. Smooth choreographed transformation between Bean and Cup with camera push-in.
 */
export default function CoffeeTransformation({ 
  progress = 0, 
  onProgressChange,
  interactive = true 
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);
  const objectsRef = useRef({
    beanGroup: null,
    cupGroup: null,
    steamParticles: null,
    ambientParticles: null,
    keyLight: null,
    rimLight: null,
    beanMesh: null,
    cupMesh: null
  });

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTING SYSTEM
    // 1. Ambient warm dark fill
    const ambientLight = new THREE.AmbientLight(0x201510, 1.2);
    scene.add(ambientLight);

    // 2. Key Warm Light (Spotlight highlighting the bean / cup rim)
    const keyLight = new THREE.SpotLight(0xd9b58a, 4.5, 20, Math.PI / 4, 0.5, 1.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);
    objectsRef.current.keyLight = keyLight;

    // 3. Cinematic Rim Light (Cool copper/cream back-edge light)
    const rimLight = new THREE.DirectionalLight(0xf3ebdd, 2.8);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);
    objectsRef.current.rimLight = rimLight;

    // 4. Subtle Caramel Under-Glow
    const underLight = new THREE.PointLight(0xa66c43, 2.0, 10);
    underLight.position.set(0, -3, 2);
    scene.add(underLight);

    // ==========================================
    // 1. PROCEDURAL 3D ROASTED COFFEE BEAN
    // ==========================================
    const beanGroup = new THREE.Group();
    scene.add(beanGroup);
    objectsRef.current.beanGroup = beanGroup;

    // Create custom organic bean geometry by deforming a high-poly sphere
    const beanGeom = new THREE.SphereGeometry(1.0, 64, 48);
    const posAttr = beanGeom.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);

      // Elongate into coffee bean shape (prolate spheroid)
      vertex.y *= 1.48; // Length
      vertex.x *= 1.05; // Width
      vertex.z *= 0.72; // Thickness

      // Form the characteristic deep crease / fissure on front (z > 0)
      if (vertex.z > 0.05) {
        const xDist = Math.abs(vertex.x);
        // Indentation along center y-axis
        const creaseDepth = Math.exp(-Math.pow(xDist / 0.22, 2)) * 0.45;
        // Taper crease towards the tips
        const yFalloff = Math.max(0, 1 - Math.pow(vertex.y / 1.45, 2));
        vertex.z -= creaseDepth * yFalloff;

        // Slight organic curve of the fissure line
        vertex.x += Math.sin(vertex.y * 3.0) * 0.04 * (1 - xDist);
      } else {
        // Rounded convex back
        vertex.z *= 1.12;
      }

      // Micro surface irregularities (roasted texture deformation)
      const noise = Math.sin(vertex.x * 12) * Math.cos(vertex.y * 12) * Math.sin(vertex.z * 12) * 0.015;
      vertex.addScaledVector(vertex.clone().normalize(), noise);

      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    beanGeom.computeVertexNormals();

    // Procedural canvas texture for bean roasting cracks & sheen
    const beanCanvas = document.createElement('canvas');
    beanCanvas.width = 512;
    beanCanvas.height = 512;
    const ctx = beanCanvas.getContext('2d');
    
    // Rich gradient from dark roasted espresso to warm caramel highlights
    const bgGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    bgGrad.addColorStop(0, '#432616');
    bgGrad.addColorStop(0.5, '#2e180d');
    bgGrad.addColorStop(0.9, '#1c0f08');
    bgGrad.addColorStop(1, '#120a05');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Micro fissure lines and roast marbling
    ctx.strokeStyle = '#0d0704';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(256, 20);
    ctx.bezierCurveTo(245, 160, 268, 340, 256, 492);
    ctx.stroke();

    // Secondary fine crack texture
    ctx.strokeStyle = 'rgba(166, 108, 67, 0.25)';
    ctx.lineWidth = 2;
    for (let c = 0; c < 30; c++) {
      ctx.beginPath();
      const sx = Math.random() * 512;
      const sy = Math.random() * 512;
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + (Math.random() - 0.5) * 40, sy + (Math.random() - 0.5) * 40);
      ctx.stroke();
    }

    const beanTexture = new THREE.CanvasTexture(beanCanvas);
    beanTexture.wrapS = THREE.RepeatWrapping;
    beanTexture.wrapT = THREE.RepeatWrapping;

    const beanMat = new THREE.MeshStandardMaterial({
      map: beanTexture,
      color: 0x3d2215,
      roughness: 0.38,
      metalness: 0.12,
      bumpMap: beanTexture,
      bumpScale: 0.04
    });

    const beanMesh = new THREE.Mesh(beanGeom, beanMat);
    beanMesh.castShadow = true;
    beanMesh.receiveShadow = true;
    beanGroup.add(beanMesh);
    objectsRef.current.beanMesh = beanMesh;

    // ==========================================
    // 2. 3D CERAMIC COFFEE CUP & SAUCER
    // ==========================================
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);
    objectsRef.current.cupGroup = cupGroup;

    // Luxury matte ceramic material
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x181310,
      roughness: 0.32,
      metalness: 0.18,
      bumpScale: 0.005
    });

    // Warm copper rim accent material
    const copperRimMat = new THREE.MeshStandardMaterial({
      color: 0xd9b58a,
      roughness: 0.25,
      metalness: 0.85
    });

    // A) Cup Body (Lathe profile for smooth ceramic contour)
    const cupPoints = [];
    cupPoints.push(new THREE.Vector2(0.0, -0.6));
    cupPoints.push(new THREE.Vector2(0.55, -0.6));
    cupPoints.push(new THREE.Vector2(0.68, -0.4));
    cupPoints.push(new THREE.Vector2(0.88, 0.1));
    cupPoints.push(new THREE.Vector2(0.98, 0.5));
    cupPoints.push(new THREE.Vector2(1.0, 0.52)); // Lip top
    cupPoints.push(new THREE.Vector2(0.94, 0.52));
    cupPoints.push(new THREE.Vector2(0.88, 0.2));
    cupPoints.push(new THREE.Vector2(0.65, -0.3));
    cupPoints.push(new THREE.Vector2(0.5, -0.5));
    cupPoints.push(new THREE.Vector2(0.0, -0.5));

    const cupGeom = new THREE.LatheGeometry(cupPoints, 48);
    const cupBody = new THREE.Mesh(cupGeom, ceramicMat);
    cupBody.castShadow = true;
    cupBody.receiveShadow = true;
    cupGroup.add(cupBody);

    // B) Cup Rim Ring (Fine metallic copper line around lip)
    const rimGeom = new THREE.TorusGeometry(0.97, 0.02, 16, 48);
    rimGeom.rotateX(Math.PI / 2);
    rimGeom.translate(0, 0.52, 0);
    const cupRim = new THREE.Mesh(rimGeom, copperRimMat);
    cupGroup.add(cupRim);

    // C) Ceramic Handle
    const handleGeom = new THREE.TorusGeometry(0.38, 0.08, 16, 32, Math.PI * 1.05);
    handleGeom.rotateZ(-Math.PI * 0.15);
    handleGeom.translate(0.95, -0.05, 0);
    const cupHandle = new THREE.Mesh(handleGeom, ceramicMat);
    cupHandle.castShadow = true;
    cupGroup.add(cupHandle);

    // D) Saucer (Lower plate)
    const saucerPoints = [];
    saucerPoints.push(new THREE.Vector2(0.0, -0.68));
    saucerPoints.push(new THREE.Vector2(0.7, -0.68));
    saucerPoints.push(new THREE.Vector2(1.2, -0.62));
    saucerPoints.push(new THREE.Vector2(1.48, -0.48));
    saucerPoints.push(new THREE.Vector2(1.5, -0.5));
    saucerPoints.push(new THREE.Vector2(1.2, -0.66));
    saucerPoints.push(new THREE.Vector2(0.65, -0.72));
    saucerPoints.push(new THREE.Vector2(0.0, -0.72));

    const saucerGeom = new THREE.LatheGeometry(saucerPoints, 48);
    const saucer = new THREE.Mesh(saucerGeom, ceramicMat);
    saucer.castShadow = true;
    saucer.receiveShadow = true;
    cupGroup.add(saucer);

    // E) Espresso Crema Liquid Top
    const liquidCanvas = document.createElement('canvas');
    liquidCanvas.width = 256;
    liquidCanvas.height = 256;
    const lCtx = liquidCanvas.getContext('2d');
    
    // Rich espresso crema gradient with dark center & golden crema swirl
    const lGrad = lCtx.createRadialGradient(128, 128, 20, 128, 128, 128);
    lGrad.addColorStop(0, '#1a0e08');
    lGrad.addColorStop(0.65, '#2e180d');
    lGrad.addColorStop(0.88, '#915b34');
    lGrad.addColorStop(0.98, '#c28b57');
    lGrad.addColorStop(1, '#693e20');
    lCtx.fillStyle = lGrad;
    lCtx.fillRect(0, 0, 256, 256);

    // Delicate crema foam bubbles
    lCtx.fillStyle = 'rgba(217, 181, 138, 0.4)';
    for (let b = 0; b < 25; b++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 55;
      lCtx.beginPath();
      lCtx.arc(128 + Math.cos(angle) * radius, 128 + Math.sin(angle) * radius, 2 + Math.random() * 3, 0, Math.PI * 2);
      lCtx.fill();
    }

    const liquidTexture = new THREE.CanvasTexture(liquidCanvas);
    const liquidMat = new THREE.MeshStandardMaterial({
      map: liquidTexture,
      roughness: 0.18,
      metalness: 0.1
    });

    const liquidGeom = new THREE.CircleGeometry(0.86, 32);
    liquidGeom.rotateX(-Math.PI / 2);
    liquidGeom.translate(0, 0.38, 0);
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
    cupGroup.add(liquidMesh);

    // Initial state: Cup starts scaled down and invisible, bean is visible
    cupGroup.scale.set(0.001, 0.001, 0.001);
    cupGroup.position.set(0, -0.15, 0);

    // ==========================================
    // 3. REALISTIC RISING STEAM SYSTEM
    // ==========================================
    const steamParticleCount = 80;
    const steamGeom = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamScales = new Float32Array(steamParticleCount);
    const steamAlphas = new Float32Array(steamParticleCount);
    const steamSpeeds = new Float32Array(steamParticleCount);
    const steamAngles = new Float32Array(steamParticleCount);

    for (let s = 0; s < steamParticleCount; s++) {
      // Spawn near cup liquid surface
      const r = Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      steamPositions[s * 3] = Math.cos(theta) * r;
      steamPositions[s * 3 + 1] = 0.4 + Math.random() * 1.5;
      steamPositions[s * 3 + 2] = Math.sin(theta) * r;

      steamScales[s] = 0.08 + Math.random() * 0.15;
      steamAlphas[s] = Math.random();
      steamSpeeds[s] = 0.008 + Math.random() * 0.012;
      steamAngles[s] = Math.random() * Math.PI * 2;
    }

    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Custom steam particle canvas (soft ethereal smoke gradient)
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const sCtx = steamCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
    sGrad.addColorStop(0, 'rgba(243, 235, 221, 0.7)');
    sGrad.addColorStop(0.3, 'rgba(217, 181, 138, 0.35)');
    sGrad.addColorStop(0.7, 'rgba(166, 108, 67, 0.12)');
    sGrad.addColorStop(1, 'rgba(23, 17, 14, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);

    const steamTexture = new THREE.CanvasTexture(steamCanvas);
    const steamMat = new THREE.PointsMaterial({
      map: steamTexture,
      size: 0.55,
      transparent: true,
      opacity: 0.0, // starts invisible until cup reveals
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const steamPoints = new THREE.Points(steamGeom, steamMat);
    scene.add(steamPoints);
    objectsRef.current.steamParticles = {
      points: steamPoints,
      material: steamMat,
      positions: steamPositions,
      alphas: steamAlphas,
      speeds: steamSpeeds,
      angles: steamAngles,
      count: steamParticleCount
    };

    // ==========================================
    // 4. AMBIENT DRIFTING ROAST PARTICLES
    // ==========================================
    const ambientCount = 120;
    const ambientGeom = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientVelocities = [];

    for (let a = 0; a < ambientCount; a++) {
      ambientPositions[a * 3] = (Math.random() - 0.5) * 8;
      ambientPositions[a * 3 + 1] = (Math.random() - 0.5) * 6;
      ambientPositions[a * 3 + 2] = (Math.random() - 0.5) * 5;

      ambientVelocities.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: 0.002 + Math.random() * 0.004,
        vz: (Math.random() - 0.5) * 0.003
      });
    }

    ambientGeom.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));

    const ambientMat = new THREE.PointsMaterial({
      map: steamTexture,
      size: 0.12,
      color: 0xd9b58a,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const ambientPoints = new THREE.Points(ambientGeom, ambientMat);
    scene.add(ambientPoints);
    objectsRef.current.ambientParticles = {
      points: ambientPoints,
      velocities: ambientVelocities,
      positions: ambientPositions,
      count: ambientCount
    };

    // ==========================================
    // MOUSE PARALLAX LISTENER
    // ==========================================
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.45;
      mouseRef.current.targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // ANIMATION RENDER LOOP
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Animate ambient drifting particles
      const amb = objectsRef.current.ambientParticles;
      if (amb) {
        for (let i = 0; i < amb.count; i++) {
          amb.positions[i * 3 + 1] += amb.velocities[i].vy;
          amb.positions[i * 3] += Math.sin(time + i) * 0.0015;
          amb.positions[i * 3 + 2] += Math.cos(time + i) * 0.0015;

          // Wrap around top boundary
          if (amb.positions[i * 3 + 1] > 3.5) {
            amb.positions[i * 3 + 1] = -3.5;
          }
        }
        amb.points.geometry.attributes.position.needsUpdate = true;
      }

      // Animate steam particles (when cup is visible)
      const steam = objectsRef.current.steamParticles;
      if (steam && steam.material.opacity > 0.02) {
        for (let j = 0; j < steam.count; j++) {
          steam.positions[j * 3 + 1] += steam.speeds[j];
          steam.angles[j] += 0.02;
          steam.positions[j * 3] += Math.sin(steam.angles[j]) * 0.0025;
          steam.positions[j * 3 + 2] += Math.cos(steam.angles[j]) * 0.0025;

          // Fade & reset when rising high
          if (steam.positions[j * 3 + 1] > 2.6) {
            const r = Math.random() * 0.45;
            const theta = Math.random() * Math.PI * 2;
            steam.positions[j * 3] = Math.cos(theta) * r;
            steam.positions[j * 3 + 1] = 0.4;
            steam.positions[j * 3 + 2] = Math.sin(theta) * r;
          }
        }
        steam.points.geometry.attributes.position.needsUpdate = true;
      }

      // Dynamic lighting sway
      if (objectsRef.current.keyLight) {
        objectsRef.current.keyLight.position.x = 3 + Math.sin(time * 0.5) * 0.6;
        objectsRef.current.keyLight.position.y = 4 + Math.cos(time * 0.4) * 0.4;
      }

      // Render
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ==========================================
  // SYNC 3D TRANSFORMATION WITH PROGRESS PROP
  // ==========================================
  useEffect(() => {
    const { beanGroup, cupGroup, steamParticles, beanMesh } = objectsRef.current;
    const camera = cameraRef.current;
    if (!beanGroup || !cupGroup || !camera) return;

    // Clamp progress between 0 and 1
    const p = Math.max(0, Math.min(1, progress));

    // TRANSFORMATION CURVES
    // 0.0 -> 0.4: Bean spinning gracefully, rotating in 3D
    // 0.4 -> 0.7: Bean morphs/dissolves, cup emerges and scales up
    // 0.7 -> 1.0: Cup settles in foreground, steam begins rising, camera pushes in

    // 1. Bean Transformation
    if (p <= 0.55) {
      // Active bean phase
      const beanT = p / 0.55;
      beanGroup.visible = true;
      
      // Continuous 3D rotation + progress-based orientation
      const baseRotY = p * Math.PI * 3.5;
      beanGroup.rotation.y = baseRotY + mouseRef.current.x * 0.5;
      beanGroup.rotation.x = Math.sin(p * Math.PI) * 0.4 + mouseRef.current.y * 0.4;
      beanGroup.rotation.z = Math.sin(p * Math.PI * 2) * 0.15;

      // Scale & Opacity falloff as it transforms
      const scale = 1.0 - Math.pow(beanT, 2.5) * 0.85;
      beanGroup.scale.set(scale, scale, scale);

      if (beanMesh && beanMesh.material) {
        beanMesh.material.transparent = true;
        beanMesh.material.opacity = 1.0 - Math.pow(beanT, 2.0);
      }
    } else {
      beanGroup.visible = false;
    }

    // 2. Ceramic Cup Transformation
    if (p >= 0.35) {
      // Cup emerging phase
      cupGroup.visible = true;
      const cupT = (p - 0.35) / 0.65; // 0 to 1

      // Ease out cubic
      const easeT = 1 - Math.pow(1 - cupT, 3);
      
      const cupScale = easeT * 1.15;
      cupGroup.scale.set(cupScale, cupScale, cupScale);

      // Cup settles with subtle tilt and responsive mouse look
      cupGroup.rotation.y = (1 - easeT) * 0.8 + 0.35 + mouseRef.current.x * 0.35;
      cupGroup.rotation.x = 0.15 - easeT * 0.05 + mouseRef.current.y * 0.25;

      // Position: starts slightly lower and rises gracefully into center
      cupGroup.position.y = -0.5 + easeT * 0.38;

      // Steam activation
      if (steamParticles && steamParticles.material) {
        const steamOpacity = Math.max(0, (p - 0.65) / 0.35) * 0.65;
        steamParticles.material.opacity = steamOpacity;
      }
    } else {
      cupGroup.visible = false;
      if (steamParticles && steamParticles.material) {
        steamParticles.material.opacity = 0;
      }
    }

    // 3. Camera Push-In (Z moves from 5.2 to 4.1 for intimate luxury focus)
    camera.position.z = 5.2 - p * 1.05;
    camera.position.y = mouseRef.current.y * 0.25;
    camera.position.x = mouseRef.current.x * 0.3;
    camera.lookAt(0, p >= 0.5 ? -0.05 : 0, 0);

  }, [progress]);

  return (
    <div 
      ref={containerRef} 
      className="coffee-transformation-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    >
      {/* Graceful Fallback if WebGL is unavailable */}
      {!webglSupported && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#17110E'
        }}>
          <img 
            src={progress > 0.5 ? "/assets/images/ceramic-cup.jpg" : "/assets/images/bean-hero.jpg"} 
            alt="The Roasted Bean"
            style={{
              maxWidth: '360px',
              borderRadius: '12px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      )}
    </div>
  );
}
