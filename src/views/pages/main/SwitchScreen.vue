<script>
import HomeScreen from "@/views/pages/main/home/PostsScreen.vue";
import CommentsPage from "@/views/pages/main/comments/CommentsPage.vue";
import UserProfileAndPostsScreen from "@/views/pages/main/userprofile/UserPostsPage.vue";
import NotificationsScreen from "@/views/pages/main/notifications/NotificationSection.vue";

import AboutPlacesScreen from "@/views/pages/main/aboutplaces/AboutSection.vue";
import AccountsScreen from "@/views/pages/main/accounts/AccountsSection.vue";
import EditProfileScreen from "@/views/pages/main/editprofile/EditProfileSection.vue";
import PrivacyAndSafety from "@/views/pages/main/privacyandsafety/PrivacyAndSafetySection.vue";
import LoadMoreUserPosts from "@/views/pages/main/userprofile/UserPostsPage.vue";
import SidebarCoreui from "@/components/SideBar.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

export default {
  components: {
    HomeScreen,
    UserProfileAndPostsScreen,
    AboutPlacesScreen,
    AccountsScreen,
    CommentsPage,
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
      from_component: [],
      new_posts: false,
      new_comments: false,
      bgColor: "",
      new_notifications: false,
    };
  },
  methods: {
    goToComments(post) {
      console.log("comment clicked", post);
      if (post != null) {
        this.id = post.post_id;
      }
      this.new_comments = !this.new_comments;
      this.from_component.push(this.current);
      this.current = "CommentsPage";
    },
    goToNotifications() {
      this.new_notifications = !this.new_notifications;
      this.current = "NotificationsScreen";
      this.from_component = [];
      this.from_component.push(this.current);
    },
    goToHome() {
      this.current = "HomeScreen";
      this.from_component = [];
      this.from_component.push(this.current);
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
      this.from_component.push(this.current);
      this.current = "LoadMoreUserPosts";
      this.user_id = post.user_id;
    },
    goToPostDetails(post_id) {
      console.log(post_id);
      this.from_component.push(this.current);
      this.current = "CommentsScreen";
      this.id = post_id;
    },
    moveBack() {
      console.log("length", this.from_component.length);
      console.log(
        "length",
        this.from_component[this.from_component.length - 1]
      );
      this.current = this.from_component[this.from_component.length - 1];
      this.from_component.pop();
    },
    searchUserProfile(user_id) {
      this.from_component.push(this.current);
      this.current = "LoadMoreUserPosts";
      this.user_id = user_id;
    },
  },
};
</script>

<template>
  <div class="row main">
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
    <div class="col-md-6 border-left">
      <KeepAlive>
        <component
          :is="current"
          :id="id"
          :user_id="user_id"
          :from_component="from_component"
          :new_posts="new_posts"
          :new_comments="new_comments"
          :new_notifications="new_notifications"
          @listen-comment="goToComments"
          @listen-notifications="goToNotifications"
          @listen-home="goToHome"
          @listen-profile="goToProfile"
          @listen-accounts="goToAccounts"
          @listen-privacy-safety="goToPrivacyAndSafety"
          @listen-about-places="goToAboutPlaces"
          @listen-user-profile="goToUserProfile"
          @listen-post-details="goToPostDetails"
          @listen-move-back="moveBack"
        ></component>
      </KeepAlive>
      <!-- <keep-alive include="PostsPage">
      <router-view></router-view>
      </keep-alive> -->
    </div>
    <div class="col-md-3 border-left">
      <button
        class="btn d-md-none btn-menu-right"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasResponsive2"
        aria-controls="offcanvasResponsive2"
      >
        <font-awesome-icon icon="fa-solid fa-ellipsis" />
      </button>
      <div
        class="offcanvas-md offcanvas-end"
        tabindex="-1"
        id="offcanvasResponsive2"
        aria-labelledby="offcanvasResponsiveLabel2"
      >
        <div class="offcanvas-body">
          <button
            type="button"
            class="btn-close btn-close-right"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive2"
            aria-label="Close"
          ></button>
          <search-users @listen-search-user-profile="searchUserProfile" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
html:not([dir="rtl"]) .offcanvas.offcanvas-start {
  transform: translateX(0%);
}

.btn-close {
  display: none;
}

@media (max-width: 1199.98px) {
  .btn-close {
    display: none;
  }
}

@media (max-width: 991.98px) {
  html:not([dir="rtl"]) .offcanvas-sm.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: none;
  }

  .btn {
    border: 0px solid black;
  }

  .btn-menu-right {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .offcanvas-md.offcanvas-start {
    width: 330px;
  }

  .offcanvas-md.offcanvas-end {
    width: 330px;
  }

  .btn-close-right {
    position: absolute;
    left: 1px;
    top: 1px;
  }

  .btn-close-left {
    position: absolute;
    right: 20px;
    top: 5px;
  }

  .main {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media (max-width: 767.98px) {
  html:not([dir="rtl"]) .offcanvas-md.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: block;
  }

  .offcanvas-sm.offcanvas-start {
    width: 330px;
  }
}
</style>