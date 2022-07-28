import { createWebHistory, createRouter } from "vue-router"
import LoginScreen from "@/views/pages/LoginScreen.vue"
import PageNotFound from '@/views/pages/PageNotFound.vue'
import UserhandleScreen from '@/views/pages/UserhandleScreen.vue'
import ProfileScreen from '@/views/pages/ProfileScreen.vue'
import HomeScreen from '@/views/pages/HomeScreen.vue'
import Auth from '@/Auth.js';

const routes = [
  {
    path: "/",
    name: "LoginScreen",
    component: LoginScreen,
    props: {
        prompt: true
    }
  },
  {
    path: '/userhandle',
    name: "UserHandle",
    component: UserhandleScreen,
  },
  {
    path: '/profilescreen',
    name: "ProfileScreen",
    component: ProfileScreen,
  },
  {
    path: '/homeScreen',
    name: "HomeScreen",
    component:HomeScreen,
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) ) {
        if (Auth.check()) {
            next();
            return;
        } else {
            router.push('/');
        }
    } else {
        next();
    }
});

export default router