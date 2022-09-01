<template>
  <div class="mx-auto text-black dark:text-white mb-9">
    <h1 class="text-xl pb-6 font-semibold select-none">模型展示</h1>
    <div class="w-full">
      <div class="mb-1">
        <button v-for="item in modelNameArr" :key="item.name" class="button-m box p-1 px-2 tools-item border-2 border-gray-300 dark:border-gray-600 m"  @click="onClickLoader(item.glb)">{{ item.name }}</button>
      </div>
      <p class="pb-3">加载模型进度: {{ onProgress + '%' }}</p>
      <!-- <button @click="onClickLoader('car2_2.glb')">three官方示例</button> -->
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
    this.group = null

    this._startFrame = false

    return {
      onProgress: this.onProgress,
      modelNameArr: [
        {
          name: 'Three官方示例',
          glb:  'LittlestTokyo.glb'
        }, {
          name: 'NFT车模型1',
          glb:  'car2_2.glb'
        }, {
          name: 'NFT车模型2',
          glb:  'car3_0.glb'
        }
      ]
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

      this.camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 80);
      this.camera.position.set(50, 20, 8);

      this.group = new THREE.Group();

      that.onClickLoader(that.modelNameArr[0].glb)


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
    onClickLoader(modelName) {
      let that = this;

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('./draco/');

      const loader = new GLTFLoader().setPath('./models/');
      loader.setDRACOLoader(dracoLoader);
      loader.load(modelName, function (gltf) {
        const model = gltf.scene;
        let xAxis;
        let yAxis;
        let zAxis;

        that.group.children.forEach(child => {
          that.group.remove(child);
        });

        switch(modelName) {
          case 'LittlestTokyo.glb':
            model.position.set(1, 4, 0);
            model.scale.set(0.05, 0.05, 0.05);

            //调用方式，设置x、y、z轴的旋转
            xAxis = new THREE.Vector3(1, 0, 0);
            yAxis = new THREE.Vector3(0, 1, 0);
            zAxis = new THREE.Vector3(0, 0, 2);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 1.4);

            that.group.add(model)
            that.scene.add(that.group);

            that.mixer = new THREE.AnimationMixer(model);
            that.mixer.clipAction(gltf.animations[0]).play();

            that._startFrame = true;
            break;
          case 'car2_2.glb':
            model.position.set(2, 0, 0);
            model.scale.set(6, 6, 6);

            //调用方式，设置x、y、z轴的旋转
            xAxis = new THREE.Vector3(1, 0, 0);
            yAxis = new THREE.Vector3(0, 1, 0);
            zAxis = new THREE.Vector3(0, 0, 2);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 1.4);

            that.group.add(model)
            that.scene.add(that.group);

            that._startFrame = true;
            break;
          case 'car3_0.glb':
            model.position.set(2, 0, 0);
            model.scale.set(6, 6, 6);

            //调用方式，设置x、y、z轴的旋转
            xAxis = new THREE.Vector3(1, 0, 0);
            yAxis = new THREE.Vector3(0, 1, 0);
            zAxis = new THREE.Vector3(0, 0, 2);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 1.4);

            that.group.add(model)
            that.scene.add(that.group);

            that._startFrame = true;
            break;
          default: 
            break;
        }


        that.animate();

      }, function (xhr) {

        that.onProgress = (xhr.loaded / xhr.total * 100);
        // console.log(that.onProgress)
      }, function (e) {

        console.error(e);

      });
    },
    rotateAroundWorldAxis(object, axis, radians) {
      let rotWorldMatrix = new THREE.Matrix4();
      rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
      rotWorldMatrix.multiply(object.matrix); 
      object.matrix = rotWorldMatrix; 
      object.rotation.setFromRotationMatrix(object.matrix);
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
.button-m {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>