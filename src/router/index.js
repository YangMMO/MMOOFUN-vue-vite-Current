import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "首页",
            description: "首页",
        },
        menu: true
    },
    // {
    //     path: "/design",
    //     name: "Design",
    //     component: () => import("../views/Design.vue"),
    // },
    {
        path: "/model",
        name: "Model",
        component: () => import("../views/Model.vue"),
        menu: true
    },
    {
        path: "/resume",
        name: "Resume",
        component: () => import("../views/Resume.vue"),
        menu: true
    },
    {
        path: "/update",
        name: "Update",
        component: () => import("../views/Update.vue"),
        menu: true
    },
    {
        path: "/:error*",
        name: "404",
        component: () => import("../views/404.vue"),
        menu: false
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router