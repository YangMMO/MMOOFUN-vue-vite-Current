import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Design from "../views/Design.vue";
import Model from "../views/Model.vue";
import Tools from "../views/Tools.vue";
import Resume from "../views/Resume.vue";
import About from "../views/About.vue";
import BBS from "../views/BBS.vue";
import Test from "../views/Test.vue";
import Page404 from "../views/404.vue";
import Note from "../views/Note.vue";



const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        menu: true
    },
    {
        path: "/design",
        name: "Design",
        component: Design,
        menu: true
    },
    {
        path: "/model",
        name: "Model",
        component: Model,
        menu: true
    },
    {
        path: "/tools",
        name: "Tools",
        component: Tools,
        menu: true
    },
    // {
    //     path: "/note",
    //     name: "Note",
    //     component: Note,
    //     menu: true
    // },
    {
        path: "/resume",
        name: "Resume",
        component: Resume,
        menu: false
    },
    {
        path: "/about",
        name: "About",
        component: About,
        menu: true
    },
    {
        path: "/bbs",
        name: "BBS",
        component: BBS,
        menu: true
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
        menu: false
    },
    {
        path: "/:error*",
        name: "404",
        component: Page404,
        menu: false
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


const routesPath = []

routes.forEach(route => {
    routesPath.push(route.path)
})

export default router;
export { routesPath }
