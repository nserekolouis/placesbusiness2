import { 
  createWebHistory, 
  createRouter, 
} from "vue-router"
import Auth from '@/Auth.js'
import LoginScreen from "@/views/pages/signup/LoginScreen.vue"
import PageNotFound from '@/views/pages/main/PageNotFound.vue'
import UploadProfile from '@/views/pages/signup/ProfileScreen.vue'
import AdminRequest from '@/views/pages/signup/AdminRequest.vue'
import UserhandleScreen from '@/views/pages/signup/UserhandleScreen.vue'
import SwitchScreen from '@/views/pages/main/SwitchScreen.vue'
import UnderMaintenace from "@/views/pages/main/UnderMaintenace.vue"
import SharedPost from "@/views/pages/shared/SharedPost.vue"
import SharedComment from "@/views/pages/shared/SharedComment.vue"
import SharedUserProfile from "@/views/pages/shared/SharedUserProfile.vue"
import TermsAndConditions from "@/views/pages/signup/TermsAndConditions.vue"
import SharedPlace from "@/views/pages/shared/SharedPlace.vue"
import DashboardPage from "@/views/pages/main/dashboard/dashboard/DashboardPage.vue"
import DashboardMain from "@/views/pages/main/dashboard/dashboard/DashboardMain.vue"


const routes = [
  {
    path: "/",
    name: "LoginScreen",
    component: LoginScreen,
    props: {
        prompt: false
    }
  },
  {
    path: "/termsandconditions",
    name: "TermsAndConditions",
    component: TermsAndConditions,
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
    path: '/adminrequest',
    name: "AdminRequest",
    component: AdminRequest,
  },
  {
    path: '/dashboard',
    name: "DashboardPage",
    component: DashboardPage,
  },
  {
    path: '/dashboardmain/:places_id/:main_text',
    name: "DashboardMain",
    component: DashboardMain,
    props: true
  },
  {
    path: '/home',
    name: "SwitchScreen",
    component: SwitchScreen
  },
  {
    path: '/home/user/:id',
    name: "User",
    component: SwitchScreen,
    props: true
  },
  {
    path: '/home/post/:id',
    name: "Post",
    component: SwitchScreen,
    props: true
  },
  {
    path: '/home/post/comment/:id',
    name: "Comment",
    component: SwitchScreen,
    props: true
  },
  {
    path: '/home/place/:id',
    name: "Place",
    component: SwitchScreen,
    props: true
  },
  {
    path: '/notifications',
    name: "Notifications",
    component: SwitchScreen,
  },
  {
    path: '/profile',
    name: "Profile",
    component: SwitchScreen,
  },
  {
    path: '/accounts',
    name: "Accounts",
    component: SwitchScreen,
  },
  {
    path: '/privacyandsafety',
    name: "PrivacyAndSafety",
    component: SwitchScreen,
  },
  {
    path: '/aboutplaces',
    name: "AboutPlaces",
    component: SwitchScreen,
  },
  {
    path: '/user/:id',
    name: "SharedUserProfile",
    component: SharedUserProfile,
    props: true
  },
  {
    path: '/post/:id',
    name: "SharedPost",
    component: SharedPost,
    props: true
  },
  {
    path: '/post/comment/:id',
    name: "SharedComment",
    component: SharedComment,
    props: true
  },
  {
    path: '/place/:id',
    name: "SharedPlace",
    component: SharedPlace,
    props: true
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
  //history: createMemoryHistory(),
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