<script>
import HomeScreen from "@/views/pages/main/home/PostsScreen.vue";
import CommentsScreen from "@/views/pages/main/comments/LoadMorePostsAndComments.vue";
import UserProfileAndPostsScreen from "@/views/pages/main/userprofile/LoadMoreUserPosts.vue";
import NotificationsScreen from "@/views/pages/main/notifications/NotificationSection.vue";

import AboutPlacesScreen from "@/views/pages/main/aboutplaces/AboutSection.vue";
import AccountsScreen from "@/views/pages/main/accounts/AccountsSection.vue";
import EditProfileScreen from "@/views/pages/main/editprofile/EditProfileSection.vue";
import PrivacyAndSafety from "@/views/pages/main/privacyandsafety/PrivacyAndSafetySection.vue";

import SidebarCoreui from "@/components/SideBar2.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

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
    SidebarCoreui,
    SearchUsers,
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
  <div class="row">
    <div class="col-md-3">
      <sidebar-coreui
        @listen-notifications="goToNotifications"
        @listen-home="goToHome"
        @listen-profile="goToProfile"
        @listen-accounts="goToAccounts"
        @listen-privacy-safety="goToPrivacyAndSafety"
        @listen-about-places="goToAboutPlaces"
      />
    </div>
    <div class="col-md-6">
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
    <div class="col-md-3">
      <search-users />
    </div>
  </div>
</template>