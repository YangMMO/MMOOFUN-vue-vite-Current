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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router