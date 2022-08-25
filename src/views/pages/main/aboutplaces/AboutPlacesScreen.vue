<template>
  <div class="row">
    <div class="col-md-3" style="display">
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
    <div class="col-md-9">
      <about-section></about-section>
    </div>
  </div>
</template>

<script>
import AboutSection from "@/views/pages/main/aboutplaces/AboutSection.vue";
import SidebarCoreui from "@/components/SideBar2.vue";

export default {
  name: "HomeScreen",
  props: {},
  components: {
    AboutSection,
    SidebarCoreui,
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
    goToHome() {
      this.$emit("listen-home");
    },
    goToNotifications() {
      this.$emit("listen-notifications");
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