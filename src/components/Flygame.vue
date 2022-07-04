<template>
  <div class="w-full mx-auto text-black dark:text-white">
    <iframe src="http://flygame.mmoo.fun/" frameborder="0" class="w-full fly-game"></iframe>
  </div>
</template>

<script>
import i18n from '../i18n';
import designJson from '../assets/json/design.json';


export default {
  name: 'FlyGame',
  data() {
    return {
      datas: JSON.parse(JSON.stringify(designJson)),
    }
  },
}
</script>


<style lang="scss" scoped>



.fly-game {
  width: 700px;
  height: 600px;
}

</style>