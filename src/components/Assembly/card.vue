<template>
  <div class="card bg-white transition-all duration-75 ease-linear border-2 border-slate-500 rounded-lg flex overflow-hidden">

    <div class="box-left bg-slate-200 overflow-hidden" @click="assembly.handleCloseCard(card.id)">
      <div :class="['n bg-slate-200 hover:opacity-0 cursor-pointer']">
        <span class="bg-slate-200/40 px-2 py-0.2 ">{{ $t("as.type") }}-{{ card.id }}</span>
      </div>
      <div class="c bg-rose-200 ">
        <span class="bg-rose-200/40  px-2 py-0.2 text-rose-500"><i class="ri-close-circle-line text-base pr-2 align-top "></i>{{ $t("as.close") }}</span>
      </div>
    </div>
    
    <div class="p-3 w-full flex flex-col gap-y-3">
      <!-- <div>
        <input type="checkbox"  class="align-middle" v-model="card.reckonIn">
        <span class="pl-2">{{ $t("as.reckonIn") }}</span>
      </div> -->
      <div class="flex">
        <div class="px-2 py-1 text-center flex justify-center bg-slate-200 active:bg-slate-300 rounded-md cursor-pointer text-slate-600" @click="assembly.handleAddItem(card.id)">
          <div class="flex items-center transition-all duration-75 ease-linear">
            <i class="ri-add-box-line  pr-1 "></i>
            <span class="block">{{ $t("as.add") }}</span>
          </div>
        </div>
        <div class="p-1 ml-2">{{ card.items.length }}</div>
      </div>
      <div>
        <ul class="flex flex-col gap-y-3">
          <slot>

          </slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../../i18n';
import CardLi from './li.vue';

export default {
  name: 'Card',
  inject: ['assembly'],
  components: {

  },
  props: ['card'],
  data() {
    return {      
      // draggedItem: null,
      // placeholderIndex: -1
    }
  },
  methods: {

  },
  watch: {

  },
  created() {

  },
}
</script>


<style lang="scss" scoped>

.box-left {
  position: relative;
  width: 32px;

  div {
    position: absolute;
    width: 9999px;
    padding: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    text-align: center;
    white-space:nowrap;

    ::after {
      content: "";
      display: block;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      position: absolute;
      left: 0;
      bottom: 0;
      background-size: 33px 32px;
    }
  }

  .n {
    background-image: repeating-linear-gradient(45deg, #ccc, #ccc 1px, transparent 2px, transparent 5px);
    z-index: 100;
  }

  .c {
    background-image: repeating-linear-gradient(45deg, #ffbebe, #ffbebe 1px, transparent 2px, transparent 5px); 
    z-index: 50;
  }
}

.card {
  min-width: 300px;
}

.container {
    padding: 120px 12px 0 12px;
}
</style>