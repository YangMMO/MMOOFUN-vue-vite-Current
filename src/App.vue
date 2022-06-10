<template>
  <div class="container mx-auto bg-white dark:bg-gray-800 transition-all ">
    <div class="header relative">
      <div
        class="flex-header title box p8 shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all font-semibold">
        <img src="./assets/img/mmo.jpg" alt="">
        MMOO.FUN
      </div>

      <div class="menu-fun">
        <!-- 菜单 -->
        <div
          class="flex-header menu box p8 shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all font-semibold">
          <!-- <div class=" ">{{ page }}</div> -->
          <nav>
            <router-link to="/">{{ $t('header.home') }}</router-link>
            <!-- <router-link  to="/design">{{ $t("header.design") }}</router-link> -->
            <router-link to="/model">{{ $t("header.model") }}</router-link>
            <!-- <router-link  to="/resume">{{ $t("header.resume") }}</router-link> -->
            <router-link to="/update">{{ $t("header.update") }}</router-link>
          </nav>

        </div>

        <!-- 语言 -->
        <div
          class="flex-header fun lua box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all"
          @click="switchLang()"><i class="ri-globe-line"></i></div>
        <!-- 主题 -->

        <div
          class="flex-header fun box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all"
          @click="themesMode()">
          <Transition name="switch-theme">
            <i class="ri-sun-line absolute" v-if="theme === 'light'"></i>
            <i class="ri-moon-line absolute" v-else-if="theme === 'dark'"></i>
          </Transition>
        </div>

      </div>

    </div>


    <router-view />
  </div>
</template>

<script>
import i18n from "./i18n"

export default {
  name: 'App',
  data() {
    return {
      page: 'home',
      theme: 'light',
    }
  },
  methods: {
    // 切换语言
    switchLang() {
      i18n.setLocale(i18n.getLocale() === 'en' ? 'cn' : 'en')
    },

    // 切换主题
    themesMode() {
      if (this.theme === 'light') {
        this.theme = 'dark'
        const clsList = document.documentElement.classList;
        if(!clsList.contains('dark')) {
          document.documentElement.classList.add('dark');
        }
      } else {
        this.theme = 'light'
        document.documentElement.classList.remove('dark')
      }

      // console.log(this.theme);
    }
  },
}
</script>

<style lang="scss">
.bg-stripes-white {
    --stripes-color: hsla(0,0%,100%,0.4);
}

.bg-stripes{
  background-image: linear-gradient(45deg,var(--stripes-color) 12.5%,transparent 12.5%,transparent 50%,var(--stripes-color) 50%,var(--stripes-color) 62.5%,transparent 62.5%,transparent 100%);
  background-size: 5.66px 5.66px;
}

.switch-theme-enter-active,
.switch-theme-leave-active {
  transition: all 0.25s ease-out;
}

.switch-theme-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.switch-theme-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.icon-font-size {
  font-size: 1.4rem;
}

.header {
  // position: fixed;
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
    top: 12px;
    left: 12px;
    font-size: 1rem;
    // font-weight: 600;
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
    top: 12px; 
    right: 12px;
    display: flex;

    .box {
      margin-right: 4px;
      &:last-child {
        margin-right: 0;
      }
    }

    .fun {
      width: 40px;
      position: relative;
      font-size: 1.4rem;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;

      i {
        width: 100%;
      }

      // .ri-globe-line {
      //   // transition: transform 0.5s;
      //   &:hover {
      //     // transform: rotateY(360deg);
      //     animation: rotateY 1s infinite;
      //   }

      //   @keyframes rotateY {
      //     from {
      //       transform: rotateY(0deg);
      //     }
      //     to {
      //       transform: rotateY(360deg);
      //     }
      //   }
      // }
    }

    .lua {
      &:hover {
        // transform: rotateY(360deg);
        animation: rotateY 1s 1;
        transition: all 0.5s;
      }
    
      @keyframes rotateY {
        0% {
          transform: rotateX(0deg);
          box-shadow: none;
        }
    
        90% {
          transform: rotateX(360deg);
          box-shadow: none;
        }

        100% {
          transform: rotateX(360deg);
          box-shadow: auto;
        }
      }
      
    }

  }


  .menu {
    width: auto;
    nav {
      // transition: all .5s;

      a {
        padding: 8px;
        font-size: 1rem;
        // font-weight: 600;
        // transition: all .5s;
      }
    }

  }
}


</style>