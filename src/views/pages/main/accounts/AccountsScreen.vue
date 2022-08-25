<template>
  <div class="row">
    <div class="col-md-3" style="display">
      <sidebar-coreui
        :initPlace="Place"
        @listen-place="emittedPlace"
        @listen-profile="goToProfile"
        @listen-accounts="goToAccounts"
        @listen-privacy-safety="goToPrivacyAndSafety"
        @listen-about-places="goToAboutPlaces"
      />
    </div>
    <div class="col-md-9">
      <accounts-section></accounts-section>
    </div>
  </div>
</template>

<script>
import AccountsSection from "@/views/pages/main/accounts/AccountsSection.vue";
import SidebarCoreui from "@/components/SideBar2.vue";

export default {
  name: "HomeScreen",
  props: {},
  components: {
    AccountsSection,
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