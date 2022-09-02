<template>
  <div class="mx-auto text-black dark:text-white mb-9">
    <h1 class="text-xl pb-6 font-semibold select-none">模型展示</h1>
    <div class="w-full">

      <div class="mb-3 grid grid-cols-4 gap-2">
        <button v-for="item in modelNameArr" :key="item.name" class="box p-1 px-2 tools-item border-2 border-gray-300 dark:border-gray-600 m"  @click="onClickLoader(item.glb)">{{ item.name }}</button>
      </div>

      <p class="pb-3">加载进度: {{ onProgress }}</p>

      <div id="model-canvas" :class="['box overflow-hidden', {'bg-gray-100': !_isLoading}]"></div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';

import { Vika } from "@vikadata/vika";

const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const glb_Datasheet = vika.datasheet("dstLlVn0WmXTN7yd6M");


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
    this.dracoLoader = null
    this.loader = null;

    this.onProgress = 0
    this.onTotal = 0
    this.group = null

    this._startFrame = false
    this._isLoading = false
    this.runAnimate = false;

    return {
      onProgress: this.onProgress,
      onTotal: this.onProgress,
      modelNameArr: [
        {
          name: 'Three 官方示例 (4MB)',
          glb:  'LittlestTokyo.glb'
        }, {
          name: '3D NFT Car 1 (3.8MB)',
          glb:  'car1_0.glb'
        }, {
          name: '3D NFT Car 2 (3.7MB)',
          glb:  'car2_0.glb'
        }, {
          name: '3D NFT Car 3 (4.7MB)',
          glb:  'car3_0.glb'
        }
      ]
    }
  },
  methods: {
    async init() {
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

      this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 100);
      this.camera.position.set(40, 10, 0);

      this.group = new THREE.Group();

      that.onClickLoader(that.modelNameArr[0].glb)
      // await that.getGlb(that.getGlb(that.glb_data[0].fields.id))
      // console.log(await that.glb_data);


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
    onClickLoader(modelGlb) {
      let that = this;
      let xAxis;
      let yAxis;
      let zAxis;

      if (that._isLoading) {
        console.log('加载中');
        return;
      }

      that.dracoLoader = new DRACOLoader();
      that.dracoLoader.setDecoderPath('./draco/');

      that.loader = new GLTFLoader().setPath('./models/');
      that.loader.setDRACOLoader(that.dracoLoader);

      that.group.children.forEach(child => {
          that.group.remove(child);
      });
      that.scene.remove(that.group)

      that.mixer = null;

      that.loader.load(modelGlb, function (gltf) {
        const model = gltf.scene;

        switch(modelGlb) {
          case 'LittlestTokyo.glb':
            model.position.set(1, 4, 0);
            model.scale.set(0.05, 0.05, 0.05);

            //调用方式，设置x、y、z轴的旋转);
            yAxis = new THREE.Vector3(0, 1, 0);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 1.4);

            that.group.add(model)
            that.scene.add(that.group);

            that.mixer = new THREE.AnimationMixer(model);
            that.mixer.clipAction(gltf.animations[0]).play();

            break;
          case 'car1_0.glb':
            model.position.set(2, 0, 0);
            model.scale.set(6, 6, 6);

            //调用方式，设置x、y、z轴的旋转
            yAxis = new THREE.Vector3(0, 1, 0);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 1.4);

            that.group.add(model)
            that.scene.add(that.group);

            break;
          case 'car2_0.glb':
            model.position.set(2, 0, 0);
            model.scale.set(6, 6, 6);

            //调用方式，设置x、y、z轴的旋转
            yAxis = new THREE.Vector3(0, 1, 0);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 1.4);

            that.group.add(model)
            that.scene.add(that.group);

            break;
          case 'car3_0.glb':
            model.position.set(2, 0, 0);
            model.scale.set(6, 6, 6);

            //调用方式，设置x、y、z轴的旋转
            yAxis = new THREE.Vector3(0, 1, 0);
            //模型、旋转轴和旋转角度（弧度）
            that.rotateAroundWorldAxis(model, yAxis, Math.PI / 4);

            that.group.add(model)
            that.scene.add(that.group);

            break;
          default: 
            break;
        }
        that.animate();

      }, function (xhr) {

        // that.onProgress = (xhr.loaded / xhr.total * 100).toFixed(2);
        that.onProgress = xhr.loaded;
        that.onTotal = xhr.total;
        if (xhr.loaded < xhr.total) {
          that._startFrame = false;
          that._isLoading = true
        } else {
          that._startFrame = true;
          that._isLoading = false;
        }
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
    },
  },
  mounted() {
    this.init()
    // this.animate()
  },
  unmounted() {
    this._startFrame = false
    // cancelAnimationFrame(this.animate)
  },
  
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