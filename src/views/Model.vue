<template>
  <div class="container mx-auto text-black dark:text-white">
    <div class="divide-y">
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("header.model") }}</h1>

      <p class="py-6">threejs示例，非作品展示，加载模型进度: {{ onProgress ?  onProgress : 0 }} / {{ onTotal ? onTotal : onProgress}}</p>
      <div id="model-canvas"></div>

    </div>
  </div>
</template>

<script>
import * as THREE from "three";

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default {
  name: 'Model',
  data() {
    this.mixer = null
    this.clock = null
    this.stats = null

    this.renderer = null
    this.secne = null
    this.camera = null
    this.controls = null
    this.onProgress = null
    this.onTotal = null

    return {
      onProgress: this.onProgress,
      onTotal: this.onTotal
    }
  },
  methods: {
    init() {
      let that = this
      this.clock = new THREE.Clock()
      const container = document.getElementById('model-canvas')

      // 记录渲染统计信息
      this.stats = new Stats()
      container.appendChild(this.stats.dom)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(this.renderer.domElement);

      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xbfe3dd);
      this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
      this.camera.position.set(5, 2, 8);


      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0.5, 0);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableDamping = true;


      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('./draco/');

      const loader = new GLTFLoader().setPath('/models/');
      loader.setDRACOLoader(dracoLoader);
      loader.load('LittlestTokyo.glb', function (gltf) {

        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        that.scene.add(model);

        that.mixer = new THREE.AnimationMixer(model);
        that.mixer.clipAction(gltf.animations[0]).play();

        that.animate();

      }, function(xhr) {
        that.onProgress = xhr.loaded
        that.onProgress = xhr.total
      }, function (e) {

        console.error(e);

      });

      
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      const delta = this.clock.getDelta();
      if (this.mixer) {
        this.mixer.update(delta);
      }
      this.controls.update();
      this.stats.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init()
    this.animate()
  }
  
}
</script>


<style lang="scss" scoped>

#model-canvas {
  width: 100%;
  height: 880px;
  
}
.container {
    padding: 120px 12px 0 12px;
}
</style>