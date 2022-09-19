<script>
import CommentsPage from "@/views/pages/main/CommentsPage.vue";
import PostsPage from "@/views/pages/main/PostsPage.vue";
import UserPostsPage from "@/views/pages/main/userprofile/UserPostsPage.vue";
import NotificationSection from "@/views/pages/main/notifications/NotificationSection.vue";

import AboutSection from "@/views/pages/main/AboutSection.vue";
import AccountsSection from "@/views/pages/main/AccountsSection.vue";
import EditProfileSection from "@/views/pages/main/EditProfileSection.vue";
import PrivacyAndSafety from "@/views/pages/main/PrivacyAndSafetySection.vue";
import SideBar from "@/components/SideBar.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";
import PlaceDetailsPage from "@/views/pages/main/PlaceDetailsPage.vue";

export default {
  components: {
    UserPostsPage,
    AboutSection,
    AccountsSection,
    CommentsPage,
    NotificationSection,
    EditProfileSection,
    PrivacyAndSafety,
    SideBar,
    SearchUsers,
    PostsPage,
    PlaceDetailsPage,
  },
  data() {
    return {
      current: "PostsPage",
      id: "",
      user_id: "",
      from_component: [],
      new_posts: false,
      new_comments: false,
      bgColor: "",
      new_notifications: false,
      deleteArray: [],
      del_post_id: 0,
      place: "",
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
      this.current = "NotificationSection";
      this.from_component = [];
      this.from_component.push(this.current);
    },
    goToHome() {
      this.current = "PostsPage";
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
      this.current = "EditProfileSection";
    },
    goToAccounts() {
      this.current = "AccountsSection";
    },
    goToPrivacyAndSafety() {
      this.current = "PrivacyAndSafety";
    },
    goToAboutPlaces() {
      this.current = "AboutSection";
    },
    goToUserProfile(post) {
      this.from_component.push(this.current);
      this.current = "UserPostsPage";
      this.user_id = post.user_id;
    },
    goToPostDetails(post_id) {
      console.log(post_id);
      this.from_component.push(this.current);
      this.current = "CommentsPage";
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
      this.current = "UserPostsPage";
      this.user_id = user_id;
    },
    deletedPostId(d_post_id) {
      console.log("DELETED POST ID 2", d_post_id);
      this.del_post_id = d_post_id;
    },
    goToPlaceDetailsPage(place_details) {
      console.log("PLACE_DETAILS_PAGE",place_details);
      this.place = place_details;
      this.from_component.push(this.current);
      this.current = "PlaceDetailsPage";
    },
  },
};
</script>

<template>
  <div class="row main">
    <div class="col-md-3">
      <side-bar
        :indicatorbg="bgColor"
        @listen-notifications="goToNotifications"
        @listen-home="goToHome"
        @listen-profile="goToProfile"
        @listen-accounts="goToAccounts"
        @listen-privacy-safety="goToPrivacyAndSafety"
        @listen-about-places="goToAboutPlaces"
        @listen-delete-post-id="deletedPostId"
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
          :deleted_post_id="del_post_id"
          :place="place"
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
          @listen-place-page="goToPlaceDetailsPage"
        ></component>
      </KeepAlive>
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
  componentTitle .btn-close-right {
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