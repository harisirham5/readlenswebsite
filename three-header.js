document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Setup Scene, Camera, Renderer
  const scene = new THREE.Scene();
  // Light fog to match the light background of the website
  scene.fog = new THREE.FogExp2(0xf4f7f6, 0.0015);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;
  camera.position.y = 10;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // Transparent background to show website behind it
  container.appendChild(renderer.domElement);

  // Cinematic Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  // Emerald Green Rim Lighting
  const greenLight1 = new THREE.PointLight(0x10b981, 4, 150);
  greenLight1.position.set(-20, -10, 20);
  scene.add(greenLight1);

  const greenLight2 = new THREE.PointLight(0x059669, 3, 100);
  greenLight2.position.set(30, 20, 10);
  scene.add(greenLight2);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 50, 20);
  scene.add(directionalLight);

  // Materials
  // High-gloss metallic liquid material (Emerald Tint)
  const liquidMaterial = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.1,
    metalness: 0.8,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.8
  });

  // Sharp Shard material (Teal/Silver Tint)
  const obsidianMaterial = new THREE.MeshStandardMaterial({
    color: 0xa7f3d0,
    roughness: 0.2,
    metalness: 0.9,
    flatShading: true,
    transparent: true,
    opacity: 0.7
  });

  // Groups to hold elements
  const blobs = [];
  const shards = [];

  // Create Liquid Blobs (using Sphere/Icosahedron geometry)
  const blobGeo = new THREE.IcosahedronGeometry(1, 4);
  for (let i = 0; i < 45; i++) {
    const mesh = new THREE.Mesh(blobGeo, liquidMaterial);
    
    // Random positions
    mesh.position.x = (Math.random() - 0.5) * 100;
    mesh.position.y = (Math.random() - 0.5) * 120 - 20;
    mesh.position.z = (Math.random() - 0.5) * 80 - 10;
    
    // Random scales
    const scale = Math.random() * 2.5 + 0.8;
    mesh.scale.set(scale, scale, scale);
    
    // Add custom properties for animation
    mesh.userData = {
      speed: Math.random() * 0.08 + 0.04,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      baseX: mesh.position.x,
      baseZ: mesh.position.z,
      seed: Math.random() * Math.PI * 2
    };
    
    scene.add(mesh);
    blobs.push(mesh);
  }

  // Create Emerald Shards
  const shardGeo = new THREE.TetrahedronGeometry(1, 0); // Sharp polygonal shapes
  for (let i = 0; i < 80; i++) {
    const mesh = new THREE.Mesh(shardGeo, obsidianMaterial);
    
    mesh.position.x = (Math.random() - 0.5) * 120;
    mesh.position.y = (Math.random() - 0.5) * 120 - 20;
    mesh.position.z = (Math.random() - 0.5) * 100 - 20;
    
    // Elongate and scale to look like shards
    mesh.scale.set(
      Math.random() * 1.5 + 0.5,
      Math.random() * 5 + 1.5,
      Math.random() * 1.5 + 0.5
    );
    
    // Random rotation
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    
    mesh.userData = {
      speed: Math.random() * 0.1 + 0.05,
      rotSpeedX: (Math.random() - 0.5) * 0.04,
      rotSpeedY: (Math.random() - 0.5) * 0.04,
      rotSpeedZ: (Math.random() - 0.5) * 0.04
    };
    
    scene.add(mesh);
    shards.push(mesh);
  }

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Gentle auto-rotation (no mouse tracking)
    camera.rotation.y = Math.sin(time * 0.08) * 0.15;
    camera.rotation.x = Math.cos(time * 0.06) * 0.08;

    // Animate Blobs (Drifting upwards + Wobbling)
    blobs.forEach((blob) => {
      blob.position.y += blob.userData.speed;
      
      // Wobble effect
      blob.scale.y = blob.scale.x + Math.sin(time * 2 + blob.userData.seed) * 0.2;
      blob.scale.z = blob.scale.x + Math.cos(time * 2 + blob.userData.seed) * 0.2;
      
      blob.position.x = blob.userData.baseX + Math.sin(time * blob.userData.wobbleSpeed + blob.userData.seed) * 5;
      
      // Reset if it goes too high
      if (blob.position.y > 60) {
        blob.position.y = -60;
      }
    });

    // Animate Shards (Drifting upwards + Rotating)
    shards.forEach((shard) => {
      shard.position.y += shard.userData.speed;
      shard.rotation.x += shard.userData.rotSpeedX;
      shard.rotation.y += shard.userData.rotSpeedY;
      shard.rotation.z += shard.userData.rotSpeedZ;
      
      // Reset if it goes too high
      if (shard.position.y > 60) {
        shard.position.y = -60;
      }
    });

    // Animate Lights
    greenLight1.position.x = Math.sin(time * 0.8) * 30;
    greenLight1.position.z = Math.cos(time * 0.8) * 30;
    
    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.content-section, .team-card').forEach(section => {
    observer.observe(section);
  });
});

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
