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
      <load-more-posts-and-comments :id="id" />
    </div>
    <div class="col-md-3">
      <search-users />
    </div>
  </div>
</template>

<script>
import SidebarCoreui from "@/components/SideBar2.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";
import LoadMorePostsAndComments from "@/views/pages/main/comments/LoadMorePostsAndComments.vue";

export default {
  name: "HomeScreen",
  props: {
    id: String,
  },
  setup(props) {
    console.log("Comments Screen", props.id);
  },
  components: {
    SidebarCoreui,
    SearchUsers,
    LoadMorePostsAndComments,
  },
  data() {
    return {
      Place: {},
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