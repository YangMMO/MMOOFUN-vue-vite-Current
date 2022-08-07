<template>
  <div class="mx-auto text-black dark:text-white mb-9">
    <h1 class="text-xl pb-6 font-semibold select-none">Three 占位示例</h1>

    <div>网站升级建设中，该建模为three.js示例</div>
    <div class="">

      <p class="pb-6">加载模型进度: {{ onProgress >= 100 ? '渲染中...' : onProgress + '%' }}</p>
      <div id="model-canvas" class="box overflow-hidden"></div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import * as THREE from "three";

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default {
  name: 'Model',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.model")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  data() {
    this.mixer = null
    this.clock = null
    this.stats = null

    this.renderer = null
    this.secne = null
    this.camera = null
    this.controls = null
    this.onProgress = 0

    this._startFrame = false

    return {
      onProgress: this.onProgress
    }
  },
  methods: {
    init() {
      let that = this
      this.clock = new THREE.Clock()
      const container = document.getElementById('model-canvas')

      // 记录渲染统计信息
      this.stats = new Stats()
      
      this.stats.dom.style.position = 'absolute'

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

      this.camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 100);
      this.camera.position.set(5, 2, 8);

      that.onClickLoader()


      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0.5, 0);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      
    },
    animate: function () {
      if (this._startFrame) {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        if (this.mixer) {
          this.mixer.update(delta);
        }
        this.controls.update();
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
      } else {
        cancelAnimationFrame(this.animate)
      }
    },
    onClickLoader() {
      let that = this

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('./draco/');

      const loader = new GLTFLoader().setPath('./models/');
      loader.setDRACOLoader(dracoLoader);
      loader.load('LittlestTokyo.glb', function (gltf) {

        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        that.scene.add(model);

        that.mixer = new THREE.AnimationMixer(model);
        that.mixer.clipAction(gltf.animations[0]).play();

        that._startFrame = true
        that.animate();

      }, function (xhr) {

        that.onProgress = (xhr.loaded / xhr.total * 100).toFixed(2);
        // console.log(that.onProgress)
      }, function (e) {

        console.error(e);

      });
    }
  },
  mounted() {
    this.init()
    // this.animate()
  },
  unmounted() {
    this._startFrame = false
    // cancelAnimationFrame(this.animate)
  }
  
}
</script>


<style lang="scss" scoped>

#model-canvas {
  width: 100%;
  height: 460px;
  position: relative;
}
.container {
    padding: 120px 12px 0 12px;
}
</style>