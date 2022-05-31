<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Home from './components/Home.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <Home msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/design">Design</router-link>
    <router-link to="/3d">3d</router-link>
    <router-link to="/resume">resume</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
