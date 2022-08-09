<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <div class="select-none pb-9" id="sTop">
        <h1 class="text-3xl  font-semibold select-none inline-block align-middle">{{ $t("menu.bbs") }}</h1>
        <span class="align-middle text-sm  ml-2 px-2 py-1 bg-gray-100 box gradient-red mr-1">{{ bbsDataLength }}</span>
        <div class="align-middle text-sm px-2 py-1 box inline-block float-right text-gray-400 dark:text-gray-500 transition-all duration-75 ease-linear">
          <!-- <i class="ri-emotion-happy-line align-middle mr-1 inline-block"></i> -->
          <span>{{ $t("_.visitor") + " " + app.visitor }}</span>
        </div>
     </div>
    
      <!-- 墙面 -->
      <div class="mb-6 ">
        <!-- <div class="text-xl font-semibold mb-3">{{ $t("bbs.sendWord") }} </div> -->
        <div class="box sticky  overflow-hidden text-black dark:text-black">
          <div class="py-12 px-3 bg-stripes bg-stripes-white">
            <v-md-preview :text="board" class=""></v-md-preview>
          </div>
        </div>
      </div>

      <!-- 读取判断展示 -->
      <div v-if="isGet === false">
        <get-progress></get-progress>
      </div>

      <div v-else-if="isGet === true && isGetFinish === false">
        <get-error></get-error>
      </div>
      

      <!-- 渲染读取的数据 -->
      <div v-else class="mb-9 px-4 py-12 sm:px-8 bg-white dark:bg-slate-900  transition-all duration-75 ease-linea box">
        <!-- 页数 -->
        <div class="flex box-b items-center justify-center space-x-3 ">
          <!-- 首页 -->
          <div @click="currentPage <= 1 ? retrun : getBBS(1)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box cursor-pointer transition-all duration-75 ease-linea']">
            <i class="ri-arrow-left-s-line"></i>
          </div>

          <!-- 上一页 -->
          <div @click="currentPage <= 1 ? retrun : getBBS(--currentPage)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box transition-all duration-75 ease-linea', { 'cursor-default border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600': currentPage === 1 }, { 'cursor-pointer': currentPage !== 1 }]">
            <i class="ri-arrow-left-s-line"></i>
          </div>

          <!-- 页码 -->
          <div class="flex-1 text-center">{{ currentPage }} / {{ totalPage }}</div>

          <!-- 下一页 -->
          <div @click="currentPage >= totalPage ? retrun : getBBS(++currentPage)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box cursor-pointer transition-all duration-75 ease-linea', { 'cursor-default border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600': currentPage === totalPage }, { 'cursor-pointer': currentPage !== totalPage }]">
            <i class="ri-arrow-right-s-line"></i>
          </div>

          <!-- 尾页 -->
          <div @click="currentPage >= totalPage ? retrun : getBBS(totalPage)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box cursor-pointer cursor-pointer transition-all duration-75 ease-linea']">
            <i class="ri-arrow-right-s-line"></i>
          </div>
        </div>

        <div class="flex flex-col py-12">
          <div v-for="(data, index) in bbsData" :key="index" class="mb-12 last:mb-3 box ">
            <!-- 被BAN -->
            <div v-show="data.fields.ban">
              <div class="box flex mb-3">
                <!-- 头像 -->
                <div :class="['avatar mr-3 sm:mr-6 transition-all duration-75 ease-linear', { 'gradient-silver': data.fields.publicEmail }, { 'gradient-silver': !data.fields.publicEmail }]">
                  <i class="ri-skull-line align-middle icon-font-size"></i>
                </div>

                <!-- 用户名 -->
                <div class="flex-1">
                  <div class="flex justify-center flex-1 flex-col">
                    <div class="flex-1">
                      <div class="">
                        <h3 class="text-lg align-middle inline-block font-semibold icon-font-size transition-all duration-75 ease-linea text-black dark:text-white">
                          {{ data.fields.violationUsername ? $t("bbs._.violationUser") :data.fields.bbsUsername }}
                        </h3>
                        <i class="ri-ghost-smile-line align-middle icon-font-size opacity-0"></i>
                      </div>

                    </div>
                    
                    <!-- 楼层 & 时间 -->
                    <div class="flex mb-3 text-gray-400 dark:text-gray-500 transition-all duration-75 ease-linear">
                      <p class="flex-initial text-sm select-none mr-3">
                        {{ 
                          (app.lang === 'en' ?  $t("bbs.floor") + ' ' : '第') + 
                          data.fields.id + 
                          (app.lang === 'en' ? "" : $t("bbs.floor"))
                        }}
                      </p>
                      <p class="flex-initial text-sm select-none">
                        {{ moment(data.fields.createDate).format('YYYY-MM-DD h:mm') }}
                      </p>
                    </div>
                  </div>

                </div>


              </div>

              <div class="box flex">
                
                <!-- 响应占位元素 -->
                <div class="avatar mr-6 flex-shrink-0 hidden sm:block"></div>
                
                <div class="w-full">
                  <div class="mb-3 py-3 sm:py-0 text-red-400 dark:text-red-400 transition-all duration-75 ease-linear">
                    {{ $t("bbs._.violation") }}
                  </div>
                  
                  <div class="w-full box bg-slate-100 dark:bg-slate-700 mt-6 flow-root px-3 text-left transition-all duration-75 ease-linear">

                    <!-- 点赞 -->
                    <div class="text-base sm:text-sm select-none px-0 py-1 mx-3 my-2 h-full cursor-pointer inline-block text-gray-300 ">
                      <i  class="ri-thumb-up-fill align-middle"></i>
                      <span class="ml-2 sm:ml-2">
                        <!-- {{ app._innerWidth > 640 ? $t("bbs.like") + " " + data.fields.like : data.fields.like }} -->
                        {{ $t("bbs.like") + " " + data.fields.like}}
                      </span>
                    </div>

                    <!-- 踩踩 -->
                    <div class="text-base sm:text-sm select-none px-0 py-1 mx-3 my-2 h-full cursor-pointer inline-block text-gray-300">
                      <i  class="ri-thumb-down-fill align-text-bottom"></i>
                      <span class="ml-2 sm:ml-2">
                        <!-- {{ app._innerWidth > 640 ? $t("bbs.foot") + data.fields.foot : data.fields.foot }} -->
                        {{ $t("bbs.foot") + " " + data.fields.foot}}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <!-- 允许的留言 -->
            <div v-show="!data.fields.ban">
              <div class="box flex mb-3">
                <!-- 头像 -->
                <div :class="['avatar mr-3 sm:mr-6 transition-all duration-75 ease-linear', { 'gradient-gold': data.fields.publicEmail && !data.fields.violationUsername }, { 'gradient-drill': !data.fields.publicEmail && !data.fields.violationUsername }, { 'gradient-silver': data.fields.violationUsername }, { 'gradient-silver': data.fields.publicEmail && data.fields.violationUsername }]">
                  <i v-show="data.fields.publicEmail" class="ri-bear-smile-line align-middle icon-font-size"></i>
                  <i v-show="!data.fields.publicEmail" class="ri-spy-line align-middle icon-font-size "></i>
                </div>

                <!-- 用户名 -->
                <div class="flex-1">
                  <div class="flex justify-center flex-1 flex-col">
                    <div class="flex-1">
                      <div class="">
                        <h3 class="text-lg align-middle inline-block font-semibold icon-font-size transition-all duration-75 ease-linea text-black dark:text-white">
                          {{ data.fields.violationUsername ? $t("bbs._.violationUser") :data.fields.bbsUsername }}
                        </h3>
                        <i class="ri-ghost-smile-line align-middle icon-font-size opacity-0"></i>
                      </div>

                    </div>
                    
                    <!-- 楼层 & 时间 -->
                    <div class="flex mb-3 text-gray-400 dark:text-gray-500 transition-all duration-75 ease-linear">
                      <p class="flex-initial text-sm mr-3">
                        {{ 
                          (app.lang === 'en' ?  $t("bbs.floor") + ' ' : '第') + 
                          data.fields.id + 
                          (app.lang === 'en' ? "" : $t("bbs.floor"))
                        }}
                      </p>
                      <p class="flex-initial text-sm mr-3">
                        {{ moment(data.fields.createDate).format('YYYY-MM-DD HH:mm') }}
                      </p>
                      <p v-show="data.fields.publicEmail" class="flex-initial text-sm " >
                        {{ data.fields.citySN ? JSON.parse(data.fields.citySN).cname  : '' }}
                      </p>
                    </div>
                  </div>

                </div>
      
              </div>
              <!-- {{ data.fields }} -->

              <div class="box flex ">
                
                <!-- 响应占位元素 -->
                <div class="avatar mr-6 flex-shrink-0 hidden sm:block"></div>
                
                <div class="w-full">
                  <div class="mb-3 py-3 sm:py-0 text-gray-600 dark:text-gray-300 transition-all duration-75 ease-linear">
                    <v-md-preview :text="data.fields.msg" class="box overflow-hidden"></v-md-preview>
                  </div>

                  <div class="text-gray-400 dark:text-gray-500 transition-all duration-75 ease-linear">
                    <div class="text-sm ">
                      <p v-show="data.fields.publicEmail === 1" class="mr-3">
                        <!-- <i v-show="!data.fields.publicEmail" class="ri-spy-line align-middle mr-1 text-base"></i> -->
                        <i class="ri-mail-line align-middle mr-1 text-base"></i>
                        <span class="align-middle">
                          <!-- {{ data.fields.publicEmail ? data.fields.email : $t("bbs.hide") }} -->
                          {{ data.fields.email }} {{ data.fields.verify ? $t("bbs.verify") : '' }}
                          </span>
                      </p>
                      <p class="text-gray-400" v-show="data.fields.blog">
                        <i class="ri-plant-line align-middle mr-1 text-base"></i>
                        <span class="align-middle">
                          {{ data.fields.blog }}
                        </span>
                        </p>

                    </div>
                  </div>
                  
                  <div :class="['w-full bg-slate-100 dark:bg-slate-700 mt-6 flow-root px-3 text-left transition-all duration-75 ease-linear text-gray-900 dark:text-white', { 'box' : !data.fields.comment}, { 'box-t' : data.fields.comment}]">

                    <!-- 评论 -->
                    <div v-show="data.fields.verify" class="text-base sm:text-sm select-none px-0 py-1 mx-3 my-2 h-full cursor-pointer inline-block float-left " @click="isShowComment = true; commentID = data.fields.id">
                      <i  class="ri-chat-2-line align-middle"></i>
                      <span class="ml-2 sm:ml-2">
                        {{ $t("bbs.comment") }}
                      </span>
                    </div>

                    
                    <!-- 点赞 -->
                    <div class="text-base sm:text-sm select-none px-0 py-1 mx-3 my-2 h-full cursor-pointer inline-block float-right" @click="like(data.fields.id)">
                      <i  class="ri-thumb-up-line align-middle"></i>
                      <span class="ml-2 sm:ml-2">
                        <!-- {{ app._innerWidth > 640 ? $t("bbs.like") + " " + data.fields.like : data.fields.like }} -->
                        {{ $t("bbs.like") + " " + data.fields.like}}
                      </span>
                    </div>

                    <!-- 踩踩 -->
                    <div class="text-base sm:text-sm select-none px-0 py-1 mx-3 my-2 h-full cursor-pointer inline-block float-right" @click="foot(data.fields.id)">
                      <i  class="ri-thumb-down-line align-middle"></i>
                      <span class="ml-2 sm:ml-2">
                        <!-- {{ app._innerWidth > 640 ? $t("bbs.foot") + data.fields.foot : data.fields.foot }} -->
                        {{ $t("bbs.foot") + " " + data.fields.foot}}
                      </span>
                    </div>

                  </div>
                  <div v-show="data.fields.comment" class="w-full box-b bg-slate-50 dark:bg-slate-600 flow-root px-3 py-3 text-left transition-all duration-75 ease-linear text-gray-900 dark:text-white" >
                    <!-- <div v-for="comment in JSON.parse(data.fields.comment)" :key="comment"> -->
                      <!-- <div>{{ comment.user }}</div>
                      <div>{{ comment.commentMsg }}</div>
                      <div>{{ comment.email }}</div>
                      <div>{{ comment.time }}</div>
                      <div>{{ comment.citySN }}</div> -->
                      {{ data.fields.comment }}
                    <!-- </div> -->
                  </div>

                </div>

              </div>
            </div>
            
          </div>
        </div>


        <!-- 页数 -->
        <div class="flex items-center justify-center  space-x-3 ">
          <!-- 首页 -->
          <div @click="currentPage <= 1 ? retrun : getBBS(1)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box cursor-pointer']">
            <i class="ri-arrow-left-s-line"></i>
          </div>

          <!-- 上一页 -->
          <div @click="currentPage <= 1 ? retrun : getBBS(--currentPage)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box', { 'cursor-default border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600': currentPage === 1 }, { 'cursor-pointer': currentPage !== 1 }]">
            <i class="ri-arrow-left-s-line"></i>
          </div>

          <!-- 页码 -->
          <div class="flex-1 text-center">{{ currentPage }} / {{ totalPage }}</div>

          <!-- 下一页 -->
          <div @click="currentPage >= totalPage ? retrun : getBBS(++currentPage)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box cursor-pointer', { 'cursor-default border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600': currentPage === totalPage }, { 'cursor-pointer': currentPage !== totalPage }]">
            <i class="ri-arrow-right-s-line"></i>
          </div>

          <!-- 尾页 -->
          <div @click="currentPage >= totalPage ? retrun : getBBS(totalPage)"
            :class="['border-2 border-gray-900 dark:border-white page-icon box cursor-pointer cursor-pointer']">
            <i class="ri-arrow-right-s-line"></i>
          </div>
        </div>

      </div>

      <!-- 提交留言 -->
      <div class="flex flex-col box select-none mb-6 ">
        <div class="text-xl font-semibold mb-6 text-center">{{ $t("bbs.message") }} </div>

        <!-- 用户名昵称 -->
        <label class="mb-3">{{ $t("bbs.user") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': user.length > userMaxLength }]">
          <input type="text" :class="['w-full p8 focus:outline-none  dark:text-black text-black']" v-model="user">
          <div
            :class="['pr-3 pl-3 text-center absolute right-0 bg-white text-red-500  text-sm', { 'hidden': user.length <= userMaxLength }]">
            <i> {{ user.length }}/{{ userMaxLength }}</i>
          </div>
        </div>

        <!-- 留言信息 -->
        <label class="mb-3">{{ $t("bbs.msg") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 border-2  box overflow-hidden flex w-full items-center box-border box relative', { 'border-red-500': msg.length > msgMaxLength }]">

          <v-md-editor height="240px" :disabled-menus="[]"
            left-toolbar="undo redo clear | bold italic strikethrough ul ol" right-toolbar="" v-model="msg"
            :class="['w-full dark:text-black text-black']">
          </v-md-editor>
          <div
            :class="['pr-3 pl-3 py-1 box text-center absolute right-0 top-1.5 bg-white text-red-500  text-sm', { 'hidden': msg.length <= msgMaxLength }]">
            <i> {{ msg.length }}/{{ msgMaxLength }}</i>
          </div>
        </div>

        <!-- 邮箱 -->
        <label class="mb-3">{{ $t("bbs.email") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': email.length > emailMaxLength }]">
          <input type="text" :class="['w-full p8 focus:outline-none  dark:text-black  text-black']" v-model="email">
          <div class=" absolute right-0 bg-white flex flex items-center justify-center">
            <div
              :class="['pl-3 pr-1 text-center text-red-500  text-sm ', { 'hidden': email.length <= emailMaxLength }]">
              <i> {{ email.length }}/{{ emailMaxLength }}</i>
            </div>
            <div
              class="pr-3 pl-3 text-center cursor-pointer text-black dark:text-black h-full flex items-center justify-center bg-white h-full"
              @click="publicEmail === 0 ? publicEmail = 1 : publicEmail = 0">
              <i
                :class="['icon-font-size pr-2 align-middle ', { 'ri-eye-2-line': publicEmail === 1 }, { 'ri-eye-close-line': publicEmail === 0 }]"></i>
              <span>{{ publicEmail === 1 ? $t("bbs.public") : $t("bbs.hide") }}</span>
            </div>
          </div>
        </div>

        <!-- 验证码 -->
        <label class="mb-3">{{ $t("bbs.code") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': codeNum.length > codeNumMaxLength }]">
          <input type="text" maxlength="6" :class="['w-full p8 focus:outline-none  dark:text-black  text-black']" v-model="codeNum">
          <div class=" absolute right-0 bg-white flex flex items-center justify-center">
            <div
              :class="['pl-3 pr-1 text-center text-red-500  text-sm ', { 'hidden': codeNum.length <= codeNumMaxLength }]">
              <i> {{ codeNum.length }}/{{ codeNumMaxLength }}</i>
            </div>
            <div
              :class="['pr-3 pl-3 text-center cursor-pointer h-full flex items-center justify-center bg-white h-full', {'text-black dark:text-black' : resetSendTime === 0 }, {'text-gray-400' : resetSendTime > 0}]" @click="_sendMailCode(email)">
              <i :class="['ri-mail-send-line icon-font-size pr-2 align-middle ']"></i>
              <span>{{  $t("bbs.send") }}{{ resetSendTime > 0 ? ` (${resetSendTime})` : ''  }}</span>
            </div>
          </div>
        </div>

        <!-- 个人网站 -->
        <label class="mb-3">{{ $t("bbs.blog") }} </label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': blog.length > blogMaxLength }]">
          <input type="text" :class="['w-full p8 focus:outline-none dark:text-black text-black']" v-model="blog">
          <div
            :class="['pr-3 pl-3 text-center absolute right-0 bg-white text-red-500  text-sm', { 'hidden': blog.length <= blogMaxLength }]">
            <i> {{ blog.length }}/{{ blogMaxLength }}</i>
          </div>
        </div>

        <!-- btn -->
        <div class="b-btn box inset-x-0 bottom-0 text-center flex mt-3 pb-4 justify-center select-none">
          <div
            class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center cursor-pointer"
            @click="createBBS">
            <i class="ri-chat-smile-3-line icon-font-size pr-2"></i>
            <span class="font-semibold ">{{ $t("bbs.submit") }} </span>
          </div>
        </div>   

      </div>

      <!-- 评论 -->
      <Teleport to="body">
        <div v-show="isShowComment" class="" @click="isShowComment = false">
          <div class="table fixed left-0 top-0 bg-verify w-full h-full">
            <div class="table-cell align-middle ">
              <div class="container comment mx-auto">
                <div class="p12">
                  <div class="border-2 border-black dark:border-slate-600 shadow-box_d box text-black dark:text-white bg-white dark:bg-slate-800" @click.stop>
                    <div class="flex flex-col box select-none m-3 sm:m-6">
                      <div class="text-xl font-semibold mb-3 text-center">{{ $t("bbs.comment") }} </div>

                      <p class="text-center mb-6 text-gray-400">{{ $t("bbs.comment_des") }}</p>

                      <!-- 邮箱 -->
                      <label class="mb-3">{{ $t("bbs.email") }} <span class="text-red-500">*</span></label>
                      <div
                        :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': searchEmail.length > emailMaxLength }]">
                        <input type="text" :class="['w-full p8 focus:outline-none  dark:text-black  text-black']" v-model="searchEmail">
                        <div class=" absolute right-0 bg-white flex flex items-center justify-center">
                          <div
                            :class="['pl-3 pr-1 text-center text-red-500  text-sm ', { 'hidden': searchEmail.length <= emailMaxLength }]">
                            <i> {{ searchEmail.length }}/{{ emailMaxLength }}</i>
                          </div>

                        </div>
                      </div>

                      <!-- 验证码 -->
                      <label class="mb-3">{{ $t("bbs.code") }} <span class="text-red-500">*</span></label>
                      <div
                        :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': searchCodeNum.length > codeNumMaxLength }]">
                        <input type="text" maxlength="6" :class="['w-full p8 focus:outline-none  dark:text-black  text-black']" v-model="searchCodeNum">
                        <div class=" absolute right-0 bg-white flex flex items-center justify-center">
                          <div
                            :class="['pl-3 pr-1 text-center text-red-500  text-sm ', { 'hidden': searchCodeNum.length <= codeNumMaxLength }]">
                            <i> {{ searchCodeNum.length }}/{{ codeNumMaxLength }}</i>
                          </div>
                          <div
                            :class="['pr-3 pl-3 text-center cursor-pointer h-full flex items-center justify-center bg-white h-full', {'text-black dark:text-black' : resetSendTime === 0 }, {'text-gray-400' : resetSendTime > 0}]" @click="_sendMailCode(searchEmail)">
                            <i :class="['ri-mail-send-line icon-font-size pr-2 align-middle ']"></i>
                            <span>{{  $t("bbs.send") }}{{ resetSendTime > 0 ? ` (${resetSendTime})` : ''  }}</span>
                          </div>
                        </div>
                      </div>
                      <!-- 用户名昵称 -->
                      <label class="mb-3">{{ $t("bbs.his_username") }} <span class="text-red-500">*</span></label>
                      <div
                        :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': user.length > userMaxLength }]">
                        <!-- <input type="text" :class="['w-full p8 focus:outline-none  dark:text-black text-black']" v-model="user"> -->
                        <select :class="['w-full p8 focus:outline-none  dark:text-black text-black appearance-none']" v-model="selectUser">
                          <option v-for="item in his_user" :key="item" class="text-black">
                            {{ item }}
                          </option>
                        </select>
                        <div
                          :class="['pr-3 pl-3 text-center absolute right-0 bg-white text-red-500  text-sm', { 'hidden': user.length <= userMaxLength }]">
                          <i> {{ user.length }}/{{ userMaxLength }}</i>
                        </div>
                      </div>

                      <!-- 留言信息 -->
                      <label class="mb-3">{{ $t("bbs.comment") }} <span class="text-red-500">*</span></label>
                      <div
                        :class="['mb-3 border-2  box overflow-hidden flex w-full items-center box-border box relative', { 'border-red-500': commentMsg.length > commentMsgMaxLength }]">

                        <v-md-editor height="160px" :disabled-menus="[]"
                          left-toolbar="undo redo clear | bold italic strikethrough ul ol" right-toolbar="" v-model="commentMsg"
                          :class="['w-full dark:text-black text-black']">
                        </v-md-editor>
                        <div
                          :class="['pr-3 pl-3 py-1 box text-center absolute right-0 top-1.5 bg-white text-red-500  text-sm', { 'hidden': commentMsg.length <= commentMsgMaxLength }]">
                          <i> {{ commentMsg.length }}/{{ commentMsgMaxLength }}</i>
                        </div>
                      </div>

                      <!-- btn -->
                      <div class="b-btn box inset-x-0 bottom-0 text-center flex mt-3 pb-4 justify-center select-none">
                        <div
                          class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center cursor-pointer"
                          @click="comment(commentID)">
                          <i class="ri-chat-2-line icon-font-size pr-2"></i>
                          <span class="font-semibold ">{{ $t("bbs.comment") }} </span>
                        </div>
                      </div>   

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- 弹窗提示 -->
      <Teleport to="body">
        <Pop :show="showPop">
          <template #header>
            <div class="text-center">{{ submitStatusHeader }}</div>
          </template>
          <template #body>
            <div class="text-center px-3">{{ submitStatusBody }}</div>
          </template>
          <template #footer>
            <div class="text-center">
              <button :class="['border-2 border-gray-900 dark:border-white px-4 py-1 box cursor-pointer']" @click="showPop = false; submitStatus = ture">
                {{ submitStatusFooter }}
              </button>
            </div>

          </template>
        </Pop>
      </Teleport>


      <!-- 点赞中提示弹窗 -->
      <Teleport to="body">
        <TipsPop :show="isClickLike">
          <template #body>
            <div class="text-center py-2">
              <i class="ri-loader-5-line inline-block animate-spin icon-size bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"></i>
            </div>
          </template>
        </TipsPop>
      </Teleport>


      <!-- 提交中提示弹窗 -->
      <Teleport to="body">
        <TipsPop :show="submitStatus">
          <template #body>
            <div class="text-center">
              <i class="ri-loader-5-line  inline-block animate-spin icon-size bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"></i>
            </div>
          </template>
        </TipsPop>
      </Teleport>

      <!-- 验证码 -->
      <Teleport to="body">
        <Verify v-show="isShowVerify" :show="isShowVerify" @close="isShowVerify = false" @verifySeccess="slideSeccess = true"></Verify>
      </Teleport>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import Pop from '../components/Pop.vue';
import TipsPop from '../components/TipsPop.vue';
import Verify from '../components/Verify.vue';


import moment from '../plugins/moment.js';
// import getUserAgent from '../plugins/getUserAgent.js';
import ua2obj from 'ua2obj'

import getProgress from '../components/getProgress.vue';
import getError from '../components/getError.vue';


import { Vika } from "@vikadata/vika";
import { inject } from '@vue/runtime-core';
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const msgDatasheet = vika.datasheet("dstuYoi5jUdh0Z0Fvq");

import emailjs from '@emailjs/browser';


export default {
  name: 'BBS',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.bbs")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  components: {
    getProgress,
    getError,
    Pop,
    TipsPop,
    Verify
  },
  inject: ['app'],
  data() {
    let app = inject('app');
    let flower = app.$refs.fl;
    return {
      // lang: this.lang,
      // app: app,
      moment: moment, // 时间格式化
      isGetFinish: false, // 是否获取完成
      isGet: false, // 是否获取中
      bbsData: [],  // 帖子数据
      bbsDataLength: 0, // 帖子数据长度
      getNum: 5,  // 获取每页数据数量
      currentPage: 1, // 当前页数
      totalPage: 1, // 总页数

      isClickLike: false, // 是否点赞
      likeMaxLength: 10, // 点赞最大长度
      isClickFoot: false, // 是否点赞
      footMaxLength: 2, // 点赞最大长度

      // 寄语内容
      board: "::: align-center 🏄网上冲浪留下点什么再走吧😁🙈🍇",

      // 提交数据
      user: "",
      msg: "",
      publicEmail: 1,
      email: "",
      blog: "",
      codeNum: "",
      searchCodeNum: "",
      searchEmail: "11436052@qq.com",
      his_user: [],
      selectUser: "",
      commentID: null,
      commentMsg: "",

      // 提交数据长度限制
      userMaxLength: 12,
      msgMaxLength: 1000,
      emailMaxLength: 32,
      blogMaxLength: 32,
      codeNumMaxLength: 6,
      commentMsgMaxLength: 200,


      submitStatus: false,  // 提交状态
      notSubmittable: true, // 提交按钮是否可用
      submitMaxNum: 5,  // 提交次数限制

      submitStatusHeader: null, // 提交后的弹窗提示 头部
      submitStatusBody: null, // 提交后的弹窗提示 内容
      submitStatusFooter: null, // 提交后的弹窗提示 底部

      showPop: false, // 是否显示弹窗
      
      flower: flower,

      returnCitySN: null,
      code: null,
      isShowVerify: false,
      slideSeccess: false,
      resetSendTime: 0,
      isShowComment: false,
      verifyEmail: '',
      JSON: JSON,
    }
  },
  created() {
    this.getBBS(this.currentPage);
  },
  async mounted() {
    let that = this;
    let storage = that.$ls; 
    // localStorage.setItem("date", moment().format("YYYY-MM-DD"));
    this.app.$refs.fl.isShowFlower = false
    storage.set("submitNum", 0);
  },
  watch: {
    // 实时监听每一个输入是否符合邮箱正则格式
    email(val) {
      this.email = val.replace(/[^\w@.]/g, "");
    },
    searchEmail(val) {
      this.searchEmail = val.replace(/[^\w@.]/g, "");
    },
    // 监听验证码不超6位
    codeNum(val) {
      let str = String(val)
      str = str.replace(/[^\d]/g, "");
      this.codeNum = str;
    },
    async searchCodeNum(val) {
      let that = this;
      let str = String(val)
      let searchEmail = that.searchEmail;
      str = str.replace(/[^\d]/g, "");
      this.searchCodeNum = str;

      if (this.searchCodeNum.length == 6) {
        await msgDatasheet.records.query({
          filterByFormula: `{email} = "${searchEmail.toLowerCase()}"`,
        }).then(response => {
          if (response.success) {
            that.commentData = response.data.records;

            // console.log(that.commentData);

            that.commentData.forEach((item, index) => {
              if(that.his_user.indexOf(item.fields.bbsUsername) == -1) {
                that.his_user.push(item.fields.bbsUsername);
              }
            });
            that.selectUser = that.his_user[0];
            that.verifyEmail = that.searchEmail;

            // console.log(that.commentData);
          } else {
            console.error(response);
          }

        });
      }
    },
    // 实时监听每一个输入是否符合网址正则格式
    // blog(val) {
    //   this.blog = val.replace(/[^\w@.]/g, "");
    // }
    slideSeccess(val) {
      if (val === true) {
        this.resetSendTime = 10;
        this._resetCode();
        let st = setInterval(() => {
          if (this.resetSendTime > 0) {
            this.resetSendTime -= 1;
          } else {
            clearTimeout(st);
          }
        }, 1000);
      }
    },
  },
  methods: {
    // 发送验证码
    _sendMailCode(val) {
      let that = this;
      let t = i18n.t

      if (that.resetSendTime > 0) {
        that.setShowPop(t("bbs._.has_send"), t("bbs._.has_send_des"), t("bbs._.close"));
        return;
      }

      if (val.length == 0) {
        that.setShowPop(t("bbs.send_fail"), t("bbs._.email_format"), t("bbs._.close"));
        return;
      }

      that.isShowVerify = true;
      that._randomCode()

      // emailjs.send("service_bnhm4db","template_ssisb4d",{
      //   code: that.code
      // }, "7e_c9e0PcXjIE9o9S");
    },
    // 随机6位数字验证码
    _randomCode() {
      let that = this;
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
      }
      that.code = code;
    },
    // 5分钟后重置验证码为null
    _resetCode() {
      let that = this;
      setTimeout(() => {
        that._randomCode();
        console.log('已重置', that.code);
        that.slideSeccess = false;
      }, 1000 * 3);
    },

    // 设置POP提示
    setShowPop(header, body, footer) {
      this.submitStatusHeader = header;
      this.submitStatusBody = body;
      this.submitStatusFooter = footer;
      this.showPop = true;
    },
    // Input必填输入是否为空
    isNotNull(submitValue) {
      if (submitValue === "") {
        return true;
      } else {
        return false;
      }
    },
    // 值是否超出最大长度
    isOverMaxLength(submitValue, maxLength) {
      if (submitValue.length > maxLength) {
        return true;
      } else {
        return false;
      }
    },
    // 踩踩
    async foot(id) {
      let that = this;
      let storage = that.$ls; 
      that.addFoot = 0;
      that.footData = null;

      if (storage.get("bbsDate") === moment().format("YYYY-MM-DD")) {
        if (storage.get("foot") >= that.footMaxLength) {
          that.setShowPop(i18n.t("bbs._.foot_fail"), i18n.t("bbs._.over_foot"), i18n.t("bbs._.close"));
          return;
        }
      } else {
        storage.set("bbsDate", moment().format("YYYY-MM-DD"));
        storage.set("foot", 0);
      }

      if (that.isClickFoot) {
        return;
      }
      that.isClickFoot = true;

      msgDatasheet.records.query({
        viewId: "viwhuh8Q1ikXw",
        pageSize: 1,
        filterByFormula: `{id} = ${id}`,
      }).then(response => {
        if (response.success) {
          that.footData = response.data.records[0];

          msgDatasheet.records.update([
            {
              "recordId": that.footData.recordId,
              "fields": {
                "foot": that.footData.fields.foot + 1,
              }
            },
          ]).then(response => {
            if (response.success) {

              // console.log('踩踏成功');
              that.isClickFoot = false;
              that.getBBS(that.currentPage);
              storage.set("foot", parseInt(storage.get("foot")) + 1);

              that.flower._isUpdate('love', 1)


              // console.log(response.data);
            } else {
              that.isClickFoot = false;
              console.error(response);
            }
          })

          // console.log(that.footData);
        } else {
          console.error(response);
        }

      });
    },
    // 点赞
    async like(id) {
      let that = this;
      that.addLike = 0;
      that.likeData = null;
      let storage = that.$ls; 

      // 判断loclStorage的like 是否已经超过likeMaxLength次数
      if (storage.get("bbsDate") === moment().format("YYYY-MM-DD")) {
        if (storage.get("like") >= that.likeMaxLength) {
          that.setShowPop(i18n.t("bbs._.like_fail"), i18n.t("bbs._.over_like"), i18n.t("bbs._.close"));
          return;
        }
      } else {
        storage.set("bbsDate", moment().format("YYYY-MM-DD"));
        storage.set("like", 0);
      }

      if (that.isClickLike) {
        return;
      }
      that.isClickLike = true;

      msgDatasheet.records.query({
        viewId: "viwhuh8Q1ikXw",
        pageSize: 1,
        filterByFormula: `{id} = ${id}`,
      }).then(response => {
        if (response.success) {
          that.likeData = response.data.records[0];

          msgDatasheet.records.update([
            {
              "recordId": that.likeData.recordId,
              "fields": {
                "like": that.likeData.fields.like + 1,
              }
            },
          ]).then(response => {
            if (response.success) {

              // console.log('点赞成功');
              that.isClickLike = false;
              that.getBBS(that.currentPage);
              storage.set("like", parseInt(storage.get("like")) + 1);


              that.flower._isUpdate('nutrition', 2)
              that.flower._isUpdate('water', 1)


              // console.log(response.data);
            } else {
              that.isClickLike = false;
              console.error(response);
            }
          })

          // console.log(that.likeData);
        } else {
          console.error(response);
        }

      });
    },
    // 评论
    comment(id) {
      let that = this;
      let t = i18n.t;
      let newComment = {};
      that.returnCitySN = document.returnCitySN

      // 判断提交中的状态
      if (that.submitStatus) {
        return;
      }

      // 判断是否已选择用户名
      if (that.selectUser === '') {
        that.setShowPop(t("bbs._.comment_fail"), t("bbs._.comment_fail_des"), t("bbs._.close"));
        that.showPop = true;
        return;
      }
      
      // 判断验证码是否正确
      if (that.searchCodeNum !== that.code) {
        that.setShowPop(t("bbs._.submit_fail"), t("bbs._.code_fail"), t("bbs._.close"));
        that.showPop = true;
        return;
      }

      // 判断输入的内容是否为空
      if (that.isNotNull(that.commentMsg)) {
        that.setShowPop(t("bbs._.submit_fail"), t("bbs._.commentMsg_empty"), t("bbs._.close"));
        that.showPop = true;
        return
      }
      
      that.submitStatus = true;

      newComment = {
        user: that.selectUser,
        email: that.verifyEmail,
        commentMsg: that.commentMsg,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        citySN: that.returnCitySN
      }

      msgDatasheet.records.query({
        pageSize: 1,
        filterByFormula: `{id} = ${id}`,
      }).then(response => {
        if (response.success) {
          that.data = response.data.records[0];

          let arr = [];

          if (that.data.fields.comment == undefined) {
            arr = [];
          } else {
            arr = JSON.parse(that.data.fields.comment);
          }

          arr.push(newComment);

          msgDatasheet.records.update([
            {
              "recordId": that.data.recordId,
              "fields": {
                "comment": JSON.stringify(arr),
              }
            },
          ]).then(response => {
            if (response.success) {
              that.his_user = []; // 重置为空
              that.searchEmail = ''; // 重置为空
              that.searchCodeNum = ''; // 重置为空
              that.selectUser = ''; // 重置为空
              that.resetSendTime = 0;
              that.commentMsg = ''; // 重置为空

              that.submitStatus = false;  // 提交成功后清除提交状态

              that.isShowComment = false; // 关闭评论框
              that.getBBS(that.currentPage);

            } else {
              console.error(response);
            }
          })
        } else {
          console.error(response);
        }

      });
    },
    // 创建一条新的留言
    createBBS() {
      let that = this;
      let isNotNull = that.isNotNull;
      let isOverMaxLength = that.isOverMaxLength;
      let t = i18n.t
      let notEmpty, overMaxLength;
      let storage = that.$ls; 

      that.returnCitySN = document.returnCitySN

      if (!that.returnCitySN) return

      // 判断loclStorage 的date 字段是否与今天相同, 如果相同则 判断 判断loclStorage 的submitNum 是否大于5次，如果大于5次则不能提交
      if (storage.get("bbsDate") === moment().format("YYYY-MM-DD")) {
        if (parseInt(storage.get("submitNum")) >= that.submitMaxNum) {
          that.setShowPop(t("bbs._.submit_fail"), t("bbs._.over_submit"), t("bbs._.close"));
          return;
        }
      } else {
        storage.set("bbsDate", moment().format("YYYY-MM-DD"));
        storage.set("submitNum", 0);
      }


      // 判断提交中的状态
      if (that.submitStatus) {
        return;
      }


      // 判断是否为空
      notEmpty = isNotNull(that.user) || isNotNull(that.msg) || isNotNull(that.email);
      if (notEmpty) {
        console.log('没填写');
        that.setShowPop(t("bbs._.submit_fail"), t("bbs._.msg_empty"), t("bbs._.close"));
        return;
      }

      // 判断是否超出最大长度
      overMaxLength = isOverMaxLength(that.user, that.userMaxLength) || isOverMaxLength(that.msg, that.msgMaxLength) || isOverMaxLength(that.email, that.emailMaxLength);
      if (overMaxLength) {
        console.log('超出最大');
        that.setShowPop(t("bbs._.submit_fail"), t("bbs._.msg_length"), t("bbs._.close"));
        that.showPop = true;
        return;
      }

      // 判断邮箱格式是否正确
      if (!that.email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
        console.log('邮箱格式不正确');
        that.setShowPop(t("bbs._.submit_fail"), t("bbs._.email_format"), t("bbs._.close"));
        that.showPop = true;
        return;
      }

      // 判断验证码是否正确
      if (that.codeNum !== that.code) {
        that.setShowPop(t("bbs._.submit_fail"), t("bbs._.code_fail"), t("bbs._.close"));
        that.showPop = true;
        return;
      }

      that.submitStatus = true;
      console.log('提交中');
      msgDatasheet.records.create([
        {
          "fields": {
            "bbsUsername": that.user,
            "email": that.email.toLowerCase(),
            "verify": 1,
            "publicEmail": that.publicEmail,
            "blog": that.blog,
            "msg": that.msg,
            "citySN": JSON.stringify(that.returnCitySN),
            "device": JSON.stringify(ua2obj()),
            "createDate": Date.parse(new Date())
          }
        }
      ]).then(response => {
        if (response.success) {
          // console.log('提交成功');
          // console.log(response.data);

          // 提交成功后再次获取BBS数据
          that.getBBS(1);

          // 提交成功后清空输入框
          that.user = "";
          that.msg = "";
          that.publicEmail = 1;
          that.email = "";
          that.blog = "";
          that.codeNum = "";
          that.resetSendTime = 0;


          that.submitStatus = false;  // 提交成功后清除提交状态

          // 设置localStorage的date 为当前日期， submitNum +1
          storage.set("bbsDate", moment().format("YYYY-MM-DD"));
          storage.set("submitNum", 
          
          parseInt(storage.get("submitNum")) + 1);

          that.flower._isUpdate('nutrition', 2)
          that.flower._isUpdate('love', 1)
          that.flower._isUpdate('water', 1)

        } else {
          // console.log('提交失败');
          console.error(response);
          that.submitStatus = false;  // 提交成功后清除提交状态
        }
      })
    },

    // 获取留言
    async getBBS(currentPage) {
      let success = false;  // 是否获取成功
      const that = this;


      // 已请求
      if (that.isGet) {
        that.isGet = false;
        that.isGetFinish = false;
      }

      that.currentPage = currentPage; // 当前页码


      // design
      await msgDatasheet.records.query({
        viewId: "viwhuh8Q1ikXw",
        pageSize: that.getNum,
        pageNum: that.currentPage
      }).then(response => {
        if (response.success) {
          success = true; // 获取成功
          that.bbsData = response.data.records;


          that.bbsDataLength = response.data.total;   // 获取留言总数
          // console.log(response.data);

          // 计算总页数
          that.totalPage = that.bbsDataLength % that.getNum === 0 ? that.bbsDataLength / that.getNum : Math.floor(that.bbsDataLength / that.getNum) + 1; 

          // window.scrollY = 0; // 回到顶部
          // setTimeout(() => {
            that.app._goTop('sTop')
          // }, 200);
          

          // console.log(response);
        } else {
          success = false;
          that.isGetFinish = false; // 获取失败

          console.error(response);
        }

      });

      // 已请求
      that.isGet = true;

      // 数据是否都已经加载完毕
      if (success) {
        // 已请求完成
        that.isGetFinish = true;
      }
    },

  
  },
}
</script>


<style lang="scss" scoped>

.page-icon {
  width: 40px;
  height: 40px;
  position: relative;
  box-sizing: border-box;

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
  }

  &:nth-child(1) i, &:nth-child(2) i {
    transform: translate(-50%, -50%);
  }

  &:nth-child(4) i, &:nth-child(5) i {
    transform: translate(-47%, -50%);
  }
}

.icon-size {
  font-size: 6rem;
}

.avatar {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 56px;
  }
}

.bg-stripes-white {
  --stripes-color: hsla(0, 0%, 95%, 0.747);
}

.bg-stripes {
  background-image: linear-gradient(-45deg, var(--stripes-color) 12.5%, transparent 12.5%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.5%, transparent 62.5%, transparent 100%);
  background-size: 5.66px 5.66px;
}


.sticky {
  background: linear-gradient(-45deg, transparent 24px, #ffe9c0 0);

  ::before {
    content: "";
    position: absolute;
    right: 0px;
    bottom: 0px;
    background: linear-gradient(-45deg, transparent 50%, #ffcd93 0);
    width: 35px;
    height: 35px;
    border-radius: 4px 0 0 0;
  }
}

.container {
  padding: 120px 12px 0 12px;
}

.comment {
  padding: 0 !important;
}

</style>