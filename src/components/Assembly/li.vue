<template>
  <li class="relative rounded-md flex gap-x-1">
    <input type="text" class="block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-slate-300 leading-1.5" :placeholder="$t('as.item') + ' ' + item.id" 
    v-model="item.value"
    />
    <!-- <div class="p-1"><i class="ri-drag-move-fill cursor-grab active:cursor-grabbing text-slate-300  hover:text-indigo-400"></i></div> -->
    <div :class="['p-1']" @click="assembly.handleDeleteItem(cardId, item.id)"><i class="ri-indeterminate-circle-fill cursor-pointer text-slate-300 active:text-rose-500 hover:text-rose-400"></i></div>
  </li>
</template>

<script>
import i18n from '../../i18n';

// import Sortable from 'sortablejs';

export default {
  name: 'CardLi',
  inject: ['assembly'],
  props: ['item', 'cardId'],
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>


<style lang="scss" scoped>



.container {
    padding: 120px 12px 0 12px;
}
</style>