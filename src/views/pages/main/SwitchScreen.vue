<script>
import HomeScreen from "@/views/pages/main/home/PostsScreen.vue";
import CommentsScreen from "@/views/pages/main/comments/LoadMorePostsAndComments.vue";
import UserProfileAndPostsScreen from "@/views/pages/main/userprofile/LoadMoreUserPosts.vue";
import NotificationsScreen from "@/views/pages/main/notifications/NotificationSection.vue";

import AboutPlacesScreen from "@/views/pages/main/aboutplaces/AboutSection.vue";
import AccountsScreen from "@/views/pages/main/accounts/AccountsSection.vue";
import EditProfileScreen from "@/views/pages/main/editprofile/EditProfileSection.vue";
import PrivacyAndSafety from "@/views/pages/main/privacyandsafety/PrivacyAndSafetySection.vue";
import LoadMoreUserPosts from "@/views/pages/main/userprofile/LoadMoreUserPosts.vue";
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
    LoadMoreUserPosts,
  },
  data() {
    return {
      current: "HomeScreen",
      id: "",
      user_id: "",
      from_component: "",
      new_posts: false,
      bgColor: "",
    };
  },
  methods: {
    goToComments(post) {
      console.log("Switch", post);
      this.from_component = this.current;
      this.current = "CommentsScreen";
      this.id = post.id;
    },
    goToNotifications() {
      this.current = "NotificationsScreen";
    },
    goToHome() {
      this.from_component = this.current;
      this.current = "HomeScreen";
      console.log("switch screen home");
      this.new_posts = !this.new_posts;
      if (this.bgColor == "#fff") {
        this.bgColor = "#ffffff";
      } else {
        this.bgColor = "#fff";
      }
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
    goToUserProfile(post) {
      this.from_component = this.current;
      this.current = "LoadMoreUserPosts";
      this.user_id = post.user_id;
    },
    goToPostDetails(post_id) {
      console.log(post_id);
      this.from_component = this.current;
      this.current = "CommentsScreen";
      this.id = post_id;
    },
  },
};
</script>

<template>
  <div class="row">
    <div class="col-md-3">
      <sidebar-coreui
        :indicatorbg="bgColor"
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
          :user_id="user_id"
          :from_component="from_component"
          :new_posts="new_posts"
          @listen-comment="goToComments"
          @listen-notifications="goToNotifications"
          @listen-home="goToHome"
          @listen-profile="goToProfile"
          @listen-accounts="goToAccounts"
          @listen-privacy-safety="goToPrivacyAndSafety"
          @listen-about-places="goToAboutPlaces"
          @listen-user-profile="goToUserProfile"
          @listen-post-details="goToPostDetails"
        ></component>
      </KeepAlive>
    </div>
    <div class="col-md-3 border-left">
      <search-users />
    </div>
  </div>
</template>