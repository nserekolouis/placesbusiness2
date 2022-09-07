import { createWebHistory, createRouter } from "vue-router"
import Auth from '@/Auth.js'
import LoginScreen from "@/views/pages/signup/LoginScreen.vue"
import PageNotFound from '@/views/pages/main/PageNotFound.vue'
import UploadProfile from '@/views/pages/signup/ProfileScreen.vue'
import UserhandleScreen from '@/views/pages/signup/UserhandleScreen.vue'
import SwitchScreen from '@/views/pages/main/SwitchScreen.vue'
import UnderMaintenace from "@/views/pages/main/UnderMaintenace.vue"
import PostsPage from "@/views/pages/main/home/PostsPage.vue"
import CommentsPage from "@/views/pages/main/comments/CommentsPage.vue"


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
    path: '/uploadProfile',
    name: "UploadProfile",
    component: UploadProfile,
  },
  {
    path: '/home',
    name: "SwitchScreen",
    component: SwitchScreen,
      children:[
        {
          path: '',
          name: 'PostsPage',
          component: PostsPage
        },
        {
          path: '/home/posts/comments/:id',
          name: 'CommentsPage',
          component: CommentsPage,
          props: true
        }
      ]
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: '/undermaintenance',
    name: "UnderMaintenance",
    component: UnderMaintenace,
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