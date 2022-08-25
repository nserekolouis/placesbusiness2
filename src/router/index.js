import { createWebHistory, createRouter } from "vue-router"
import LoginScreen from "@/views/pages/signup/LoginScreen.vue"
import PageNotFound from '@/views/pages/main/PageNotFound.vue'
import UserhandleScreen from '@/views/pages/signup/UserhandleScreen.vue'
import ProfileScreen from '@/views/pages/signup/ProfileScreen.vue'
import HomeScreen from '@/views/pages/main/SwitchScreen.vue'
import CommentScreen from '@/views/pages/main/comments/CommentScreen.vue'
import UserProfileAndPosts from '@/views/pages/main/userprofile/UserProfileAndPostsScreen.vue'
import Auth from '@/Auth.js';
import EditProfileScreen from "@/views/pages/main/editprofile/EditProfileScreen.vue"
import NotificationsScreen from "@/views/pages/main/notifications/NotificationsScreen.vue"
import AccountsScreen from '@/views/pages/main/accounts/AccountsScreen.vue'
import PrivacyAndSafetyScreen from '@/views/pages/main/privacyandsafety/PrivacyAndSafefty.vue'
import AboutPlacesScreen from '@/views/pages/main/aboutplaces/AboutPlacesScreen.vue'


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
    component: HomeScreen,
  },
  {
    path: '/commentsScreen/:id',
    name: "CommentScreen",
    component: CommentScreen,
    props: true
  },
  {
    path: '/userprofileandposts/:user_id',
    name: "UserProfileAndPosts",
    component: UserProfileAndPosts,
    props: true
  },
  {
    path: '/editprofilescreen',
    name: "EditProfileScreen",
    component: EditProfileScreen
  },
  {
    path: '/notificationsscreen',
    name: 'NotificationsScreen',
    component: NotificationsScreen,
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: AccountsScreen,
  },
  {
    path: '/privacyandsafety',
    name: 'PrivacyAndSafety',
    component: PrivacyAndSafetyScreen,
  },
  {
    path: '/aboutplaces',
    name: 'AboutPlacesScreen',
    component: AboutPlacesScreen,
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