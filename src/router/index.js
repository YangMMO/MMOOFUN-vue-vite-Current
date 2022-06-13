import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "首页",
            description: "首页",
        }
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
    },
    // {
    //     path: "/resume",
    //     name: "Resume",
    //     component: () => import("../views/Resume.vue"),
    // },
    {
        path: "/update",
        name: "Update",
        component: () => import("../views/Update.vue"),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router