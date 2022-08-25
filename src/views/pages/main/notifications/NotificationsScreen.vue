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
      <notification-section></notification-section>
    </div>
    <div class="col-md-3">
      <search-users />
    </div>
  </div>
</template>

<script>
import NotificationSection from "@/views/pages/main/notifications/NotificationSection.vue";
import SidebarCoreui from "@/components/SideBar2.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

export default {
  name: "HomeScreen",
  props: {},
  components: {
    NotificationSection,
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
      console.log("emitted place", place);
      this.Place = place;
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