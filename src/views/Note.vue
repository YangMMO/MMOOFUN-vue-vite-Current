<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold">{{ $t("menu.note") }}</h1>

      <!-- <iframe src="https://www.yuque.com/books/share/a6be214a-325a-4104-b29d-c2ffd9f2598a?# 《Typescript》"
        frameborder="0" class="w-full"></iframe> -->

      <!-- <ul v-for="note in data" :key="note" class="py-6">
        <li>
          <div>{{ note.noteName }}</div>

          <ul v-for="chapter in note.chapter" :key="chapter" class="py-3">
            <li>
              <div>{{ chapter.chapterName }}</div>

              <ul v-for="item in chapter.pathArr" :key="item" class="px-3">
                <li @click="clickChapter(item.title)">{{ item.title }}</li>
              </ul>

            </li>
          </ul>

        </li>
      </ul> -->

      <div>读取markdown文件内容，插入至html</div>
      <div>功能完善中</div>
      <div class="mb-6">以下为插入成功示例</div>
      <v-md-preview :text="content" class="box overflow-hidden"></v-md-preview>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import noteJson from '../assets/json/note.json';

import a1 from '../../public/markdown/typescript/环境搭建.md';

// JSON.parse(JSON.stringify(noteJson)).forEach(element => {
//   element.chapter.forEach(e => {
//     e.pathArr.forEach(item => {
//       // import item.title from item.path;
//       // console.log(item.path);
      
//     })
//   });
// });


export default {
  name: 'Note',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.note")}`,
    meta: [{
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(noteJson)),
      content: a1.render().children[0].children,
      noteList: [
       'typescript',
       'houdini'
      ]
    };
  },
  methods: {
    clickChapter (e) {
      console.log(e);

      var promise = fetch(e).then(function (response) {

        //response.status表示响应的http状态码
        if (response.status === 200) {
          //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
          return response.json();
        } else {
          return {}
        }


      });

      promise = promise.then(function (data) {
        //响应的内容
        console.log(data);
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
}
</script>


<style lang="scss" scoped>

.tag {
  margin-right: 4px;
  margin-bottom: 4px;
  &:last-child {
    margin-right: 0;
  }
}

.design-item {
  width: calc(50% - 4px);
  height: auto;
  margin-right: 8px;
  margin-bottom: 8px;

  &:nth-child(even) {
    margin-right: 0;
  }
}

.container {
    padding: 120px 12px 0 12px;
}
</style>