<template>
  <div class="row">
    <div class="col-md-3">
      <sidebar-coreui
        :initPlace="Place"
        @listen-place="emittedPlace"
        @listen-profile="goToProfile"
        @listen-accounts="goToAccounts"
        @listen-privacy-safety="goToPrivacyAndSafety"
        @listen-about-places="goToAboutPlaces"
      />
    </div>
    <div class="col-md-6">
      <load-more-user-posts :user_id="user_id" />
    </div>
    <div class="col-md-3">
      <search-users />
    </div>
  </div>
</template>

<script>
import SidebarCoreui from "@/components/SideBar2.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";
import LoadMoreUserPosts from "@/views/pages/main/userprofile/LoadMoreUserPosts.vue";

export default {
  name: "UserProfileAndPosts",
  props: {
    user_id: String,
  },
  watch: {
    user_id: {
      immediate: true,
      handler(val) {
        if (Object.keys(val).length != 0) {
          console.log("user id", val);
        }
      },
    },
  },
  components: {
    SidebarCoreui,
    SearchUsers,
    LoadMoreUserPosts,
  },
  data() {
    return {
      Place: {},
      post: {},
    };
  },
  methods: {
    emittedPlace(place) {
      console.log("Emitted Place", place);
      this.Place = place;
    },
    goToProfile() {
      this.$emit("listen-profile");
    },
    goToAccounts() {
      this.$emit("listen-accounts");
    },
    goToPrivacyAndSafety() {
      this.$emit("listen-privacy-safety");
    },
    goToAboutPlaces() {
      this.$emit("listen-about-places");
    },
  },
};
</script>