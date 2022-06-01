<template>
  <div class="header">
    <div class="title box box-shadow p8">
      MMOO.FUN
    </div>

    <nav class="menu box box-shadow">
      <router-link class="p8" to="/">{{ $t("header.home") }}</router-link>
      <router-link class="p8" to="/design">{{ $t("header.design") }}</router-link>
      <router-link class="p8" to="/model">{{ $t("header.model") }}</router-link>
      <router-link class="p8" to="/resume">{{ $t("header.resume") }}</router-link>
    </nav>
  </div>


  <router-view />
</template>

<script lang="ts">

</script>

<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  top: 0;
  color: $G85;
  z-index: 9999;

  .title {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1rem;
    font-weight: 600;
  }

  .menu {
    position: absolute;
    top: 20px;
    right: 20px;
    a {
      display: inline-block;
      font-size: 1rem;
    }
  }
}
</style>