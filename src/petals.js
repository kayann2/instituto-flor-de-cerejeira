import * as THREE from 'three';

export function startPetals(container) {
  if (!container) return () => {};
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }); } catch { return () => {}; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100);
  camera.position.z = 20;
  const geometry = new THREE.SphereGeometry(1, 8, 6);
  const material = new THREE.MeshBasicMaterial({ color: 0xe6aab3, transparent: true, opacity: 0.62, side: THREE.DoubleSide, depthWrite: false });
  const count = window.innerWidth < 700 ? 14 : 28;
  const petals = Array.from({ length: count }, () => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.11 + Math.random() * 0.12, 0.2 + Math.random() * 0.13, 0.025);
    mesh.position.set(Math.random() * 24 - 12, Math.random() * 24 - 12, Math.random() * 2);
    mesh.userData = { speed: 0.006 + Math.random() * 0.008, drift: Math.random() * Math.PI * 2, spin: 0.005 + Math.random() * 0.01 };
    scene.add(mesh); return mesh;
  });
  function resize() { const w = window.innerWidth, h = window.innerHeight; renderer.setSize(w, h); const aspect = w / h; camera.left = -10 * aspect; camera.right = 10 * aspect; camera.top = 10; camera.bottom = -10; camera.updateProjectionMatrix(); }
  resize(); window.addEventListener('resize', resize);
  let frame, last = 0;
  function animate(t) { frame = requestAnimationFrame(animate); if (document.hidden) { last = t; return; } const delta = Math.min((t - last) / 16.67 || 1, 3); last = t; for (const p of petals) { p.userData.drift += 0.008 * delta; p.position.y -= p.userData.speed * delta; p.position.x += Math.sin(p.userData.drift) * 0.005 * delta; p.rotation.x += p.userData.spin * delta; p.rotation.z += p.userData.spin * 0.5 * delta; if (p.position.y < -11) { p.position.y = 11; p.position.x = (Math.random() - 0.5) * (camera.right - camera.left); } } renderer.render(scene, camera); }
  frame = requestAnimationFrame(animate);
  return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
}

