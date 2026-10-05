import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';

const stage = document.querySelector('#aligner-viewer');
const canvasHost = stage?.querySelector('.aligner-3d-canvas');
const status = stage?.querySelector('.aligner-3d-status');

if (stage && canvasHost && status) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.35, 4.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.domElement.setAttribute('aria-label', 'Interactive 3D model of a clear dental aligner');
  renderer.domElement.tabIndex = 0;
  canvasHost.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xfff4dd, 0x795b3d, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(-3, 4, 5);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xb9e8ff, 1.15);
  fillLight.position.set(4, 1, -3);
  scene.add(fillLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 2.4;
  controls.maxDistance = 6.5;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.55;
  controls.target.set(0, 0, 0);

  const presets = {
    front: new THREE.Vector3(0, 0.45, 4.2),
    top: new THREE.Vector3(0, 4.2, 0.05),
    side: new THREE.Vector3(4.2, 0.45, 0.05)
  };

  const resize = () => {
    const { width, height } = canvasHost.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvasHost);
  resize();

  const loader = new GLTFLoader();
  let loaded = false;

  const loadModel = () => {
    if (loaded) return;
    loaded = true;
    loader.load(
      'assets/teethaligner.glb',
      (gltf) => {
        const model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const dimensions = bounds.getSize(new THREE.Vector3());
        const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);
        model.position.sub(center);
        model.scale.setScalar(2.5 / largestDimension);
        scene.add(model);
        stage.classList.add('is-loaded');
        controls.target.set(0, 0, 0);
        resize();
      },
      (event) => {
        if (event.total) status.textContent = `Loading aligner model ${Math.round(event.loaded / event.total * 100)}%`;
      },
      () => {
        status.textContent = '3D model could not be loaded';
        stage.classList.add('has-error');
      }
    );
  };

  if ('IntersectionObserver' in window) {
    const loadObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadModel();
        loadObserver.disconnect();
      }
    }, { rootMargin: '250px' });
    loadObserver.observe(stage);
  } else {
    loadModel();
  }

  stage.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      stage.querySelectorAll('[data-view]').forEach((viewButton) => {
        const active = viewButton === button;
        viewButton.classList.toggle('is-active', active);
        viewButton.setAttribute('aria-pressed', String(active));
      });
      camera.position.copy(presets[button.dataset.view]);
      controls.target.set(0, 0, 0);
      controls.update();
    });
  });

  stage.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.action === 'zoom-in' || button.dataset.action === 'zoom-out') {
        const direction = camera.position.clone().sub(controls.target);
        const factor = button.dataset.action === 'zoom-in' ? 0.82 : 1.22;
        const distance = THREE.MathUtils.clamp(direction.length() * factor, controls.minDistance, controls.maxDistance);
        direction.setLength(distance);
        camera.position.copy(controls.target).add(direction);
        controls.update();
      }

      if (button.dataset.action === 'rotation') {
        controls.autoRotate = !controls.autoRotate;
        button.setAttribute('aria-pressed', String(controls.autoRotate));
        button.setAttribute('aria-label', controls.autoRotate ? 'Pause model rotation' : 'Resume model rotation');
        button.title = controls.autoRotate ? 'Pause rotation' : 'Resume rotation';
        button.textContent = controls.autoRotate ? 'Ⅱ' : '▶';
      }
    });
  });

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
}