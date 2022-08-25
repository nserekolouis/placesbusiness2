<script>
import HomeScreen from "@/views/pages/main/home/HomeScreen.vue";
import CommentsScreen from "@/views/pages/main/comments/CommentScreen.vue";
import UserProfileAndPostsScreen from "@/views/pages/main/userprofile/UserProfileAndPostsScreen.vue";
import NotificationsScreen from "@/views/pages/main/notifications/NotificationsScreen.vue";

import AboutPlacesScreen from "@/views/pages/main/aboutplaces/AboutPlacesScreen.vue";
import AccountsScreen from "@/views/pages/main/accounts/AccountsScreen.vue";
import EditProfileScreen from "@/views/pages/main/editprofile/EditProfileScreen.vue";
import PrivacyAndSafety from "@/views/pages/main/privacyandsafety/PrivacyAndSafefty.vue";

export default {
  components: {
    HomeScreen,
    UserProfileAndPostsScreen,
    AboutPlacesScreen,
    AccountsScreen,
    CommentsScreen,
    NotificationsScreen,
    EditProfileScreen,
    PrivacyAndSafety,
  },
  data() {
    return {
      current: "HomeScreen",
      id: "",
    };
  },
  methods: {
    goToComments(post) {
      console.log("Switch", post);
      this.current = "CommentsScreen";
      this.id = post.id;
    },
    goToNotifications() {
      this.current = "NotificationsScreen";
    },
    goToHome() {
      this.current = "HomeScreen";
    },
    goToProfile() {
      console.log("Go to profile");
      this.current = "EditProfileScreen";
    },
    goToAccounts() {
      this.current = "AccountsScreen";
    },
    goToPrivacyAndSafety() {
      this.current = "PrivacyAndSafety";
    },
    goToAboutPlaces() {
      this.current = "AboutPlacesScreen";
    },
  },
};
</script>

<template>
  <div class="demo">
    <KeepAlive>
      <component
        :is="current"
        :id="id"
        @listen-comment="goToComments"
        @listen-notifications="goToNotifications"
        @listen-home="goToHome"
        @listen-profile="goToProfile"
        @listen-accounts="goToAccounts"
        @listen-privacy-safety="goToPrivacyAndSafety"
        @listen-about-places="goToAboutPlaces"
      ></component>
    </KeepAlive>
  </div>
</template>