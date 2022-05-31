import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/Home.vue"),
    },
    {
        path: "/design",
        name: "Design",
        component: () => import("../components/Design.vue"),
    },
    {
        path: "/3d",
        name: "3D",
        component: () => import("../components/3D.vue"),
    },
    {
        path: "/resume",
        name: "Resume",
        component: () => import("../components/Resume.vue"),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router