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
  const footer = document.querySelector('footer');
  const petals = Array.from({ length: count }, () => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.11 + Math.random() * 0.12, 0.2 + Math.random() * 0.13, 0.025);
    mesh.position.set(Math.random() * 24 - 12, Math.random() * 24 - 12, Math.random() * 2);
    mesh.userData = {
      speed: 0.006 + Math.random() * 0.008,
      landingSpeed: 0.055 + Math.random() * 0.045,
      drift: Math.random() * Math.PI * 2,
      spin: 0.005 + Math.random() * 0.01,
      groundOffset: Math.random() * 0.12,
      landed: false,
    };
    scene.add(mesh);
    return mesh;
  });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    const aspect = w / h;
    camera.left = -10 * aspect; camera.right = 10 * aspect;
    camera.top = 10; camera.bottom = -10;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let frame, last = 0, wasGroundVisible = false;
  function animate(t) {
    frame = requestAnimationFrame(animate);
    if (document.hidden) { last = t; return; }
    const delta = Math.min((t - last) / 16.67 || 1, 3);
    last = t;

    // The floor follows the footer in viewport coordinates as the page scrolls.
    const footerBounds = footer?.getBoundingClientRect();
    const groundVisible = !!footerBounds && footerBounds.top < window.innerHeight && footerBounds.bottom <= window.innerHeight + 1 && footerBounds.bottom > 14;
    const groundY = groundVisible ? 10 - ((footerBounds.bottom - 14) / window.innerHeight) * 20 : null;

    for (const p of petals) {
      const state = p.userData;
      if (groundVisible && !wasGroundVisible && p.position.y < groundY) {
        p.position.y = groundY + 1 + Math.random() * 4;
      }
      if (!groundVisible && state.landed) {
        state.landed = false;
        p.position.y = 10 + Math.random() * 3;
        p.position.x = (Math.random() - 0.5) * (camera.right - camera.left);
      }
      if (groundVisible && state.landed) {
        p.position.y = groundY + state.groundOffset;
        continue;
      }

      state.drift += 0.008 * delta;
      p.position.y -= (groundVisible ? state.landingSpeed : state.speed) * delta;
      p.position.x += Math.sin(state.drift) * 0.005 * delta;
      p.rotation.x += state.spin * delta;
      p.rotation.z += state.spin * 0.5 * delta;

      if (groundVisible && p.position.y <= groundY + state.groundOffset) {
        p.position.y = groundY + state.groundOffset;
        p.rotation.x = 0;
        p.rotation.y = 0;
        p.rotation.z = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
        state.landed = true;
      } else if (!groundVisible && p.position.y < -11) {
        p.position.y = 11;
        p.position.x = (Math.random() - 0.5) * (camera.right - camera.left);
      }
    }
    wasGroundVisible = groundVisible;
    renderer.render(scene, camera);
  }
  frame = requestAnimationFrame(animate);
  return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
}

