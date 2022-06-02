<template>
  <div class="header">
    <div class="flex-header title box box-shadow p8">
      <img src="./assets/img/mmo.jpg" alt="">
      MMOO.FUN
    </div>

    <div class="menu-fun">
      <!-- 语言 -->
      <div class="flex-header lua box box-shadow p8"
        @click="switchLang()"
      ><i class="ri-globe-line"></i></div>
      <!-- 主题 -->
      <div class="flex-header lua box box-shadow p8"><i class="ri-sun-line"></i></div>
      <!-- 菜单 -->
      <div class="flex-header menu box box-shadow p8">
        <!-- <div class=" ">{{ page }}{</div> -->
        <nav>
          <router-link  to="/">{{ $t("header.home") }}</router-link>
          <router-link  to="/design">{{ $t("header.design") }}</router-link>
          <router-link  to="/model">{{ $t("header.model") }}</router-link>
          <router-link  to="/resume">{{ $t("header.resume") }}</router-link>
        </nav>

      </div>
    </div>

  </div>


  <router-view />
</template>

<script lang="ts">
import i18n from "./i18n"

type PageType = "home" | "design" | "model" | "resume"

export default {
  name: 'App',
  setup() {
    // i18n.setLocale('en')
    return {
      page: 'home' as PageType,
    }
  },
  methods: {
    switchLang() {
      i18n.setLocale(i18n.getLocale() === 'en' ? 'cn' : 'en')
    }
  },
}
</script>

<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  top: 0;
  color: $G85;
  z-index: 9999;

  .flex-header {
    display: flex;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
  }

  .title {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1rem;
    font-weight: 600;
    cursor: default;

    img {
      margin-right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 100%;
    }
  }

  .menu-fun {
    position: absolute;
    top: 20px; 
    right: 20px;
    display: flex;

    .box {
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }

    .lua {
      font-size: 1.4rem;
      cursor: pointer;
    }

  }


  .menu {
    width: auto;
    nav {
      transition: all .5s;

      a {
        padding: 8px;
        font-size: 1rem;
        font-weight: 600;
        transition: all .5s;
      }
    }

  }


}
</style>