<template>
  <div class="container mx-auto text-black dark:text-white">
    <div class="divide-y">
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("menu.model") }}</h1>

      <div id="model-canvas"></div>

    </div>
  </div>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// let camera, scene, renderer;

export default {
  name: 'Model',
  data() {
      this.camera = null,
      this.scene =  null,
      this.renderer =  null,
      this.mesh =  null
    return {

    }
  },
  methods: {
    init: function () {
      let container = document.getElementById('model-canvas')
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new Three.MeshNormalMaterial()
      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)

      this.renderer = new Three.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
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
  height: 400px;
  
}
.container {
    padding: 120px 12px 0 12px;
}
</style>