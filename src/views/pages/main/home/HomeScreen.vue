<template>
  <div class="row">
    <div class="col-md-3">
      <sidebar-coreui
        :initPlace="Place"
        @listen-place="emittedPlace"
        @listen-notifications="goToNotifications"
        @listen-home="goToHome"
        @listen-profile="goToProfile"
        @listen-accounts="goToAccounts"
        @listen-privacy-safety="goToPrivacyAndSafety"
        @listen-about-places="goToAboutPlaces"
      />
    </div>
    <div class="col-md-6">
      <posts-screen
        :initPlace="Place"
        @listen-comment="goToComments"
      ></posts-screen>
    </div>
    <div class="col-md-3">
      <search-users />
    </div>
  </div>
</template>

<script>
import PostsScreen from "@/views/pages/main/home/PostsScreen.vue";
import SidebarCoreui from "@/components/SideBar2.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

export default {
  name: "HomeScreen",
  props: {},
  components: {
    PostsScreen,
    SidebarCoreui,
    SearchUsers,
  },
  data() {
    return {
      Place: {},
      post: {},
    };
  },
  watch: {},
  methods: {
    emittedPlace(place) {
      console.log("Emitted Place", place);
      this.Place = place;
    },
    goToComments(post) {
      this.$emit("listen-comment", post);
    },
    goToNotifications() {
      this.$emit("listen-notifications");
    },
    goToHome() {
      this.$emit("listen-home");
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
<style scoped>
body {
  overflow-x: hidden;
}

.border-right {
  border-right: 1px solid #c2c3c4;
}

.container-fluid {
  background-color: white;
}
</style>